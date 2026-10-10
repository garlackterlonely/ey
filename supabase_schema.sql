-- ==========================================================
-- 📚 สคริปต์สร้างฐานข้อมูล Supabase สำหรับโปรเจกต์ "แปลทีดิtionary"
-- คัดลอกไปรันใน Supabase Dashboard -> SQL Editor ได้ทันที
-- ==========================================================

-- 1. สร้างตารางคำศัพท์ (words)
CREATE TABLE IF NOT EXISTS public.words (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    word VARCHAR(100) NOT NULL,
    meaning TEXT NOT NULL,
    example TEXT NOT NULL,
    example_context TEXT,
    language_level VARCHAR(30) DEFAULT 'informal', -- 'informal', 'slang', 'vulgar', 'offensive'
    origin TEXT,
    reference_url TEXT,
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    rejection_reason TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    approved_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. สร้างตารางหมวดหมู่และยุค (categories)
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL,
    type VARCHAR(20) NOT NULL, -- 'era', 'category', 'tone'
    slug VARCHAR(50) UNIQUE NOT NULL
);

-- 3. ตารางเชื่อม Many-to-Many คำศัพท์กับหมวดหมู่ (word_categories)
CREATE TABLE IF NOT EXISTS public.word_categories (
    word_id UUID REFERENCES public.words(id) ON DELETE CASCADE,
    category_id UUID REFERENCES public.categories(id) ON DELETE CASCADE,
    PRIMARY KEY (word_id, category_id)
);

-- 4. ตารางบันทึกการแจ้งข้อมูลผิด (word_reports)
CREATE TABLE IF NOT EXISTS public.word_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    word_id UUID REFERENCES public.words(id) ON DELETE CASCADE,
    report_type VARCHAR(50) NOT NULL, -- 'wrong_meaning', 'inappropriate', 'typo', 'other'
    details TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'open', -- 'open', 'resolved', 'ignored'
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- สร้าง Indexes เพื่อให้ค้นหาได้รวดเร็ว
CREATE INDEX IF NOT EXISTS idx_words_search ON public.words (word, status);
CREATE INDEX IF NOT EXISTS idx_words_status ON public.words (status);

-- ==========================================================
-- 🔒 นโยบายความปลอดภัย Row Level Security (RLS)
-- ==========================================================

ALTER TABLE public.words ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.word_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.word_reports ENABLE ROW LEVEL SECURITY;

-- นโยบายตาราง words:
-- คนทั่วไป (anon/authenticated) ดูได้เฉพาะคำที่ approved
CREATE POLICY "Public can view approved words"
ON public.words FOR SELECT
USING (status = 'approved');

-- คนทั่วไปสามารถส่งคำศัพท์ใหม่ได้ (สถานะบังคับเป็น pending)
CREATE POLICY "Public can insert pending words"
ON public.words FOR INSERT
WITH CHECK (status = 'pending');

-- แอดมินสามารถดู อนุมัติ ปฏิเสธ แก้ไข และลบได้ทั้งหมด
CREATE POLICY "Admin full access to words"
ON public.words FOR ALL
USING (auth.jwt() ->> 'email' IS NOT NULL);

-- นโยบายตาราง categories:
CREATE POLICY "Public can view categories"
ON public.categories FOR SELECT
USING (true);

-- นโยบายตาราง word_categories:
CREATE POLICY "Public can view word_categories"
ON public.word_categories FOR SELECT
USING (true);

-- นโยบายตาราง word_reports:
CREATE POLICY "Public can submit reports"
ON public.word_reports FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admin can manage reports"
ON public.word_reports FOR ALL
USING (auth.jwt() ->> 'email' IS NOT NULL);

-- ==========================================================
-- 🌱 หมวดหมู่และยุคเริ่มต้น (Seed Categories)
-- ==========================================================
INSERT INTO public.categories (name, type, slug) VALUES
('คำชม', 'category', 'praise'),
('คำประชด/แซว', 'category', 'sarcasm'),
('คำอุทาน/สร้อย', 'category', 'exclaim'),
('บอกอารมณ์', 'category', 'emotion'),
('คำย่อ/ตัดทอน', 'category', 'abbrev'),
('ยุค 90s (Pirch/ICQ)', 'era', '90s'),
('ยุค 2000s (MSN/Y2K)', 'era', '2000s'),
('ยุค 2010s (BB/FB)', 'era', '2010s'),
('ยุค 2020s (TikTok/Gen Z)', 'era', '2020s')
ON CONFLICT (slug) DO NOTHING;
