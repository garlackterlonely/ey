// ============================================================
// app.js — Main Application Controller "แปลทีดิtionary"
// Full SPA Router for the 7 Screens Mockup
// ============================================================

(function () {
  "use strict";

  // ─── Application State ──────────────────────────────────────
  let currentView = "home";
  let currentSearchQuery = "";
  let currentCategory = "all";
  let searchActiveFilter = "all";
  let searchCurrentPage = 1;
  const SEARCH_ITEMS_PER_PAGE = 6;
  let adminCurrentPage = 1;
  const ADMIN_ITEMS_PER_PAGE = 5;

  let translator = null;
  let quizEngine = null;

  // Admin Pending Queue Items (matching the reference design)
  let adminPendingWords = [
    { id: "pend-01", word: "นู่นออน", sender: "user123", date: "24 เม.ย. 2568", status: "pending", meaning: "คำอุทานแสดงความเว่อร์ หรือพูดถึงสิ่งที่ไม่น่าเชื่อ" },
    { id: "pend-02", word: "คุณหลอก", sender: "nong", date: "23 เม.ย. 2568", status: "pending", meaning: "พูดแซวเมื่อโดนแกล้ง หรือหลอกล่อให้หลงเชื่อ" },
    { id: "pend-03", word: "ดิง", sender: "bambam", date: "22 เม.ย. 2568", status: "pending", meaning: "คำลงท้ายแสดงความสนิทสนม ดิงดิ้ง" },
    { id: "pend-04", word: "ตึง", sender: "ploy", date: "22 เม.ย. 2568", status: "pending", meaning: "เข้มข้น เก่งมาก เอาเรื่องสุดๆ" },
    { id: "pend-05", word: "ทำรุ่ง", sender: "korn", date: "21 เม.ย. 2568", status: "pending", meaning: "ผลงานดีงาม สดใส ก้าวหน้า" },
    { id: "pend-06", word: "นอยด์อะแก", sender: "fah", date: "20 เม.ย. 2568", status: "pending", meaning: "ระแวงหรือกังวลใจ โดยพูดเสริมความสนิท" },
    { id: "pend-07", word: "ชีทำถึง", sender: "bell", date: "19 เม.ย. 2568", status: "pending", meaning: "ผู้หญิงคนนั้นทำผลงานได้ดีเยี่ยม ตรงเป้าหมาย" },
    { id: "pend-08", word: "ตัวแม่จะแคร์เพื่อ", sender: "nat", date: "18 เม.ย. 2568", status: "pending", meaning: "เก่งระดับตัวแม่ ไม่ต้องแคร์คำวิจารณ์" },
    { id: "pend-09", word: "วาสนาผู้ใด", sender: "ohm", date: "17 เม.ย. 2568", status: "pending", meaning: "ใครกันหนอที่จะโชคดีได้สิ่งนี้ไปครอง" },
    { id: "pend-10", word: "เต็มคาราเบล", sender: "win", date: "16 เม.ย. 2568", status: "pending", meaning: "เต็มที่ เมาเต็มที่ หรือจัดเต็มจนล้น" },
    { id: "pend-11", word: "จึ้งตาแตก", sender: "mint", date: "15 เม.ย. 2568", status: "pending", meaning: "สวยหรือดีมากจนตกตะลึง อึ้งจนตาค้าง" },
    { id: "pend-12", word: "ช็อตฟีล", sender: "kla", date: "14 เม.ย. 2568", status: "pending", meaning: "ดับอารมณ์ ขัดจังหวะความสนุกอย่างกะทันหัน" }
  ];

  let adminApprovedCount = 248;
  let adminRejectedCount = 5;

  // ─── DOM Ready ──────────────────────────────────────────────
  document.addEventListener("DOMContentLoaded", () => {
    // Initialize secondary tools
    if (typeof SlangTranslator !== "undefined") {
      translator = new SlangTranslator(SLANG_DATABASE);
    }
    if (typeof EraQuizEngine !== "undefined") {
      quizEngine = new EraQuizEngine();
    }

    // Render Initial State
    renderHomePopularSlangs();
    renderAdminTable();
    updateStatsCounters();

    // Setup Event Listeners
    setupNavRouting();
    setupHomeSearch();
    setupCategoriesSelection();
    setupSamplePills();
    setupSearchResultsView();
    setupSubmitNewWordPage();
    setupAdminLoginModal();
    setupReportModal();
    setupToolsModal();
    setupMobileNav();
  });

  // ─── Slang Icon Helper ──────────────────────────────────────
  function getSlangIcon(item) {
    if (item.icon) return item.icon;
    const icons = {
      "เท่": "👑",
      "แซ่บ": "🔥",
      "งง": "😵",
      "ปั่น": "🚲",
      "คุ้ม": "🪙",
      "ตึง": "⚡",
      "งานเข้า": "💼",
      "เท่จัด": "🔥",
      "เท่ห์": "🥱",
      "เท่ห์จัด": "😆",
      "เท่ห์เกินต้าน": "🤴",
      "ตัวตึงเท่": "⚡",
      "เท่คูล": "🕶️",
      "โครตเท่": "💥",
      "เท่ระเบิด": "💣",
      "เท่บับว่า": "✨",
      "เท่กินคนเดียว": "🌟",
      "เท่จึ้ง": "💯"
    };
    return icons[item.word] || "✨";
  }

  // ─── Toast Notification ─────────────────────────────────────
  function showToast(msg) {
    const toast = document.getElementById("toast-notification");
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 2600);
  }

  // ─── SPA View Router ────────────────────────────────────────
  function navigateTo(viewName, params = {}) {
    currentView = viewName;

    // Hide all views
    document.querySelectorAll(".spa-view").forEach(v => {
      v.classList.remove("active");
      v.style.display = "none";
    });

    // Update Nav Buttons State
    document.querySelectorAll(".nav-btn").forEach(btn => {
      const targetNav = btn.getAttribute("data-nav");
      btn.classList.toggle("active", targetNav === viewName);
      if (targetNav === viewName) {
        btn.setAttribute("aria-current", "page");
      } else {
        btn.removeAttribute("aria-current");
      }
    });

    // Update Mobile Bottom Nav
    document.querySelectorAll(".mobile-nav-btn").forEach(btn => {
      const targetMNav = btn.getAttribute("data-mobile-nav");
      btn.classList.toggle("active", targetMNav === viewName);
    });

    window.scrollTo({ top: 0, behavior: "smooth" });

    // Activate Selected View
    if (viewName === "home") {
      const homeView = document.getElementById("view-home");
      if (homeView) {
        homeView.classList.add("active");
        homeView.style.display = "block";
      }
      renderHomePopularSlangs();
    } else if (viewName === "search") {
      const searchView = document.getElementById("view-search");
      if (searchView) {
        searchView.classList.add("active");
        searchView.style.display = "block";
      }
      const q = params.query !== undefined ? params.query : (currentSearchQuery || "เท่");
      const searchInput = document.getElementById("searchpage-input");
      if (searchInput) searchInput.value = q;
      currentSearchQuery = q;
      searchActiveFilter = params.filter || "all";
      searchCurrentPage = params.page || 1;
      executeSearch();
    } else if (viewName === "detail") {
      const detailView = document.getElementById("view-detail");
      if (detailView) {
        detailView.classList.add("active");
        detailView.style.display = "block";
      }
      const wordId = params.id || "pop-001";
      renderWordDetailPage(wordId);
    } else if (viewName === "submit") {
      const submitView = document.getElementById("view-submit");
      if (submitView) {
        submitView.classList.add("active");
        submitView.style.display = "block";
      }
    } else if (viewName === "admin") {
      const adminView = document.getElementById("view-admin");
      if (adminView) {
        adminView.classList.add("active");
        adminView.style.display = "block";
      }
      renderAdminTable();
    }
  }

  // ─── Setup Nav Routing ──────────────────────────────────────
  function setupNavRouting() {
    // Top Nav buttons
    document.getElementById("nav-btn-home")?.addEventListener("click", () => navigateTo("home"));
    document.getElementById("nav-btn-search")?.addEventListener("click", () => navigateTo("search", { query: "เท่" }));
    document.getElementById("nav-btn-categories")?.addEventListener("click", () => {
      navigateTo("home");
      const catCard = document.querySelector(".category-card");
      if (catCard) catCard.scrollIntoView({ behavior: "smooth" });
    });
    document.getElementById("nav-btn-submit")?.addEventListener("click", () => navigateTo("submit"));
    document.getElementById("nav-btn-tools")?.addEventListener("click", () => openToolsModal());
    document.getElementById("nav-btn-admin")?.addEventListener("click", () => openAdminLoginModal());

    // Logo & Breadcrumbs
    document.getElementById("logo-home-link")?.addEventListener("click", (e) => {
      e.preventDefault();
      navigateTo("home");
    });
    document.getElementById("bc-home-link")?.addEventListener("click", (e) => {
      e.preventDefault();
      navigateTo("home");
    });
    document.getElementById("bc-search-link")?.addEventListener("click", (e) => {
      e.preventDefault();
      navigateTo("search", { query: "เท่" });
    });
    document.querySelectorAll(".link-to-home").forEach(el => {
      el.addEventListener("click", (e) => { e.preventDefault(); navigateTo("home"); });
    });
    document.querySelectorAll(".link-to-search").forEach(el => {
      el.addEventListener("click", (e) => { e.preventDefault(); navigateTo("search", { query: "เท่" }); });
    });
    document.querySelectorAll(".link-to-categories").forEach(el => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        navigateTo("home");
        document.querySelector(".category-card")?.scrollIntoView({ behavior: "smooth" });
      });
    });
    document.querySelectorAll(".link-to-submit").forEach(el => {
      el.addEventListener("click", (e) => { e.preventDefault(); navigateTo("submit"); });
    });
    document.querySelectorAll(".link-to-report").forEach(el => {
      el.addEventListener("click", (e) => { e.preventDefault(); openReportModal("เท่"); });
    });
    document.querySelectorAll(".link-to-tools").forEach(el => {
      el.addEventListener("click", (e) => { e.preventDefault(); openToolsModal(); });
    });

    // View All Slangs button in Screen 1
    document.getElementById("btn-view-all-slangs")?.addEventListener("click", () => {
      navigateTo("search", { query: "เท่", filter: "all" });
    });
  }

  // ─── Screen 1: Home View Slangs ─────────────────────────────
  function renderHomePopularSlangs() {
    const container = document.getElementById("home-slang-list");
    if (!container) return;

    // Featured list matching mockup
    const popularKeys = ["เท่", "แซ่บ", "งง", "ปั่น", "คุ้ม", "ตึง", "งานเข้า"];
    let displayList = [];

    popularKeys.forEach(k => {
      const match = SLANG_DATABASE.find(item => item.word === k);
      if (match) displayList.push(match);
    });

    // If search/category filter is active on home
    if (currentSearchQuery.trim()) {
      const q = currentSearchQuery.trim().toLowerCase();
      displayList = SLANG_DATABASE.filter(item =>
        item.word.toLowerCase().includes(q) ||
        (item.formalMeaning && item.formalMeaning.toLowerCase().includes(q))
      );
    } else if (currentCategory !== "all") {
      displayList = SLANG_DATABASE.filter(item => item.category === currentCategory);
    }

    const countElem = document.getElementById("home-found-count");
    if (countElem) {
      countElem.textContent = `พบ ${displayList.length || 248} คำ`;
    }

    container.innerHTML = displayList.map(item => buildSlangRowHtml(item)).join("");
    bindSlangRowEvents(container);
  }

  function buildSlangRowHtml(item) {
    const icon = getSlangIcon(item);
    const meaning = item.formalMeaning || item.informalMeaning || "";

    return `
      <article class="slang-list-row" data-id="${item.id}" role="listitem">
        <div class="slang-row-left">
          <span class="slang-row-emoji" aria-hidden="true">${icon}</span>
          <strong class="slang-row-word">${item.word}</strong>
          <span class="slang-row-meaning">หมายถึง ${meaning}</span>
        </div>
        <div class="slang-row-right">
          <span class="slang-category-badge">${item.category}</span>
          <button type="button" class="btn-view-detail" data-id="${item.id}" aria-label="ดูรายละเอียดคำว่า ${item.word}">
            ดูรายละเอียด &gt;
          </button>
        </div>
      </article>
    `;
  }

  function bindSlangRowEvents(container) {
    container.querySelectorAll(".btn-view-detail").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.getAttribute("data-id");
        navigateTo("detail", { id });
      });
    });

    container.querySelectorAll(".slang-list-row").forEach(row => {
      row.addEventListener("click", () => {
        const id = row.getAttribute("data-id");
        navigateTo("detail", { id });
      });
    });
  }

  // ─── Screen 1: Home Search & Pills ──────────────────────────
  function setupHomeSearch() {
    const input = document.getElementById("home-search-input");
    const clearBtn = document.getElementById("home-search-clear");
    const form = document.getElementById("home-search-form");

    if (!input) return;

    input.addEventListener("input", () => {
      if (clearBtn) clearBtn.style.display = input.value.trim() ? "flex" : "none";
      currentSearchQuery = input.value;
      renderHomePopularSlangs();
    });

    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        input.value = "";
        currentSearchQuery = "";
        clearBtn.style.display = "none";
        renderHomePopularSlangs();
        input.focus();
      });
    }

    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const q = input.value.trim() || "เท่";
        navigateTo("search", { query: q });
      });
    }

    document.getElementById("home-search-submit")?.addEventListener("click", (e) => {
      e.preventDefault();
      const q = input.value.trim() || "เท่";
      navigateTo("search", { query: q });
    });

    document.getElementById("btn-home-random")?.addEventListener("click", () => {
      const rand = SLANG_DATABASE[Math.floor(Math.random() * SLANG_DATABASE.length)];
      navigateTo("detail", { id: rand.id });
    });
  }

  function setupSamplePills() {
    document.querySelectorAll(".sample-tag-pill").forEach(pill => {
      pill.addEventListener("click", () => {
        const query = pill.getAttribute("data-query");
        navigateTo("search", { query });
      });
    });
  }

  function setupCategoriesSelection() {
    document.querySelectorAll(".category-menu-item").forEach(item => {
      item.addEventListener("click", () => {
        document.querySelectorAll(".category-menu-item").forEach(i => i.classList.remove("active"));
        item.classList.add("active");
        currentCategory = item.getAttribute("data-category");
        currentSearchQuery = "";
        const input = document.getElementById("home-search-input");
        if (input) input.value = "";

        const heading = document.getElementById("popular-heading-text");
        if (heading) {
          heading.textContent = currentCategory === "all" ? "คำแสลงยอดนิยม" : `หมวดหมู่: ${currentCategory}`;
        }

        renderHomePopularSlangs();
      });
    });
  }

  // ─── Screen 2: Search Results View ──────────────────────────
  function setupSearchResultsView() {
    const searchInput = document.getElementById("searchpage-input");
    const clearBtn = document.getElementById("searchpage-clear");
    const form = document.getElementById("searchpage-form");

    if (searchInput) {
      searchInput.addEventListener("input", () => {
        currentSearchQuery = searchInput.value;
        searchCurrentPage = 1;
        executeSearch();
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        if (searchInput) {
          searchInput.value = "";
          currentSearchQuery = "";
          executeSearch();
          searchInput.focus();
        }
      });
    }

    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        currentSearchQuery = searchInput.value.trim();
        searchCurrentPage = 1;
        executeSearch();
      });
    }

    // Filter Tabs on Top of Results
    document.querySelectorAll(".results-tab-pill").forEach(tab => {
      tab.addEventListener("click", () => {
        document.querySelectorAll(".results-tab-pill").forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        searchActiveFilter = tab.getAttribute("data-filter");
        searchCurrentPage = 1;
        executeSearch();
      });
    });

    // Pagination Click
    document.querySelectorAll(".pagination-bar-wrapper .page-btn-num").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".pagination-bar-wrapper .page-btn-num").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        searchCurrentPage = parseInt(btn.getAttribute("data-page"), 10) || 1;
        executeSearch();
      });
    });

    document.getElementById("page-prev")?.addEventListener("click", () => {
      if (searchCurrentPage > 1) {
        searchCurrentPage--;
        updatePaginationButtons();
        executeSearch();
      }
    });

    document.getElementById("page-next")?.addEventListener("click", () => {
      if (searchCurrentPage < 2) {
        searchCurrentPage++;
        updatePaginationButtons();
        executeSearch();
      }
    });
  }

  function updatePaginationButtons() {
    document.querySelectorAll(".pagination-bar-wrapper .page-btn-num").forEach(btn => {
      const p = parseInt(btn.getAttribute("data-page"), 10);
      btn.classList.toggle("active", p === searchCurrentPage);
    });
  }

  function executeSearch() {
    const query = (currentSearchQuery || "เท่").trim().toLowerCase();
    const headingElem = document.getElementById("search-results-heading-text");
    const container = document.getElementById("searchpage-slang-list");
    const emptyBox = document.getElementById("searchpage-empty-box");

    if (!container) return;

    // Filter database
    let matches = SLANG_DATABASE.filter(item => {
      const w = item.word.toLowerCase();
      const m = (item.formalMeaning || "").toLowerCase();
      const p = (item.pronunciation || "").toLowerCase();
      return w.includes(query) || m.includes(query) || p.includes(query);
    });

    // Update filter tabs counters if query is "เท่"
    const totalCount = matches.length;
    const exclamCount = matches.filter(i => i.category === "คำอุทาน / คำเสริม").length;
    const personCount = matches.filter(i => i.category === "คน / ลักษณะนิสัย").length;
    const otherCount = matches.filter(i => i.category === "อื่น ๆ" || (i.category !== "คำอุทาน / คำเสริม" && i.category !== "คน / ลักษณะนิสัย")).length;

    const tabAll = document.getElementById("tab-filter-all");
    const tabExc = document.getElementById("tab-filter-exclamation");
    const tabPer = document.getElementById("tab-filter-personality");
    const tabOth = document.getElementById("tab-filter-other");
    if (tabAll) tabAll.textContent = `ทั้งหมด (${totalCount})`;
    if (tabExc) tabExc.textContent = `คำอุทาน (${exclamCount})`;
    if (tabPer) tabPer.textContent = `คน / ลักษณะนิสัย (${personCount})`;
    if (tabOth) tabOth.textContent = `อื่น ๆ (${otherCount})`;

    // Apply category tab filter
    if (searchActiveFilter !== "all") {
      if (searchActiveFilter === "อื่น ๆ") {
        matches = matches.filter(i => i.category === "อื่น ๆ" || (i.category !== "คำอุทาน / คำเสริม" && i.category !== "คน / ลักษณะนิสัย"));
      } else {
        matches = matches.filter(i => i.category === searchActiveFilter);
      }
    }

    if (headingElem) {
      headingElem.textContent = `ผลการค้นหา "${currentSearchQuery || "เท่"}" (${matches.length} รายการ)`;
    }

    if (matches.length === 0) {
      container.innerHTML = "";
      if (emptyBox) emptyBox.style.display = "block";
      return;
    }

    if (emptyBox) emptyBox.style.display = "none";

    // Paginate
    const startIndex = (searchCurrentPage - 1) * SEARCH_ITEMS_PER_PAGE;
    const paginated = matches.slice(startIndex, startIndex + SEARCH_ITEMS_PER_PAGE);

    container.innerHTML = paginated.map(item => buildSlangRowHtml(item)).join("");
    bindSlangRowEvents(container);
  }

  // ─── Screen 3: Word Detail Page ─────────────────────────────
  function renderWordDetailPage(wordId) {
    const item = SLANG_DATABASE.find(w => w.id === wordId || w.word === wordId) || SLANG_DATABASE[0];

    // Breadcrumbs
    const bcCurrent = document.getElementById("bc-current-word");
    if (bcCurrent) bcCurrent.textContent = item.word;

    // Header info
    const iconElem = document.getElementById("detail-word-icon");
    const nameElem = document.getElementById("detail-word-name");
    const catElem = document.getElementById("detail-word-category");
    const quoteElem = document.getElementById("detail-mascot-quote");

    if (iconElem) iconElem.textContent = getSlangIcon(item);
    if (nameElem) nameElem.textContent = item.word;
    if (catElem) catElem.textContent = item.category;
    if (quoteElem) quoteElem.textContent = item.mascotQuote || `${item.word}เวอร์!`;

    // Metadata
    const meaningElem = document.getElementById("detail-word-meaning");
    const partElem = document.getElementById("detail-word-part");
    const levelElem = document.getElementById("detail-word-level");
    const contextElem = document.getElementById("detail-word-context");
    const examplesListElem = document.getElementById("detail-word-examples");

    if (meaningElem) meaningElem.textContent = `หมายถึง ${item.formalMeaning || item.informalMeaning}`;
    if (partElem) partElem.textContent = item.partOfSpeech || "คำคุณศัพท์";
    if (levelElem) levelElem.textContent = item.languageLevel || "ภาษาพูด";
    if (contextElem) contextElem.textContent = item.context || item.origin || "ใช้ในบทสนทนาทั่วไปเพื่อแสดงความรู้สึก";

    if (examplesListElem) {
      let sentences = item.exampleSentences || [];
      if (sentences.length === 0 && item.examples && item.examples.length > 0) {
        sentences = [item.examples[0].a, item.examples[0].b];
      }
      if (sentences.length === 0) {
        sentences = [`เขา${item.word}มากเลย`, `สิ่งนี้${item.word}ดีนะ`];
      }
      examplesListElem.innerHTML = sentences.map(s => `<li>${s}</li>`).join("");
    }

    // Share button
    const shareBtn = document.getElementById("btn-share-word");
    if (shareBtn) {
      shareBtn.onclick = () => {
        const shareUrl = window.location.href.split("#")[0] + "#word=" + encodeURIComponent(item.word);
        if (navigator.clipboard) {
          navigator.clipboard.writeText(shareUrl).then(() => {
            showToast(`คัดลอกลิงก์คำว่า "${item.word}" เรียบร้อยแล้ว! 📋`);
          });
        } else {
          showToast(`คัดลอกลิงก์คำว่า "${item.word}" เรียบร้อยแล้ว!`);
        }
      };
    }

    // Report button
    const reportBtn = document.getElementById("btn-detail-report");
    if (reportBtn) {
      reportBtn.onclick = () => openReportModal(item.word);
    }

    // Back button
    const backBtn = document.getElementById("btn-detail-back");
    if (backBtn) {
      backBtn.onclick = () => navigateTo("search", { query: item.word });
    }
  }

  // ─── Screen 4: Submit New Word Page ─────────────────────────
  function setupSubmitNewWordPage() {
    const form = document.getElementById("submit-new-slang-form");
    const fileInput = document.getElementById("form-new-file");
    const dropzone = document.getElementById("file-dropzone");
    const previewName = document.getElementById("file-preview-name");
    const successAlert = document.getElementById("submit-page-success");

    if (fileInput && previewName) {
      fileInput.addEventListener("change", () => {
        if (fileInput.files && fileInput.files[0]) {
          previewName.textContent = `📁 เลือกไฟล์: ${fileInput.files[0].name}`;
          previewName.style.display = "block";
        }
      });
    }

    if (dropzone && fileInput) {
      dropzone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropzone.style.background = "#dbeafe";
      });
      dropzone.addEventListener("dragleave", () => {
        dropzone.style.background = "#f0f9ff";
      });
      dropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropzone.style.background = "#f0f9ff";
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          fileInput.files = e.dataTransfer.files;
          if (previewName) {
            previewName.textContent = `📁 เลือกไฟล์: ${e.dataTransfer.files[0].name}`;
            previewName.style.display = "block";
          }
        }
      });
    }

    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const word = document.getElementById("form-new-word").value.trim();
        const meaning = document.getElementById("form-new-meaning").value.trim();

        if (!word || !meaning) {
          showToast("กรุณากรอกคำศัพท์และความหมายให้ครบถ้วนครับ");
          return;
        }

        // Add to admin pending queue
        adminPendingWords.unshift({
          id: "pend-" + Date.now(),
          word: word,
          sender: "ผู้ใช้ทั่วไป",
          date: "วันนี้",
          status: "pending",
          meaning: meaning
        });

        renderAdminTable();
        updateStatsCounters();

        if (successAlert) {
          successAlert.style.display = "block";
          form.reset();
          if (previewName) previewName.style.display = "none";
          setTimeout(() => {
            successAlert.style.display = "none";
          }, 5000);
        }

        showToast(`ส่งคำว่า "${word}" เพื่อตรวจสอบเรียบร้อยแล้ว! 🎉`);
      });
    }
  }

  // ─── Screen 5: Admin Login Modal ────────────────────────────
  function setupAdminLoginModal() {
    const modal = document.getElementById("modal-admin-login");
    const backdrop = document.getElementById("backdrop-admin-login");
    const closeBtn = document.getElementById("btn-close-admin-login");
    const form = document.getElementById("admin-login-form");
    const toggleEye = document.getElementById("btn-toggle-password");
    const passwordInput = document.getElementById("admin-login-password");

    if (closeBtn) closeBtn.onclick = () => closeAdminLoginModal();
    if (backdrop) backdrop.onclick = () => closeAdminLoginModal();

    if (toggleEye && passwordInput) {
      toggleEye.addEventListener("click", () => {
        const isPass = passwordInput.getAttribute("type") === "password";
        passwordInput.setAttribute("type", isPass ? "text" : "password");
        toggleEye.textContent = isPass ? "🙈" : "👁️";
      });
    }

    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        closeAdminLoginModal();
        showToast("เข้าสู่ระบบแอดมินสำเร็จแล้ว! 🛡️");
        navigateTo("admin");
      });
    }

    document.getElementById("btn-submit-admin-login")?.addEventListener("click", (e) => {
      e.preventDefault();
      closeAdminLoginModal();
      showToast("เข้าสู่ระบบแอดมินสำเร็จแล้ว! 🛡️");
      navigateTo("admin");
    });
  }

  function openAdminLoginModal() {
    const modal = document.getElementById("modal-admin-login");
    if (modal) {
      modal.classList.add("open");
      document.body.classList.add("modal-open");
    }
  }

  function closeAdminLoginModal() {
    const modal = document.getElementById("modal-admin-login");
    if (modal) {
      modal.classList.remove("open");
      document.body.classList.remove("modal-open");
    }
  }

  // ─── Screen 6: Admin Dashboard ──────────────────────────────
  function renderAdminTable() {
    const tbody = document.getElementById("admin-pending-tbody");
    const badgeCount = document.getElementById("admin-badge-pending-count");
    if (!tbody) return;

    if (badgeCount) {
      badgeCount.textContent = adminPendingWords.filter(w => w.status === "pending").length;
    }

    const startIndex = (adminCurrentPage - 1) * ADMIN_ITEMS_PER_PAGE;
    const paginated = adminPendingWords.slice(startIndex, startIndex + ADMIN_ITEMS_PER_PAGE);

    tbody.innerHTML = paginated.map(row => {
      let statusBadge = '<span class="status-badge-pending">🟡 รอตรวจสอบ</span>';
      if (row.status === "approved") {
        statusBadge = '<span class="status-badge-pending" style="background:#dcfce7; color:#15803d;">🟢 อนุมัติแล้ว</span>';
      } else if (row.status === "rejected") {
        statusBadge = '<span class="status-badge-pending" style="background:#fee2e2; color:#b91c1c;">🔴 ปฏิเสธแล้ว</span>';
      }

      return `
        <tr data-id="${row.id}">
          <td><strong>${row.word}</strong></td>
          <td>${row.sender}</td>
          <td>${row.date}</td>
          <td>${statusBadge}</td>
          <td style="text-align:right;">
            <div class="admin-actions-cell">
              <button type="button" class="btn-tbl-action btn-tbl-view" data-action="view" data-id="${row.id}">ดูรายละเอียด</button>
              <button type="button" class="btn-tbl-action btn-tbl-approve" data-action="approve" data-id="${row.id}">อนุมัติ</button>
              <button type="button" class="btn-tbl-action btn-tbl-reject" data-action="reject" data-id="${row.id}">ปฏิเสธ</button>
            </div>
          </td>
        </tr>
      `;
    }).join("");

    // Bind action buttons
    tbody.querySelectorAll(".btn-tbl-action").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const action = btn.getAttribute("data-action");
        const rowData = adminPendingWords.find(w => w.id === id);
        if (!rowData) return;

        if (action === "approve") {
          rowData.status = "approved";
          adminApprovedCount++;
          showToast(`อนุมัติคำว่า "${rowData.word}" เรียบร้อยแล้ว! 🟢`);
          renderAdminTable();
          updateStatsCounters();
        } else if (action === "reject") {
          rowData.status = "rejected";
          adminRejectedCount++;
          showToast(`ปฏิเสธคำว่า "${rowData.word}" เรียบร้อยแล้ว 🔴`);
          renderAdminTable();
          updateStatsCounters();
        } else if (action === "view") {
          showToast(`คำ: ${rowData.word} — ความหมาย: ${rowData.meaning}`);
        }
      });
    });

    // Admin pagination clicks
    document.querySelectorAll(".admin-table-pagination .page-btn-num").forEach(btn => {
      btn.onclick = () => {
        document.querySelectorAll(".admin-table-pagination .page-btn-num").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        adminCurrentPage = parseInt(btn.getAttribute("data-admin-page"), 10) || 1;
        renderAdminTable();
      };
    });

    // Admin Logout
    document.getElementById("btn-admin-logout")?.addEventListener("click", () => {
      showToast("ออกจากระบบแอดมินแล้ว");
      navigateTo("home");
    });
  }

  function updateStatsCounters() {
    const totalElem = document.getElementById("stat-count-total");
    const pendElem = document.getElementById("stat-count-pending");
    const rejElem = document.getElementById("stat-count-rejected");

    const pendingCount = adminPendingWords.filter(w => w.status === "pending").length;

    if (totalElem) totalElem.textContent = `${adminApprovedCount} คำ`;
    if (pendElem) pendElem.textContent = `${pendingCount} คำ`;
    if (rejElem) rejElem.textContent = `${adminRejectedCount} คำ`;
  }

  // ─── Report Error Modal ─────────────────────────────────────
  function setupReportModal() {
    const modal = document.getElementById("modal-report-error");
    const backdrop = document.getElementById("backdrop-report-error");
    const closeBtn = document.getElementById("btn-close-report-modal");
    const form = document.getElementById("report-error-form");
    const successAlert = document.getElementById("report-success-alert");

    if (closeBtn) closeBtn.onclick = () => closeReportModal();
    if (backdrop) backdrop.onclick = () => closeReportModal();

    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (successAlert) {
          successAlert.style.display = "block";
          setTimeout(() => {
            successAlert.style.display = "none";
            closeReportModal();
          }, 2000);
        }
        showToast("ส่งรายงานข้อมูลผิดเรียบร้อยแล้ว ขอบคุณครับ! 🚩");
      });
    }

    document.getElementById("btn-submit-report")?.addEventListener("click", (e) => {
      e.preventDefault();
      if (successAlert) {
        successAlert.style.display = "block";
        setTimeout(() => {
          successAlert.style.display = "none";
          closeReportModal();
        }, 2000);
      }
      showToast("ส่งรายงานข้อมูลผิดเรียบร้อยแล้ว ขอบคุณครับ! 🚩");
    });
  }

  function openReportModal(wordName = "เท่") {
    const modal = document.getElementById("modal-report-error");
    const wordInput = document.getElementById("report-word-input");
    if (wordInput) wordInput.value = wordName;
    if (modal) {
      modal.classList.add("open");
      document.body.classList.add("modal-open");
    }
  }

  function closeReportModal() {
    const modal = document.getElementById("modal-report-error");
    if (modal) {
      modal.classList.remove("open");
      document.body.classList.remove("modal-open");
    }
  }

  // ─── Tools & Games Modal ────────────────────────────────────
  function setupToolsModal() {
    const modal = document.getElementById("modal-tools-extra");
    const backdrop = document.getElementById("backdrop-tools-extra");
    const closeBtn = document.getElementById("btn-close-tools-modal");

    if (closeBtn) closeBtn.onclick = () => closeToolsModal();
    if (backdrop) backdrop.onclick = () => closeToolsModal();

    // Tab buttons
    const tabTrans = document.getElementById("tab-btn-translator");
    const tabQuiz = document.getElementById("tab-btn-quiz");
    const tabBook = document.getElementById("tab-btn-bookmarks");
    const paneTrans = document.getElementById("pane-translator");
    const paneQuiz = document.getElementById("pane-quiz");
    const paneBook = document.getElementById("pane-bookmarks");

    const switchToolPane = (paneId) => {
      [tabTrans, tabQuiz, tabBook].forEach(b => b?.classList.remove("active"));
      [paneTrans, paneQuiz, paneBook].forEach(p => {
        if (p) {
          p.classList.remove("active");
          p.style.display = "none";
        }
      });

      if (paneId === "translator") {
        tabTrans?.classList.add("active");
        if (paneTrans) { paneTrans.classList.add("active"); paneTrans.style.display = "block"; }
      } else if (paneId === "quiz") {
        tabQuiz?.classList.add("active");
        if (paneQuiz) { paneQuiz.classList.add("active"); paneQuiz.style.display = "block"; }
        renderToolsQuiz();
      } else if (paneId === "bookmarks") {
        tabBook?.classList.add("active");
        if (paneBook) { paneBook.classList.add("active"); paneBook.style.display = "block"; }
        renderToolsBookmarks();
      }
    };

    tabTrans?.addEventListener("click", () => switchToolPane("translator"));
    tabQuiz?.addEventListener("click", () => switchToolPane("quiz"));
    tabBook?.addEventListener("click", () => switchToolPane("bookmarks"));

    // Translator Action
    const transInput = document.getElementById("tools-input-text");
    const transOutput = document.getElementById("tools-output-box");
    const transBtn = document.getElementById("btn-run-translator");
    const clearBtn = document.getElementById("btn-clear-translator");

    if (transBtn && transInput && transOutput) {
      transBtn.addEventListener("click", () => {
        const text = transInput.value.trim();
        if (!text) {
          transOutput.innerHTML = '<span class="text-muted">กรุณาพิมพ์ข้อความที่ต้องการแปล...</span>';
          return;
        }
        if (translator) {
          const res = translator.translate(text, "toFormal");
          transOutput.innerHTML = res.html;
        } else {
          transOutput.textContent = text;
        }
      });
    }

    if (clearBtn && transInput && transOutput) {
      clearBtn.addEventListener("click", () => {
        transInput.value = "";
        transOutput.innerHTML = '<span class="text-muted">ผลลัพธ์จะปรากฏที่นี่เมื่อกดแปล...</span>';
      });
    }
  }

  function openToolsModal() {
    const modal = document.getElementById("modal-tools-extra");
    if (modal) {
      modal.classList.add("open");
      document.body.classList.add("modal-open");
    }
  }

  function closeToolsModal() {
    const modal = document.getElementById("modal-tools-extra");
    if (modal) {
      modal.classList.remove("open");
      document.body.classList.remove("modal-open");
    }
  }

  function renderToolsQuiz() {
    const container = document.getElementById("tools-quiz-wrapper");
    if (!container || !quizEngine) return;

    if (quizEngine.isFinished()) {
      const res = quizEngine.getResult();
      container.innerHTML = `
        <div style="text-align:center; padding:1.5rem 0;">
          <div style="font-size:3rem; margin-bottom:0.5rem;">${res.emoji}</div>
          <h3 style="font-size:1.4rem; color:#1e3a8a; margin-bottom:0.5rem;">${res.title}</h3>
          <p style="color:#64748b; margin-bottom:1.5rem;">${res.desc}</p>
          <button type="button" class="btn-yellow-submit" id="btn-quiz-restart">🔄 เล่นอีกครั้ง</button>
        </div>
      `;
      document.getElementById("btn-quiz-restart")?.addEventListener("click", () => {
        quizEngine.reset();
        renderToolsQuiz();
      });
      return;
    }

    const q = quizEngine.getCurrentQuestion();
    if (!q) return;

    container.innerHTML = `
      <div style="margin-bottom:1rem; font-weight:700; color:#1e3a8a;">
        ข้อที่ ${quizEngine._currentIndex + 1} / ${quizEngine.getTotalQuestions()}: ${q.question}
      </div>
      <div style="display:flex; flex-direction:column; gap:0.6rem;">
        ${q.options.map((opt, i) => `
          <button type="button" class="btn-tbl-view quiz-opt-btn" data-index="${i}" style="text-align:left; padding:0.75rem 1rem; border-radius:8px;">
            ${opt.text}
          </button>
        `).join("")}
      </div>
    `;

    container.querySelectorAll(".quiz-opt-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.getAttribute("data-index"), 10);
        quizEngine.answerQuestion(idx);
        renderToolsQuiz();
      });
    });
  }

  function renderToolsBookmarks() {
    const container = document.getElementById("tools-bookmarks-list");
    if (!container) return;
    const populars = SLANG_DATABASE.slice(0, 5);
    container.innerHTML = populars.map(item => buildSlangRowHtml(item)).join("");
    bindSlangRowEvents(container);
  }

  // ─── Screen 7: Mobile Navigation Bar ────────────────────────
  function setupMobileNav() {
    document.querySelectorAll(".mobile-nav-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-mobile-nav");
        if (target === "home") {
          navigateTo("home");
        } else if (target === "search") {
          navigateTo("search", { query: "เท่" });
        } else if (target === "categories") {
          navigateTo("home");
          document.querySelector(".category-card")?.scrollIntoView({ behavior: "smooth" });
        } else if (target === "more") {
          openToolsModal();
        }
      });
    });
  }

})();
