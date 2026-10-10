import React, { useState } from 'react';
import { Search, ChevronRight, BookOpen, Clock, XCircle, Star, Sparkles, Lightbulb } from 'lucide-react';
import { RetroFolderIcon, PcMascot, WordIcon } from './Mascots';
import { SEED_CATEGORIES } from '../data/seed-words';

export default function HomeView({ 
  words, 
  onSelectWord, 
  onSearch, 
  onSelectCategory,
  onNavigateToSearch,
  onNavigateToSubmit,
  onNavigateToReport
}) {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
    } else {
      onNavigateToSearch();
    }
  };

  const handleExampleChipClick = (term) => {
    setSearchInput(term);
    onSearch(term);
  };

  const categories = SEED_CATEGORIES.filter(c => c.type === 'category');
  const popularWords = words.filter(w => w.is_popular).slice(0, 7);

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      gap: '16px',
      marginTop: '16px'
    }}>
      {/* =========================================================
          LEFT SIDEBAR: หมวดหมู่คำแสลง + คำแนะนำ (3 Columns on Desktop)
          ========================================================= */}
      <aside style={{ gridColumn: 'span 3' }} className="home-left-col">
        {/* Box: หมวดหมู่คำแสลง */}
        <div className="retro-box">
          <div className="retro-box-header">
            <span>📁 หมวดหมู่คำแสลง</span>
          </div>
          <div style={{ padding: '8px' }}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                className="category-item-btn"
                onClick={() => onSelectCategory(cat.name)}
              >
                <RetroFolderIcon size={18} />
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Box: คำแนะนำ */}
        <div className="retro-box" style={{ backgroundColor: '#FEFDF8' }}>
          <div className="retro-box-header" style={{ color: '#D97706', backgroundColor: '#FEF3C7' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Lightbulb size={17} color="#D97706" /> คำแนะนำ
            </span>
          </div>
          <div className="retro-box-body">
            <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.6 }}>
              ใช้คำแสลงอย่างสร้างสรรค์ และเคารพความหลากหลายของภาษาไทยนะครับ 😊
            </p>
          </div>
        </div>
      </aside>

      {/* =========================================================
          CENTER MAIN: พจนานุกรมคำแสลงไทย + คำแสลงยอดนิยม (6 Columns)
          ========================================================= */}
      <section style={{ gridColumn: 'span 6' }} className="home-center-col">
        {/* Hero Search Box */}
        <div className="hero-search-box">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Search size={22} color="var(--btn-blue)" strokeWidth={2.5} />
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.45rem',
              fontWeight: 800,
              color: 'var(--text-dark-blue)'
            }}>
              พจนานุกรมคำแสลงไทย
            </h2>
          </div>

          <p style={{
            fontSize: '0.88rem',
            color: 'var(--text-muted)',
            marginBottom: '16px',
            lineHeight: 1.4
          }}>
            รวบรวมคำแสลงจากโซเชียลและอินเทอร์เน็ต พร้อมความหมาย ตัวอย่างการใช้ และบริบทให้เข้าใจง่าย
          </p>

          {/* Search Input Form */}
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <input
              type="text"
              className="form-input"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="พิมพ์คำที่ต้องการค้นหา เช่น เท่, แซ่บ, งง..."
              style={{
                flex: 1,
                height: '46px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.95rem'
              }}
            />
            <button
              type="submit"
              className="yellow-search-btn"
            >
              <Search size={18} />
              <span>ค้นหา</span>
            </button>
          </form>

          {/* Example Search Chips */}
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <strong style={{ color: 'var(--text-main)' }}>ตัวอย่างคำค้นหา:</strong>
            {['เท่', 'แซ่บ', 'งง', 'ปั่น', 'คุ้ม', 'ตึง', 'งานเข้า'].map((chip, idx) => (
              <span
                key={idx}
                onClick={() => handleExampleChipClick(chip)}
                style={{
                  cursor: 'pointer',
                  color: 'var(--btn-blue)',
                  backgroundColor: '#EFF6FF',
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid #BFDBFE'
                }}
              >
                {chip}
              </span>
            ))}
          </div>
        </div>

        {/* Section: ⭐ คำแสลงยอดนิยม */}
        <div className="retro-box">
          <div className="retro-box-header" style={{ backgroundColor: '#FFFBEB', color: '#B45309' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Star size={18} fill="#F59E0B" color="#D97706" /> คำแสลงยอดนิยม
            </span>
          </div>

          <div style={{ padding: '0' }}>
            {popularWords.map((item) => (
              <div 
                key={item.id} 
                className="popular-word-row"
              >
                {/* Left: Icon + Word + Meaning */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <WordIcon type={item.icon_type} size={22} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
                      <strong style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.15rem',
                        color: 'var(--text-main)',
                        fontWeight: 700
                      }}>
                        {item.word}
                      </strong>
                      <span style={{
                        fontSize: '0.85rem',
                        color: 'var(--text-muted)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        หมายถึง {item.meaning}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Category badge + Button */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                  <span className="badge-pill-category">
                    {item.categories && item.categories[0]}
                  </span>
                  <button
                    className="btn-detail-blue"
                    onClick={() => onSelectWord(item)}
                  >
                    <span>ดูรายละเอียด</span>
                    <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Footer of popular slang box: "ดูคำแสลงทั้งหมด ➡️" */}
          <div style={{
            padding: '12px',
            textAlign: 'center',
            backgroundColor: '#F8FAFC',
            borderTop: '1px solid #E2E8F0'
          }}>
            <button
              className="btn btn-sm"
              onClick={onNavigateToSearch}
              style={{
                backgroundColor: 'var(--btn-blue)',
                color: '#FFFFFF',
                borderRadius: 'var(--radius-full)',
                padding: '6px 20px',
                fontSize: '0.86rem'
              }}
            >
              ดูคำแสลงทั้งหมด ➡️
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================
          RIGHT SIDEBAR: คำแนะนำการใช้งาน + สถิติคำวันนี้ + PC แมสคอต (3 Columns)
          ========================================================= */}
      <aside style={{ gridColumn: 'span 3' }} className="home-right-col">
        {/* Box: คำแนะนำการใช้งาน */}
        <div className="retro-box">
          <div className="retro-box-header" style={{ backgroundColor: '#FEF3C7', color: '#B45309' }}>
            <span>📝 คำแนะนำการใช้งาน</span>
          </div>
          <div className="retro-box-body" style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.6 }}>
            <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
              <span style={{ color: '#F59E0B' }}>⭐</span>
              <span>พิมพ์คำที่ต้องการค้นหาได้เลย</span>
            </div>
            <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
              <span style={{ color: '#F59E0B' }}>⭐</span>
              <span>เลือกหมวดหมู่เพื่อดูคำแสลงในประเภทเดียวกัน</span>
            </div>
            <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
              <span style={{ color: '#F59E0B' }}>⭐</span>
              <span>หากไม่พบคำที่ต้องการ สามารถส่งคำศัพท์ใหม่ได้ที่{' '}
                <a 
                  href="#submit" 
                  onClick={(e) => { e.preventDefault(); onNavigateToSubmit(); }}
                  style={{ color: 'var(--btn-blue)', fontWeight: 600, textDecoration: 'underline' }}
                >
                  "ส่งคำศัพท์ใหม่"
                </a>
              </span>
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <span style={{ color: '#F59E0B' }}>⭐</span>
              <span>พบข้อมูลผิด? แจ้งได้ที่{' '}
                <a 
                  href="#report" 
                  onClick={(e) => { e.preventDefault(); onNavigateToReport(); }}
                  style={{ color: '#DC2626', fontWeight: 600, textDecoration: 'underline' }}
                >
                  "รายงานข้อมูลผิด" 😊
                </a>
              </span>
            </div>
          </div>
        </div>

        {/* Box: สถิติคำวันนี้ */}
        <div className="retro-box">
          <div className="retro-box-header" style={{ backgroundColor: '#EFF6FF', color: 'var(--text-dark-blue)' }}>
            <span>📊 สถิติคำวันนี้</span>
          </div>
          <div className="retro-box-body" style={{ padding: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid #F1F5F9' }}>
              <span style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                📚 คำศัพท์ทั้งหมด
              </span>
              <strong style={{ color: 'var(--btn-blue)', fontFamily: 'var(--font-heading)' }}>
                {words.length + 220} คำ
              </strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid #F1F5F9' }}>
              <span style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                ⏰ รอการตรวจสอบ
              </span>
              <strong style={{ color: '#D97706', fontFamily: 'var(--font-heading)' }}>
                12 คำ
              </strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0' }}>
              <span style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                ❌ ถูกปฏิเสธ
              </span>
              <strong style={{ color: '#DC2626', fontFamily: 'var(--font-heading)' }}>
                5 คำ
              </strong>
            </div>
          </div>
        </div>

        {/* PC Mascot Box */}
        <div className="retro-box" style={{
          backgroundColor: '#EFF6FF',
          padding: '16px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <PcMascot 
            size={100}
            speechText="คำแสลงไทยมีมากกว่าที่คุณคิด! มาเปิดโลกใหม่ไปด้วยกัน!"
          />
        </div>
      </aside>
    </div>
  );
}
