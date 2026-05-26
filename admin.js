/* ============================================
   LABPUR BONG — Admin Dashboard Logic
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ===== DATA STORE (localStorage) =====
  const KEYS = {
    auth: 'lb_auth',
    news: 'lb_news',
    directory: 'lb_directory',
    gallery: 'lb_gallery',
    settings: 'lb_settings',
    password: 'lb_password',
    visits: 'lb_visits'
  };

  function getData(key) {
    try { return JSON.parse(localStorage.getItem(key)) || null; }
    catch { return null; }
  }
  function setData(key, val) { localStorage.setItem(key, JSON.stringify(val)); }

  // Init default data if empty
  if (!getData(KEYS.news)) {
    setData(KEYS.news, [
      { id: 1, title: 'লাবপুরে এবছর ৫০টিরও বেশি দুর্গাপূজা মণ্ডপ', category: 'উৎসব', date: '2026-05-20', body: 'এবছর লাবপুর ব্লকে ৫০টিরও বেশি দুর্গাপূজার আয়োজন করা হয়েছে।', image: 'assets/festival.png' },
      { id: 2, title: 'লাবপুরে নতুন সেচ প্রকল্পে কৃষকদের মুখে হাসি', category: 'উন্নয়ন', date: '2026-05-15', body: 'রাজ্য সরকারের নতুন সেচ প্রকল্পের ফলে কৃষকরা ভালো ফলন পাচ্ছেন।', image: 'assets/village.png' },
      { id: 3, title: 'প্রাচীন মন্দির সংস্কারে ASI-র বিশেষ উদ্যোগ', category: 'ঐতিহ্য', date: '2026-05-10', body: 'আর্কিওলজিক্যাল সার্ভে অফ ইন্ডিয়া বিশেষ প্রকল্প গ্রহণ করেছে।', image: 'assets/temple.png' }
    ]);
  }

  if (!getData(KEYS.directory)) {
    setData(KEYS.directory, [
      { id: 1, name: 'মা তারা রেস্তোরাঁ', category: 'restaurant', icon: '🍛', desc: 'খাঁটি বাঙালি রান্নার স্বাদ', phone: '+91 98765 00001', location: 'স্টেশন রোড' },
      { id: 2, name: 'হোটেল লাবপুর প্যালেস', category: 'hotel', icon: '🏨', desc: 'AC ও Non-AC রুম, ফ্যামিলি স্যুট', phone: '+91 98765 00002', location: 'মেইন রোড' },
      { id: 3, name: 'লাবপুর সদর হাসপাতাল', category: 'hospital', icon: '🏥', desc: '২৪ ঘণ্টা ইমার্জেন্সি সেবা', phone: '+91 98765 00003', location: 'হাসপাতাল রোড' },
      { id: 4, name: 'লাবপুর উচ্চ বিদ্যালয়', category: 'school', icon: '🎓', desc: 'মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষা', phone: '+91 98765 00004', location: 'স্কুল পাড়া' },
      { id: 5, name: 'শ্রী কৃষ্ণ মিষ্টান্ন ভাণ্ডার', category: 'restaurant', icon: '🍬', desc: 'ঐতিহ্যবাহী বাঙালি মিষ্টি', phone: '+91 98765 00005', location: 'বাজার পাড়া' },
      { id: 6, name: 'গ্রিন ফার্মেসি', category: 'shop', icon: '💊', desc: 'সব ধরনের ওষুধ ও হেলথকেয়ার', phone: '+91 98765 00006', location: 'স্টেশন রোড' },
    ]);
  }

  if (!getData(KEYS.gallery)) {
    setData(KEYS.gallery, [
      { id: 1, title: 'সোনালী সূর্যাস্ত', desc: 'ধানক্ষেতের ওপর সূর্যাস্ত', image: 'assets/hero.png' },
      { id: 2, title: 'দুর্গা পূজা', desc: 'বাঙালির সবচেয়ে বড় উৎসব', image: 'assets/festival.png' },
      { id: 3, title: 'গ্রামের সকাল', desc: 'পদ্ম ফুলের পুকুর', image: 'assets/village.png' },
      { id: 4, title: 'বাঙালি রসনা', desc: 'মাছের ঝোল, ডাল আর ভাত', image: 'assets/food.png' },
    ]);
  }

  if (!getData(KEYS.settings)) {
    setData(KEYS.settings, {
      siteName: 'লাবপুর বং',
      tagline: 'লাবপুরের প্রাণ, বাংলার গান',
      email: 'contact@labpurbong.com',
      phone: '+91 98765 43210',
      address: 'লাবপুর, বীরভূম, পশ্চিমবঙ্গ',
      youtube: '', facebook: '', instagram: '', twitter: ''
    });
  }

  if (!getData(KEYS.password)) setData(KEYS.password, 'labpur2026');

  // Track visits
  let visits = getData(KEYS.visits) || 0;
  setData(KEYS.visits, visits);

  // ===== DOM REFS =====
  const loginScreen = document.getElementById('loginScreen');
  const adminLayout = document.getElementById('adminLayout');
  const loginForm = document.getElementById('loginForm');
  const modal = document.getElementById('modal');
  const modalForm = document.getElementById('modalForm');
  const modalBody = document.getElementById('modalBody');
  const modalTitle = document.getElementById('modalTitle');
  const toastContainer = document.getElementById('toastContainer');

  let currentModal = null; // { type, mode, id }

  // ===== AUTH =====
  if (getData(KEYS.auth)) {
    showAdmin();
  }

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = document.getElementById('loginUser').value;
    const pass = document.getElementById('loginPass').value;
    const savedPass = getData(KEYS.password) || 'labpur2026';

    if (user === 'admin' && pass === savedPass) {
      setData(KEYS.auth, true);
      showAdmin();
      toast('স্বাগতম! সফলভাবে লগইন হয়েছে।', 'success');
    } else {
      toast('ভুল ইউজারনেম বা পাসওয়ার্ড!', 'error');
    }
  });

  document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem(KEYS.auth);
    loginScreen.style.display = 'flex';
    adminLayout.style.display = 'none';
    toast('সফলভাবে লগআউট হয়েছে।', 'info');
  });

  function showAdmin() {
    loginScreen.style.display = 'none';
    adminLayout.style.display = 'grid';
    refreshAll();
  }

  // ===== SIDEBAR NAVIGATION =====
  const sidebarLinks = document.querySelectorAll('.sidebar-link[data-page]');
  const pages = document.querySelectorAll('.page');
  const pageTitle = document.getElementById('pageTitle');
  const pageTitles = {
    dashboard: 'ড্যাশবোর্ড',
    news: 'সংবাদ পরিচালনা',
    directory: 'ডিরেক্টরি পরিচালনা',
    gallery: 'গ্যালারি পরিচালনা',
    settings: 'সাইট সেটিংস'
  };

  sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = link.dataset.page;
      sidebarLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      pages.forEach(p => p.classList.remove('active'));
      document.getElementById(`page-${page}`).classList.add('active');
      pageTitle.textContent = pageTitles[page] || '';
      // Close mobile sidebar
      document.getElementById('sidebar').classList.remove('open');
    });
  });

  // goto links from dashboard
  document.querySelectorAll('[data-goto]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = link.dataset.goto;
      document.querySelector(`.sidebar-link[data-page="${page}"]`).click();
    });
  });

  // Sidebar toggle
  document.getElementById('sidebarToggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('collapsed');
  });
  document.getElementById('mobileMenuBtn').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
  });

  // ===== THEME TOGGLE =====
  const adminThemeToggle = document.getElementById('adminThemeToggle');
  const savedTheme = localStorage.getItem('labpurbong-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  adminThemeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

  adminThemeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('labpurbong-theme', next);
    adminThemeToggle.textContent = next === 'dark' ? '☀️' : '🌙';
  });

  // ===== TOAST NOTIFICATIONS =====
  function toast(message, type = 'info') {
    const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
    const el = document.createElement('div');
    el.className = `toast toast-${type}`;
    el.innerHTML = `<span class="toast-icon">${icons[type]}</span><span>${message}</span>`;
    toastContainer.appendChild(el);
    requestAnimationFrame(() => el.classList.add('show'));
    setTimeout(() => {
      el.classList.remove('show');
      setTimeout(() => el.remove(), 400);
    }, 3000);
  }

  // ===== MODAL =====
  function openModal(title, fields, onSubmit) {
    modalTitle.textContent = title;
    modalBody.innerHTML = fields;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    modalForm.onsubmit = (e) => {
      e.preventDefault();
      onSubmit();
      closeModal();
    };
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    modalForm.onsubmit = null;
  }

  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modalCancel').addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

  // ===== NEWS CRUD =====
  document.getElementById('addNewsBtn').addEventListener('click', () => {
    openModal('নতুন সংবাদ যোগ করুন', `
      <div class="form-group">
        <label>শিরোনাম</label>
        <input type="text" class="form-input" id="fNewsTitle" required placeholder="সংবাদের শিরোনাম">
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>ক্যাটাগরি</label>
          <select class="form-select" id="fNewsCat">
            <option>উৎসব</option><option>উন্নয়ন</option><option>ঐতিহ্য</option>
            <option>শিক্ষা</option><option>খেলা</option><option>অন্যান্য</option>
          </select>
        </div>
        <div class="form-group">
          <label>তারিখ</label>
          <input type="date" class="form-input" id="fNewsDate" required>
        </div>
      </div>
      <div class="form-group">
        <label>ছবির URL (অপশনাল)</label>
        <input type="text" class="form-input" id="fNewsImage" placeholder="assets/photo.png">
      </div>
      <div class="form-group">
        <label>বিস্তারিত</label>
        <textarea class="form-textarea" id="fNewsBody" rows="4" required placeholder="সংবাদের বিস্তারিত লিখুন..."></textarea>
      </div>
    `, () => {
      const news = getData(KEYS.news) || [];
      news.unshift({
        id: Date.now(),
        title: document.getElementById('fNewsTitle').value,
        category: document.getElementById('fNewsCat').value,
        date: document.getElementById('fNewsDate').value,
        image: document.getElementById('fNewsImage').value || 'assets/hero.png',
        body: document.getElementById('fNewsBody').value
      });
      setData(KEYS.news, news);
      refreshAll();
      toast('সংবাদ সফলভাবে যোগ করা হয়েছে!', 'success');
    });
    document.getElementById('fNewsDate').valueAsDate = new Date();
  });

  function editNews(id) {
    const news = getData(KEYS.news) || [];
    const item = news.find(n => n.id === id);
    if (!item) return;

    openModal('সংবাদ সম্পাদনা', `
      <div class="form-group">
        <label>শিরোনাম</label>
        <input type="text" class="form-input" id="fNewsTitle" required value="${escHtml(item.title)}">
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>ক্যাটাগরি</label>
          <select class="form-select" id="fNewsCat">
            ${['উৎসব','উন্নয়ন','ঐতিহ্য','শিক্ষা','খেলা','অন্যান্য'].map(c => `<option${c===item.category?' selected':''}>${c}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label>তারিখ</label>
          <input type="date" class="form-input" id="fNewsDate" required value="${item.date}">
        </div>
      </div>
      <div class="form-group">
        <label>ছবির URL</label>
        <input type="text" class="form-input" id="fNewsImage" value="${escHtml(item.image)}">
      </div>
      <div class="form-group">
        <label>বিস্তারিত</label>
        <textarea class="form-textarea" id="fNewsBody" rows="4" required>${escHtml(item.body)}</textarea>
      </div>
    `, () => {
      item.title = document.getElementById('fNewsTitle').value;
      item.category = document.getElementById('fNewsCat').value;
      item.date = document.getElementById('fNewsDate').value;
      item.image = document.getElementById('fNewsImage').value;
      item.body = document.getElementById('fNewsBody').value;
      setData(KEYS.news, news);
      refreshAll();
      toast('সংবাদ আপডেট করা হয়েছে!', 'success');
    });
  }

  function deleteNews(id) {
    if (!confirm('এই সংবাদটি মুছে ফেলতে চান?')) return;
    let news = getData(KEYS.news) || [];
    news = news.filter(n => n.id !== id);
    setData(KEYS.news, news);
    refreshAll();
    toast('সংবাদ মুছে ফেলা হয়েছে।', 'info');
  }

  // ===== DIRECTORY CRUD =====
  const catOptions = [
    { val: 'restaurant', label: 'রেস্তোরাঁ', icon: '🍛' },
    { val: 'hotel', label: 'হোটেল', icon: '🏨' },
    { val: 'hospital', label: 'হাসপাতাল', icon: '🏥' },
    { val: 'school', label: 'স্কুল', icon: '🎓' },
    { val: 'shop', label: 'দোকান', icon: '🛍️' },
  ];

  const catLabels = Object.fromEntries(catOptions.map(c => [c.val, c.label]));
  const catIcons = Object.fromEntries(catOptions.map(c => [c.val, c.icon]));

  document.getElementById('addDirBtn').addEventListener('click', () => {
    openModal('নতুন ব্যবসা যোগ করুন', `
      <div class="form-group">
        <label>নাম</label>
        <input type="text" class="form-input" id="fDirName" required placeholder="ব্যবসার নাম">
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>ক্যাটাগরি</label>
          <select class="form-select" id="fDirCat">
            ${catOptions.map(c => `<option value="${c.val}">${c.icon} ${c.label}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label>অবস্থান</label>
          <input type="text" class="form-input" id="fDirLocation" required placeholder="এলাকার নাম">
        </div>
      </div>
      <div class="form-group">
        <label>ফোন</label>
        <input type="tel" class="form-input" id="fDirPhone" placeholder="+91 98765 00000">
      </div>
      <div class="form-group">
        <label>বিবরণ</label>
        <textarea class="form-textarea" id="fDirDesc" rows="3" required placeholder="সংক্ষিপ্ত বিবরণ..."></textarea>
      </div>
    `, () => {
      const dir = getData(KEYS.directory) || [];
      const cat = document.getElementById('fDirCat').value;
      dir.unshift({
        id: Date.now(),
        name: document.getElementById('fDirName').value,
        category: cat,
        icon: catIcons[cat] || '🏬',
        desc: document.getElementById('fDirDesc').value,
        phone: document.getElementById('fDirPhone').value,
        location: document.getElementById('fDirLocation').value
      });
      setData(KEYS.directory, dir);
      refreshAll();
      toast('ব্যবসা সফলভাবে যোগ করা হয়েছে!', 'success');
    });
  });

  function editDir(id) {
    const dir = getData(KEYS.directory) || [];
    const item = dir.find(d => d.id === id);
    if (!item) return;

    openModal('ব্যবসা সম্পাদনা', `
      <div class="form-group">
        <label>নাম</label>
        <input type="text" class="form-input" id="fDirName" required value="${escHtml(item.name)}">
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>ক্যাটাগরি</label>
          <select class="form-select" id="fDirCat">
            ${catOptions.map(c => `<option value="${c.val}"${c.val===item.category?' selected':''}>${c.icon} ${c.label}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label>অবস্থান</label>
          <input type="text" class="form-input" id="fDirLocation" required value="${escHtml(item.location)}">
        </div>
      </div>
      <div class="form-group">
        <label>ফোন</label>
        <input type="tel" class="form-input" id="fDirPhone" value="${escHtml(item.phone)}">
      </div>
      <div class="form-group">
        <label>বিবরণ</label>
        <textarea class="form-textarea" id="fDirDesc" rows="3" required>${escHtml(item.desc)}</textarea>
      </div>
    `, () => {
      const cat = document.getElementById('fDirCat').value;
      item.name = document.getElementById('fDirName').value;
      item.category = cat;
      item.icon = catIcons[cat] || item.icon;
      item.desc = document.getElementById('fDirDesc').value;
      item.phone = document.getElementById('fDirPhone').value;
      item.location = document.getElementById('fDirLocation').value;
      setData(KEYS.directory, dir);
      refreshAll();
      toast('ব্যবসা আপডেট করা হয়েছে!', 'success');
    });
  }

  function deleteDir(id) {
    if (!confirm('এই ব্যবসাটি মুছে ফেলতে চান?')) return;
    let dir = getData(KEYS.directory) || [];
    dir = dir.filter(d => d.id !== id);
    setData(KEYS.directory, dir);
    refreshAll();
    toast('ব্যবসা মুছে ফেলা হয়েছে।', 'info');
  }

  // ===== GALLERY CRUD =====
  document.getElementById('addGalleryBtn').addEventListener('click', () => {
    openModal('নতুন ছবি যোগ করুন', `
      <div class="form-group">
        <label>শিরোনাম</label>
        <input type="text" class="form-input" id="fGalTitle" required placeholder="ছবির শিরোনাম">
      </div>
      <div class="form-group">
        <label>বিবরণ</label>
        <input type="text" class="form-input" id="fGalDesc" placeholder="সংক্ষিপ্ত বিবরণ">
      </div>
      <div class="form-group">
        <label>ছবির URL</label>
        <input type="text" class="form-input" id="fGalImage" required placeholder="assets/photo.png অথবা https://...">
      </div>
    `, () => {
      const gallery = getData(KEYS.gallery) || [];
      gallery.unshift({
        id: Date.now(),
        title: document.getElementById('fGalTitle').value,
        desc: document.getElementById('fGalDesc').value,
        image: document.getElementById('fGalImage').value
      });
      setData(KEYS.gallery, gallery);
      refreshAll();
      toast('ছবি সফলভাবে যোগ করা হয়েছে!', 'success');
    });
  });

  function deleteGallery(id) {
    if (!confirm('এই ছবিটি মুছে ফেলতে চান?')) return;
    let gallery = getData(KEYS.gallery) || [];
    gallery = gallery.filter(g => g.id !== id);
    setData(KEYS.gallery, gallery);
    refreshAll();
    toast('ছবি মুছে ফেলা হয়েছে।', 'info');
  }

  // ===== SETTINGS =====
  function loadSettings() {
    const s = getData(KEYS.settings) || {};
    document.getElementById('setSiteName').value = s.siteName || '';
    document.getElementById('setTagline').value = s.tagline || '';
    document.getElementById('setEmail').value = s.email || '';
    document.getElementById('setPhone').value = s.phone || '';
    document.getElementById('setAddress').value = s.address || '';
    document.getElementById('setYoutube').value = s.youtube || '';
    document.getElementById('setFacebook').value = s.facebook || '';
    document.getElementById('setInstagram').value = s.instagram || '';
    document.getElementById('setTwitter').value = s.twitter || '';
  }

  document.getElementById('settingsForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const settings = {
      siteName: document.getElementById('setSiteName').value,
      tagline: document.getElementById('setTagline').value,
      email: document.getElementById('setEmail').value,
      phone: document.getElementById('setPhone').value,
      address: document.getElementById('setAddress').value,
      youtube: document.getElementById('setYoutube').value,
      facebook: document.getElementById('setFacebook').value,
      instagram: document.getElementById('setInstagram').value,
      twitter: document.getElementById('setTwitter').value
    };
    setData(KEYS.settings, settings);

    // Update password if provided
    const newPass = document.getElementById('setNewPass').value;
    const confirmPass = document.getElementById('setConfirmPass').value;
    if (newPass) {
      if (newPass !== confirmPass) {
        toast('পাসওয়ার্ড মিলছে না!', 'error');
        return;
      }
      setData(KEYS.password, newPass);
      document.getElementById('setNewPass').value = '';
      document.getElementById('setConfirmPass').value = '';
      toast('পাসওয়ার্ড ও সেটিংস আপডেট করা হয়েছে!', 'success');
    } else {
      toast('সেটিংস সেভ করা হয়েছে!', 'success');
    }
  });

  // ===== REFRESH ALL VIEWS =====
  function refreshAll() {
    const news = getData(KEYS.news) || [];
    const dir = getData(KEYS.directory) || [];
    const gallery = getData(KEYS.gallery) || [];

    // Stats
    document.getElementById('statNews').textContent = news.length;
    document.getElementById('statDirectory').textContent = dir.length;
    document.getElementById('statGallery').textContent = gallery.length;
    document.getElementById('statVisits').textContent = getData(KEYS.visits) || 0;

    // Recent news on dashboard
    const recentNews = document.getElementById('recentNewsList');
    if (news.length > 0) {
      recentNews.innerHTML = news.slice(0, 5).map(n => `
        <div class="list-item">
          <div class="list-item-info">
            <span class="list-item-title">${escHtml(n.title)}</span>
            <span class="list-item-meta">${n.category} · ${n.date}</span>
          </div>
        </div>
      `).join('');
    } else {
      recentNews.innerHTML = '<div class="empty-state"><span class="empty-icon">📝</span><p>কোনো সংবাদ নেই</p></div>';
    }

    // Recent directory on dashboard
    const recentDir = document.getElementById('recentDirList');
    if (dir.length > 0) {
      recentDir.innerHTML = dir.slice(0, 5).map(d => `
        <div class="list-item">
          <span class="list-item-icon">${d.icon}</span>
          <div class="list-item-info">
            <span class="list-item-title">${escHtml(d.name)}</span>
            <span class="list-item-meta">${catLabels[d.category] || d.category} · ${d.location}</span>
          </div>
        </div>
      `).join('');
    } else {
      recentDir.innerHTML = '<div class="empty-state"><span class="empty-icon">🏬</span><p>কোনো ব্যবসা নেই</p></div>';
    }

    // News table
    const newsBody = document.getElementById('newsTableBody');
    const newsEmpty = document.getElementById('newsEmpty');
    if (news.length > 0) {
      newsEmpty.style.display = 'none';
      document.getElementById('newsTable').style.display = 'table';
      newsBody.innerHTML = news.map(n => `
        <tr>
          <td><strong>${escHtml(n.title)}</strong></td>
          <td><span class="badge">${n.category}</span></td>
          <td>${n.date}</td>
          <td>
            <button class="btn-sm btn-edit" onclick="window._editNews(${n.id})">✏️</button>
            <button class="btn-sm btn-delete" onclick="window._deleteNews(${n.id})">🗑️</button>
          </td>
        </tr>
      `).join('');
    } else {
      newsEmpty.style.display = 'flex';
      document.getElementById('newsTable').style.display = 'none';
    }

    // Directory table
    const dirBody = document.getElementById('dirTableBody');
    const dirEmpty = document.getElementById('dirEmpty');
    if (dir.length > 0) {
      dirEmpty.style.display = 'none';
      document.getElementById('dirTable').style.display = 'table';
      dirBody.innerHTML = dir.map(d => `
        <tr>
          <td>${d.icon} <strong>${escHtml(d.name)}</strong></td>
          <td><span class="badge">${catLabels[d.category] || d.category}</span></td>
          <td>${escHtml(d.location)}</td>
          <td>
            <button class="btn-sm btn-edit" onclick="window._editDir(${d.id})">✏️</button>
            <button class="btn-sm btn-delete" onclick="window._deleteDir(${d.id})">🗑️</button>
          </td>
        </tr>
      `).join('');
    } else {
      dirEmpty.style.display = 'flex';
      document.getElementById('dirTable').style.display = 'none';
    }

    // Gallery grid
    const galGrid = document.getElementById('galleryAdminGrid');
    const galEmpty = document.getElementById('galleryEmpty');
    if (gallery.length > 0) {
      galEmpty.style.display = 'none';
      galGrid.innerHTML = gallery.map(g => `
        <div class="gallery-admin-card">
          <img src="${escHtml(g.image)}" alt="${escHtml(g.title)}" onerror="this.src='assets/hero.png'">
          <div class="gallery-admin-info">
            <h4>${escHtml(g.title)}</h4>
            <p>${escHtml(g.desc)}</p>
          </div>
          <button class="btn-sm btn-delete gallery-delete" onclick="window._deleteGallery(${g.id})">🗑️</button>
        </div>
      `).join('');
    } else {
      galEmpty.style.display = 'flex';
      galGrid.innerHTML = '';
    }

    // Load settings
    loadSettings();
  }

  // ===== EXPOSE FUNCTIONS GLOBALLY =====
  window._editNews = editNews;
  window._deleteNews = deleteNews;
  window._editDir = editDir;
  window._deleteDir = deleteDir;
  window._deleteGallery = deleteGallery;

  // ===== UTILITY =====
  function escHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

});
