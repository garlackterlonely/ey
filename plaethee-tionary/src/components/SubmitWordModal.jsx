import React, { useState } from 'react';
import { X, Send, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import { wordsApi } from '../lib/supabase';
import { SEED_CATEGORIES } from '../data/seed-words';

export default function SubmitWordModal({ onClose, onWordSubmitted }) {
  const [formData, setFormData] = useState({
    word: '',
    meaning: '',
    example: '',
    example_context: '',
    language_level: 'informal',
    era: 'ยุค 2020s (TikTok/Gen Z)',
    category: 'คำชม',
    reference_url: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const eras = SEED_CATEGORIES.filter(c => c.type === 'era');
  const categories = SEED_CATEGORIES.filter(c => c.type === 'category');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.word.trim()) {
      setError('กรุณาระบุชื่อคำศัพท์');
      return;
    }
    if (!formData.meaning.trim()) {
      setError('กรุณาระบุความหมายของคำศัพท์');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        word: formData.word.trim(),
        meaning: formData.meaning.trim(),
        example: formData.example.trim(),
        example_context: formData.example_context.trim(),
        language_level: formData.language_level,
        categories: [formData.category, formData.era],
        reference_url: formData.reference_url.trim(),
        origin: ''
      };

      const res = await wordsApi.submitNewWord(payload);
      if (res.error) throw new Error(res.error);

      setSuccess(true);
      if (onWordSubmitted) onWordSubmitted();
    } catch (err) {
      setError(err.message || 'เกิดข้อผิดพลาดในการส่งคำศัพท์');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '600px' }}
      >
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title">
            <Sparkles size={20} color="var(--primary)" />
            <span>ส่งคำศัพท์ใหม่เข้าพจนานุกรม</span>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {success ? (
            <div style={{
              textAlign: 'center',
              padding: '28px 16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px'
            }}>
              <CheckCircle2 size={56} color="var(--accent-green)" />
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.4rem',
                fontWeight: 700
              }}>
                ส่งคำศัพท์สำเร็จแล้ว!
              </h3>
              <p style={{
                color: 'var(--text-muted)',
                fontSize: '0.95rem',
                maxWidth: '440px',
                lineHeight: 1.5
              }}>
                ขอบคุณที่ช่วยแชร์ภาษาแสลงใหม่ คำศัพท์ของคุณ <strong>"{formData.word}"</strong> จะถูกส่งเข้าคิวรอแอดมินตรวจสอบความถูกต้องก่อนเผยแพร่ลงหน้าแรกครับ
              </p>
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={onClose}
                style={{ marginTop: '14px' }}
              >
                เข้าใจแล้ว ปิดหน้าต่าง
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Notice Banner */}
              <div style={{
                backgroundColor: '#EFF6FF',
                border: '1.5px solid #BFDBFE',
                borderRadius: 'var(--radius-md)',
                padding: '10px 14px',
                marginBottom: '16px',
                fontSize: '0.84rem',
                color: '#1E40AF',
                display: 'flex',
                gap: '8px',
                alignItems: 'center'
              }}>
                <AlertCircle size={18} style={{ flexShrink: 0 }} />
                <span>
                  <strong>ข้อตกลง:</strong> คำศัพท์ที่ส่งจะยังไม่เผยแพร่ทันที แต่จะรอแอดมินตรวจสอบข้อมูลและตัวอย่างการใช้ก่อน
                </span>
              </div>

              {error && (
                <div style={{
                  backgroundColor: '#FEE2E2',
                  border: '1.5px solid #FCA5A5',
                  color: '#991B1B',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '14px',
                  fontSize: '0.88rem'
                }}>
                  {error}
                </div>
              )}

              {/* 1. คำศัพท์ */}
              <div className="form-group">
                <label className="form-label" htmlFor="submit-word">
                  ชื่อคำศัพท์ <span className="required">*</span>
                </label>
                <input
                  id="submit-word"
                  type="text"
                  className="form-input"
                  placeholder="เช่น ชีทำถึง, ตัวตึง, นอยด์อะแก"
                  value={formData.word}
                  onChange={(e) => setFormData({ ...formData, word: e.target.value })}
                  required
                />
              </div>

              {/* 2. ความหมาย */}
              <div className="form-group">
                <label className="form-label" htmlFor="submit-meaning">
                  ความหมายกระชับ <span className="required">*</span>
                </label>
                <textarea
                  id="submit-meaning"
                  className="form-textarea"
                  rows={2}
                  placeholder="อธิบายสั้นๆ เข้าใจง่ายว่าคำนี้หมายถึงอะไร"
                  value={formData.meaning}
                  onChange={(e) => setFormData({ ...formData, meaning: e.target.value })}
                  required
                />
              </div>

              {/* 3. ตัวอย่างบทสนทนา */}
              <div className="form-group">
                <label className="form-label" htmlFor="submit-example">
                  ตัวอย่างการใช้งานจริงในบทสนทนา
                </label>
                <textarea
                  id="submit-example"
                  className="form-textarea"
                  rows={3}
                  placeholder="เช่น เอ: เห็นชุดเขาหรือยัง?&#10;บี: เห็นแล้ว ชีทำถึงมากก!"
                  value={formData.example}
                  onChange={(e) => setFormData({ ...formData, example: e.target.value })}
                />
              </div>

              {/* 4. บริบทการใช้ */}
              <div className="form-group">
                <label className="form-label" htmlFor="submit-context">
                  อธิบายบริบทการใช้
                </label>
                <input
                  id="submit-context"
                  type="text"
                  className="form-input"
                  placeholder="เช่น ใช้ชมเพื่อนเวลาแต่งตัวสวย, ใช้แซวเวลาเพื่อนช็อตฟีล"
                  value={formData.example_context}
                  onChange={(e) => setFormData({ ...formData, example_context: e.target.value })}
                />
              </div>

              {/* 5. ระดับภาษา & ยุค */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '12px'
              }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="submit-level">
                    ระดับภาษา
                  </label>
                  <select
                    id="submit-level"
                    className="form-select"
                    value={formData.language_level}
                    onChange={(e) => setFormData({ ...formData, language_level: e.target.value })}
                  >
                    <option value="informal">ไม่เป็นทางการ (ทั่วไป)</option>
                    <option value="slang">ภาษาปาก/สแลงเฉพาะกลุ่ม</option>
                    <option value="vulgar">หยาบ (ควรระวัง)</option>
                    <option value="offensive">หยาบมาก (เลี่ยงการใช้)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="submit-era">
                    ยุคสมัยที่เริ่มฮิต
                  </label>
                  <select
                    id="submit-era"
                    className="form-select"
                    value={formData.era}
                    onChange={(e) => setFormData({ ...formData, era: e.target.value })}
                  >
                    {eras.map(era => (
                      <option key={era.id} value={era.name}>{era.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 6. หมวดหมู่ & แหล่งอ้างอิง */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '12px'
              }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="submit-category">
                    หมวดประเภทคำ
                  </label>
                  <select
                    id="submit-category"
                    className="form-select"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="submit-ref">
                    แหล่งอ้างอิง / ลิงก์ (ถ้ามี)
                  </label>
                  <input
                    id="submit-ref"
                    type="url"
                    className="form-input"
                    placeholder="https://..."
                    value={formData.reference_url}
                    onChange={(e) => setFormData({ ...formData, reference_url: e.target.value })}
                  />
                </div>
              </div>

              {/* Actions */}
              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '10px',
                marginTop: '12px',
                paddingTop: '14px',
                borderTop: '2px solid #EFECE6'
              }}>
                <button
                  type="button"
                  className="btn btn-sm"
                  onClick={onClose}
                  disabled={loading}
                >
                  ยกเลิก
                </button>
                <button
                  id="btn-submit-word-confirm"
                  type="submit"
                  className="btn btn-primary btn-sm"
                  disabled={loading}
                >
                  <Send size={15} />
                  <span>{loading ? 'กำลังส่งข้อมูล...' : 'ส่งให้แอดมินตรวจสอบ'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
