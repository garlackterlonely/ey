import React from 'react';

// 🐱 แมสคอตเจ้าแมวใส่แว่นดำ สวมฮู้ดสีน้ำเงิน ยกนิ้วโป้ง Thumbs Up
export function CatMascot({ size = 120, speechText = '', caption = '', className = '' }) {
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }} className={className}>
      {/* Speech Bubble */}
      {speechText && (
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '2.5px solid #1E293B',
          borderRadius: '16px',
          padding: '8px 14px',
          fontSize: '0.85rem',
          fontWeight: 700,
          fontFamily: 'var(--font-heading)',
          color: '#1E293B',
          boxShadow: '2px 2px 0px rgba(0,0,0,0.15)',
          position: 'relative',
          marginBottom: '8px',
          maxWidth: '190px',
          textAlign: 'center',
          lineHeight: 1.3
        }}>
          {speechText}
          <div style={{
            position: 'absolute',
            bottom: '-9px',
            left: '30px',
            width: 0,
            height: 0,
            borderLeft: '7px solid transparent',
            borderRight: '7px solid transparent',
            borderTop: '9px solid #1E293B'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '-6px',
            left: '31px',
            width: 0,
            height: 0,
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderTop: '7px solid #FFFFFF'
          }} />
        </div>
      )}

      {/* SVG Cat Mascot */}
      <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Cat Head Background Glow */}
        <circle cx="80" cy="80" r="75" fill="#FDE047" stroke="#1E293B" strokeWidth="4" />
        
        {/* Blue Hoodie Jacket */}
        <path d="M30 145 C30 115 50 100 80 100 C110 100 130 115 130 145 Z" fill="#2563EB" stroke="#1E293B" strokeWidth="4" />
        <path d="M70 100 L70 150 M90 100 L90 150" stroke="#1D4ED8" strokeWidth="3" />
        <circle cx="80" cy="115" r="5" fill="#EF4444" stroke="#1E293B" strokeWidth="2" />

        {/* Cat Ears */}
        <polygon points="40,55 25,18 65,35" fill="#FFFFFF" stroke="#1E293B" strokeWidth="4" strokeLinejoin="round" />
        <polygon points="40,50 32,26 58,38" fill="#F472B6" />
        
        <polygon points="120,55 135,18 95,35" fill="#FFFFFF" stroke="#1E293B" strokeWidth="4" strokeLinejoin="round" />
        <polygon points="120,50 128,26 102,38" fill="#F472B6" />

        {/* Cat Head */}
        <ellipse cx="80" cy="65" rx="46" ry="40" fill="#FFFFFF" stroke="#1E293B" strokeWidth="4" />
        
        {/* Blue Cap / Beanie on Head */}
        <path d="M42 48 Q80 22 118 48 Q80 34 42 48 Z" fill="#3B82F6" stroke="#1E293B" strokeWidth="3" />

        {/* Black Sunglasses (Cool Shades) */}
        <g>
          {/* Left Lens */}
          <rect x="42" y="52" width="34" height="24" rx="8" fill="#0F172A" stroke="#1E293B" strokeWidth="3.5" />
          <path d="M46 56 L58 56" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" />
          {/* Bridge */}
          <rect x="74" y="58" width="12" height="6" rx="2" fill="#1E293B" />
          {/* Right Lens */}
          <rect x="84" y="52" width="34" height="24" rx="8" fill="#0F172A" stroke="#1E293B" strokeWidth="3.5" />
          <path d="M88 56 L100 56" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Nose & Smile */}
        <ellipse cx="80" cy="81" rx="4" ry="3" fill="#F43F5E" />
        <path d="M74 84 Q80 90 86 84" stroke="#1E293B" strokeWidth="2.5" fill="none" strokeLinecap="round" />

        {/* Whiskers */}
        <line x1="28" y1="72" x2="40" y2="75" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="26" y1="82" x2="40" y2="81" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="120" y1="75" x2="132" y2="72" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="120" y1="81" x2="134" y2="82" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />

        {/* Thumbs Up Hand */}
        <g transform="translate(112, 95)">
          <circle cx="16" cy="16" r="14" fill="#FFFFFF" stroke="#1E293B" strokeWidth="3" />
          {/* Thumb */}
          <path d="M14 6 C14 2 20 2 20 6 L20 16 L12 16 Z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
          <path d="M12 12 Q20 12 24 16" stroke="#E2E8F0" strokeWidth="2" />
        </g>
      </svg>

      {/* Caption if provided */}
      {caption && (
        <div style={{
          marginTop: '6px',
          backgroundColor: '#FEF08A',
          border: '2px solid #1E293B',
          borderRadius: '8px',
          padding: '2px 10px',
          fontWeight: 800,
          fontFamily: 'var(--font-heading)',
          fontSize: '0.82rem',
          color: '#1E293B'
        }}>
          {caption}
        </div>
      )}
    </div>
  );
}

