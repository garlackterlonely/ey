import React from 'react';
import { Share2, AlertTriangle, ArrowLeft, Check } from 'lucide-react';
import { CatMascot, WordIcon } from './Mascots';

export default function WordDetailView({ word, onBack, onOpenReport }) {
  const [copied, setCopied] = React.useState(false);

  if (!word) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `แปลทีดิtionary: ${word.word}`,
        text: `${word.word}: ${word.meaning} (งงคำไหน แปลทีดิ!)`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${word.word}: ${word.meaning} - แปลทีดิtionary`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Convert examples to bullet lines
  const exampleLines = word.example
    ? word.example.split('\n').filter(line => line.trim())
    : ['เขานี่เท่มากเลย', 'เสื้อผ้าแบบนี้เท่ดีนะ', 'งานนี้ต้องบอกว่าเท่จริง ๆ'];

  return (
    <div style={{ marginTop: '16px' }}>
      {/* Breadcrumbs matching image: ⭐️ หน้าหลัก > ค้นหาคำศัพท์ > [คำ] */}
      <div className="breadcrumb-bar">
        <span onClick={onBack}>⭐️ หน้าหลัก</span>
        <span>&gt;</span>
        <span onClick={onBack}>ค้นหาคำศัพท์</span>
        <span>&gt;</span>
        <strong style={{ color: 'var(--btn-blue)' }}>{word.word}</strong>
      </div>

      {/* Main Detail Card Container */}
      <div className="retro-box" style={{ padding: '24px', backgroundColor: '#FFFFFF' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: '24px',
          alignItems: 'start'
        }}>
          
          {/* Left Column: Yellow Frame with Cat Mascot */}
          <div style={{
            gridColumn: 'span 4',
            backgroundColor: '#FEF9C3',
            border: '2.5px solid #1E293B',
            borderRadius: 'var(--radius-md)',
            padding: '24px 16px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '3px 3px 0px #1E293B'
          }} className="detail-mascot-box">
            <CatMascot 
              size={120}
              caption={`${word.word}เว่อร์!`}
            />
          </div>

          {/* Right Column: Structured Word Details */}
          <div style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'column', gap: '16px' }} className="detail-info-col">
            
            {/* Header: Word Title + Category Tag + Share Button */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '2px solid #E2E8F0',
              paddingBottom: '12px',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <WordIcon type={word.icon_type} size={28} />
                <h1 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '2.2rem',
                  fontWeight: 900,
                  color: 'var(--text-main)',
                  lineHeight: 1
                }}>
                  {word.word}
                </h1>
                <span className="badge-pill-category" style={{ fontSize: '0.8rem', padding: '4px 12px' }}>
                  {word.categories && word.categories[0]}
                </span>
              </div>

              {/* Share button */}
              <button
                className="btn btn-sm"
                onClick={handleShare}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: '#FFFFFF',
                  borderColor: '#CBD5E1',
                  color: '#475569'
                }}
              >
                {copied ? <Check size={15} color="#16A34A" /> : <Share2 size={15} />}
                <span>{copied ? 'คัดลอกแล้ว!' : 'แชร์'}</span>
              </button>
            </div>

            {/* Box 1: ความหมาย */}
            <div style={{
              backgroundColor: '#F8FAFC',
              border: '1.5px solid #E2E8F0',
              borderRadius: 'var(--radius-md)',
              padding: '14px 18px'
            }}>
              <h4 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.95rem',
                fontWeight: 700,
                color: 'var(--text-dark-blue)',
                marginBottom: '4px'
              }}>
                ความหมาย
              </h4>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-main)', fontWeight: 500 }}>
                {word.meaning}
              </p>
            </div>

            {/* Box 2: ตัวอย่างการใช้ */}
            <div style={{
              backgroundColor: '#FFFFFF',
              border: '1.5px solid #E2E8F0',
              borderRadius: 'var(--radius-md)',
              padding: '14px 18px'
            }}>
              <h4 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.95rem',
                fontWeight: 700,
                color: 'var(--text-dark-blue)',
                marginBottom: '8px'
              }}>
                ตัวอย่างการใช้
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.92rem', color: '#334155' }}>
                {exampleLines.map((line, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '6px', alignItems: 'baseline' }}>
                    <span style={{ color: 'var(--btn-blue)' }}>•</span>
                    <span>{line.replace(/^[•\s-]+/, '')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Metadata Grid (ประเภทคำ, ระดับภาษา, บริบทการใช้) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '12px',
              backgroundColor: '#F8FAFC',
              border: '1.5px solid #E2E8F0',
              borderRadius: 'var(--radius-md)',
              padding: '14px 18px',
              fontSize: '0.88rem'
            }}>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>ประเภทคำ</span>
                <strong style={{ color: 'var(--text-main)' }}>{word.part_of_speech || 'คำคุณศัพท์'}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>ระดับภาษา</span>
                <strong style={{ color: 'var(--text-main)' }}>
                  {word.language_level === 'informal' ? 'ไม่เป็นทางการ' : 'ภาษาพูด'}
                </strong>
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>บริบทการใช้</span>
                <span style={{ color: 'var(--text-main)' }}>
                  {word.example_context || 'ใช้ชมคน สิ่งของ หรือการกระทำที่ดูดี น่าประทับใจ'}
                </span>
              </div>
            </div>

            {/* Bottom Actions: [แจ้งข้อมูลผิด] และ [กลับไปหน้าค้นหา] */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '8px',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <button
                type="button"
                className="btn btn-sm"
                onClick={() => onOpenReport(word)}
                style={{
                  color: '#DC2626',
                  borderColor: '#FCA5A5',
                  backgroundColor: '#FEF2F2'
                }}
              >
                <AlertTriangle size={15} color="#DC2626" />
                <span>แจ้งข้อมูลผิด</span>
              </button>

              <button
                type="button"
                className="btn btn-sm btn-secondary"
                onClick={onBack}
              >
                <ArrowLeft size={15} />
                <span>กลับไปหน้าค้นหา</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
