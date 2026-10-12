// ============================================================
// slang-data.js — คลังข้อมูลคำแสลงไทย "แปลทีดิtionary"
// ============================================================

const SLANG_DATABASE = [
  // ─── คำแสลงยอดนิยม (Featured & Popular) ───
  {
    id: "pop-001",
    word: "เท่",
    pronunciation: "thêe",
    era: "90s",
    icon: "👑",
    formalMeaning: "ดี ดูดี มีสไตล์ น่าประทับใจ",
    informalMeaning: "ดูดีมากๆ มีความคูล มีเอกลักษณ์โดดเด่น",
    partOfSpeech: "คำคุณศัพท์",
    languageLevel: "ภาษาพูด",
    context: "ใช้ชมคน สิ่งของ หรือการกระทำที่ดูดี น่าประทับใจ",
    origin: "คำแสดงความชื่นชมความหล่อ ความมีสไตล์ที่ใช้สืบต่อมาหลายยุคสมัยในหมู่วัยรุ่นไทย",
    mascotQuote: "เท่เวอร์!",
    exampleSentences: [
      "เขาเท่มากเลย",
      "เสื้อผ้าแบบนี้เท่ดีนะ",
      "งานนี้ต้องบอกว่าเท่จริง ๆ"
    ],
    examples: [
      { a: "วันนี้แต่งตัวเท่มากเลยนะ", b: "ขอบคุณครับ ได้แรงบันดาลใจจากยุค 90s" }
    ],
    popularity: 99,
    category: "คน / ลักษณะนิสัย"
  },
  {
    id: "tae-002",
    word: "เท่จัด",
    pronunciation: "thêe-jàt",
    era: "2010s",
    icon: "🔥",
    formalMeaning: "มาก ๆ แบบสุดๆ ดูดีมีสไตล์ขั้นสุด",
    informalMeaning: "เท่โคตรๆ ดูดีมากๆ จนห้ามใจไม่อยู่",
    partOfSpeech: "คำอุทาน",
    languageLevel: "ภาษาพูด",
    context: "อุทานแสดงความตื่นตาตื่นใจในความเท่",
    exampleSentences: ["มอเตอร์ไซค์คันนั้นเท่จัดเลย!", "เต้นเพลงนี้เท่จัดจริงๆ"],
    examples: [{ a: "เห็นชุดใหม่ยัง", b: "เห็นแล้ว เท่จัดเลยแก" }],
    popularity: 95,
    category: "คำอุทาน / คำเสริม"
  },
  {
    id: "tae-003",
    word: "เท่ห์",
    pronunciation: "thêe",
    era: "90s",
    icon: "🥱",
    formalMeaning: "มีเสน่ห์ น่าดึงดูด มีมาดมั่นใจ",
    informalMeaning: "ดูดีแบบมีเสน่ห์ดึงดูดสายตา",
    partOfSpeech: "คำคุณศัพท์",
    languageLevel: "ภาษาพูด",
    context: "ชมคนที่มีเสน่ห์ดึงดูดสายตาและบุคลิกภาพดี",
    exampleSentences: ["ท่าเดินเขาดูเท่ห์จัง", "รูปนี้มุมกล้องเท่ห์มาก"],
    examples: [{ a: "คนนั้นใครเหรอ", b: "รุ่นพี่สถาปัตย์ เท่ห์มากนะ" }],
    popularity: 91,
    category: "คน / ลักษณะนิสัย"
  },
  {
    id: "tae-004",
    word: "เท่ห์จัด",
    pronunciation: "thêe-jàt",
    era: "2010s",
    icon: "😆",
    formalMeaning: "ดูดีมากๆ ๆ โดดเด่นสุดขีด",
    informalMeaning: "เท่สุดๆ มีสไตล์เด่นสะดุดตาทุกมุมมอง",
    partOfSpeech: "คำอุทาน",
    languageLevel: "ภาษาพูด",
    context: "อุทานเมื่อเห็นใครแต่งตัวหรือแสดงความสามารถได้ยอดเยี่ยม",
    exampleSentences: ["โซโล่กีตาร์ท่อนนี้เท่ห์จัดเลย", "ใส่แว่นอันนี้แล้วเท่ห์จัด"],
    examples: [{ a: "เขาชนะการแข่งแล้ว", b: "ยินดีด้วย เท่ห์จัดจริงๆ" }],
    popularity: 89,
    category: "คำอุทาน / คำเสริม"
  },
  {
    id: "tae-005",
    word: "เท่ห์เกินต้าน",
    pronunciation: "thêe-gern-dtâan",
    era: "2020s",
    icon: "🤴",
    formalMeaning: "ดูดีจนเกินไป ต้านทานเสน่ห์ไม่ไหว",
    informalMeaning: "เท่ระดับที่ใจละลาย ห้ามใจไม่ไหวแล้ว",
    partOfSpeech: "คำคุณศัพท์",
    languageLevel: "ภาษาพูด",
    context: "ใช้แซวหรือชื่นชมคนที่ดูดีมากๆ บนโซเชียลมีเดีย",
    exampleSentences: ["ลุคนี้ของพี่เขาเท่ห์เกินต้านมาก", "ออร่าเท่ห์เกินต้าน กระแทกใจ"],
    examples: [{ a: "ดูรูปคอนเสิร์ตยัง", b: "กรี๊ด เท่ห์เกินต้านมากแม่" }],
    popularity: 94,
    category: "อื่น ๆ"
  },
  {
    id: "tae-006",
    word: "ตัวตึงเท่",
    pronunciation: "dtua-dteung-thêe",
    era: "2020s",
    icon: "⚡",
    formalMeaning: "คนเก่งขั้นเทพและมีสไตล์เท่โดดเด่น",
    informalMeaning: "ทั้งเก่งทั้งเท่ ไม่มีใครเทียบรัศมีได้",
    partOfSpeech: "คำนาม",
    languageLevel: "ภาษาพูด",
    context: "ใช้ชมเพื่อนหรือไอดอลที่เพอร์เฟกต์ทั้งความสามารถและภาพลักษณ์",
    exampleSentences: ["คนนี้แหละตัวตึงเท่ของแผนกเรา"],
    examples: [{ a: "ใครทำพรีเซนต์นี้", b: "ตัวตึงเท่คนเดิมเลย" }],
    popularity: 88,
    category: "คน / ลักษณะนิสัย"
  },
  {
    id: "tae-007",
    word: "เท่คูล",
    pronunciation: "thêe-khuun",
    era: "2000s",
    icon: "🕶️",
    formalMeaning: "ดูดีแบบสุขุม เยือกเย็น มีมาดนิ่งๆ",
    informalMeaning: "คูลแบบผู้ดี ไม่ต้องพูดเยอะก็ดูเท่",
    partOfSpeech: "คำคุณศัพท์",
    languageLevel: "ภาษาพูด",
    context: "ใช้ชมคนที่ดูสงบนิ่งแต่มีเสน่ห์เหลือล้น",
    exampleSentences: ["มาดนิ่งๆ เท่คูลแบบนี้แหละสไตล์เขา"],
    examples: [{ a: "ชอบคนแบบไหน", b: "ชอบคนเท่คูล ไม่ขี้โม้" }],
    popularity: 86,
    category: "คน / ลักษณะนิสัย"
  },
  {
    id: "tae-008",
    word: "โครตเท่",
    pronunciation: "khôot-thêe",
    era: "90s",
    icon: "💥",
    formalMeaning: "อุทานชมความเท่ระดับสุดยอดอย่างจริงใจ",
    informalMeaning: "เท่มากๆ ถึงที่สุด ไม่รู้จะชมยังไงแล้ว",
    partOfSpeech: "คำอุทาน",
    languageLevel: "ภาษาพูด",
    context: "ใช้เมื่อรู้สึกทึ่งในความเท่อย่างรุนแรง",
    exampleSentences: ["ฉากแอ็กชันในหนังโครตเท่เลย"],
    examples: [{ a: "เห็นรถเขาหรือยัง", b: "โครตเท่ อยากได้บ้าง" }],
    popularity: 92,
    category: "คำอุทาน / คำเสริม"
  },
  {
    id: "tae-009",
    word: "เท่ระเบิด",
    pronunciation: "thêe-rá-bòoet",
    era: "90s",
    icon: "💣",
    formalMeaning: "เท่จนสะดุดตา โดดเด่นเกินใครในยุค 90s",
    informalMeaning: "เท่สุดลิ่มทิ่มประตู เท่ทะลุพิกัด",
    partOfSpeech: "คำอุทาน",
    languageLevel: "ภาษาพูด",
    context: "คำแสลงยุค 90s ชื่นชมความเท่แบบถึงพริกถึงขิง",
    exampleSentences: ["ทรงผมนี้ในยุค 90s คือเท่ระเบิดมาก"],
    examples: [{ a: "ใส่กางเกงยีนส์ขาดๆ มาเหรอ", b: "เท่ระเบิดไปเลยใช่มั้ยล่ะ" }],
    popularity: 84,
    category: "คำอุทาน / คำเสริม"
  },
  {
    id: "tae-010",
    word: "เท่บับว่า",
    pronunciation: "thêe-bàp-wâa",
    era: "2000s",
    icon: "✨",
    formalMeaning: "เท่จนพูดไม่ออก สไตล์ภาษายุค MSN/Hi5",
    informalMeaning: "เท่แบบว่า... อธิบายไม่ถูก คือดีมาก",
    partOfSpeech: "คำวิเศษณ์",
    languageLevel: "ภาษาพูด",
    context: "สำนวนพูดฮิตยุค Y2K ผสมผสานคำว่า บับว่า",
    exampleSentences: ["เพลงนี้มันเท่บับว่าฟังแล้วอินตามเลย"],
    examples: [{ a: "ชอบโปรไฟล์ Hi5 เขาไหม", b: "เท่บับว่าใส่โค้ดเพลงเพราะมาก" }],
    popularity: 80,
    category: "อื่น ๆ"
  },
  {
    id: "tae-011",
    word: "เท่กินคนเดียว",
    pronunciation: "thêe-gin-khon-diaw",
    era: "2020s",
    icon: "🌟",
    formalMeaning: "เท่เด่นอยู่คนเดียวในกลุ่ม คนอื่นรัศมีดับหมด",
    informalMeaning: "หล่อเท่กินรอบวง ไม่แบ่งใครเลย",
    partOfSpeech: "สำนวนแสลง",
    languageLevel: "ภาษาพูด",
    context: "แซวเพื่อนที่แต่งตัวหรือถ่ายรูปเด่นที่สุดในกลุ่ม",
    exampleSentences: ["รูปนี้แกยืนตรงกลาง เท่กินคนเดียวเลยนะ"],
    examples: [{ a: "รูปกลุ่มลงยัง", b: "ลงแล้ว แกเท่กินคนเดียวเลย!" }],
    popularity: 90,
    category: "คน / ลักษณะนิสัย"
  },
  {
    id: "tae-012",
    word: "เท่จึ้ง",
    pronunciation: "thêe-jêung",
    era: "2020s",
    icon: "💯",
    formalMeaning: "เท่จนอึ้ง ตะลึงในความงามและมีสไตล์",
    informalMeaning: "เท่จนจึ้งตาแตก ทำถึงมาก",
    partOfSpeech: "คำคุณศัพท์",
    languageLevel: "ภาษาพูด",
    context: "ใช้ชมคนหรือผลงานที่ทำออกมาได้เท่ระดับมืออาชีพ",
    exampleSentences: ["กราฟิกนี้ออกแบบได้เท่จึ้งมาก"],
    examples: [{ a: "งานประกวดเป็นไง", b: "ทีมเราทำคลิปเท่จึ้ง ชนะที่หนึ่งเลย" }],
    popularity: 93,
    category: "คน / ลักษณะนิสัย"
  },
  {
    id: "pop-002",
    word: "แซ่บ",
    pronunciation: "sâep",
    era: "2010s",
    icon: "🔥",
    formalMeaning: "อร่อย หรือ ดูสุดยอด เซ็กซี่ มีเสน่ห์",
    informalMeaning: "เด็ด เผ็ด ร้อนแรง หรือเซ็กซี่มีเสน่ห์ดึงดูดสายตา",
    origin: "เดิมเป็นภาษาอีสานแปลว่าอร่อย ต่อมากลายเป็นคำแสลงแทนความเซ็กซี่หรือเรื่องเด็ดๆ ในโซเชียล",
    examples: [
      { a: "ลุคนี้ของชีคือแซ่บเวอร์", b: "เผ็ดพริกสิบเม็ดเลยแม่!" }
    ],
    popularity: 98,
    category: "อาหาร / เครื่องดื่ม",
    languageLevel: "ไม่เป็นทางการ"
  },
  {
    id: "pop-003",
    word: "งง",
    pronunciation: "ngong",
    era: "2000s",
    icon: "😵",
    formalMeaning: "ไม่เข้าใจ สับสน มึนตึ้บกับสถานการณ์หรือคำพูด",
    informalMeaning: "สับสนตามไม่ทัน มึนไปหมดว่าเกิดอะไรขึ้น",
    origin: "คำพื้นฐานที่วัยรุ่นใช้เป็นแสลงบ่อยเวลาเจอเหตุการณ์หรือคำพูดแปลกๆ ในโลกออนไลน์",
    examples: [
      { a: "เกิดเรื่องอะไรขึ้น ทำไมเขาเทกัน", b: "ฉันก็งงเหมือนกัน ตามไม่ทันแล้ว" }
    ],
    popularity: 96,
    category: "ชีวิตประจำวัน",
    languageLevel: "ไม่เป็นทางการ"
  },
  {
    id: "pop-004",
    word: "ตึง",
    pronunciation: "dteung",
    era: "2020s",
    icon: "⚡",
    formalMeaning: "เข้มข้น เอาเรื่อง รับมือยาก เก่งกาจจัดจ้าน",
    informalMeaning: "โหดมาก เก่งจนตึงมือ เล่นยาก เอาเรื่องสุดๆ",
    origin: "มาจากวงการเกมออนไลน์และการสตรีมเกม หมายถึงคู่แข่งที่เล่นเก่งจนตึงมือ",
    examples: [
      { a: "คนนี้ฝีมือตึงมากเลยว่ะ", b: "ตัวตึงประจำทีมเลยคนนี้" }
    ],
    popularity: 95,
    category: "คน / ลักษณะนิสัย",
    languageLevel: "ไม่เป็นทางการ"
  },
  {
    id: "pop-005",
    word: "ปั่น",
    pronunciation: "bpàn",
    era: "2010s",
    icon: "💥",
    formalMeaning: "กวน แกล้ง พูดให้ไขว้เขว หรือหลอกให้เชื่อเล่นๆ",
    informalMeaning: "แกล้งพูดไม่จริงเพื่อให้คนอื่นปั่นป่วนหรือตกใจเล่น",
    origin: "มาจากคำว่า 'ปั่นหัว' หรือ 'ปั่นกระแส' นิยมใช้ในแชทกลุ่มและคอมมูนิตี้",
    examples: [
      { a: "แกพูดจริงหรือปั่นเนี่ย", b: "ฮ่าๆ ปั่นเล่นเฉยๆ อย่าคิดมาก" }
    ],
    popularity: 94,
    category: "คน / ลักษณะนิสัย",
    languageLevel: "ไม่เป็นทางการ"
  },
  {
    id: "pop-006",
    word: "คุ้ม",
    pronunciation: "khúm",
    era: "2000s",
    icon: "💸",
    formalMeaning: "เหมาะสมกับราคา ได้ประโยชน์สูงสุด ดีเกินคาด",
    informalMeaning: "จ่ายแล้วคุ้มค่า ไม่เสียดายเงินเลย ได้ของดี",
    origin: "ใช้ทั้งในชีวิตประจำวันและโปรโมชั่นอินเทอร์เน็ตเพื่อสื่อถึงความคุ้มค่า",
    examples: [
      { a: "บุฟเฟต์ร้านนี้เป็นไงบ้าง", b: "ของสดมาก โคตรคุ้ม!" }
    ],
    popularity: 93,
    category: "ชีวิตประจำวัน",
    languageLevel: "ไม่เป็นทางการ"
  },
  {
    id: "pop-007",
    word: "งานเข้า",
    pronunciation: "ngaan-khâo",
    era: "2000s",
    icon: "🚨",
    formalMeaning: "มีเรื่องเดือดร้อน ปัญหาเข้ามา เกิดภาระกะทันหัน",
    informalMeaning: "ซวยแล้ว มีงานด่วนหรือเรื่องยุ่งยากวิ่งเข้ามาหา",
    origin: "ฮิตมาจากรายการสาระแนและสื่อวัยรุ่นยุค 2000s ใช้เมื่อเกิดปัญหาไม่คาดฝัน",
    examples: [
      { a: "หัวหน้าเรียกเข้าพบด่วนเลย", b: "งานเข้าแล้วแก เตรียมตัวให้ดี" }
    ],
    popularity: 92,
    category: "การเรียน / การทำงาน",
    languageLevel: "ไม่เป็นทางการ"
  },
  // ─── ยุค 90s (เว็บบอร์ด Pantip / ICQ / IRC) ───
  {
    id: "90s-001",
    word: "จ๊าบ",
    pronunciation: "jâap",
    era: "90s",
    formalMeaning: "ดีมาก เจ๋ง น่าประทับใจ",
    informalMeaning: "เจ๋งสุดๆ ดีมากๆ น่าทึ่ง",
    origin: "คำนี้แพร่หลายในยุค 90s ใช้กันในหมู่วัยรุ่น เป็นคำแสดงการชื่นชมความเท่หรือความดีเลิศของสิ่งใดสิ่งหนึ่ง",
    examples: [
      { a: "แฟนใหม่แกจ๊าบมากเลย", b: "ใช่มั้ย รถมันก็จ๊าบด้วย" }
    ],
    popularity: 75,
    category: "คำชม",
    languageLevel: "ไม่เป็นทางการ"
  },
  {
    id: "90s-002",
    word: "ปิ๊ง",
    pronunciation: "bpîng",
    era: "90s",
    formalMeaning: "รู้สึกชอบหรือหลงรักในทันที",
    informalMeaning: "รักหรือชอบใครบางคนทันทีแวบแรก",
    origin: "ใช้กันทั่วไปในยุค 90s เมื่อพูดถึงการตกหลุมรัก มาจากเสียง 'ปิ๊ง' ที่สื่อถึงความรู้สึกสว่างขึ้นทันที",
    examples: [
      { a: "เห็นครั้งแรกก็ปิ๊งเลย", b: "ปิ๊งรึเปล่า อิอิ" }
    ],
    popularity: 72,
    category: "ความรู้สึก",
    languageLevel: "ไม่เป็นทางการ"
  },
  {
    id: "90s-003",
    word: "นอยด์",
    pronunciation: "nɔ̂yt",
    era: "90s",
    formalMeaning: "รู้สึกหวาดระแวงหรืออ่อนไหวมากเกินไป",
    informalMeaning: "ระแวงมาก กลัวโดยไม่มีเหตุผล เปราะบาง",
    origin: "ย่อมาจากคำอังกฤษ 'paranoid' แพร่หลายในยุค 90s ใช้แทนคำว่าระแวง กลัว หรืออ่อนไหว",
    examples: [
      { a: "แกส่งข้อความไม่ตอบเลย", b: "อย่านอยด์สิ บางทีก็ยุ่งบ้าง" }
    ],
    popularity: 88,
    category: "ความรู้สึก",
    languageLevel: "ไม่เป็นทางการ"
  },
  {
    id: "90s-004",
    word: "เซ็งเป็ด",
    pronunciation: "seng bpèt",
    era: "90s",
    formalMeaning: "รู้สึกเบื่อหรือหงุดหงิดมาก",
    informalMeaning: "เบื่อสุดขีด หงุดหงิดมากจนทนไม่ไหว",
    origin: "คำประสมระหว่าง 'เซ็ง' (เบื่อ) กับ 'เป็ด' ที่เป็นสัตว์สื่อถึงความน่าหงุดหงิด ใช้กันในยุค 90s",
    examples: [
      { a: "วันนี้เซ็งเป็ดเลย ทำรายงานไม่เสร็จ", b: "ฉันก็เซ็งเป็ดเหมือนกัน" }
    ],
    popularity: 65,
    category: "ความรู้สึก",
    languageLevel: "ไม่เป็นทางการ"
  },
  {
    id: "90s-005",
    word: "กิ๊ก",
    pronunciation: "gík",
    era: "90s",
    formalMeaning: "แฟนลับหรือคนที่คบแบบไม่เป็นทางการ",
    informalMeaning: "คนที่คบหาในแบบกึ่งแฟนกึ่งเพื่อน ไม่ได้ declare ความสัมพันธ์ชัดเจน",
    origin: "คำนี้แพร่หลายในยุค 90s ใช้เรียกความสัมพันธ์ที่ไม่ชัดเจนหรือเป็นความลับ",
    examples: [
      { a: "แกกับคนนั้นเป็นยังไงกัน", b: "แค่กิ๊กกัน ยังไม่แฟนหรอก" }
    ],
    popularity: 90,
    category: "ความสัมพันธ์",
    languageLevel: "ไม่เป็นทางการ"
  },
  {
    id: "90s-006",
    word: "ป้าดโธ่",
    pronunciation: "bpâat-thôo",
    era: "90s",
    formalMeaning: "คำอุทานแสดงความประหลาดใจหรืองงงวย",
    informalMeaning: "โอ้โห น่าประหลาดใจมาก คาดไม่ถึงเลย",
    origin: "คำอุทานพื้นบ้านไทยที่ใช้กันมาตั้งแต่ยุค 90s เพื่อแสดงความตกใจหรือแปลกใจอย่างตลกขบขัน",
    examples: [
      { a: "แกได้เกรด 4.00 ป้าดโธ่!", b: "ฮ่าๆ ขยันเป็นพิเศษ" }
    ],
    popularity: 60,
    category: "คำอุทาน",
    languageLevel: "ไม่เป็นทางการ"
  },
  {
    id: "90s-007",
    word: "ดักแก่",
    pronunciation: "dàk-gàe",
    era: "90s",
    formalMeaning: "แต่งตัวหรือพฤติกรรมที่เกินวัยหรือเก่าคร่ำครึ",
    informalMeaning: "ทำตัวหรือแต่งกายเหมือนคนแก่ทั้งที่ยังอายุน้อย",
    origin: "คำดูถูกในยุค 90s ใช้กับคนที่ดูเก่าหรือล้าสมัยกว่าวัย",
    examples: [
      { a: "แกใส่เสื้อดอกไม้ใหญ่ดักแก่มาก", b: "ก็ชอบสไตล์นี้นะ" }
    ],
    popularity: 55,
    category: "รูปลักษณ์",
    languageLevel: "ไม่เป็นทางการ"
  },
  {
    id: "90s-008",
    word: "กินเด็ก",
    pronunciation: "gin-dèk",
    era: "90s",
    formalMeaning: "มีรูปลักษณ์ที่ดูอ่อนเยาว์กว่าอายุจริง",
    informalMeaning: "หน้าเด็กมาก ดูอ่อนเยาว์กว่าวัย",
    origin: "ใช้ในยุค 90s เพื่อบอกว่าบางคนมีหน้าตาที่ดูอายุน้อยกว่าความเป็นจริง",
    examples: [
      { a: "แกอายุ 30 แล้วเหรอ หน้ากินเด็กมาก", b: "ขอบคุณนะ ฮ่าๆ" }
    ],
    popularity: 70,
    category: "รูปลักษณ์",
    languageLevel: "ไม่เป็นทางการ"
  },
  {
    id: "90s-009",
    word: "ปลื้มปริ่ม",
    pronunciation: "bpleum-bprîm",
    era: "90s",
    formalMeaning: "รู้สึกดีใจและพึงพอใจอย่างมาก",
    informalMeaning: "ดีใจล้นหลาม ภูมิใจและพอใจอย่างสุดๆ",
    origin: "คำผสมระหว่างปลื้ม (ภูมิใจ/พอใจ) กับปริ่ม (เต็มล้น) ใช้ทั่วไปในยุค 90s",
    examples: [
      { a: "ลูกสอบได้ที่หนึ่งปลื้มปริ่มเลย", b: "ขอแสดงความยินดีด้วย" }
    ],
    popularity: 68,
    category: "ความรู้สึก",
    languageLevel: "ไม่เป็นทางการ"
  },
  {
    id: "90s-010",
    word: "อะฮ้า",
    pronunciation: "a-hâa",
    era: "90s",
    formalMeaning: "คำอุทานแสดงการค้นพบหรือเข้าใจอะไรบางอย่าง",
    informalMeaning: "โอ้ เข้าใจแล้ว! เอาเถอะ ได้เลย",
    origin: "คำอุทานที่ใช้กันในยุค 90s ในยุคเว็บบอร์ดและแชทออนไลน์ยุคบุกเบิก",
    examples: [
      { a: "ต้องทำแบบนี้นะถึงจะได้ผล", b: "อะฮ้า เข้าใจแล้ว" }
    ],
    popularity: 55,
    category: "คำอุทาน",
    languageLevel: "ไม่เป็นทางการ"
  },

  // ─── ยุค 2000s (MSN / Hi5 / Y2K) ───
  {
    id: "2000s-001",
    word: "แอ๊บแบ๊ว",
    pronunciation: "âep-bâew",
    era: "2000s",
    formalMeaning: "แกล้งทำเป็นน่ารักหรืออ่อนหวานเกินจริง",
    informalMeaning: "ทำเป็นน่ารัก แกล้งทำตัวน่าเอ็นดู สร้างภาพเกินจริง",
    origin: "คำยอดฮิตยุค Hi5 / MSN ใช้ดูถูกคนที่ทำตัว cute เกินจริงหรือแกล้งทำน่ารัก",
    examples: [
      { a: "แกชอบแอ๊บแบ๊วให้ผู้ชายมาก", b: "ก็น่ารักดีนะ อย่าเที่ยวตัดสินคนอื่น" }
    ],
    popularity: 92,
    category: "พฤติกรรม",
    languageLevel: "ไม่เป็นทางการ"
  },
  {
    id: "2000s-002",
    word: "เด็กแนว",
    pronunciation: "dèk-naew",
    era: "2000s",
    formalMeaning: "วัยรุ่นที่นิยมสไตล์อินดี้ ฮิปสเตอร์ หรือศิลปะใต้ดิน",
    informalMeaning: "เด็กที่ชอบฟังเพลงอินดี้ ใส่เสื้อวงดนตรี ไม่เข้ากระแสหลัก",
    origin: "คำที่แพร่หลายในยุค 2000s ในหมู่วัยรุ่นที่ชอบสไตล์อินดี้ฮิปสเตอร์",
    examples: [
      { a: "แกกับพวกเด็กแนวก็เที่ยว RCA ทุกวันสิ", b: "ก็ชอบดนตรีสดนะ เรียกว่าเด็กแนวได้เลย" }
    ],
    popularity: 80,
    category: "กลุ่มสังคม",
    languageLevel: "ไม่เป็นทางการ"
  },
  {
    id: "2000s-003",
    word: "เกรียน",
    pronunciation: "grian",
    era: "2000s",
    formalMeaning: "คนที่ชอบยั่วยุหรือก่อความรำคาญในโลกออนไลน์",
    informalMeaning: "คนที่ชอบล้อเลียน แกล้ง หรือสร้างความวุ่นวายในอินเทอร์เน็ต",
    origin: "คำยอดนิยมในยุคเว็บบอร์ดและ Pantip ราว 2005-2010 ที่ใช้เรียกคนที่ชอบสร้างความวุ่นวายออนไลน์",
    examples: [
      { a: "มีเกรียนมาโพสต์ขยะในกระทู้อีกแล้ว", b: "อย่า feed มัน ไม่สนก็หาย" }
    ],
    popularity: 95,
    category: "พฤติกรรม",
    languageLevel: "ไม่เป็นทางการ"
  },
  {
    id: "2000s-004",
    word: "ขำกลิ้ง",
    pronunciation: "khǎm-glîng",
    era: "2000s",
    formalMeaning: "ตลกมากจนหยุดหัวเราะไม่ได้",
    informalMeaning: "ฮาสุดๆ ตลกจนกลิ้งไปกลิ้งมา",
    origin: "คำแสดงอารมณ์ขันในยุค MSN/Hi5 ใช้เมื่อบางสิ่งตลกมากจนยิ้มหรือหัวเราะออกมาไม่ได้",
    examples: [
      { a: "ดูคลิปนี้สิ ขำกลิ้งมาก 55555", b: "โห จริงๆ ด้วย ฮ่าๆๆ" }
    ],
    popularity: 85,
    category: "ความรู้สึก",
    languageLevel: "ไม่เป็นทางการ"
  },
  {
    id: "2000s-005",
    word: "ตัวแม่",
    pronunciation: "dtua-mâe",
    era: "2000s",
    formalMeaning: "บุคคลที่มีความสามารถโดดเด่นและเป็นที่ยอมรับในด้านใดด้านหนึ่ง",
    informalMeaning: "เก่งที่สุด เป็นแม่แบบ เป็นต้นแบบในสายนั้น",
    origin: "เริ่มใช้ตั้งแต่ยุค 2000s เพื่อแสดงการยกย่องคนที่เก่งในสิ่งนั้นๆ ยังใช้มาถึงปัจจุบัน",
    examples: [
      { a: "แกร้องเพลงเป็นตัวแม่เลยนะ", b: "ขอบคุณจ้า ฝึกมานานมาก" }
    ],
    popularity: 97,
    category: "คำชม",
    languageLevel: "ไม่เป็นทางการ"
  },
  {
    id: "2000s-006",
    word: "ชิเมโจได๋",
    pronunciation: "chi-meh-joh-dài",
    era: "2000s",
    formalMeaning: "คำอุทานแสดงความตื่นเต้นหรือประหลาดใจในแบบสนุกสนาน",
    informalMeaning: "โอ้โห เยี่ยม ว้าว",
    origin: "มาจากคำญี่ปุ่น 'sugoi' ที่แปลว่าเยี่ยมมาก แพร่หลายในหมู่วัยรุ่นยุค 2000s ผู้นิยมวัฒนธรรมญี่ปุ่น",
    examples: [
      { a: "ชิเมโจได๋! แกผ่านสอบได้เหรอ", b: "ใช่ๆ ดีใจมาก 55" }
    ],
    popularity: 60,
    category: "คำอุทาน",
    languageLevel: "ไม่เป็นทางการ"
  },
  {
    id: "2000s-007",
    word: "ปลวก",
    pronunciation: "bplùak",
    era: "2000s",
    formalMeaning: "คนที่ชอบกิน ชอบอาศัยประโยชน์จากคนอื่นโดยไม่ตอบแทน",
    informalMeaning: "คนแบกรับไม่เป็น ชอบกินฟรีหรือพึ่งคนอื่นตลอด",
    origin: "เปรียบกับปลวกที่ทำลายและกัดกิน ใช้ดูถูกคนที่กินแรงผู้อื่นโดยไม่ตอบแทน แพร่หลายยุค Hi5",
    examples: [
      { a: "แกเพื่อนปลวกเลยนะ กินข้าวฟรีทุกครั้ง", b: "ก็ไม่มีตังค์จริงๆ นะ" }
    ],
    popularity: 65,
    category: "พฤติกรรม",
    languageLevel: "ไม่เป็นทางการ"
  },
  {
    id: "2000s-008",
    word: "ตะเอง",
    pronunciation: "dtà-eeng",
    era: "2000s",
    formalMeaning: "คำแทนตัวเองอย่างน่ารักน่าเอ็นดู",
    informalMeaning: "เรียกตัวเองว่าตะเองแทนฉัน/หนู/กระผม ในแบบน่ารัก",
    origin: "มาจากภาษาเด็กที่พูดว่า 'ตัวเอง' กลายเป็น 'ตะเอง' แพร่หลายในยุค 2000s ในการแชทออนไลน์",
    examples: [
      { a: "ตะเองชอบกินช็อกโกแลตมากเลย", b: "น่ารักอ่ะ ตะเองเหมือนกัน" }
    ],
    popularity: 70,
    category: "คำสรรพนาม",
    languageLevel: "ไม่เป็นทางการ"
  },
  {
    id: "2000s-009",
    word: "บับว่า",
    pronunciation: "bàp-wâa",
    era: "2000s",
    formalMeaning: "คำนำหน้าแสดงการบอกหรืออธิบาย",
    informalMeaning: "อ่ะ... ก็คือ... นั่นคือ...",
    origin: "คำที่วัยรุ่นยุค 2000s ชอบใช้นำหน้าประโยค ราวกับจะบอกข้อมูลสำคัญ",
    examples: [
      { a: "บับว่าฉันไม่ได้ตั้งใจนะ", b: "โอเคๆ เข้าใจแล้ว" }
    ],
    popularity: 55,
    category: "คำนำหน้า",
    languageLevel: "ไม่เป็นทางการ"
  },
  {
    id: "2000s-010",
    word: "รูปร่างดี",
    pronunciation: "rûup-râang-dii",
    era: "2000s",
    formalMeaning: "ใช้แบบประชดว่าสวย/หล่อน้อยหรือไม่น่าดู",
    informalMeaning: "คำประชดหมายถึงไม่ได้หน้าตาดีอะไร (ใช้ในทางตรงกันข้าม)",
    origin: "ยุค 2000s ใช้คำว่า 'รูปร่างดี' แบบประชดเสียดสีเพื่อหมายถึงตรงกันข้าม",
    examples: [
      { a: "เขารูปร่างดีมากเลยนะ 555", b: "อย่าประชดสิ น่ารักตามสไตล์เขาดีนา" }
    ],
    popularity: 62,
    category: "คำประชด",
    languageLevel: "ไม่เป็นทางการ"
  },

  // ─── ยุค 2010s (Facebook / BB PIN / Twitter ยุคแรก) ───
  {
    id: "2010s-001",
    word: "จุงเบย",
    pronunciation: "jung-boie",
    era: "2010s",
    formalMeaning: "คำแสดงความเห็นด้วยหรือยืนยันอย่างตลกขบขัน",
    informalMeaning: "จริงมากเลย เห็นด้วยอย่างสุดๆ",
    origin: "คำที่เกิดขึ้นในยุค Facebook ยุคแรก เป็นการเปลี่ยนเสียงจาก 'จริงเลย' ให้ดูตลกและเป็นกันเอง",
    examples: [
      { a: "ข้าวร้านนี้อร่อยจุงเบยนะ", b: "จุงเบย! มาอีกทีแน่ๆ" }
    ],
    popularity: 93,
    category: "คำยืนยัน",
    languageLevel: "ไม่เป็นทางการ"
  },
  {
    id: "2010s-002",
    word: "บ่องตง",
    pronunciation: "bɔ̀ng-dtong",
    era: "2010s",
    formalMeaning: "ถูกต้องอย่างสมบูรณ์ ไม่ผิดเลย",
    informalMeaning: "ใช่เลย ถูกต้อง 100% ตรงเป๊ะ",
    origin: "มาจากภาษาจีนกวางตุ้ง 'bong tong' แพร่หลายในยุค 2010s ในไทย ใช้แทน 'ถูกต้อง'",
    examples: [
      { a: "นัดตี 3 ใช่มั้ย", b: "บ่องตง! ไม่คลาดเลย" }
    ],
    popularity: 88,
    category: "คำยืนยัน",
    languageLevel: "ไม่เป็นทางการ"
  },
  {
    id: "2010s-003",
    word: "ฝุดๆ",
    pronunciation: "fùt fùt",
    era: "2010s",
    formalMeaning: "สูงสุด ดีที่สุด เกินระดับปกติมาก",
    informalMeaning: "ดีสุดๆ เก่งสุดๆ สวยสุดๆ",
    origin: "คำแสดงความยอดเยี่ยมที่แพร่หลายในยุค Facebook / BB PIN ประมาณ 2012-2015",
    examples: [
      { a: "แกทำอาหารฝุดๆ เลยนะ", b: "ขอบคุณ! ซ้อมมาหลายรอบ" }
    ],
    popularity: 82,
    category: "คำชม",
    languageLevel: "ไม่เป็นทางการ"
  },
  {
    id: "2010s-004",
    word: "มโน",
    pronunciation: "ma-noh",
    era: "2010s",
    formalMeaning: "คิดเรื่องไม่มีมูลความจริงหรือจินตนาการมากเกินไป",
    informalMeaning: "คิดเองเออเอง ฝันกลางวัน ตีความเกินความจริง",
    origin: "ย่อมาจาก 'มโนภาพ' แพร่หลายในยุค Facebook 2012+ เมื่อคนชอบโพสต์เรื่องที่คิดเอาเอง",
    examples: [
      { a: "แกมโนไปเองแล้ว เขาแค่ยิ้มให้มาก", b: "โอ้... แต่ดูท่าทางเขาเหมือนชอบเราอะ" }
    ],
    popularity: 96,
    category: "พฤติกรรม",
    languageLevel: "ไม่เป็นทางการ"
  },
  {
    id: "2010s-005",
    word: "ติ่ง",
    pronunciation: "dting",
    era: "2010s",
    formalMeaning: "แฟนคลับที่คลั่งไคล้ศิลปินหรือสิ่งใดสิ่งหนึ่งอย่างเหนียวแน่น",
    informalMeaning: "แฟนพันธุ์แท้ คนที่คลั่งในสิ่งใดสิ่งหนึ่งมากๆ",
    origin: "แพร่หลายในยุค 2010s พร้อมกับกระแสวัฒนธรรมเกาหลีและ K-pop ในไทย",
    examples: [
      { a: "แกติ่ง BTS ขนาดไหน", b: "ฟัง playlist เขาทั้งวันเลย ติ่งมากๆ" }
    ],
    popularity: 98,
    category: "กลุ่มสังคม",
    languageLevel: "ไม่เป็นทางการ"
  },
  {
    id: "2010s-006",
    word: "เผือก",
    pronunciation: "phùeak",
    era: "2010s",
    formalMeaning: "ชอบสอดรู้สอดเห็นเรื่องของผู้อื่น",
    informalMeaning: "ขี้สงสัยเรื่องคนอื่น ชอบมุงดูเรื่องของผู้อื่น",
    origin: "คำที่แพร่หลายใน Twitter / Facebook ยุค 2013+ เมื่อคนชอบแทรกตัวหรืออยากรู้เรื่องคนอื่น",
    examples: [
      { a: "ขอเผือกหน่อย เกิดอะไรขึ้นกับแฟนเก่าแก", b: "อย่าเผือก! เรื่องส่วนตัวอ่ะ" }
    ],
    popularity: 95,
    category: "พฤติกรรม",
    languageLevel: "ไม่เป็นทางการ"
  },
  {
    id: "2010s-007",
    word: "มองบน",
    pronunciation: "mong-bon",
    era: "2010s",
    formalMeaning: "แสดงความดูถูกหรือผิดหวังอย่างเงียบๆ โดยไม่พูดโดยตรง",
    informalMeaning: "เบือนสายตาขึ้นบนเพื่อแสดงความไม่เห็นด้วยหรือดูถูก",
    origin: "มาจากท่าทางจริงของการกลอกตาขึ้นด้านบน แพร่หลายใน Twitter / Facebook ราว 2014",
    examples: [
      { a: "มองบนใส่แกเลย ทำไมมาสาย 2 ชั่วโมง", b: "ขอโทษๆ รถติดจริงๆ นะ" }
    ],
    popularity: 90,
    category: "พฤติกรรม",
    languageLevel: "ไม่เป็นทางการ"
  },
  {
    id: "2010s-008",
    word: "ตะมุตะมิ",
    pronunciation: "dtà-mu-dtà-mi",
    era: "2010s",
    formalMeaning: "น่ารักน่าเอ็นดูอย่างยิ่ง",
    informalMeaning: "น่ารักจนอยากกอดหรือบีบแก้ม",
    origin: "คำที่แพร่หลายในยุค 2010s ใช้เรียกสิ่งที่น่ารักจนอยากหยิกหรือกอด",
    examples: [
      { a: "หมาแกตะมุตะมิมาก!", b: "ขอบคุณ เพิ่งอาบน้ำให้มาด้วย" }
    ],
    popularity: 78,
    category: "รูปลักษณ์",
    languageLevel: "ไม่เป็นทางการ"
  },
  {
    id: "2010s-009",
    word: "นก",
    pronunciation: "nók",
    era: "2010s",
    formalMeaning: "ถูกยกเลิกนัดหรือถูกทิ้งให้รอโดยไม่มีการแจ้งล่วงหน้า",
    informalMeaning: "โดนปล่อยเดี่ยว ถูกทิ้งไว้คนเดียว โดนงัดนัด",
    origin: "มาจากภาษาอังกฤษ 'stood up' แพร่หลายในยุค BB PIN 2012-2015",
    examples: [
      { a: "แกนกฉันอีกแล้ว รอสองชั่วโมงเลย", b: "ขอโทษมากๆ มีธุระด่วนจริงๆ" }
    ],
    popularity: 86,
    category: "ความสัมพันธ์",
    languageLevel: "ไม่เป็นทางการ"
  },
  {
    id: "2010s-010",
    word: "อัลไล",
    pronunciation: "an-lai",
    era: "2010s",
    formalMeaning: "คำอุทานแสดงความไม่เชื่อหรือประหลาดใจ",
    informalMeaning: "ไม่เชื่อ! จริงเหรอ? ไม่น่าเป็นไปได้",
    origin: "คำที่วัยรุ่นยุค 2010s ใช้แสดงความประหลาดใจหรือสงสัยในสิ่งที่ได้ยิน",
    examples: [
      { a: "เขาประกาศเลิกกับแฟนแล้วนะ", b: "อัลไล! เมื่อกี้ยังเห็นออกไปด้วยกัน" }
    ],
    popularity: 72,
    category: "คำอุทาน",
    languageLevel: "ไม่เป็นทางการ"
  },

  // ─── ยุค 2020s (TikTok / Gen Z / Dark Cyber Neon) ───
  {
    id: "2020s-001",
    word: "ช็อตฟีล",
    pronunciation: "chôt-fiin",
    era: "2020s",
    formalMeaning: "รู้สึกเจ็บปวดหรือสะเทือนใจอย่างกะทันหัน",
    informalMeaning: "โดนทิ่มใจ รู้สึกแบบ ouch ทางอารมณ์",
    origin: "มาจาก 'shot feel' ในวัฒนธรรม TikTok/Twitter ไทย ยุค 2020+ ใช้เมื่อบางสิ่งแทงใจหรือทำให้รู้สึกหวั่นไหว",
    examples: [
      { a: "เพลงนี้ช็อตฟีลมากเลย", b: "ใช่! เนื้อเพลงมันโดนใจมาก" }
    ],
    popularity: 90,
    category: "ความรู้สึก",
    languageLevel: "ไม่เป็นทางการ"
  },
  {
    id: "2020s-002",
    word: "ดึงดาว",
    pronunciation: "deung-daaw",
    era: "2020s",
    formalMeaning: "พยายามดึงความสนใจหรือทำให้ตัวเองเด่น",
    informalMeaning: "พยายามเรียกร้องความสนใจ โชว์ออฟ",
    origin: "คำใหม่ในยุค TikTok 2021+ ใช้เมื่อคนพยายามทำให้ตัวเองโดดเด่นหรือดึงความสนใจ",
    examples: [
      { a: "แกดึงดาวมากเลยในไลฟ์", b: "ก็ต้องให้คนมาดูนะ อิอิ" }
    ],
    popularity: 80,
    category: "พฤติกรรม",
    languageLevel: "ไม่เป็นทางการ"
  },
  {
    id: "2020s-003",
    word: "ฉ่ำ",
    pronunciation: "chàm",
    era: "2020s",
    formalMeaning: "รู้สึกพึงพอใจอย่างสุดๆ หรือดีอย่างสมบูรณ์แบบ",
    informalMeaning: "ดีมาก โอเคมาก ถูกใจสุดๆ",
    origin: "คำแสดงความพึงพอใจสูงสุดในยุค Gen Z ไทย ราว 2020-2023",
    examples: [
      { a: "ข้าวร้านนี้ฉ่ำมาก ราคาก็โอเค", b: "ต้องมาอีกแน่ๆ!" }
    ],
    popularity: 91,
    category: "คำชม",
    languageLevel: "ไม่เป็นทางการ"
  },
  {
    id: "2020s-004",
    word: "จึ้ง",
    pronunciation: "jêung",
    era: "2020s",
    formalMeaning: "ดีมาก น่าตื่นเต้น น่าประทับใจอย่างสุดๆ",
    informalMeaning: "ว้าว เจ๋งมาก สุดยอดเลย",
    origin: "คำยอดนิยมในยุค TikTok/YouTube ไทย ราว 2021+ ใช้แสดงความตื่นตาตื่นใจ",
    examples: [
      { a: "ดูแล้วจึ้งมากเลย ทำยังไงได้อย่างนี้", b: "ฝึกมาเยอะมาก ขอบคุณนะ" }
    ],
    popularity: 88,
    category: "คำชม",
    languageLevel: "ไม่เป็นทางการ"
  },
  {
    id: "2020s-005",
    word: "สภาพ",
    pronunciation: "sà-pâap",
    era: "2020s",
    formalMeaning: "ใช้แบบประชดเพื่อแสดงว่าสิ่งนั้นแย่หรือดูไม่ดีเลย",
    informalMeaning: "ดูแย่จัง น่าเสียใจจริงๆ ใช้แบบประชด",
    origin: "คำประชดเสียดสีในยุค Gen Z ไทย ราว 2022 ใช้เมื่อบางสิ่งดูน่าสมเพชหรือน่าสงสาร",
    examples: [
      { a: "นอนดึกทุกคืนตื่นแล้วตาบวม", b: "สภาพ 555 นอนเร็วๆ สิ" }
    ],
    popularity: 89,
    category: "คำประชด",
    languageLevel: "ไม่เป็นทางการ"
  },
  {
    id: "2020s-006",
    word: "ตัวตึง",
    pronunciation: "dtua-dteung",
    era: "2020s",
    formalMeaning: "บุคคลที่มีบุคลิกภาพแข็งแกร่งหรือโดดเด่นและไม่กลัวใคร",
    informalMeaning: "คนเก่ง แน่จริง ไม่กลัวใคร เป็นกำลังหลัก",
    origin: "คำที่แพร่หลายในวัฒนธรรม TikTok ไทย ราว 2022 ใช้ชมคนที่เก่งหรือแข็งแกร่ง",
    examples: [
      { a: "แกตัวตึงมากเลย ชนะทุกเกม", b: "ฝึกมาเยอะ 555 ขอบคุณนะ" }
    ],
    popularity: 94,
    category: "คำชม",
    languageLevel: "ไม่เป็นทางการ"
  },
  {
    id: "2020s-007",
    word: "ชีทำถึง",
    pronunciation: "chii-tham-thêung",
    era: "2020s",
    formalMeaning: "บุคคลที่กล้าทำในสิ่งที่คนอื่นไม่กล้า",
    informalMeaning: "กล้าทำสิ่งที่ยากหรือที่คนอื่นไม่กล้า เก่งมากๆ",
    origin: "คำที่เกิดขึ้นในวัฒนธรรม TikTok ไทย ราว 2022-2023 ใช้ยกย่องคนที่ทำสำเร็จในสิ่งยาก",
    examples: [
      { a: "แกสมัครทำงานในบริษัทใหญ่เลยเหรอ ชีทำถึง!", b: "ก็ลองดูก่อน จะได้ไม่เสียใจ" }
    ],
    popularity: 87,
    category: "คำชม",
    languageLevel: "ไม่เป็นทางการ"
  },
  {
    id: "2020s-008",
    word: "เต็มคาราเบล",
    pronunciation: "dtem-kaa-raa-ben",
    era: "2020s",
    formalMeaning: "เต็มที่สุดๆ จนล้นออกมา",
    informalMeaning: "เต็มมาก ล้นๆ ไม่มีอีกแล้ว",
    origin: "คำที่เกิดจากการเล่นคำกับ 'คาราเบล' (ชนิดหนึ่งของไวน์เต็มแก้ว) ในยุค 2022-2023",
    examples: [
      { a: "วันนี้กินข้าวเยอะมาก อิ่มเต็มคาราเบลเลย", b: "5555 กินได้ยังไงขนาดนั้น" }
    ],
    popularity: 75,
    category: "ความรู้สึก",
    languageLevel: "ไม่เป็นทางการ"
  },
  {
    id: "2020s-009",
    word: "วาสนาผู้ใด",
    pronunciation: "waa-sà-naa phûu dai",
    era: "2020s",
    formalMeaning: "คำถามเชิงประชดว่าใครจะโชคดีได้รับสิ่งนั้น",
    informalMeaning: "ใครจะโชคดีได้เรื่องนี้ (มักใช้ประชด)",
    origin: "มาจากประโยคในละครหรือวรรณคดีไทย แพร่หลายใน Twitter ไทย 2022-2023 ในแบบตลก",
    examples: [
      { a: "โปรโมชั่นดีมากๆ วาสนาผู้ใดจะได้ไป", b: "55555 วาสนาของฉันนั่นแหละ" }
    ],
    popularity: 76,
    category: "คำประชด",
    languageLevel: "ไม่เป็นทางการ"
  },
  {
    id: "2020s-010",
    word: "สกิบิดี้",
    pronunciation: "sa-gì-bì-dii",
    era: "2020s",
    formalMeaning: "ใช้แสดงความสับสนหรือบ้าบิ่นอย่างตลกขบขัน",
    informalMeaning: "บ้าสิ้นดี มั่วไปหมดเลย โกลาหล",
    origin: "มาจากซีรีส์ 'Skibidi Toilet' ที่ไวรัลใน YouTube/TikTok 2023 ใช้เรียกสิ่งแปลกประหลาด",
    examples: [
      { a: "แผนนี้มันสกิบิดี้มาก ไม่เวิร์คหรอก", b: "55555 แต่ลองดูก็ได้" }
    ],
    popularity: 83,
    category: "คำอุทาน",
    languageLevel: "ไม่เป็นทางการ"
  },
  {
    id: "2020s-011",
    word: "นอยด์อะแก",
    pronunciation: "nɔ̂yt à gae",
    era: "2020s",
    formalMeaning: "หยุดระแวงได้แล้ว ไม่ต้องวิตกกังวลมากขนาดนั้น",
    informalMeaning: "อย่าระแวงมาก ผ่อนคลายหน่อย ไม่มีอะไรหรอก",
    origin: "วลีที่นำ 'นอยด์' จากยุค 90s มาใช้ใหม่ผสมกับภาษาพูดยุค Gen Z 2021+",
    examples: [
      { a: "แกเขียน line ไปแล้วยังไม่ตอบเลย ตายแน่เลย", b: "นอยด์อะแก แค่ยุ่งหน่อย" }
    ],
    popularity: 85,
    category: "ความรู้สึก",
    languageLevel: "ไม่เป็นทางการ"
  },
  {
    id: "2020s-012",
    word: "ตัวบุตร",
    pronunciation: "dtua-bùt",
    era: "2020s",
    formalMeaning: "คนที่เก่งหรือดีเลิศจนน่าประหลาดใจ",
    informalMeaning: "คนที่เก่งสุดๆ โดดเด่นสุดๆ ไม่มีใครสู้ได้",
    origin: "มาจากคำว่า 'บุตร' (ลูก) ใช้แสดงความชื่นชมอย่างสูงสุด แพร่หลายใน TikTok ไทย 2023",
    examples: [
      { a: "แกเล่นกีตาร์ตัวบุตรมาก", b: "โอ้ขอบคุณ ซ้อมทุกวันเลย" }
    ],
    popularity: 82,
    category: "คำชม",
    languageLevel: "ไม่เป็นทางการ"
  }
];

