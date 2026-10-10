import React from 'react';
import { X, AlertTriangle, ExternalLink, MessageSquare, Info, History, Tag, Share2 } from 'lucide-react';

const LEVEL_MAP = {
  informal: { label: 'ไม่เป็นทางการ', desc: 'ใช้ในชีวิตประจำวันกับเพื่อนหรือคนสนิทได้', className: 'informal' },
  slang: { label: 'ภาษาปาก/สแลง', desc: 'แสลงเฉพาะกลุ่ม วัยรุ่น หรือโซเชียลมีเดีย', className: 'slang' },
  vulgar: { label: 'หยาบ', desc: 'ควรระวังการใช้งาน ไม่ควรใช้ในที่สาธารณะหรือทางการ', className: 'vulgar' },
  offensive: { label: 'หยาบมาก', desc: 'คำสบถหรือถ้อยคำรุนแรง หลีกเลี่ยงการใช้', className: 'offensive' }
};

export default function WordDetailModal({ word, onClose, onOpenReport }) {
  if (!word) return null;

  const levelInfo = LEVEL_MAP[word.language_level] || LEVEL_MAP.informal;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `แปลทีดิtionary: ${word.word}`,
        text: `${word.word}: ${word.meaning} (งงคำไหน แปลทีดิ!)`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${word.word}: ${word.meaning} - แปลทีดิtionary`);
      alert('คัดลอกความหมายลงคลิปบอร์ดแล้ว!');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '640px' }}
      >
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.2rem' }}>📖</span>
            <span style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: '1rem',
              color: 'var(--text-muted)'
            }}>
              รายละเอียดคำศัพท์
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button
              className="btn btn-sm"
              onClick={handleShare}
              title="แชร์คำศัพท์"
              style={{ padding: '4px 8px' }}
            >
              <Share2 size={15} />
            </button>
            <button className="modal-close-btn" onClick={onClose} aria-label="ปิด">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Body: 7 Structured Elements */}
        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* 1. ชื่อคำศัพท์ พร้อมป้ายระดับภาษา */}
          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '10px',
            borderBottom: '2px dashed #E5E1D8',
            paddingBottom: '14px'
          }}>
            <div>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '2rem',
                fontWeight: 800,
                color: 'var(--text-main)',
                lineHeight: 1.1
              }}>
                {word.word}
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
              <span className={`badge-level ${levelInfo.className}`} style={{ fontSize: '0.85rem', padding: '4px 12px' }}>
                ระดับภาษา: {levelInfo.label}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {levelInfo.desc}
              </span>
            </div>
          </div>

          {/* 2. ความหมาย — อธิบายสั้น กระชับ เข้าใจง่าย */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.95rem',
              fontWeight: 700,
              color: 'var(--primary)',
              marginBottom: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <Info size={16} /> ความหมาย
            </h4>
            <p style={{
              fontSize: '1.05rem',
              color: 'var(--text-main)',
              lineHeight: 1.6,
              fontWeight: 500,
              backgroundColor: 'var(--primary-light)',
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              border: '1.5px solid #FDBA74'
            }}>
              {word.meaning}
            </p>
          </div>

          {/* 3. ตัวอย่างการใช้ — แสดงประโยคและอธิบายบริบท */}
          {word.example && (
            <div>
              <h4 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.95rem',
                fontWeight: 700,
                color: 'var(--secondary)',
                marginBottom: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <MessageSquare size={16} /> ตัวอย่างการใช้งานจริงในบทสนทนา
              </h4>
              <div style={{
                backgroundColor: '#FFFFFF',
                border: '2px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '14px 16px',
                boxShadow: 'var(--shadow-retro-sm)'
              }}>
                <pre style={{
                  fontFamily: 'var(--font-body)',
                  whiteSpace: 'pre-wrap',
                  fontSize: '0.92rem',
                  lineHeight: 1.6,
                  color: 'var(--text-main)',
                  margin: 0
                }}>
                  {word.example}
                </pre>
                
                {word.example_context && (
                  <div style={{
                    marginTop: '10px',
                    paddingTop: '8px',
                    borderTop: '1px solid #F0EDE6',
                    fontSize: '0.82rem',
                    color: 'var(--text-muted)'
                  }}>
                    💡 <strong>บริบทการใช้:</strong> {word.example_context}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 4. ประเภทคำและยุคที่ใช้ */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.9rem',
              fontWeight: 700,
              color: 'var(--text-muted)',
              marginBottom: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <Tag size={15} /> หมวดหมู่และยุคสมัย
            </h4>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {(word.categories || []).map((cat, idx) => (
                <span 
                  key={idx} 
                  className={`badge-tag ${cat.includes('ยุค') ? 'era' : ''}`}
                  style={{ fontSize: '0.82rem', padding: '4px 10px' }}
                >
                  {cat.includes('ยุค') ? '⏳ ' : '# '}{cat}
                </span>
              ))}
            </div>
          </div>

          {/* 5. ที่มาหรือบริบทเพิ่มเติม (แสดงเมื่อมีข้อมูล) */}
          {word.origin && (
            <div style={{
              backgroundColor: 'var(--bg-subtle)',
              border: '1.5px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '12px 14px'
            }}>
              <h4 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.88rem',
                fontWeight: 700,
                color: 'var(--text-main)',
                marginBottom: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <History size={15} /> ที่มาและบริบทเสริม
              </h4>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                {word.origin}
              </p>
            </div>
          )}

          {/* 6. แหล่งอ้างอิง (แสดงลิงก์เมื่อมี) */}
          {word.reference_url && (
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              🔗 <strong>แหล่งอ้างอิง:</strong>{' '}
              <a 
                href={word.reference_url} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: 'var(--secondary)', textDecoration: 'underline', wordBreak: 'break-all' }}
              >
                {word.reference_url} <ExternalLink size={12} style={{ display: 'inline' }} />
              </a>
            </div>
          )}

          {/* 7. แจ้งข้อมูลผิด — เปิดแบบฟอร์มรายงานโดยไม่ต้องสมัครสมาชิก */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '14px',
            borderTop: '2px solid #EFECE6',
            marginTop: '6px'
          }}>
            <button
              id="btn-report-word"
              type="button"
              className="btn btn-sm"
              onClick={() => onOpenReport(word)}
              style={{
                fontSize: '0.82rem',
                color: '#B91C1C',
                borderColor: '#FCA5A5',
                backgroundColor: '#FEF2F2'
              }}
            >
              <AlertTriangle size={14} color="#B91C1C" />
              <span>แจ้งข้อมูลผิด</span>
            </button>

            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={onClose}
            >
              ปิดหน้าต่าง
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
