import { createClient } from '@supabase/supabase-js';
import { SEED_WORDS, SEED_CATEGORIES } from '../data/seed-words';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isLiveSupabase = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-project-id') &&
  supabaseUrl.startsWith('https://')
);

export const supabase = isLiveSupabase 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

// ==========================================================
// 📦 Local Mock Storage Engine (Persistent ใน LocalStorage)
// สำหรับทดสอบทันทีเมื่อยังไม่ได้ต่อ Supabase Credentials
// ==========================================================
const STORAGE_KEYS = {
  WORDS: 'plaethee_words_db',
  REPORTS: 'plaethee_reports_db',
  ADMIN_SESSION: 'plaethee_admin_session'
};

function initMockStorage() {
  if (typeof window === 'undefined') return;
  const existingWords = localStorage.getItem(STORAGE_KEYS.WORDS);
  if (!existingWords) {
    localStorage.setItem(STORAGE_KEYS.WORDS, JSON.stringify(SEED_WORDS));
  }
  const existingReports = localStorage.getItem(STORAGE_KEYS.REPORTS);
  if (!existingReports) {
    localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify([]));
  }
}

initMockStorage();

function getMockWords() {
  initMockStorage();
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.WORDS) || '[]');
  } catch {
    return [...SEED_WORDS];
  }
}

function saveMockWords(words) {
  localStorage.setItem(STORAGE_KEYS.WORDS, JSON.stringify(words));
}

function getMockReports() {
  initMockStorage();
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.REPORTS) || '[]');
  } catch {
    return [];
  }
}

function saveMockReports(reports) {
  localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
}

// ==========================================================
// 🔌 Unified API: ทำงานได้ทั้ง Supabase และ Mock Engine
// ==========================================================