// 💻 แมสคอตหน้าจอคอมพิวเตอร์เรโทร ยุค 90s
export function PcMascot({ size = 110, speechText = '', className = '' }) {
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }} className={className}>
      {speechText && (
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '2px solid #1E293B',
          borderRadius: '12px',
          padding: '6px 12px',
          fontSize: '0.78rem',
          fontWeight: 700,
          fontFamily: 'var(--font-heading)',
          color: '#1E293B',
          boxShadow: '2px 2px 0px rgba(0,0,0,0.1)',
          marginBottom: '6px',
          maxWidth: '180px',
          textAlign: 'center',
          lineHeight: 1.3
        }}>
          {speechText}
        </div>
      )}

      <svg width={size} height={size * 0.9} viewBox="0 0 120 110" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Monitor Body */}
        <rect x="15" y="10" width="90" height="70" rx="10" fill="#60A5FA" stroke="#1E293B" strokeWidth="3.5" />
        {/* Screen */}
        <rect x="25" y="18" width="70" height="48" rx="6" fill="#EFF6FF" stroke="#1E293B" strokeWidth="2.5" />
        
        {/* Screen Face (Eyes and Smile) */}
        <circle cx="45" cy="38" r="4" fill="#1E293B" />
        <circle cx="75" cy="38" r="4" fill="#1E293B" />
        <circle cx="47" cy="36" r="1.5" fill="#FFFFFF" />
        <circle cx="77" cy="36" r="1.5" fill="#FFFFFF" />
        {/* Rosy cheeks */}
        <circle cx="37" cy="46" r="4" fill="#FCA5A5" />
        <circle cx="83" cy="46" r="4" fill="#FCA5A5" />
        {/* Smile */}
        <path d="M54 46 Q60 54 66 46" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />

        {/* Floppy drive slot */}
        <line x1="72" y1="72" x2="88" y2="72" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
        <circle cx="94" cy="72" r="1.5" fill="#22C55E" />

        {/* Monitor Stand */}
        <rect x="48" y="80" width="24" height="10" fill="#3B82F6" stroke="#1E293B" strokeWidth="3" />
        <path d="M30 96 L90 96 L82 90 L38 90 Z" fill="#2563EB" stroke="#1E293B" strokeWidth="3" />
      </svg>
    </div>
  );
}

// ⭐ ไอคอน Folder สีเหลืองน่ารักสไตล์ยุค 2000s
export function RetroFolderIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 6C3 4.89543 3.89543 4 5 4H9.58579C10.1162 4 10.6249 4.21071 11 4.58579L12.4142 6H19C20.1046 6 21 6.89543 21 8V18C21 19.1046 20.1046 20 19 20H5C3.89543 20 3 19.1046 3 18V6Z" 
        fill="#FACC15" stroke="#1E293B" strokeWidth="2" strokeLinejoin="round" />
      <path d="M3 10H21" stroke="#EAB308" strokeWidth="2" />
    </svg>
  );
}

// 👑 Icon Helper
export function WordIcon({ type, size = 18 }) {
  switch (type) {
    case 'crown': return <span style={{ fontSize: `${size}px`, lineHeight: 1 }}>👑</span>;
    case 'fire': return <span style={{ fontSize: `${size}px`, lineHeight: 1 }}>🔥</span>;
    case 'dizzy': return <span style={{ fontSize: `${size}px`, lineHeight: 1 }}>😵</span>;
    case 'bike': return <span style={{ fontSize: `${size}px`, lineHeight: 1 }}>🚲</span>;
    case 'gem': return <span style={{ fontSize: `${size}px`, lineHeight: 1 }}>💎</span>;
    case 'bolt': return <span style={{ fontSize: `${size}px`, lineHeight: 1 }}>⚡</span>;
    case 'briefcase': return <span style={{ fontSize: `${size}px`, lineHeight: 1 }}>💼</span>;
    case 'sleepy': return <span style={{ fontSize: `${size}px`, lineHeight: 1 }}>🥱</span>;
    case 'laugh': return <span style={{ fontSize: `${size}px`, lineHeight: 1 }}>😆</span>;
    case 'cowboy': return <span style={{ fontSize: `${size}px`, lineHeight: 1 }}>🤠</span>;
    default: return <span style={{ fontSize: `${size}px`, lineHeight: 1 }}>⭐</span>;
  }
}
