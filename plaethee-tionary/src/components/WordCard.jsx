import React from 'react';
import { ChevronRight, MessageSquareQuote, Calendar } from 'lucide-react';

const LEVEL_MAP = {
  informal: { label: 'ไม่เป็นทางการ', className: 'informal' },
  slang: { label: 'ภาษาปาก/สแลง', className: 'slang' },
  vulgar: { label: 'หยาบ', className: 'vulgar' },
  offensive: { label: 'หยาบมาก', className: 'offensive' }
};

export default function WordCard({ word, onClick }) {
  const levelInfo = LEVEL_MAP[word.language_level] || LEVEL_MAP.informal;

  return (
    <article
      className="retro-card clickable"
      onClick={() => onClick(word)}
      style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative'
      }}
    >
      <div>
        {/* Top Meta: Level Badge & Era */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          marginBottom: '12px',
          flexWrap: 'wrap'
        }}>
          <span className={`badge-level ${levelInfo.className}`}>
            ● {levelInfo.label}
          </span>

          {word.categories && word.categories.find(c => c.includes('ยุค')) && (
            <span className="badge-tag era" style={{ fontSize: '0.72rem' }}>
              {word.categories.find(c => c.includes('ยุค'))}
            </span>
          )}
        </div>

        {/* Word Title */}
        <h3 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.4rem',
          fontWeight: 700,
          color: 'var(--text-main)',
          marginBottom: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          {word.word}
        </h3>

        {/* Meaning */}
        <p style={{
          fontSize: '0.92rem',
          color: 'var(--text-muted)',
          lineHeight: 1.5,
          marginBottom: '14px',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {word.meaning}
        </p>

        {/* Example Quote Snippet */}
        {word.example && (
          <div style={{
            backgroundColor: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-sm)',
            padding: '10px 12px',
            marginBottom: '14px',
            borderLeft: '3px solid var(--primary)',
            fontSize: '0.84rem',
            color: 'var(--text-main)',
            fontStyle: 'italic',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            <MessageSquareQuote size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }} />
            {word.example.split('\n')[0]}
          </div>
        )}
      </div>

      {/* Footer tags & Read More */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '12px',
        borderTop: '1px solid #EFECE6',
        marginTop: '8px'
      }}>
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          {(word.categories || []).filter(c => !c.includes('ยุค')).slice(0, 2).map((cat, idx) => (
            <span key={idx} className="badge-tag">
              #{cat}
            </span>
          ))}
        </div>

        <span style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2px',
          fontSize: '0.82rem',
          fontWeight: 700,
          fontFamily: 'var(--font-heading)',
          color: 'var(--primary)'
        }}>
          อ่านต่อ <ChevronRight size={14} />
        </span>
      </div>
    </article>
  );
}
