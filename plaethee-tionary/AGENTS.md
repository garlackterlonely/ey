# 🤖 Agent Rules: โปรเจกต์ "แปลทีดิtionary" (PlaeThee-tionary)

## 🚨 กฎบังคับใช้งานทักษะ (Mandatory Skill Routing Rules)

เมื่อเกิดเหตุการณ์หรือได้รับมอบหมายงานในโปรเจกต์ "แปลทีดิtionary" ให้ AI Agent อ่านและปฏิบัติตาม **SKILL.md** ที่ตรงกับประเภทงานอย่างเคร่งครัดก่อนเริ่มลงมือทำโค้ด:

| เหตุการณ์ / ประเภทงาน | สกิลที่ต้องเรียกใช้งานทันที | วัตถุประสงค์และขอบเขต |
| :--- | :--- | :--- |
| 🎨 **การสร้างหน้าใหม่ (New Page)**<br>🖼️ **การสร้างหรือปรับปรุง UI ใหม่ (New UI / Component)**<br>✨ **การปรับแต่ง Theme / CSS / Responsive** | 👉 **[plaethee-ui-designer](file:///c:/Users/acer/.gemini/antigravity-ide/scratch/plaethee-tionary/.agents/skills/plaethee-ui-designer/SKILL.md)** | ควบคุมระบบธีม 4 ยุค, Design Tokens, Vanilla CSS, Micro-interactions, Glassmorphism, และ Mobile Responsive |
| ⚙️ **การพัฒนาฟังก์ชันหรือฟีเจอร์ใหม่ (New Feature)**<br>🔄 **การทำระบบแปลภาษา (Slang Translator)**<br>🎮 **การทำมินิเกม (Era Quiz)**<br>🔍 **ระบบสืบค้น & คลังคำโปรด (Search & Bookmarks)** | 👉 **[plaethee-feature-builder](file:///c:/Users/acer/.gemini/antigravity-ide/scratch/plaethee-tionary/.agents/skills/plaethee-feature-builder/SKILL.md)** | ควบคุมสถาปัตยกรรมโมดูลาร์ JS (ES6+), ฐานข้อมูลคำแสลงจริง 40+ คำ, อัลกอริทึม Longest-Match-First, LocalStorage, และความเสถียรไร้บั๊ก |

---

### 📌 สรุปข้อห้ามเด็ดขาด (Universal Don'ts):
- ❌ **ห้ามใช้ Framework ภายนอก:** ห้ามใช้ Tailwind CSS, Bootstrap, React, Vue ให้เขียน Pure Vanilla HTML5/CSS3/ES6+ เท่านั้น
- ❌ **ห้ามใช้ Dummy/Placeholder Data:** ห้ามใส่ Lorem Ipsum หรือคำจำลอง ทุกคำแสลงและบทสนทนาต้องมาจากวัฒนธรรมเน็ตไทยจริง
- ❌ **ห้ามเขียนโค้ดรวมเป็น Monolithic Script ก้อนเดียว:** ต้องแยกไฟล์โมดูลตามที่ระบุในแต่ละ Skill
- ❌ **ห้ามมี Console Errors หรือ Broken UI:** ตรวจสอบก่อนส่งมอบต้องสะอาด ไร้บั๊ก 100%
