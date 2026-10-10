// ============================================================
// quiz.js — EraQuizEngine "แปลทีดิtionary"
// มินิเกมวัดระดับยุค — คุณเป็นคนยุคไหน?
// ============================================================

class EraQuizEngine {
  constructor() {
    this._questions = [
      {
        id: 1,
        question: "เวลาใครทำอะไรเจ๋งมากๆ คุณมักพูดว่าอะไร?",
        options: [
          { text: "จ๊าบมากเลย! / ปิ๊งมาก!", era: "90s", score: 3 },
          { text: "ขำกลิ้ง! / เกรียนสุดๆ!", era: "2000s", score: 3 },
          { text: "ฝุดๆ! / จุงเบยเลย!", era: "2010s", score: 3 },
          { text: "จึ้งมาก! / ฉ่ำสุดๆ!", era: "2020s", score: 3 }
        ]
      },
      {
        id: 2,
        question: "เวลาถ่ายรูปลงโซเชียลฯ คุณมักใช้แพลตฟอร์มไหนเป็นหลัก?",
        options: [
          { text: "เว็บบอร์ด Pantip / ICQ", era: "90s", score: 3 },
          { text: "Hi5 / MSN Spaces", era: "2000s", score: 3 },
          { text: "Facebook / Instagram ยุคแรก", era: "2010s", score: 3 },
          { text: "TikTok / Reels", era: "2020s", score: 3 }
        ]
      },
      {
        id: 3,
        question: "เวลารู้สึกเบื่อหน่ายมากๆ คุณมักพูดว่า...",
        options: [
          { text: "เซ็งเป็ดมากเลย / นอยด์สุดๆ", era: "90s", score: 3 },
          { text: "บ่นไม่หยุดใน MSN / ตะเองเบื่อแล้ว", era: "2000s", score: 3 },
          { text: "มโนไปเองหรือเปล่า / มองบนเลย", era: "2010s", score: 3 },
          { text: "สภาพมากๆ / นอยด์อะแก", era: "2020s", score: 3 }
        ]
      },
      {
        id: 4,
        question: "เพลงหรือศิลปินไหนที่คุณยังจำได้ดี?",
        options: [
          { text: "เพลงสมัยสยาม Square / บอดี้สแลม ยุคแรก", era: "90s", score: 2 },
          { text: "ลาบานูน / โปเตโต้ / เพลง Hi5 ยุคทอง", era: "2000s", score: 2 },
          { text: "Potato / Scrubb / BB-18 ยุค BB PIN", era: "2010s", score: 2 },
          { text: "MILLI / PROXIE / ศิลปิน TikTok", era: "2020s", score: 2 }
        ]
      },
      {
        id: 5,
        question: "เวลาชมใครว่าเก่งหรือดีมาก คุณชอบพูดว่า...",
        options: [
          { text: "แกปิ๊งมากเลย / จ๊าบสุดๆ", era: "90s", score: 3 },
          { text: "ตัวแม่เลยนะ / ขำกลิ้ง", era: "2000s", score: 3 },
          { text: "ตัวแม่ชัดๆ / ติ่งสุดๆ", era: "2010s", score: 3 },
          { text: "ตัวตึงเลย / ชีทำถึง / ตัวบุตร!", era: "2020s", score: 3 }
        ]
      }
    ];

    this._eraTitles = {
      "90s": {
        badge: "🌐 ตำนานเว็บบอร์ด",
        title: "ประชากรพันทิป-ICQ ตัวจริง",
        desc: "คุณคือตำนานแห่งยุคอินเทอร์เน็ตบุกเบิก! รู้ทุกมุกจากเว็บบอร์ด และจำวันที่ต้องรอ Dial-up ต่อเน็ตได้ดีเป็นประวัติการณ์",
        color: "#000080",
        emoji: "🖥️"
      },
      "2000s": {
        badge: "💖 ราชาสาว Y2K",
        title: "เด็กสยาม Y2K ตัวจริงไม่ต้องแคร์",
        desc: "คุณเติบโตมาพร้อม MSN Messenger Status ที่ลึกซึ้ง Hi5 Profile ที่ตกแต่งสุดมัน และเพลง Flash Music ที่เล่นตลอดวัน",
        color: "#FF1493",
        emoji: "💌"
      },
      "2010s": {
        badge: "📱 ราชาFacebook",
        title: "เจเนอเรชั่น Facebook ตัวตึง",
        desc: "คุณผ่านยุคทอง Facebook Check-in, BB PIN แชท และ Twitter ที่ยัง 140 ตัวอักษร คุณคือสะพานเชื่อมระหว่างยุค!",
        color: "#1877F2",
        emoji: "📲"
      },
      "2020s": {
        badge: "⚡ ประชากร TikTok",
        title: "ประชากร TikTok ตัวตึง Gen Z",
        desc: "คุณคือคนรุ่นใหม่ที่ปรับตัวเร็ว! TikTok คือชีวิต สแลงเปลี่ยนไวกว่าเทรนด์ และคุณตามทันทุกวลีไวรัลก่อนใคร",
        color: "#FE0879",
        emoji: "📱"
      }
    };

    // สถานะภายใน
    this._scores = { "90s": 0, "2000s": 0, "2010s": 0, "2020s": 0 };
    this._answers = [];
    this._currentIndex = 0;
  }

