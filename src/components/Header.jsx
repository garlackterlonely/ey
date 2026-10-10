import React from 'react';
import { Home, Search, Folder, PlusCircle, Shield, Info } from 'lucide-react';
import { CatMascot } from './Mascots';

export default function Header({ activePage, setActivePage, onSearchClick }) {
  return (
    <header className="top-banner">
      <div className="banner-sparkles" />
      <div className="banner-skyline" />

      {/* Main Top Area: Logo + Cat Mascot */}
      <div className="app-container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 12px 12px',
        position: 'relative',
        zIndex: 2,
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        {/* Logo and Slogan */}
        <div 
          onClick={() => setActivePage('home')}
          style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
        >
          <div className="logo-title">
            <span style={{ fontSize: '1.9rem', marginRight: '4px' }}>📖</span>
            <span className="logo-thai">แปลทีดิ</span>
            <span className="logo-eng">tionary</span>
            <span style={{ fontSize: '1.4rem', marginLeft: '4px' }}>⭐</span>
          </div>
          <div className="logo-slogan-pill">
            งงคำไหน แปลทีดิ!
          </div>
        </div>

        {/* Mascot Cat with Speech Bubble */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <CatMascot 
            size={90}
            speechText="คำแสลงเยอะ ไม่ต้องงง แค่แปลทีดิ!"
          />
        </div>
      </div>

      {/* Sub Navigation Bar */}
      <nav className="subnav-bar">
        <div className="app-container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap'
        }}>
          {/* Main Nav Tabs */}
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              className={`nav-link-btn ${activePage === 'home' ? 'active' : ''}`}
              onClick={() => setActivePage('home')}
            >
              <Home size={16} /> หน้าแรก
            </button>
            <button
              className={`nav-link-btn ${activePage === 'search' ? 'active' : ''}`}
              onClick={() => setActivePage('search')}
            >
              <Search size={16} /> ค้นหาคำศัพท์
            </button>
            <button
              className={`nav-link-btn ${activePage === 'categories' ? 'active' : ''}`}
              onClick={() => {
                setActivePage('search');
              }}
            >
              <Folder size={16} /> หมวดหมู่
            </button>
            <button
              className={`nav-link-btn ${activePage === 'submit' ? 'active' : ''}`}
              onClick={() => setActivePage('submit')}
            >
              <PlusCircle size={16} /> ส่งคำศัพท์ใหม่
            </button>
          </div>

          {/* Right Nav: Admin link */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button
              className={`nav-link-btn ${activePage.startsWith('admin') ? 'active' : ''}`}
              onClick={() => setActivePage('admin_dashboard')}
              style={{ fontSize: '0.85rem', color: '#FEF08A' }}
            >
              <Shield size={15} /> ระบบแอดมิน
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
