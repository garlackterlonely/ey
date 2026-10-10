import React, { useState, useEffect } from 'react';
import { Lock, Clock, Folder, AlertTriangle, Settings, Check, X, LogOut, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { PcMascot } from './Mascots';
import { authApi, wordsApi } from '../lib/supabase';
import { SEED_PENDING_WORDS } from '../data/seed-words';

export default function AdminView({ onBackToHome, onDataChanged }) {
  const [currentUser, setCurrentUser] = useState(authApi.getCurrentAdmin());
  const [activeTab, setActiveTab] = useState('pending'); // 'pending' | 'all' | 'reports' | 'settings'

  // Login state
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('admin123');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  // Pending queue
  const [pendingList, setPendingList] = useState(SEED_PENDING_WORDS);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadPendingFromStorage();
  }, []);

  const loadPendingFromStorage = async () => {
    try {
      const res = await wordsApi.getPendingWords();
      if (res.data && res.data.length > 0) {
        setPendingList([...res.data, ...SEED_PENDING_WORDS]);
      } else {
        setPendingList(SEED_PENDING_WORDS);
      }
    } catch {
      setPendingList(SEED_PENDING_WORDS);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoading(true);
    const res = await authApi.login(email, password);
    setLoading(false);
    if (res.error) {
      setLoginError(res.error);
    } else {
      setCurrentUser(res.user);
    }
  };

  const handleLogout = () => {
    authApi.logout();
    setCurrentUser(null);
  };

  const handleApprove = async (item) => {
    if (!window.confirm(`ยืนยันการอนุมัติคำว่า "${item.word}" ให้เผยแพร่?`)) return;
    try {
      await wordsApi.approveWord(item.id);
    } catch {}
    setPendingList(prev => prev.filter(w => w.id !== item.id));
    if (onDataChanged) onDataChanged();
  };

  const handleReject = async (item) => {
    const reason = window.prompt(`ระบุเหตุผลการปฏิเสธคำว่า "${item.word}":`, 'ข้อมูลไม่ตรงตามเกณฑ์พจนานุกรม');
    if (reason === null) return;
    try {
      await wordsApi.rejectWord(item.id, reason);
    } catch {}
    setPendingList(prev => prev.filter(w => w.id !== item.id));
    if (onDataChanged) onDataChanged();
  };

  // If Not Logged In: Show Bottom-Left screen (เข้าสู่ระบบแอดมิน)
  if (!currentUser) {
    return (
      <div style={{ maxWidth: '640px', margin: '40px auto' }}>
        <div className="retro-box" style={{
          padding: '32px 24px',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)'
        }}>
          {/* Header matching Bottom-Left image */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '6px'
          }}>
            <span style={{ fontSize: '1.6rem' }}>🔐</span>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.6rem',
              fontWeight: 800,
              color: 'var(--text-dark-blue)'
            }}>
              เข้าสู่ระบบแอดมิน
            </h2>
          </div>
          <p style={{ textAlign: 'center', fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '28px' }}>
            กรุณาเข้าสู่ระบบเพื่อจัดการข้อมูลคำศัพท์
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '24px',
            alignItems: 'center'
          }}>
            {/* Left Mascot matching image: PC screen with 'แอดมินเท่านั้น!' */}
            <div style={{
              gridColumn: 'span 5',
              backgroundColor: '#EFF6FF',
              border: '2px dashed #93C5FD',
              borderRadius: 'var(--radius-md)',
              padding: '20px 10px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <PcMascot 
                size={90}
                speechText="แอดมินเท่านั้น!"
              />
            </div>

            {/* Right Login Form */}
            <form onSubmit={handleLogin} style={{ gridColumn: 'span 7' }}>
              {loginError && (
                <div style={{
                  backgroundColor: '#FEE2E2',
                  border: '1px solid #FCA5A5',
                  color: '#991B1B',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '12px',
                  fontSize: '0.84rem'
                }}>
                  {loginError}
                </div>
              )}

              <div className="form-group">
                <label className="form-label" style={{ fontSize: '0.88rem' }}>อีเมล</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ height: '42px', fontSize: '0.9rem' }}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontSize: '0.88rem' }}>รหัสผ่าน</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ height: '42px', fontSize: '0.9rem' }}
                  required
                />
              </div>

              <button
                type="submit"
                className="yellow-search-btn"
                style={{ width: '100%', justifyContent: 'center', padding: '10px' }}
                disabled={loading}
              >
                {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
              </button>

              <div style={{ textAlign: 'center', marginTop: '12px' }}>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('รหัสผ่านเริ่มต้นคือ admin123'); }} style={{ fontSize: '0.78rem', color: 'var(--btn-blue)', textDecoration: 'underline' }}>
                  ลืมรหัสผ่าน? (เดโม: admin123)
                </a>
              </div>
            </form>
          </div>

        </div>
      </div>
    );
  }

  // If Logged In: Show Bottom-Center screen (แดชบอร์ดจัดการคำศัพท์)
  return (
    <div style={{ marginTop: '16px' }}>
      {/* Top Admin Header Bar */}
      <div style={{
        backgroundColor: '#1E40AF',
        color: '#FFFFFF',
        borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
        padding: '10px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.2rem' }}>⚙️</span>
          <strong style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem' }}>
            แผงควบคุมระบบแอดมิน: แปลทีดิtionary
          </strong>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '0.8rem',
            backgroundColor: 'rgba(255,255,255,0.15)',
            padding: '3px 10px',
            borderRadius: 'var(--radius-full)'
          }}>
            <User size={14} /> Admin ({currentUser.email || 'แอดมิน'})
          </span>
          <button
            onClick={handleLogout}
            style={{
              background: 'none',
              border: 'none',
              color: '#FCA5A5',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.8rem',
              fontWeight: 600
            }}
          >
            <LogOut size={14} /> ออกจากระบบ
          </button>
        </div>
      </div>

      {/* Main Admin Content: 2 Columns matching image */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        border: '2px solid var(--card-border)',
        borderTop: 'none',
        borderRadius: '0 0 var(--radius-md) var(--radius-md)',
        backgroundColor: '#FFFFFF',
        overflow: 'hidden'
      }}>
        
        {/* Left Sidebar Menu */}
        <aside style={{
          gridColumn: 'span 3',
          backgroundColor: '#F8FAFC',
          borderRight: '2px solid #E2E8F0',
          padding: '12px 8px'
        }}>
          <button
            className={`category-item-btn ${activeTab === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveTab('pending')}
            style={{ marginBottom: '4px', justifyContent: 'space-between' }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={16} color="#D97706" /> คำที่รอตรวจสอบ
            </span>
            <span style={{
              backgroundColor: '#FEF3C7',
              color: '#92400E',
              fontSize: '0.72rem',
              fontWeight: 700,
              padding: '1px 7px',
              borderRadius: 'var(--radius-full)'
            }}>
              {pendingList.length}
            </span>
          </button>

          <button
            className={`category-item-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
            style={{ marginBottom: '4px' }}
          >
            <Folder size={16} color="var(--btn-blue)" /> คำศัพท์ทั้งหมด
          </button>

          <button
            className={`category-item-btn ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveTab('reports')}
            style={{ marginBottom: '4px' }}
          >
            <AlertTriangle size={16} color="#DC2626" /> รายงานข้อมูลผิด
          </button>

          <button
            className={`category-item-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings size={16} color="#64748B" /> ตั้งค่า
          </button>
        </aside>

        {/* Right Table Panel: คำที่รอตรวจสอบ */}
        <main style={{ gridColumn: 'span 9', padding: '16px' }}>
          <h3 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.15rem',
            fontWeight: 700,
            marginBottom: '12px',
            color: 'var(--text-dark-blue)'
          }}>
            คำที่รอตรวจสอบ ({pendingList.length} คำ)
          </h3>

          {/* Table matching Bottom-Center image */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '0.86rem',
              textAlign: 'left'
            }}>
              <thead>
                <tr style={{ backgroundColor: '#F1F5F9', borderBottom: '2px solid #CBD5E1' }}>
                  <th style={{ padding: '10px 12px', fontWeight: 700 }}>คำศัพท์</th>
                  <th style={{ padding: '10px 12px', fontWeight: 700 }}>ผู้ส่ง</th>
                  <th style={{ padding: '10px 12px', fontWeight: 700 }}>วันที่ส่ง</th>
                  <th style={{ padding: '10px 12px', fontWeight: 700 }}>สถานะ</th>
                  <th style={{ padding: '10px 12px', fontWeight: 700, textAlign: 'center' }}>จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {pendingList.map((item) => (
                  <tr key={item.id} style={{ borderBottom: '1px solid #E2E8F0' }}>
                    <td style={{ padding: '10px 12px', fontWeight: 700, color: 'var(--text-main)' }}>
                      {item.word}
                    </td>
                    <td style={{ padding: '10px 12px', color: 'var(--text-muted)' }}>
                      {item.sender || 'สมาชิกทั่วไป'}
                    </td>
                    <td style={{ padding: '10px 12px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                      {item.submitted_date || '24 เม.ย. 2568'}
                    </td>
                    <td style={{ padding: '10px 12px' }}>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        backgroundColor: '#FEF3C7',
                        color: '#B45309',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-full)',
                        border: '1px solid #FDE68A'
                      }}>
                        🟡 รอตรวจสอบ
                      </span>
                    </td>
                    <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                      <div style={{ display: 'inline-flex', gap: '4px' }}>
                        <button
                          className="btn btn-sm"
                          style={{ fontSize: '0.72rem', padding: '3px 8px', backgroundColor: '#EFF6FF', color: 'var(--btn-blue)' }}
                          onClick={() => alert(`คำศัพท์: ${item.word}\nความหมาย: ${item.meaning}\nตัวอย่าง: ${item.example || 'ไม่มี'}`)}
                        >
                          ดูรายละเอียด
                        </button>
                        <button
                          className="btn btn-sm"
                          style={{ fontSize: '0.72rem', padding: '3px 8px', backgroundColor: '#DCFCE7', color: '#15803D', borderColor: '#86EFAC' }}
                          onClick={() => handleApprove(item)}
                        >
                          <Check size={12} /> อนุมัติ
                        </button>
                        <button
                          className="btn btn-sm"
                          style={{ fontSize: '0.72rem', padding: '3px 8px', backgroundColor: '#FEE2E2', color: '#B91C1C', borderColor: '#FCA5A5' }}
                          onClick={() => handleReject(item)}
                        >
                          <X size={12} /> ปฏิเสธ
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination at bottom */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '6px',
            marginTop: '16px'
          }}>
            <button className="btn btn-sm" style={{ padding: '4px 8px' }} disabled>
              <ChevronLeft size={14} />
            </button>
            <button className="btn btn-sm btn-detail-blue" style={{ width: '28px', padding: '3px 0' }}>
              1
            </button>
            <button className="btn btn-sm" style={{ width: '28px', padding: '3px 0' }}>
              2
            </button>
            <button className="btn btn-sm" style={{ padding: '4px 8px' }}>
              <ChevronRight size={14} />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
