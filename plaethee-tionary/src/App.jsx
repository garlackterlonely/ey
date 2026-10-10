import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HomeView from './components/HomeView';
import SearchView from './components/SearchView';
import WordDetailView from './components/WordDetailView';
import SubmitSlangView from './components/SubmitSlangView';
import AdminView from './components/AdminView';
import ReportModal from './components/ReportModal';
import { Home, Search, Folder, PlusCircle, Shield } from 'lucide-react';
import { wordsApi } from './lib/supabase';
import { SEED_WORDS } from './data/seed-words';

export default function App() {
  const [activePage, setActivePage] = useState('home'); // 'home' | 'search' | 'detail' | 'submit' | 'admin_dashboard'
  const [words, setWords] = useState(SEED_WORDS);
  const [selectedWord, setSelectedWord] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [reportModalWord, setReportModalWord] = useState(null);

  const fetchWords = async () => {
    try {
      const res = await wordsApi.getApprovedWords();
      if (res.data && res.data.length > 0) {
        setWords(res.data);
      }
    } catch {
      setWords(SEED_WORDS);
    }
  };

  useEffect(() => {
    fetchWords();
  }, []);

  const handleSelectWord = (word) => {
    setSelectedWord(word);
    setActivePage('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (term) => {
    setSearchQuery(term);
    setActivePage('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
    setSearchQuery('');
    setActivePage('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 1. Header with Sky Banner & Mascot */}
      <Header
        activePage={activePage}
        setActivePage={(page) => {
          setActivePage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 2. Main Page Content */}
      <div className="app-container" style={{ flex: 1, paddingBottom: '30px' }}>
        {activePage === 'home' && (
          <HomeView
            words={words}
            onSelectWord={handleSelectWord}
            onSearch={handleSearch}
            onSelectCategory={handleCategorySelect}
            onNavigateToSearch={() => {
              setSearchQuery('');
              setActivePage('search');
            }}
            onNavigateToSubmit={() => setActivePage('submit')}
            onNavigateToReport={() => setReportModalWord(words[0])}
          />
        )}

        {activePage === 'search' && (
          <SearchView
            words={words}
            initialQuery={searchQuery}
            initialCategory={selectedCategory}
            onSelectWord={handleSelectWord}
            onCategorySelect={handleCategorySelect}
          />
        )}

        {activePage === 'detail' && (
          <WordDetailView
            word={selectedWord || words[0]}
            onBack={() => setActivePage('home')}
            onOpenReport={(w) => setReportModalWord(w)}
          />
        )}

        {activePage === 'submit' && (
          <SubmitSlangView
            onWordSubmitted={() => {
              fetchWords();
            }}
            onBackToHome={() => setActivePage('home')}
          />
        )}

        {activePage === 'admin_dashboard' && (
          <AdminView
            onBackToHome={() => setActivePage('home')}
            onDataChanged={() => fetchWords()}
          />
        )}
      </div>

      {/* 3. Footer matching reference image */}
      <footer className="app-footer">
        <div className="app-container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
            <span style={{ color: '#FDE047', marginRight: '4px' }}>⭐</span>
            <a href="#home" onClick={(e) => { e.preventDefault(); setActivePage('home'); }} className="footer-link">หน้าแรก</a>
            <span>|</span>
            <a href="#search" onClick={(e) => { e.preventDefault(); setActivePage('search'); }} className="footer-link">ค้นหาคำศัพท์</a>
            <span>|</span>
            <a href="#category" onClick={(e) => { e.preventDefault(); setActivePage('search'); }} className="footer-link">หมวดหมู่</a>
            <span>|</span>
            <a href="#submit" onClick={(e) => { e.preventDefault(); setActivePage('submit'); }} className="footer-link">ส่งคำศัพท์ใหม่</a>
            <span>|</span>
            <a href="#report" onClick={(e) => { e.preventDefault(); setReportModalWord(words[0]); }} className="footer-link">รายงานข้อมูลผิด</a>
            <span>|</span>
            <a href="#admin" onClick={(e) => { e.preventDefault(); setActivePage('admin_dashboard'); }} className="footer-link">ระบบแอดมิน</a>
          </div>

          <div style={{ color: '#94A3B8', fontSize: '0.8rem' }}>
            แปลทีดิtionary &copy; 2026 &bull; งงคำไหน แปลทีดิ! 😊
          </div>
        </div>
      </footer>

      {/* 4. Mobile Bottom Navigation Bar (Bottom-Right screen in reference image) */}
      <nav className="mobile-bottom-bar">
        <button
          className={`mobile-nav-btn ${activePage === 'home' ? 'active' : ''}`}
          onClick={() => setActivePage('home')}
        >
          <Home size={18} />
          <span>หน้าแรก</span>
        </button>
        <button
          className={`mobile-nav-btn ${activePage === 'search' ? 'active' : ''}`}
          onClick={() => setActivePage('search')}
        >
          <Search size={18} />
          <span>ค้นหา</span>
        </button>
        <button
          className={`mobile-nav-btn ${activePage === 'submit' ? 'active' : ''}`}
          onClick={() => setActivePage('submit')}
        >
          <PlusCircle size={18} />
          <span>ส่งคำใหม่</span>
        </button>
        <button
          className={`mobile-nav-btn ${activePage === 'admin_dashboard' ? 'active' : ''}`}
          onClick={() => setActivePage('admin_dashboard')}
        >
          <Shield size={18} />
          <span>แอดมิน</span>
        </button>
      </nav>

      {/* 5. Report Modal */}
      {reportModalWord && (
        <ReportModal
          word={reportModalWord}
          onClose={() => setReportModalWord(null)}
        />
      )}
    </div>
  );
}
