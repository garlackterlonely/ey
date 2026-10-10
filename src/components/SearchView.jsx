import React, { useState } from 'react';
import { Search, ChevronRight, ChevronLeft, Lightbulb } from 'lucide-react';
import { RetroFolderIcon, WordIcon } from './Mascots';
import { SEED_CATEGORIES } from '../data/seed-words';

export default function SearchView({ 
  words, 
  initialQuery = '', 
  initialCategory = '',
  onSelectWord,
  onCategorySelect
}) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'exclaim' | 'personality' | 'other'
  const [currentPage, setCurrentPage] = useState(1);

  const categories = SEED_CATEGORIES.filter(c => c.type === 'category');

  // Filter logic
  let filtered = words.filter(w => {
    const q = searchQuery.trim().toLowerCase();
    const matchSearch = !q || w.word.toLowerCase().includes(q) || w.meaning.toLowerCase().includes(q);
    
    if (activeTab === 'exclaim') {
      return matchSearch && (w.categories || []).some(c => c.includes('คำอุทาน'));
    }
    if (activeTab === 'personality') {
      return matchSearch && (w.categories || []).some(c => c.includes('คน') || c.includes('ลักษณะนิสัย'));
    }
    if (activeTab === 'other') {
      return matchSearch && (w.categories || []).some(c => !c.includes('คำอุทาน') && !c.includes('คน'));
    }
    return matchSearch;
  });

  const totalResults = filtered.length;
  const itemsPerPage = 6;
  const totalPages = Math.max(1, Math.ceil(totalResults / itemsPerPage));
  const displayedWords = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  return (
    <div style={{ marginTop: '16px' }}>
      {/* Top Search Sub-header on Search Page */}
      <div style={{
        backgroundColor: '#FFFFFF',
        border: '2px solid var(--card-border)',
        borderRadius: 'var(--radius-md)',
        padding: '12px 16px',
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        {/* Breadcrumb / Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: 600 }}>
          <span>🏠 หน้าแรก</span>
          <span>&gt;</span>
          <span style={{ color: 'var(--btn-blue)' }}>🔍 ค้นหาคำศัพท์</span>
        </div>

        {/* Inline Search Bar */}
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '8px', flex: '1 1 320px', maxWidth: '520px' }}>
          <input
            type="text"
            className="form-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหาคำศัพท์ หรือความหมาย..."
            style={{ height: '40px', fontSize: '0.92rem' }}
          />
          <button type="submit" className="yellow-search-btn" style={{ padding: '6px 18px', fontSize: '0.9rem' }}>
            <Search size={16} /> <span>ค้นหา</span>
          </button>
        </form>
      </div>

      {/* Grid: 2 Columns (Left: Categories, Right: Search Results & Filter Tabs) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '16px' }}>
        
        {/* Left Sidebar */}
        <aside style={{ gridColumn: 'span 4' }}>
          <div className="retro-box">
            <div className="retro-box-header">
              <span>📁 หมวดหมู่คำแสลง</span>
            </div>
            <div style={{ padding: '8px' }}>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className="category-item-btn"
                  onClick={() => {
                    setSearchQuery('');
                    if (cat.name.includes('อุทาน')) setActiveTab('exclaim');
                    else if (cat.name.includes('คน')) setActiveTab('personality');
                    else setActiveTab('all');
                  }}
                >
                  <RetroFolderIcon size={18} />
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

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

        {/* Center / Right Results Area */}
        <main style={{ gridColumn: 'span 8' }}>
          {/* Filter Tabs matching Top-Right image */}
          <div style={{
            display: 'flex',
            gap: '6px',
            marginBottom: '12px',
            borderBottom: '2px solid var(--card-border)',
            paddingBottom: '8px',
            flexWrap: 'wrap'
          }}>
            <button
              className={`btn btn-sm ${activeTab === 'all' ? 'btn-detail-blue' : ''}`}
              onClick={() => { setActiveTab('all'); setCurrentPage(1); }}
            >
              ทั้งหมด ({words.length})
            </button>
            <button
              className={`btn btn-sm ${activeTab === 'exclaim' ? 'btn-detail-blue' : ''}`}
              onClick={() => { setActiveTab('exclaim'); setCurrentPage(1); }}
            >
              คำอุทาน ({words.filter(w => (w.categories || []).some(c => c.includes('คำอุทาน'))).length})
            </button>
            <button
              className={`btn btn-sm ${activeTab === 'personality' ? 'btn-detail-blue' : ''}`}
              onClick={() => { setActiveTab('personality'); setCurrentPage(1); }}
            >
              คน / ลักษณะนิสัย ({words.filter(w => (w.categories || []).some(c => c.includes('คน'))).length})
            </button>
            <button
              className={`btn btn-sm ${activeTab === 'other' ? 'btn-detail-blue' : ''}`}
              onClick={() => { setActiveTab('other'); setCurrentPage(1); }}
            >
              อื่น ๆ ({words.filter(w => (w.categories || []).some(c => !c.includes('คำอุทาน') && !c.includes('คน'))).length})
            </button>
          </div>

          {/* Results Box */}
          <div className="retro-box">
            <div className="retro-box-header" style={{ backgroundColor: '#F8FAFC' }}>
              <span>
                ผลการค้นหา {searchQuery ? `"${searchQuery}"` : ''} ({totalResults} รายการ)
              </span>
            </div>

            {displayedWords.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 16px', color: 'var(--text-muted)' }}>
                <p style={{ fontSize: '1.2rem', marginBottom: '8px' }}>🔍 ไม่พบคำแสลงที่ตรงกับการค้นหา</p>
                <p style={{ fontSize: '0.88rem' }}>ลองเปลี่ยนคำค้นหา หรือเลือกหมวดหมู่อื่นดูนะครับ</p>
              </div>
            ) : (
              <div>
                {displayedWords.map((item) => (
                  <div
                    key={item.id}
                    className="popular-word-row"
                    onClick={() => onSelectWord(item)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <WordIcon type={item.icon_type} size={20} />
                      </div>
                      <div>
                        <strong style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem' }}>
                          {item.word}
                        </strong>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginLeft: '8px' }}>
                          หมายถึง {item.meaning}
                        </span>
                      </div>
                    </div>

                    <span className="badge-pill-category">
                      {item.categories && item.categories[0]}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
                padding: '14px',
                borderTop: '1px solid #EDF2F7',
                backgroundColor: '#F8FAFC'
              }}>
                <button
                  className="btn btn-sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  style={{ padding: '4px 10px' }}
                >
                  <ChevronLeft size={16} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    className={`btn btn-sm ${currentPage === pageNum ? 'btn-detail-blue' : ''}`}
                    onClick={() => setCurrentPage(pageNum)}
                    style={{ width: '32px', padding: '4px 0', textAlign: 'center' }}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  className="btn btn-sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  style={{ padding: '4px 10px' }}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