// ─── Helper Functions ───────────────────────────────────────

/**
 * ค้นหาคำแสลงจาก query string
 * ค้นได้ทั้ง word, formalMeaning, informalMeaning
 */
function searchSlang(query) {
  if (!query || query.trim() === "") return [...SLANG_DATABASE];
  const q = query.trim().toLowerCase();
  return SLANG_DATABASE.filter(item =>
    item.word.toLowerCase().includes(q) ||
    item.formalMeaning.toLowerCase().includes(q) ||
    item.informalMeaning.toLowerCase().includes(q) ||
    item.pronunciation.toLowerCase().includes(q) ||
    item.origin.toLowerCase().includes(q)
  );
}

/**
 * กรองคำแสลงตามยุค
 */
function filterByEra(era) {
  if (!era || era === "all") return [...SLANG_DATABASE];
  return SLANG_DATABASE.filter(item => item.era === era);
}

/**
 * กรองคำแสลงตามหมวดหมู่
 */
function filterByCategory(category) {
  if (!category || category === "all") return [...SLANG_DATABASE];
  return SLANG_DATABASE.filter(item => item.category === category);
}

/**
 * ดึงคำแสลงแบบสุ่ม 1 คำ
 */
function getRandomSlang() {
  return SLANG_DATABASE[Math.floor(Math.random() * SLANG_DATABASE.length)];
}

/**
 * ดึงรายการหมวดหมู่ทั้งหมดที่ไม่ซ้ำกัน
 */
function getAllCategories() {
  return [...new Set(SLANG_DATABASE.map(item => item.category))].sort();
}

/**
 * ดึงคำแสลงตาม id
 */
function getSlangById(id) {
  return SLANG_DATABASE.find(item => item.id === id) || null;
}
