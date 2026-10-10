import React, { useState, useEffect } from 'react';
import { X, Shield, Check, Ban, Edit3, AlertTriangle, LogOut, Search, Clock, CheckCircle, RefreshCw } from 'lucide-react';
import { wordsApi, authApi, isLiveSupabase } from '../lib/supabase';

export default function AdminPortal({ isOpen, onClose, onDataChanged }) {
  const [currentUser, setCurrentUser] = useState(authApi.getCurrentAdmin());
  const [activeTab, setActiveTab] = useState('pending'); // 'pending' | 'published' | 'reports'

  // Login form state
  const [email, setEmail] = useState('admin@plaethee.com');
  const [password, setPassword] = useState('admin123');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Data states
  const [pendingWords, setPendingWords] = useState([]);
  const [publishedWords, setPublishedWords] = useState([]);
  const [reports, setReports] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [searchPub, setSearchPub] = useState('');

  // Reject modal state
  const [rejectModalWord, setRejectModalWord] = useState(null);
  const [rejectReason, setRejectReason] = useState('ข้อมูลซ้ำซ้อนหรือไม่ตรงตามเกณฑ์พจนานุกรม');

  // Edit modal state
  const [editingWord, setEditingWord] = useState(null);
  const [editFormData, setEditFormData] = useState({
    meaning: '',
    example: '',
    language_level: 'informal'
  });

  useEffect(() => {
    if (currentUser) {
      loadAllAdminData();
    }
  }, [currentUser, activeTab]);

  const loadAllAdminData = async () => {
    setLoadingData(true);
    try {
      if (activeTab === 'pending') {
        const res = await wordsApi.getPendingWords();
        setPendingWords(res.data || []);
      } else if (activeTab === 'published') {
        const res = await wordsApi.getApprovedWords({ search: searchPub });
        setPublishedWords(res.data || []);
      } else if (activeTab === 'reports') {
        const res = await wordsApi.getReports();
        setReports(res.data || []);
      }
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoadingData(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    const res = await authApi.login(email, password);
    setLoginLoading(false);
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

  const handleApprove = async (id) => {
    if (!window.confirm('ยืนยันการอนุมัติคำศัพท์นี้ให้เผยแพร่ทันที?')) return;
    await wordsApi.approveWord(id);
    loadAllAdminData();
    if (onDataChanged) onDataChanged();
  };

  const handleRejectConfirm = async () => {
    if (!rejectModalWord) return;
    await wordsApi.rejectWord(rejectModalWord.id, rejectReason);
    setRejectModalWord(null);
    loadAllAdminData();
    if (onDataChanged) onDataChanged();
  };

  const handleStartEdit = (word) => {
    setEditingWord(word);
    setEditFormData({
      meaning: word.meaning || '',
      example: word.example || '',
      language_level: word.language_level || 'informal'
    });
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingWord) return;
    await wordsApi.updateWord(editingWord.id, editFormData);
    setEditingWord(null);
    loadAllAdminData();
    if (onDataChanged) onDataChanged();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1200 }}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '820px', width: '95%' }}
      >
        {/* Header */}
        <div className="modal-header" style={{ backgroundColor: 'var(--accent-yellow)' }}>
          <div className="modal-title">
            <Shield size={22} color="var(--text-main)" />
            <span>ระบบแอดมิน: แปลทีดิtionary</span>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="modal-body" style={{ padding: '20px' }}>
          {!currentUser ? (
            /* Login Form */
            <div style={{ maxWidth: '400px', margin: '20px auto', textAlign: 'center' }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--accent-yellow)',
                border: '2px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                boxShadow: 'var(--shadow-retro-sm)'
              }}>
                <Shield size={32} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', marginBottom: '8px' }}>
                เข้าสู่ระบบผู้ดูแลระบบ
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '18px' }}>
                {isLiveSupabase 
                  ? 'เข้าสู่ระบบด้วยบัญชีแอดมินของ Supabase Auth' 
                  : 'โหมดทดสอบ: ใช้อีเมลแอดมินเพื่อตรวจสอบคำศัพท์ได้ทันที'}
              </p>

              {loginError && (
                <div style={{
                  backgroundColor: '#FEE2E2',
                  border: '1px solid #FCA5A5',
                  color: '#991B1B',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '14px',
                  fontSize: '0.85rem'
                }}>
                  {loginError}
                </div>
              )}

              <form onSubmit={handleLogin} style={{ textAlign: 'left' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="admin-email">อีเมลแอดมิน</label>
                  <input
                    id="admin-email"
                    type="text"
                    className="form-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@plaethee.com"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="admin-password">รหัสผ่าน</label>
                  <input
                    id="admin-password"
                    type="password"
                    className="form-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                  <div className="form-hint">
                    💡 รหัสผ่านเดโม: <strong>admin123</strong>
                  </div>
                </div>

                <button
                  id="btn-admin-login-submit"
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', marginTop: '10px' }}
                  disabled={loginLoading}
                >
                  {loginLoading ? 'กำลังตรวจสอบ...' : 'เข้าสู่ระบบแอดมิน'}
                </button>
              </form>
            </div>
          ) : (
            /* Logged in Admin Dashboard */
            <div>
              {/* User Bar */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '14px',
                borderBottom: '2px solid var(--border-color)',
                marginBottom: '16px',
                flexWrap: 'wrap',
                gap: '8px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="badge-level informal" style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}>
                    🛡️ Admin: {currentUser.email}
                  </span>
                  <button 
                    className="btn btn-sm"
                    onClick={loadAllAdminData} 
                    title="รีเฟรชข้อมูล"
                    style={{ padding: '4px 8px' }}
                  >
                    <RefreshCw size={13} className={loadingData ? 'spin' : ''} />
                  </button>
                </div>

                <button 
                  className="btn btn-sm" 
                  onClick={handleLogout}
                  style={{ color: '#B91C1C', borderColor: '#FCA5A5' }}
                >
                  <LogOut size={14} /> ออกจากระบบ
                </button>
              </div>

              {/* Tabs */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '18px', borderBottom: '2px solid #E5E1D8', paddingBottom: '10px' }}>
                <button
                  id="tab-pending-words"
                  className={`btn btn-sm ${activeTab === 'pending' ? 'btn-primary' : ''}`}
                  onClick={() => setActiveTab('pending')}
                >
                  <Clock size={15} />
                  <span>คำรอตรวจสอบ ({pendingWords.length})</span>
                </button>

                <button
                  id="tab-published-words"
                  className={`btn btn-sm ${activeTab === 'published' ? 'btn-secondary' : ''}`}
                  onClick={() => setActiveTab('published')}
                >
                  <Edit3 size={15} />
                  <span>แก้ไขคำที่เผยแพร่แล้ว</span>
                </button>

                <button
                  id="tab-reports-list"
                  className={`btn btn-sm ${activeTab === 'reports' ? 'btn-yellow' : ''}`}
                  onClick={() => setActiveTab('reports')}
                >
                  <AlertTriangle size={15} />
                  <span>รายงานปัญหา ({reports.length})</span>
                </button>
              </div>

              {/* Tab 1: คำรอตรวจสอบ */}
              {activeTab === 'pending' && (
                <div>
                  <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: '10px' }}>
                    รายการคำศัพท์ที่ผู้ใช้ส่งมา (รอการอนุมัติ)
                  </h4>

                  {loadingData ? (
                    <p style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)' }}>กำลังโหลด...</p>
                  ) : pendingWords.length === 0 ? (
                    <div style={{
                      textAlign: 'center',
                      padding: '36px 16px',
                      backgroundColor: 'var(--bg-subtle)',
                      borderRadius: 'var(--radius-md)',
                      border: '2px dashed var(--border-color)'
                    }}>
                      <CheckCircle size={40} color="var(--accent-green)" style={{ margin: '0 auto 8px' }} />
                      <p style={{ fontWeight: 600 }}>ไม่มีคำศัพท์ค้างรอตรวจสอบในขณะนี้!</p>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>เมื่อผู้ใช้ส่งคำใหม่ จะปรากฏที่นี่เพื่อให้คุณอนุมัติ</p>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {pendingWords.map(word => (
                        <div key={word.id} className="retro-card" style={{ padding: '16px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                            <div>
                              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700 }}>
                                {word.word}
                              </h3>
                              <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
                                <span className={`badge-level ${word.language_level || 'informal'}`}>
                                  {word.language_level}
                                </span>
                                {(word.categories || []).map((cat, i) => (
                                  <span key={i} className="badge-tag">{cat}</span>
                                ))}
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button
                                className="btn btn-sm btn-primary"
                                onClick={() => handleApprove(word.id)}
                                style={{ backgroundColor: 'var(--accent-green)', borderColor: 'var(--border-color)' }}
                              >
                                <Check size={14} /> อนุมัติ
                              </button>
                              <button
                                className="btn btn-sm"
                                onClick={() => setRejectModalWord(word)}
                                style={{ color: '#B91C1C', borderColor: '#FCA5A5' }}
                              >
                                <Ban size={14} /> ปฏิเสธ
                              </button>
                            </div>
                          </div>

                          <p style={{ fontSize: '0.92rem', marginBottom: '6px' }}>
                            <strong>ความหมาย:</strong> {word.meaning}
                          </p>
                          {word.example && (
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', backgroundColor: 'var(--bg-subtle)', padding: '6px 10px', borderRadius: 'var(--radius-sm)' }}>
                              <strong>ตัวอย่าง:</strong> {word.example}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: แก้ไขคำที่เผยแพร่แล้ว */}
              {activeTab === 'published' && (
                <div>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="ค้นหาคำเพื่อแก้ไข..."
                      value={searchPub}
                      onChange={(e) => setSearchPub(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && loadAllAdminData()}
                    />
                    <button className="btn btn-sm btn-secondary" onClick={loadAllAdminData}>
                      <Search size={15} /> ค้นหา
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {publishedWords.map(word => (
                      <div key={word.id} className="retro-card" style={{ padding: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <strong style={{ fontSize: '1.1rem', fontFamily: 'var(--font-heading)' }}>{word.word}</strong>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {word.meaning}
                          </p>
                        </div>
                        <button className="btn btn-sm" onClick={() => handleStartEdit(word)}>
                          <Edit3 size={14} /> แก้ไขข้อมูล
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 3: รายงานปัญหาจากผู้ใช้ */}
              {activeTab === 'reports' && (
                <div>
                  <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: '10px' }}>
                    รายการแจ้งข้อมูลผิดจากผู้ใช้
                  </h4>
                  {reports.length === 0 ? (
                    <p style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)' }}>ไม่มีรายงานปัญหา</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {reports.map(rep => (
                        <div key={rep.id} className="retro-card" style={{ padding: '14px', borderLeft: '4px solid #DC2626' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                            <strong>คำที่รายงาน: {rep.word_title || rep.words?.word || rep.word_id}</strong>
                            <span className="badge-tag" style={{ color: '#B91C1C' }}>{rep.report_type}</span>
                          </div>
                          <p style={{ fontSize: '0.88rem', color: 'var(--text-main)' }}>
                            <strong>รายละเอียด:</strong> {rep.details}
                          </p>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
                            เวลาที่แจ้ง: {new Date(rep.created_at).toLocaleString('th-TH')}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sub-modal: Reject Confirmation */}
        {rejectModalWord && (
          <div className="modal-overlay" style={{ zIndex: 1300 }}>
            <div className="modal-content" style={{ maxWidth: '440px' }}>
              <div className="modal-header" style={{ backgroundColor: '#FEE2E2' }}>
                <h4 style={{ fontFamily: 'var(--font-heading)', color: '#991B1B' }}>
                  ปฏิเสธคำว่า "{rejectModalWord.word}"
                </h4>
                <button className="modal-close-btn" onClick={() => setRejectModalWord(null)}>
                  <X size={16} />
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">ระบุเหตุผลการปฏิเสธ</label>
                  <textarea
                    className="form-textarea"
                    rows={3}
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                  <button className="btn btn-sm" onClick={() => setRejectModalWord(null)}>
                    ยกเลิก
                  </button>
                  <button 
                    className="btn btn-sm"
                    onClick={handleRejectConfirm}
                    style={{ backgroundColor: '#DC2626', color: '#FFF' }}
                  >
                    ยืนยันการปฏิเสธ
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sub-modal: Edit Word */}
        {editingWord && (
          <div className="modal-overlay" style={{ zIndex: 1300 }}>
            <div className="modal-content" style={{ maxWidth: '500px' }}>
              <div className="modal-header">
                <h4 style={{ fontFamily: 'var(--font-heading)' }}>
                  แก้ไขคำศัพท์: "{editingWord.word}"
                </h4>
                <button className="modal-close-btn" onClick={() => setEditingWord(null)}>
                  <X size={16} />
                </button>
              </div>
              <form onSubmit={handleSaveEdit}>
                <div className="modal-body">
                  <div className="form-group">
                    <label className="form-label">ความหมาย</label>
                    <textarea
                      className="form-textarea"
                      rows={3}
                      value={editFormData.meaning}
                      onChange={(e) => setEditFormData({ ...editFormData, meaning: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">ตัวอย่างประโยค</label>
                    <textarea
                      className="form-textarea"
                      rows={3}
                      value={editFormData.example}
                      onChange={(e) => setEditFormData({ ...editFormData, example: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">ระดับภาษา</label>
                    <select
                      className="form-select"
                      value={editFormData.language_level}
                      onChange={(e) => setEditFormData({ ...editFormData, language_level: e.target.value })}
                    >
                      <option value="informal">ไม่เป็นทางการ</option>
                      <option value="slang">ภาษาปาก/สแลง</option>
                      <option value="vulgar">หยาบ</option>
                      <option value="offensive">หยาบมาก</option>
                    </select>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', padding: '12px 20px', borderTop: '2px solid #E5E1D8' }}>
                  <button type="button" className="btn btn-sm" onClick={() => setEditingWord(null)}>
                    ยกเลิก
                  </button>
                  <button type="submit" className="btn btn-sm btn-primary">
                    บันทึกการแก้ไข
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
