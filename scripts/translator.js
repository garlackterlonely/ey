// ============================================================
// translator.js — SlangTranslator Engine "แปลทีดิtionary"
// Longest-Match-First Algorithm
// ============================================================

class SlangTranslator {
  constructor(database) {
    // เรียงตามความยาวคำจากมากไปน้อย (Longest-Match-First)
    this._slangEntries = [...database].sort(
      (a, b) => b.word.length - a.word.length
    );
    this._formalToSlang = [...database].sort(
      (a, b) => b.formalMeaning.length - a.formalMeaning.length
    );
  }

  /**
   * แปลข้อความจาก "แสลง → ทางการ"
   * @param {string} text ข้อความที่ต้องการแปล
   * @returns {{ result: string, found: Array }} ข้อความที่แปลแล้ว + รายการคำที่พบ
   */
  translateToFormal(text) {
    if (!text || text.trim() === "") return { result: "", found: [] };

    let result = text;
    const found = [];

    for (const entry of this._slangEntries) {
      const regex = new RegExp(this._escapeRegex(entry.word), "g");
      if (regex.test(result)) {
        found.push(entry);
        result = result.replace(
          new RegExp(this._escapeRegex(entry.word), "g"),
          `<mark class="translated-word" data-word-id="${entry.id}" title="${entry.formalMeaning}">${entry.formalMeaning}</mark>`
        );
      }
    }

    return { result, found };
  }

  /**
   * แปลข้อความจาก "ทางการ → แสลง"
   * @param {string} text ข้อความที่ต้องการแปล
   * @returns {{ result: string, found: Array }} ข้อความที่แปลแล้ว + รายการคำที่พบ
   */
  translateToSlang(text) {
    if (!text || text.trim() === "") return { result: "", found: [] };

    let result = text;
    const found = [];

    for (const entry of this._formalToSlang) {
      // ลองจับคู่จากความหมายทางการ (คำสำคัญ)
      const keywords = entry.formalMeaning
        .split(/[,\s]+/)
        .filter(k => k.length > 2)
        .sort((a, b) => b.length - a.length);

      for (const keyword of keywords) {
        const regex = new RegExp(this._escapeRegex(keyword), "g");
        if (regex.test(result)) {
          found.push(entry);
          result = result.replace(
            new RegExp(this._escapeRegex(keyword), "g"),
            `<mark class="translated-word" data-word-id="${entry.id}" title="${entry.word}">${entry.word}</mark>`
          );
          break; // ไม่ต้องจับคู่ keyword ต่อไปสำหรับ entry นี้
        }
      }
    }

    return { result, found };
  }

  /**
   * Escape special regex characters
   */
  _escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  /**
   * แปลข้อความและ render HTML ออกมาพร้อม highlight
   * @param {string} text ข้อความ
   * @param {string} direction 'toFormal' | 'toSlang'
   * @returns {{ html: string, foundWords: Array, count: number }}
   */
  translate(text, direction = "toFormal") {
    const { result, found } =
      direction === "toFormal"
        ? this.translateToFormal(text)
        : this.translateToSlang(text);

    // กรองคำที่พบซ้ำออก
    const uniqueFound = found.filter(
      (item, index, self) => index === self.findIndex(t => t.id === item.id)
    );

    return {
      html: result || `<span class="no-translation">${text}</span>`,
      foundWords: uniqueFound,
      count: uniqueFound.length
    };
  }
}
