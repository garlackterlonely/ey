// ============================================================
// app.js — Main Application Controller "แปลทีดิtionary"
// Controls all DOM Events, Search, Filter, Bookmarks, Theme
// ============================================================

(function () {
  "use strict";

  // ─── State ─────────────────────────────────────────────────
  const BOOKMARK_KEY = "plaethee_bookmarks";
  let currentEraFilter = "all";
  let currentCategoryFilter = "all";
  let currentSearchQuery = "";
  let currentTheme = "2020s";
  let quizEngine = null;
  let translator = null;
  let modalActiveWord = null;

  // ─── Init ──────────────────────────────────────────────────
  document.addEventListener("DOMContentLoaded", () => {
    // Instantiate engines
    translator = new SlangTranslator(SLANG_DATABASE);
    quizEngine = new EraQuizEngine();

    // Apply saved theme
    const savedTheme = localStorage.getItem("plaethee_theme") || "2020s";
    applyTheme(savedTheme);

    // Render
    renderCategoryFilters();
    renderWordGrid(SLANG_DATABASE);
    updateWordCount(SLANG_DATABASE.length);

    // Event listeners
    setupSearch();
    setupThemeSwitcher();
    setupEraFilter();
    setupCategoryFilter();
    setupRandomBtn();
    setupWordModal();
    setupTranslator();
    setupQuiz();
    setupBookmarks();
    setupNavTabs();
  });

  // ─── Theme ─────────────────────────────────────────────────
  function applyTheme(era) {
    currentTheme = era;
    document.documentElement.setAttribute("data-theme", era);
    localStorage.setItem("plaethee_theme", era);

    // Highlight active era tab
    document.querySelectorAll(".era-tab").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.era === era);
    });
  }

  function setupThemeSwitcher() {
    document.querySelectorAll(".era-tab").forEach(btn => {
      btn.addEventListener("click", () => applyTheme(btn.dataset.era));
    });
  }

  // ─── Navigation Tabs ───────────────────────────────────────
  function setupNavTabs() {
    const tabs = document.querySelectorAll(".nav-tab");
    const sections = document.querySelectorAll(".page-section");

    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        const target = tab.dataset.target;

        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        sections.forEach(s => {
          s.classList.toggle("active", s.id === target);
        });

        // Reset quiz when switching to quiz tab
        if (target === "section-quiz") {
          quizEngine.reset();
          renderQuizQuestion();
        }
      });
    });
  }

  // ─── Search ────────────────────────────────────────────────
  function setupSearch() {
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-btn");
    const clearBtn = document.getElementById("search-clear");

    if (!searchInput) return;

    const doSearch = () => {
      currentSearchQuery = searchInput.value.trim();
      clearBtn.style.display = currentSearchQuery ? "flex" : "none";
      applyFilters();
    };

    searchInput.addEventListener("input", doSearch);
    searchInput.addEventListener("keydown", e => {
      if (e.key === "Enter") doSearch();
    });

    if (searchBtn) searchBtn.addEventListener("click", doSearch);

    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        searchInput.value = "";
        currentSearchQuery = "";
        clearBtn.style.display = "none";
        applyFilters();
        searchInput.focus();
      });
    }
  }

  // ─── Era Filter ────────────────────────────────────────────
  function setupEraFilter() {
    document.querySelectorAll(".filter-era-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".filter-era-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentEraFilter = btn.dataset.era;
        applyFilters();
      });
    });
  }

  // ─── Category Filter ───────────────────────────────────────
  function renderCategoryFilters() {
    const container = document.getElementById("category-filters");
    if (!container) return;

    const categories = getAllCategories();
    let html = `<button class="filter-cat-btn active" data-cat="all">ทั้งหมด</button>`;
    categories.forEach(cat => {
      html += `<button class="filter-cat-btn" data-cat="${cat}">${cat}</button>`;
    });
    container.innerHTML = html;

    container.querySelectorAll(".filter-cat-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        container.querySelectorAll(".filter-cat-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentCategoryFilter = btn.dataset.cat;
        applyFilters();
      });
    });
  }

  function setupCategoryFilter() {
    // Event delegation — already set up in renderCategoryFilters
  }

  // ─── Apply All Filters ─────────────────────────────────────
  function applyFilters() {
    let results = [...SLANG_DATABASE];

    // Search
    if (currentSearchQuery) {
      results = searchSlang(currentSearchQuery);
    }

    // Era filter
    if (currentEraFilter !== "all") {
      results = results.filter(item => item.era === currentEraFilter);
    }

    // Category filter
    if (currentCategoryFilter !== "all") {
      results = results.filter(item => item.category === currentCategoryFilter);
    }

    renderWordGrid(results);
    updateWordCount(results.length);
  }

  // ─── Word Grid ─────────────────────────────────────────────
  function renderWordGrid(words) {
    const grid = document.getElementById("word-grid");
    if (!grid) return;

    if (words.length === 0) {
      grid.innerHTML = `
        <div class="empty-state" id="empty-state">
          <div class="empty-icon">🔍</div>
          <h3>ไม่พบคำที่ค้นหา</h3>
          <p>ลองพิมพ์คำอื่น หรือยังไม่มีคำนี้ในคลัง?</p>
          <button class="btn btn-primary" id="submit-empty-btn" data-action="open-submit">
            ✍️ ส่งคำศัพท์ใหม่ทีดิ!
          </button>
        </div>`;

      const submitBtn = grid.querySelector("#submit-empty-btn");
      if (submitBtn) {
        submitBtn.addEventListener("click", () => switchToSubmitModal());
      }
      return;
    }

    grid.innerHTML = words
      .map(word => buildWordCard(word))
      .join("");

    // Bind card click
    grid.querySelectorAll(".word-card").forEach(card => {
      card.addEventListener("click", () => {
        const id = card.dataset.id;
        openWordModal(id);
      });
    });

    // Bind bookmark heart
    grid.querySelectorAll(".btn-bookmark").forEach(btn => {
      btn.addEventListener("click", e => {
        e.stopPropagation();
        toggleBookmark(btn.dataset.id);
        updateBookmarkBtn(btn.dataset.id);
      });
    });
  }

  function buildWordCard(word) {
    const isBookmarked = isBookmarkSaved(word.id);
    const eraLabel = { "90s": "🌐 ยุค 90s", "2000s": "💖 ยุค 2000s", "2010s": "📱 ยุค 2010s", "2020s": "⚡ ยุค 2020s" };
    const popularityBars = Math.round(word.popularity / 20);

    return `
      <article class="word-card" data-id="${word.id}" data-era="${word.era}" tabindex="0" role="button" aria-label="ดูรายละเอียดคำว่า ${word.word}">
        <div class="word-card-header">
          <span class="era-badge era-badge--${word.era}">${eraLabel[word.era] || word.era}</span>
          <button class="btn-bookmark ${isBookmarked ? "active" : ""}" data-id="${word.id}" aria-label="บันทึกคำโปรด" title="${isBookmarked ? "ลบออกจากคำโปรด" : "บันทึกคำโปรด"}">
            ${isBookmarked ? "❤️" : "🤍"}
          </button>
        </div>
        <div class="word-card-body">
          <h3 class="word-title">${word.word}</h3>
          <p class="word-pronunciation">[${word.pronunciation}]</p>
          <p class="word-meaning">${word.formalMeaning}</p>
        </div>
        <div class="word-card-footer">
          <span class="category-tag">${word.category}</span>
          <span class="popularity-bar" title="ความนิยม ${word.popularity}%">${"⭐".repeat(popularityBars)}</span>
        </div>
      </article>`;
  }

  function updateWordCount(count) {
    const el = document.getElementById("word-count");
    if (el) el.textContent = `พบ ${count} คำ`;
  }

  // ─── Word Detail Modal ─────────────────────────────────────
  function setupWordModal() {
    const modal = document.getElementById("word-modal");
    const closeBtn = document.getElementById("modal-close");
    const overlay = document.getElementById("modal-overlay");

    if (!modal) return;

    if (closeBtn) closeBtn.addEventListener("click", closeWordModal);
    if (overlay) overlay.addEventListener("click", closeWordModal);

    document.addEventListener("keydown", e => {
      if (e.key === "Escape") closeWordModal();
    });
  }

  function openWordModal(id) {
    const word = getSlangById(id);
    if (!word) return;
    modalActiveWord = word;

    const modal = document.getElementById("word-modal");
    const body = document.getElementById("modal-body");
    if (!modal || !body) return;

    const eraLabel = { "90s": "🌐 ยุค 90s", "2000s": "💖 ยุค 2000s", "2010s": "📱 ยุค 2010s", "2020s": "⚡ ยุค 2020s" };
    const isBookmarked = isBookmarkSaved(word.id);

    body.innerHTML = `
      <div class="modal-word-header">
        <div class="modal-word-title-row">
          <h2 class="modal-word-title">${word.word}</h2>
          <button class="btn-bookmark modal-bookmark ${isBookmarked ? "active" : ""}" data-id="${word.id}" aria-label="บันทึกคำโปรด">
            ${isBookmarked ? "❤️" : "🤍"}
          </button>
        </div>
        <p class="modal-pronunciation">[${word.pronunciation}]</p>
        <div class="modal-badges">
          <span class="era-badge era-badge--${word.era}">${eraLabel[word.era]}</span>
          <span class="level-badge">${word.languageLevel}</span>
          <span class="category-tag">${word.category}</span>
        </div>
      </div>

      <div class="modal-section">
        <h4>📖 ความหมาย</h4>
        <p class="modal-meaning">${word.formalMeaning}</p>
        <p class="modal-meaning-informal">${word.informalMeaning}</p>
      </div>

      <div class="modal-section">
        <h4>💬 ตัวอย่างการใช้งาน (แชท)</h4>
        ${word.examples.map(ex => `
          <div class="chat-example">
            <div class="chat-bubble chat-bubble--a">
              <span class="chat-speaker">A:</span> ${ex.a}
            </div>
            <div class="chat-bubble chat-bubble--b">
              <span class="chat-speaker">B:</span> ${ex.b}
            </div>
          </div>`).join("")}
      </div>

      <div class="modal-section">
        <h4>🏛️ ที่มาและบริบท</h4>
        <p class="modal-origin">${word.origin}</p>
      </div>

      <div class="modal-section modal-meta">
        <span>ความนิยม: ${"⭐".repeat(Math.round(word.popularity / 20))}</span>
        <span class="modal-popularity-num">${word.popularity}%</span>
      </div>

      <div class="modal-actions">
        <button class="btn btn-secondary" id="modal-report-btn" data-action="report" data-id="${word.id}">
          🚩 แจ้งข้อมูลผิด
        </button>
        <button class="btn btn-primary" id="modal-translator-btn" data-action="translate-word" data-word="${word.word}">
          🔄 แปลคำนี้
        </button>
      </div>`;

    // Bind bookmark in modal
    const mbBtn = body.querySelector(".modal-bookmark");
    if (mbBtn) {
      mbBtn.addEventListener("click", () => {
        toggleBookmark(word.id);
        updateBookmarkBtn(word.id);
        mbBtn.textContent = isBookmarkSaved(word.id) ? "❤️" : "🤍";
        mbBtn.classList.toggle("active", isBookmarkSaved(word.id));
      });
    }

    // Bind report button
    const reportBtn = body.querySelector("#modal-report-btn");
    if (reportBtn) reportBtn.addEventListener("click", () => openReportModal(word));

    // Bind translate button
    const translateBtn = body.querySelector("#modal-translator-btn");
    if (translateBtn) {
      translateBtn.addEventListener("click", () => {
        closeWordModal();
        switchToTranslatorTab(word.word);
      });
    }

    modal.classList.add("open");
    document.body.classList.add("modal-open");
  }

  function closeWordModal() {
    const modal = document.getElementById("word-modal");
    if (modal) modal.classList.remove("open");
    document.body.classList.remove("modal-open");
    modalActiveWord = null;
  }

  // ─── Report Modal ──────────────────────────────────────────
  function openReportModal(word) {
    const modal = document.getElementById("report-modal");
    if (!modal) return;

    document.getElementById("report-word-title").textContent = word.word;
    modal.classList.add("open");

    const closeBtn = modal.querySelector("#report-modal-close");
    const submitBtn = modal.querySelector("#report-submit-btn");
    const overlay = document.getElementById("report-overlay");

    if (closeBtn) closeBtn.onclick = () => closeReportModal();
    if (overlay) overlay.onclick = () => closeReportModal();
    if (submitBtn) {
      submitBtn.onclick = () => {
        const msg = document.getElementById("report-message").value.trim();
        if (!msg) {
          document.getElementById("report-message").classList.add("error");
          return;
        }
        // Simulate success (no backend)
        modal.innerHTML = `<div class="report-success">✅ ขอบคุณที่แจ้งข้อมูลผิด! ทีมงานจะตรวจสอบโดยเร็ว</div>`;
        setTimeout(() => closeReportModal(), 2000);
      };
    }
  }

  function closeReportModal() {
    const modal = document.getElementById("report-modal");
    if (modal) modal.classList.remove("open");
  }

  // ─── Submit Slang Modal ────────────────────────────────────
  function switchToSubmitModal() {
    // Switch to submit nav section
    const tabs = document.querySelectorAll(".nav-tab");
    const sections = document.querySelectorAll(".page-section");
    tabs.forEach(t => t.classList.remove("active"));
    sections.forEach(s => s.classList.remove("active"));

    const submitTab = document.querySelector('[data-target="section-submit"]');
    const submitSection = document.getElementById("section-submit");
    if (submitTab) submitTab.classList.add("active");
    if (submitSection) submitSection.classList.add("active");
  }

  // ─── Translator ────────────────────────────────────────────
  function setupTranslator() {
    const inputBox = document.getElementById("translator-input");
    const outputBox = document.getElementById("translator-output");
    const dirBtn = document.getElementById("translator-direction-btn");
    const translateBtn = document.getElementById("translate-btn");
    const foundList = document.getElementById("translator-found-list");
    const clearBtn = document.getElementById("translator-clear-btn");

    if (!inputBox || !translateBtn) return;

    let direction = "toFormal";

    const doTranslate = () => {
      const text = inputBox.value.trim();
      if (!text) {
        outputBox.innerHTML = `<span class="placeholder-text">ผลลัพธ์การแปลจะปรากฏที่นี่...</span>`;
        foundList.innerHTML = "";
        return;
      }

      const { html, foundWords, count } = translator.translate(text, direction);
      outputBox.innerHTML = html;

      if (count === 0) {
        foundList.innerHTML = `<p class="no-found">ไม่พบคำแสลงในข้อความนี้</p>`;
      } else {
        foundList.innerHTML = `<p class="found-count">พบ ${count} คำ:</p>` +
          foundWords.map(w => `
            <span class="found-word-chip" data-id="${w.id}" tabindex="0" role="button" aria-label="ดูรายละเอียด ${w.word}">
              ${w.word} → ${w.formalMeaning}
            </span>`).join("");

        foundList.querySelectorAll(".found-word-chip").forEach(chip => {
          chip.addEventListener("click", () => openWordModal(chip.dataset.id));
        });
      }
    };

    if (translateBtn) translateBtn.addEventListener("click", doTranslate);
    inputBox.addEventListener("keydown", e => {
      if (e.key === "Enter" && e.ctrlKey) doTranslate();
    });

    if (dirBtn) {
      dirBtn.addEventListener("click", () => {
        direction = direction === "toFormal" ? "toSlang" : "toFormal";
        dirBtn.textContent = direction === "toFormal"
          ? "🔄 แสลง → ทางการ"
          : "🔄 ทางการ → แสลง";
        doTranslate();
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        inputBox.value = "";
        outputBox.innerHTML = `<span class="placeholder-text">ผลลัพธ์การแปลจะปรากฏที่นี่...</span>`;
        foundList.innerHTML = "";
      });
    }
  }

  function switchToTranslatorTab(word = "") {
    const tabs = document.querySelectorAll(".nav-tab");
    const sections = document.querySelectorAll(".page-section");
    tabs.forEach(t => t.classList.remove("active"));
    sections.forEach(s => s.classList.remove("active"));

    const transTab = document.querySelector('[data-target="section-translator"]');
    const transSection = document.getElementById("section-translator");
    if (transTab) transTab.classList.add("active");
    if (transSection) transSection.classList.add("active");

    if (word) {
      const inputBox = document.getElementById("translator-input");
      if (inputBox) {
        inputBox.value = word;
        document.getElementById("translate-btn")?.click();
      }
    }
  }

  // ─── Random Slang Button ───────────────────────────────────
  function setupRandomBtn() {
    const btn = document.getElementById("random-btn");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const word = getRandomSlang();
      openWordModal(word.id);

      // Bounce animation
      btn.classList.add("bounce");
      setTimeout(() => btn.classList.remove("bounce"), 600);
    });
  }

  // ─── Bookmarks ─────────────────────────────────────────────
  function getBookmarks() {
    try {
      return JSON.parse(localStorage.getItem(BOOKMARK_KEY)) || [];
    } catch {
      return [];
    }
  }

  function saveBookmarks(list) {
    localStorage.setItem(BOOKMARK_KEY, JSON.stringify(list));
  }

  function isBookmarkSaved(id) {
    return getBookmarks().includes(id);
  }

  function toggleBookmark(id) {
    let list = getBookmarks();
    if (list.includes(id)) {
      list = list.filter(b => b !== id);
    } else {
      list.push(id);
    }
    saveBookmarks(list);
    renderBookmarkSection();
  }

  function updateBookmarkBtn(id) {
    const saved = isBookmarkSaved(id);
    document.querySelectorAll(`.btn-bookmark[data-id="${id}"]`).forEach(btn => {
      btn.textContent = saved ? "❤️" : "🤍";
      btn.classList.toggle("active", saved);
      if (saved) {
        btn.classList.add("pulse");
        setTimeout(() => btn.classList.remove("pulse"), 400);
      }
    });
  }

  function renderBookmarkSection() {
    const container = document.getElementById("bookmarks-grid");
    if (!container) return;

    const ids = getBookmarks();
    const words = ids.map(id => getSlangById(id)).filter(Boolean);

    if (words.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🤍</div>
          <h3>ยังไม่มีคำโปรด</h3>
          <p>กดหัวใจที่การ์ดคำศัพท์เพื่อบันทึกคำโปรดของคุณ</p>
        </div>`;
      return;
    }

    container.innerHTML = words.map(word => buildWordCard(word)).join("");

    container.querySelectorAll(".word-card").forEach(card => {
      card.addEventListener("click", () => openWordModal(card.dataset.id));
    });

    container.querySelectorAll(".btn-bookmark").forEach(btn => {
      btn.addEventListener("click", e => {
        e.stopPropagation();
        toggleBookmark(btn.dataset.id);
        updateBookmarkBtn(btn.dataset.id);
      });
    });
  }

  function setupBookmarks() {
    renderBookmarkSection();

    // Bookmark count badge
    const updateBadge = () => {
      const badge = document.getElementById("bookmark-count-badge");
      const count = getBookmarks().length;
      if (badge) {
        badge.textContent = count > 0 ? count : "";
        badge.style.display = count > 0 ? "inline-flex" : "none";
      }
    };

    // Re-render bookmarks when switching to bookmark tab
    document.querySelectorAll(".nav-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        if (tab.dataset.target === "section-bookmarks") {
          renderBookmarkSection();
        }
        updateBadge();
      });
    });

    updateBadge();
  }

  // ─── Quiz ──────────────────────────────────────────────────
  function setupQuiz() {
    const startBtn = document.getElementById("quiz-start-btn");
    const restartBtn = document.getElementById("quiz-restart-btn");

    if (startBtn) startBtn.addEventListener("click", () => {
      quizEngine.reset();
      renderQuizQuestion();
    });

    if (restartBtn) restartBtn.addEventListener("click", () => {
      quizEngine.reset();
      renderQuizQuestion();
    });
  }

  function renderQuizQuestion() {
    const container = document.getElementById("quiz-container");
    if (!container) return;

    if (quizEngine.isFinished()) {
      renderQuizResult();
      return;
    }

    const q = quizEngine.getCurrentQuestion();
    const progress = quizEngine.getProgress();

    container.innerHTML = `
      <div class="quiz-progress">
        <div class="quiz-progress-bar" style="width: ${progress}%"></div>
        <span class="quiz-progress-label">ข้อ ${quizEngine._currentIndex + 1} / ${quizEngine.getTotalQuestions()}</span>
      </div>
      <div class="quiz-question-box">
        <p class="quiz-question">${q.question}</p>
        <div class="quiz-options" id="quiz-options">
          ${q.options.map((opt, i) => `
            <button class="quiz-option-btn" data-index="${i}" id="quiz-opt-${i}">
              ${opt.text}
            </button>`).join("")}
        </div>
      </div>`;

    container.querySelectorAll(".quiz-option-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const index = parseInt(btn.dataset.index, 10);

        // Visual feedback
        container.querySelectorAll(".quiz-option-btn").forEach(b => b.disabled = true);
        btn.classList.add("selected");

        setTimeout(() => {
          const hasMore = quizEngine.answerQuestion(index);
          renderQuizQuestion();
        }, 400);
      });
    });
  }

  function renderQuizResult() {
    const container = document.getElementById("quiz-container");
    if (!container) return;

    const result = quizEngine.getResult();

    container.innerHTML = `
      <div class="quiz-result">
        <div class="quiz-result-emoji">${result.emoji}</div>
        <div class="quiz-result-badge">${result.badge}</div>
        <h3 class="quiz-result-title">${result.title}</h3>
        <p class="quiz-result-desc">${result.desc}</p>

        <div class="quiz-score-bars">
          ${Object.entries(result.scores).map(([era, score]) => `
            <div class="score-bar-row">
              <span class="score-bar-era">${era}</span>
              <div class="score-bar-track">
                <div class="score-bar-fill era-fill--${era}" style="width: ${Math.round((score / 14) * 100)}%"></div>
              </div>
              <span class="score-bar-value">${score}</span>
            </div>`).join("")}
        </div>

        <div class="quiz-actions">
          <button class="btn btn-primary" id="quiz-share-btn">📋 คัดลอกผลลัพธ์</button>
          <button class="btn btn-secondary" id="quiz-restart-btn2">🔄 เล่นอีกครั้ง</button>
        </div>
      </div>`;

    const shareBtn = container.querySelector("#quiz-share-btn");
    if (shareBtn) {
      shareBtn.addEventListener("click", async () => {
        const text = quizEngine.buildShareText(result);
        try {
          await navigator.clipboard.writeText(text);
          shareBtn.textContent = "✅ คัดลอกแล้ว!";
          setTimeout(() => (shareBtn.textContent = "📋 คัดลอกผลลัพธ์"), 2000);
        } catch {
          shareBtn.textContent = "❌ คัดลอกไม่ได้";
        }
      });
    }

    const restartBtn2 = container.querySelector("#quiz-restart-btn2");
    if (restartBtn2) {
      restartBtn2.addEventListener("click", () => {
        quizEngine.reset();
        renderQuizQuestion();
      });
    }
  }

  // ─── Submit Slang Form ─────────────────────────────────────
  (function setupSubmitForm() {
    document.addEventListener("DOMContentLoaded", () => {
      const form = document.getElementById("submit-slang-form");
      if (!form) return;

      form.addEventListener("submit", e => {
        e.preventDefault();
        const word = document.getElementById("submit-word").value.trim();
        const meaning = document.getElementById("submit-meaning").value.trim();
        const example = document.getElementById("submit-example").value.trim();

        if (!word || !meaning || !example) {
          form.querySelectorAll(".form-input:invalid").forEach(el =>
            el.classList.add("error")
          );
          return;
        }

        // Honeypot check
        const honeypot = document.getElementById("submit-honeypot");
        if (honeypot && honeypot.value) return;

        // Simulate submission
        const successMsg = document.getElementById("submit-success");
        if (successMsg) {
          successMsg.style.display = "block";
          form.reset();
          setTimeout(() => (successMsg.style.display = "none"), 5000);
        }
      });

      form.querySelectorAll(".form-input").forEach(input => {
        input.addEventListener("input", () => input.classList.remove("error"));
      });
    });
  })();

})();