  /** ดึงข้อสอบทั้งหมด */
  getQuestions() {
    return this._questions;
  }

  /** ดึงจำนวนข้อสอบ */
  getTotalQuestions() {
    return this._questions.length;
  }

  /** ดึงข้อสอบปัจจุบัน */
  getCurrentQuestion() {
    if (this._currentIndex >= this._questions.length) return null;
    return this._questions[this._currentIndex];
  }

  /** รีเซ็ตเกม */
  reset() {
    this._scores = { "90s": 0, "2000s": 0, "2010s": 0, "2020s": 0 };
    this._answers = [];
    this._currentIndex = 0;
  }

  /**
   * บันทึกคำตอบและเลื่อนข้อถัดไป
   * @param {number} optionIndex ตัวเลือกที่เลือก (0-3)
   * @returns {boolean} true ถ้ายังมีข้อต่อไป
   */
  answerQuestion(optionIndex) {
    const q = this.getCurrentQuestion();
    if (!q) return false;

    const option = q.options[optionIndex];
    if (!option) return false;

    this._scores[option.era] += option.score;
    this._answers.push({ questionId: q.id, selectedEra: option.era });
    this._currentIndex++;

    return this._currentIndex < this._questions.length;
  }

  /** ตรวจสอบว่าจบแบบทดสอบแล้วหรือยัง */
  isFinished() {
    return this._currentIndex >= this._questions.length;
  }

  /**
   * คำนวณผลลัพธ์
   * @returns {{ dominantEra, scores, badge, title, desc, color, emoji }}
   */
  getResult() {
    // หายุคที่มีคะแนนสูงสุด
    const dominantEra = Object.entries(this._scores).reduce((max, [era, score]) =>
      score > max[1] ? [era, score] : max
    , ["90s", -1])[0];

    const eraInfo = this._eraTitles[dominantEra];

    return {
      dominantEra,
      scores: { ...this._scores },
      badge: eraInfo.badge,
      title: eraInfo.title,
      desc: eraInfo.desc,
      color: eraInfo.color,
      emoji: eraInfo.emoji
    };
  }

  /**
   * สร้างข้อความสำหรับแชร์ผลลัพธ์
   */
  buildShareText(result) {
    const scoreBar = Object.entries(result.scores)
      .map(([era, score]) => `${era}: ${"█".repeat(score)}${score}คะแนน`)
      .join("\n");

    return `🎯 ฉันทำแบบทดสอบ "คุณเป็นคนยุคไหน?" บน แปลทีดิtionary\n\n${result.emoji} ผลลัพธ์: ${result.badge}\n"${result.title}"\n\nคะแนนแต่ละยุค:\n${scoreBar}\n\n🌐 ลองทำดูที่: plaethee-tionary.app`;
  }

  /** Progress percentage */
  getProgress() {
    return Math.round((this._currentIndex / this._questions.length) * 100);
  }
}