export const wordsApi = {
  // ดึงเฉพาะคำที่ approved แล้ว พร้อมระบบค้นหาและกรอง
  async getApprovedWords({ search = '', category = '', era = '' } = {}) {
    if (isLiveSupabase) {
      try {
        let query = supabase
          .from('words')
          .select('*')
          .eq('status', 'approved')
          .order('created_at', { ascending: false });

        if (search.trim()) {
          query = query.or(`word.ilike.%${search.trim()}%,meaning.ilike.%${search.trim()}%`);
        }

        const { data, error } = await query;
        if (error) throw error;
        
        let filtered = data || [];
        if (category) {
          filtered = filtered.filter(w => (w.categories || []).includes(category));
        }
        if (era) {
          filtered = filtered.filter(w => (w.categories || []).includes(era));
        }
        return { data: filtered, error: null };
      } catch (err) {
        console.warn('Supabase query failed, falling back to local data:', err);
      }
    }

    // Mock Mode
    let words = getMockWords().filter(w => w.status === 'approved');

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      words = words.filter(w => 
        w.word.toLowerCase().includes(q) || 
        w.meaning.toLowerCase().includes(q) ||
        (w.example && w.example.toLowerCase().includes(q))
      );
    }

    if (category) {
      words = words.filter(w => (w.categories || []).includes(category));
    }

    if (era) {
      words = words.filter(w => (w.categories || []).includes(era));
    }

    return { data: words, error: null };
  },

  // ดึงรายละเอียดคำเดี่ยวตาม ID
  async getWordById(id) {
    if (isLiveSupabase) {
      try {
        const { data, error } = await supabase
          .from('words')
          .select('*')
          .eq('id', id)
          .single();
        if (error) throw error;
        return { data, error: null };
      } catch (err) {
        console.warn('Supabase getWordById failed, falling back:', err);
      }
    }

    const word = getMockWords().find(w => w.id === id);
    return { data: word || null, error: word ? null : 'Word not found' };
  },

  // ส่งคำศัพท์ใหม่ (สถานะบังคับเป็น pending เสมอ)
  async submitNewWord(wordData) {
    const payload = {
      ...wordData,
      id: 'w-' + Date.now(),
      status: 'pending',
      created_at: new Date().toISOString(),
      approved_at: null,
      rejection_reason: null
    };

    if (isLiveSupabase) {
      try {
        const { data, error } = await supabase
          .from('words')
          .insert([{
            word: wordData.word,
            meaning: wordData.meaning,
            example: wordData.example,
            example_context: wordData.example_context || '',
            language_level: wordData.language_level || 'informal',
            origin: wordData.origin || '',
            reference_url: wordData.reference_url || '',
            status: 'pending'
          }])
          .select();
        if (error) throw error;
        return { data, error: null };
      } catch (err) {
        console.warn('Supabase submitNewWord failed, saving locally:', err);
      }
    }

    const words = getMockWords();
    words.unshift(payload);
    saveMockWords(words);
    return { data: payload, error: null };
  },

  // สำหรับแอดมิน: ดึงคำศัพท์ที่รอตรวจสอบ (status = 'pending')
  async getPendingWords() {
    if (isLiveSupabase) {
      try {
        const { data, error } = await supabase
          .from('words')
          .select('*')
          .eq('status', 'pending')
          .order('created_at', { ascending: false });
        if (error) throw error;
        return { data: data || [], error: null };
      } catch (err) {
        console.warn('Supabase getPendingWords failed:', err);
      }
    }

    const words = getMockWords().filter(w => w.status === 'pending');
    return { data: words, error: null };
  },

  // สำหรับแอดมิน: อนุมัติคำศัพท์
  async approveWord(id) {
    if (isLiveSupabase) {
      try {
        const { data, error } = await supabase
          .from('words')
          .update({
            status: 'approved',
            approved_at: new Date().toISOString()
          })
          .eq('id', id)
          .select();
        if (error) throw error;
        return { data, error: null };
      } catch (err) {
        console.warn('Supabase approveWord failed:', err);
      }
    }

    const words = getMockWords();
    const idx = words.findIndex(w => w.id === id);
    if (idx !== -1) {
      words[idx].status = 'approved';
      words[idx].approved_at = new Date().toISOString();
      saveMockWords(words);
      return { data: words[idx], error: null };
    }
    return { data: null, error: 'Word not found' };
  },

  // สำหรับแอดมิน: ปฏิเสธคำศัพท์พร้อมระบุเหตุผล
  async rejectWord(id, reason) {
    if (isLiveSupabase) {
      try {
        const { data, error } = await supabase
          .from('words')
          .update({
            status: 'rejected',
            rejection_reason: reason
          })
          .eq('id', id)
          .select();
        if (error) throw error;
        return { data, error: null };
      } catch (err) {
        console.warn('Supabase rejectWord failed:', err);
      }
    }

    const words = getMockWords();
    const idx = words.findIndex(w => w.id === id);
    if (idx !== -1) {
      words[idx].status = 'rejected';
      words[idx].rejection_reason = reason;
      saveMockWords(words);
      return { data: words[idx], error: null };
    }
    return { data: null, error: 'Word not found' };
  },

  // สำหรับแอดมิน: แก้ไขข้อมูลคำศัพท์ที่เผยแพร่แล้ว
  async updateWord(id, updateData) {
    if (isLiveSupabase) {
      try {
        const { data, error } = await supabase
          .from('words')
          .update({
            ...updateData,
            updated_at: new Date().toISOString()
          })
          .eq('id', id)
          .select();
        if (error) throw error;
        return { data, error: null };
      } catch (err) {
        console.warn('Supabase updateWord failed:', err);
      }
    }

    const words = getMockWords();
    const idx = words.findIndex(w => w.id === id);
    if (idx !== -1) {
      words[idx] = {
        ...words[idx],
        ...updateData,
        updated_at: new Date().toISOString()
      };
      saveMockWords(words);
      return { data: words[idx], error: null };
    }
    return { data: null, error: 'Word not found' };
  },

  // แจ้งรายงานข้อมูลผิด
  async submitReport({ word_id, report_type, details }) {
    const payload = {
      id: 'rep-' + Date.now(),
      word_id,
      report_type,
      details,
      status: 'open',
      created_at: new Date().toISOString()
    };

    if (isLiveSupabase) {
      try {
        const { data, error } = await supabase
          .from('word_reports')
          .insert([payload])
          .select();
        if (error) throw error;
        return { data, error: null };
      } catch (err) {
        console.warn('Supabase submitReport failed:', err);
      }
    }

    const reports = getMockReports();
    reports.unshift(payload);
    saveMockReports(reports);
    return { data: payload, error: null };
  },

  // สำหรับแอดมิน: ดึงรายการรายงานทั้งหมด
  async getReports() {
    if (isLiveSupabase) {
      try {
        const { data, error } = await supabase
          .from('word_reports')
          .select('*, words(word)')
          .order('created_at', { ascending: false });
        if (error) throw error;
        return { data: data || [], error: null };
      } catch (err) {
        console.warn('Supabase getReports failed:', err);
      }
    }

    const reports = getMockReports();
    const words = getMockWords();
    const enriched = reports.map(r => {
      const match = words.find(w => w.id === r.word_id);
      return { ...r, word_title: match ? match.word : 'ไม่ระบุ' };
    });
    return { data: enriched, error: null };
  }
};

// ==========================================================
// 🛡️ Admin Authentication API
// ==========================================================
export const authApi = {
  async login(email, password) {
    if (isLiveSupabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
        return { user: data.user, error: null };
      } catch (err) {
        return { user: null, error: err.message };
      }
    }

    // Mock Admin Login: รองรับ username: admin / password: password123 หรือ email ใดๆ
    if ((email === 'admin@plaethee.com' || email === 'admin') && password === 'admin123') {
      const session = { email: 'admin@plaethee.com', role: 'admin', loggedInAt: Date.now() };
      localStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, JSON.stringify(session));
      return { user: session, error: null };
    }

    // อนุญาตเดโมเพื่อความสะดวกในการตรวจงาน
    if (email && password.length >= 6) {
      const session = { email, role: 'admin', loggedInAt: Date.now() };
      localStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, JSON.stringify(session));
      return { user: session, error: null };
    }

    return { user: null, error: 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร (หรือใช้ admin / admin123)' };
  },

  logout() {
    if (isLiveSupabase) {
      supabase.auth.signOut();
    }
    localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
  },

  getCurrentAdmin() {
    if (typeof window === 'undefined') return null;
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.ADMIN_SESSION);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }
};
