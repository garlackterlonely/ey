import React, { useState } from 'react';
import { Search, X, Filter, Sparkles, Clock, Tag } from 'lucide-react';
import { SEED_CATEGORIES } from '../data/seed-words';

export default function SearchBar({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategorySelect,
  selectedEra,
  onEraSelect,
  onClearFilters
}) {
  const [localInput, setLocalInput] = useState(searchTerm);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearchChange(localInput);
  };

  const categories = SEED_CATEGORIES.filter(c => c.type === 'category');
  const eras = SEED_CATEGORIES.filter(c => c.type === 'era');

  const hasActiveFilters = searchTerm || selectedCategory || selectedEra;

  return (
    <div style={{
      marginBottom: '28px',
      backgroundColor: '#FFFFFF',
      border: '2px solid var(--border-color)',
      borderRadius: 'var(--radius-lg)',
      padding: '20px',
      boxShadow: 'var(--shadow-retro)'
    }}>
      {/* Search Input Box */}
      <form onSubmit={handleSearchSubmit} style={{
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginBottom: '16px'
      }}>
        <div style={{
          flex: '1 1 280px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center'
        }}>
          <Search size={20} color="var(--text-muted)" style={{
            position: 'absolute',
            left: '14px',
            pointerEvents: 'none'
          }} />
          <input
            id="search-input"
            type="text"
            className="form-input"
            value={localInput}
            onChange={(e) => setLocalInput(e.target.value)}
            placeholder="พิมพ์คำแสลง หรือความหมาย เช่น ชีทำถึง, นอยด์, จ๊าบ..."
            style={{
              paddingLeft: '44px',
              paddingRight: localInput ? '40px' : '14px',
              height: '48px',
              fontSize: '1rem',
              fontWeight: 500
            }}
          />
          {localInput && (
            <button
              type="button"
              onClick={() => {
                setLocalInput('');
                onSearchChange('');
              }}
              style={{
                position: 'absolute',
                right: '12px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4px'
              }}
            >
              <X size={18} />
            </button>
          )}
        </div>

        <button
          id="btn-search-submit"
          type="submit"
          className="btn btn-primary"
          style={{ height: '48px', padding: '0 24px', fontSize: '1rem' }}
        >
          <Search size={18} />
          <span>ค้นหาคำ</span>
        </button>

        {hasActiveFilters && (
          <button
            type="button"
            className="btn btn-sm"
            onClick={() => {
              setLocalInput('');
              onClearFilters();
            }}
            style={{ height: '48px', color: 'var(--text-muted)' }}
          >
            <X size={16} />
            <span>ล้างตัวกรอง</span>
          </button>
        )}
      </form>

      {/* Filter Chips: Categories */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {/* Row 1: Era Filter Chips */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '0.82rem',
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            color: 'var(--secondary)',
            minWidth: '70px'
          }}>
            <Clock size={14} /> กาลเวลา:
          </span>
          <button
            type="button"
            className={`btn btn-sm ${!selectedEra ? 'btn-secondary' : ''}`}
            onClick={() => onEraSelect('')}
            style={{ padding: '4px 10px', fontSize: '0.8rem' }}
          >
            ทศวรรษทั้งหมด
          </button>
          {eras.map(e => (
            <button
              key={e.id}
              type="button"
              className={`btn btn-sm ${selectedEra === e.name ? 'btn-secondary' : ''}`}
              onClick={() => onEraSelect(selectedEra === e.name ? '' : e.name)}
              style={{ padding: '4px 10px', fontSize: '0.8rem' }}
            >
              {e.name}
            </button>
          ))}
        </div>

        {/* Row 2: Category Filter Chips */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '0.82rem',
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            color: 'var(--primary)',
            minWidth: '70px'
          }}>
            <Tag size={14} /> หมวดคำ:
          </span>
          <button
            type="button"
            className={`btn btn-sm ${!selectedCategory ? 'btn-primary' : ''}`}
            onClick={() => onCategorySelect('')}
            style={{ padding: '4px 10px', fontSize: '0.8rem' }}
          >
            ทุกหมวดหมู่
          </button>
          {categories.map(c => (
            <button
              key={c.id}
              type="button"
              className={`btn btn-sm ${selectedCategory === c.name ? 'btn-primary' : ''}`}
              onClick={() => onCategorySelect(selectedCategory === c.name ? '' : c.name)}
              style={{ padding: '4px 10px', fontSize: '0.8rem' }}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
