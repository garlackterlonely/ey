import React, { useState } from 'react';
import { X, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { wordsApi } from '../lib/supabase';

export default function ReportModal({ word, onClose }) {
  const [reportType, setReportType] = useState('wrong_meaning');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!word) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!details.trim()) {
      setError('กรุณากรอกรายละเอียดปัญหา');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const res = await wordsApi.submitReport({
        word_id: word.id,
        report_type: reportType,
        details: details.trim()
      });
      if (res.error) throw new Error(res.error);
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'เกิดข้อผิดพลาดในการส่งรายงาน');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1100 }}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '520px' }}
      >
        <div className="modal-header" style={{ backgroundColor: '#FEF2F2' }}>
          <div className="modal-title" style={{ color: '#B91C1C' }}>
            <AlertTriangle size={20} color="#B91C1C" />
            <span>รายงานข้อผิดพลาด: "{word.word}"</span>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {success ? (
            <div style={{
              textAlign: 'center',
              padding: '24px 12px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px'
            }}>
              <CheckCircle2 size={52} color="var(--accent-green)" />
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700 }}>
                ส่งรายงานให้แอดมินแล้ว
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                ขอบคุณที่ช่วยตรวจสอบความถูกต้อง ทีมงานแอดมินจะรีบตรวจสอบคำว่า <strong>"{word.word}"</strong> และปรับปรุงข้อมูลโดยเร็วครับ
              </p>
              <button 
                type="button" 
                className="btn btn-sm btn-primary"
                onClick={onClose}
                style={{ marginTop: '12px' }}
              >
                เสร็จสิ้น
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
                พบข้อมูลผิดพลาด สะกดผิด หรือเนื้อหาไม่เหมาะสม? แจ้งรายละเอียดเพื่อให้แอดมินตรวจสอบได้ทันที
              </p>

              {error && (
                <div style={{
                  backgroundColor: '#FEE2E2',
                  border: '1px solid #FCA5A5',
                  color: '#991B1B',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '12px',
                  fontSize: '0.85rem'
                }}>
                  {error}
                </div>
              )}

              <div className="form-group">
                <label className="form-label" htmlFor="report-type">
                  ประเภทปัญหา
                </label>
                <select
                  id="report-type"
                  className="form-select"
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                >
                  <option value="wrong_meaning">ความหมายไม่ถูกต้อง</option>
                  <option value="typo">สะกดคำผิด / ตัวอย่างไม่ตรง</option>
                  <option value="inappropriate">เนื้อหาไม่เหมาะสม / หยาบคายเกินควร</option>
                  <option value="other">ปัญหาอื่นๆ</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="report-details">
                  รายละเอียดที่ต้องการแจ้ง <span className="required">*</span>
                </label>
                <textarea
                  id="report-details"
                  className="form-textarea"
                  rows={4}
                  placeholder="เช่น ความหมายจริงควรเป็น..., ตัวอย่างนี้ใช้ผิดบริบท..."
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  required
                />
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '10px',
                marginTop: '16px'
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
                  type="submit"
                  className="btn btn-sm"
                  style={{ backgroundColor: '#DC2626', color: '#FFFFFF', borderColor: 'var(--border-color)' }}
                  disabled={loading}
                >
                  {loading ? 'กำลังส่ง...' : 'ส่งรายงานให้แอดมิน'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
