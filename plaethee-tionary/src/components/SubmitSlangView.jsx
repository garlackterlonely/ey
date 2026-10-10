import React, { useState } from 'react';
import { Star, Upload, CheckCircle2, AlertCircle } from 'lucide-react';
import { wordsApi } from '../lib/supabase';
import { SEED_CATEGORIES } from '../data/seed-words';

export default function SubmitSlangView({ onWordSubmitted, onBackToHome }) {
  const [formData, setFormData] = useState({
    word: '',
    meaning: '',
    example: '',
    part_of_speech: 'คำคุณศัพท์',
    language_level: 'slang',
    category: 'คน / ลักษณะนิสัย'
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const categories = SEED_CATEGORIES.filter(c => c.type === 'category');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.word.trim()) {
      setError('กรุณากรอกชื่อคำศัพท์');
      return;
    }
    if (!formData.meaning.trim()) {
      setError('กรุณากรอกความหมายของคำ');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await wordsApi.submitNewWord({
        word: formData.word.trim(),
        meaning: formData.meaning.trim(),
        example: formData.example.trim(),
        part_of_speech: formData.part_of_speech,
        language_level: formData.language_level,
        categories: [formData.category],
        icon_type: 'crown'
      });
      setSuccess(true);
      if (onWordSubmitted) onWordSubmitted();
    } catch (err) {
      setError(err.message || 'เกิดข้อผิดพลาดในการส่งข้อมูล');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '820px', margin: '20px auto' }}>
      <div className="retro-box" style={{ padding: '28px', backgroundColor: '#FFFFFF' }}>
        
        {/* Header matching Middle-Right image */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <Star size={24} fill="#F59E0B" color="#D97706" />
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-dark-blue)' }}>
            ส่งคำศัพท์ใหม่
          </h2>
        </div>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '22px' }}>
          ร่วมสร้างพจนานุกรมคำแสลงไทย ส่งคำศัพท์ที่คุณรู้จักมาให้เราตรวจสอบ
        </p>

        {success ? (
          <div style={{
            textAlign: 'center',
            padding: '36px 16px',
            backgroundColor: '#F0FDF4',
            border: '2px solid #86EFAC',
            borderRadius: 'var(--radius-md)'
          }}>
            <CheckCircle2 size={56} color="#16A34A" style={{ margin: '0 auto 12px' }} />
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700, color: '#166534', marginBottom: '8px' }}>
              ส่งคำศัพท์สำเร็จแล้ว!
            </h3>
            <p style={{ color: '#374151', fontSize: '0.95rem', maxWidth: '440px', margin: '0 auto 18px', lineHeight: 1.5 }}>
              คำว่า <strong>"{formData.word}"</strong> ถูกส่งเข้าสู่ระบบตรวจสอบของแอดมินแล้ว เมื่อผ่านการตรวจสอบจะปรากฏบนหน้าแรกทันทีครับ
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button
                className="btn btn-sm"
                onClick={() => {
                  setFormData({ word: '', meaning: '', example: '', part_of_speech: 'คำคุณศัพท์', language_level: 'slang', category: 'คน / ลักษณะนิสัย' });
                  setSuccess(false);
                }}
              >
                ส่งคำอื่นเพิ่ม
              </button>
              <button className="btn btn-sm btn-primary" onClick={onBackToHome}>
                กลับหน้าหลัก
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{
                backgroundColor: '#FEE2E2',
                border: '1px solid #FCA5A5',
                color: '#991B1B',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                marginBottom: '16px',
                fontSize: '0.88rem'
              }}>
                {error}
              </div>
            )}

            {/* Grid 2 Columns: คำศัพท์ & ความหมาย */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '16px' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">
                  คำศัพท์ <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="เช่น เท่, ปั่น, ชีทำถึง"
                  value={formData.word}
                  onChange={(e) => setFormData({ ...formData, word: e.target.value })}
                  required
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">
                  ความหมาย <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="อธิบายความหมายของคำนี้"
                  value={formData.meaning}
                  onChange={(e) => setFormData({ ...formData, meaning: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* ตัวอย่างการใช้ */}
            <div className="form-group">
              <label className="form-label">ตัวอย่างการใช้</label>
              <textarea
                className="form-textarea"
                rows={3}
                placeholder="เช่น เขานี่เท่มากเลย"
                value={formData.example}
                onChange={(e) => setFormData({ ...formData, example: e.target.value })}
              />
            </div>

            {/* Grid 2 Columns: ประเภทคำ & ระดับภาษา */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '16px' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">
                  ประเภทคำ <span className="required">*</span>
                </label>
                <select
                  className="form-select"
                  value={formData.part_of_speech}
                  onChange={(e) => setFormData({ ...formData, part_of_speech: e.target.value })}
                >
                  <option value="คำคุณศัพท์">คำคุณศัพท์ (adj)</option>
                  <option value="คำกริยา">คำกริยา (v)</option>
                  <option value="คำนาม">คำนาม (n)</option>
                  <option value="คำอุทาน">คำอุทาน (int)</option>
                  <option value="วลี">วลี / ประโยคติดปาก</option>
                </select>
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">
                  ระดับภาษา <span className="required">*</span>
                </label>
                <select
                  className="form-select"
                  value={formData.language_level}
                  onChange={(e) => setFormData({ ...formData, language_level: e.target.value })}
                >
                  <option value="slang">ภาษาพูด / สแลงทั่วไป</option>
                  <option value="informal">ไม่เป็นทางการ</option>
                  <option value="vulgar">หยาบ (ควรระวัง)</option>
                </select>
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">หมวดหมู่</label>
                <select
                  className="form-select"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  {categories.map(c => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* แนบรูป (ถ้ามี) Upload Box matching image */}
            <div className="form-group">
              <label className="form-label">แนบรูป (ถ้ามี)</label>
              <div style={{
                border: '2px dashed #93C5FD',
                borderRadius: 'var(--radius-md)',
                backgroundColor: '#F0F9FF',
                padding: '24px',
                textAlign: 'center',
                cursor: 'pointer'
              }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'var(--btn-blue)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  marginBottom: '4px'
                }}>
                  <Upload size={18} />
                  <span>เลือกไฟล์ หรือลากไฟล์มาวาง</span>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  (ขนาดไม่เกิน 5MB)
                </div>
              </div>
            </div>

            {/* Submit Button matching image (Yellow Button with Star) */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
              <button
                type="submit"
                className="yellow-search-btn"
                style={{ padding: '12px 32px', fontSize: '1rem' }}
                disabled={loading}
              >
                <Star size={18} fill="#1E293B" />
                <span>{loading ? 'กำลังส่งข้อมูล...' : 'ส่งคำศัพท์'}</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
