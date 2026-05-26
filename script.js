/* ============================================
   LABPUR BONG — Interactive Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ===== TRACK PAGE VISITS =====
  try {
    const visits = parseInt(localStorage.getItem('lb_visits')) || 0;
    localStorage.setItem('lb_visits', visits + 1);
  } catch(e) {}

  // ===== LOAD DATA FROM ADMIN (localStorage) OR USE DEFAULTS =====
  const defaultBusinesses = [
    { name: 'মা তারা রেস্তোরাঁ', category: 'restaurant', icon: '🍛', desc: 'খাঁটি বাঙালি রান্নার স্বাদ — মাছের ঝোল, বিরিয়ানি, মিষ্টি দই।', phone: '+91 98765 00001', location: 'স্টেশন রোড' },
    { name: 'হোটেল লাবপুর প্যালেস', category: 'hotel', icon: '🏨', desc: 'AC ও Non-AC রুম, ফ্যামিলি স্যুট। শান্তিনিকেতনের কাছে।', phone: '+91 98765 00002', location: 'মেইন রোড' },
    { name: 'লাবপুর সদর হাসপাতাল', category: 'hospital', icon: '🏥', desc: '২৪ ঘণ্টা ইমার্জেন্সি সেবা, OPD, প্যাথলজি।', phone: '+91 98765 00003', location: 'হাসপাতাল রোড' },
    { name: 'লাবপুর উচ্চ বিদ্যালয়', category: 'school', icon: '🎓', desc: 'প্রাচীন ঐতিহ্যবাহী বিদ্যালয়। মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষা।', phone: '+91 98765 00004', location: 'স্কুল পাড়া' },
    { name: 'শ্রী কৃষ্ণ মিষ্টান্ন ভাণ্ডার', category: 'restaurant', icon: '🍬', desc: 'সিতাভোগ, সন্দেশ, রসগোল্লা — ঐতিহ্যবাহী বাঙালি মিষ্টি।', phone: '+91 98765 00005', location: 'বাজার পাড়া' },
    { name: 'গ্রিন ফার্মেসি', category: 'shop', icon: '💊', desc: 'সব ধরনের ওষুধ, সার্জিক্যাল আইটেম ও হেলথকেয়ার প্রোডাক্ট।', phone: '+91 98765 00006', location: 'স্টেশন রোড' },
    { name: 'নিউ লাবপুর লজ', category: 'hotel', icon: '🛏️', desc: 'বাজেট-ফ্রেন্ডলি আবাসন। পর্যটকদের জন্য আদর্শ।', phone: '+91 98765 00007', location: 'রেলস্টেশনের কাছে' },
    { name: 'আদর্শ প্রাথমিক বিদ্যালয়', category: 'school', icon: '📖', desc: 'শিশুদের জন্য মানসম্মত প্রাথমিক শিক্ষা ও যত্ন।', phone: '+91 98765 00008', location: 'পশ্চিম পাড়া' },
    { name: 'বাংলা ক্লথ হাউস', category: 'shop', icon: '👔', desc: 'শাড়ি, পাঞ্জাবি, কুর্তা — সব ধরনের পোশাক।', phone: '+91 98765 00009', location: 'বাজার পাড়া' },
    { name: 'লাইফকেয়ার ডায়াগনস্টিক', category: 'hospital', icon: '🔬', desc: 'ব্লাড টেস্ট, এক্স-রে, আল্ট্রাসাউন্ড — সব ডায়াগনস্টিক সেবা।', phone: '+91 98765 00010', location: 'মেইন রোড' },
    { name: 'রয়্যাল বিরিয়ানি হাউস', category: 'restaurant', icon: '🍗', desc: 'চিকেন বিরিয়ানি, কাবাব, তন্দুরি — মোগলাই খাবারের স্বাদ।', phone: '+91 98765 00011', location: 'স্টেশন রোড' },
    { name: 'ডিজিটাল সেবা কেন্দ্র', category: 'shop', icon: '🖥️', desc: 'আধার, প্যান কার্ড, মোবাইল রিচার্জ, প্রিন্ট ও জেরক্স।', phone: '+91 98765 00012', location: 'বাজার পাড়া' },
  ];

  // Read from localStorage (admin dashboard data) or fallback to defaults
  let businesses;
  try {
    businesses = JSON.parse(localStorage.getItem('lb_directory')) || defaultBusinesses;
  } catch(e) { businesses = defaultBusinesses; }

  // ===== DYNAMIC NEWS RENDERING FROM ADMIN =====
  try {
    const adminNews = JSON.parse(localStorage.getItem('lb_news'));
    if (adminNews && adminNews.length > 0) {
      const newsGrid = document.querySelector('.news-grid');
      if (newsGrid) {
        newsGrid.innerHTML = adminNews.slice(0, 6).map(n => `
          <article class="news-card">
            <div class="news-card-image">
              <img src="${n.image || 'assets/hero.png'}" alt="${n.title}" onerror="this.src='assets/hero.png'">
            </div>
            <div class="news-card-body">
              <div class="news-card-meta">
                <span class="news-tag">${n.category}</span>
                <span class="news-date">${n.date}</span>
              </div>
              <h3>${n.title}</h3>
              <p>${n.body}</p>
              <a href="#" class="news-read-more">বিস্তারিত পড়ুন →</a>
            </div>
          </article>
        `).join('');
      }
    }
  } catch(e) {}

  // ===== DYNAMIC GALLERY RENDERING FROM ADMIN =====
  try {
    const adminGallery = JSON.parse(localStorage.getItem('lb_gallery'));
    if (adminGallery && adminGallery.length > 0) {
      const galleryGrid = document.querySelector('.gallery-grid');
      if (galleryGrid) {
        galleryGrid.innerHTML = adminGallery.map((g, i) => `
          <div class="gallery-item${i === 0 ? ' featured' : ''}" data-lightbox>
            <img src="${g.image}" alt="${g.title}" onerror="this.src='assets/hero.png'">
            <div class="gallery-overlay">
              <h4>${g.title}</h4>
              <p>${g.desc}</p>
            </div>
          </div>
        `).join('');
      }
    }
  } catch(e) {}

  // ===== RENDER DIRECTORY =====
  const directoryGrid = document.getElementById('directoryGrid');
  const searchInput = document.getElementById('directorySearch');
  const filterTags = document.querySelectorAll('.filter-tag');
  let currentFilter = 'all';

  function renderDirectory(filter = 'all', search = '') {
    const filtered = businesses.filter(b => {
      const matchFilter = filter === 'all' || b.category === filter;
      const matchSearch = search === '' ||
        b.name.toLowerCase().includes(search.toLowerCase()) ||
        b.category.includes(search.toLowerCase()) ||
        b.desc.toLowerCase().includes(search.toLowerCase());
      return matchFilter && matchSearch;
    });

    if (filtered.length === 0) {
      directoryGrid.innerHTML = '<div class="dir-no-results">😕 কোনো ফলাফল পাওয়া যায়নি। অন্য কিছু খুঁজুন।</div>';
      return;
    }

    directoryGrid.innerHTML = filtered.map(b => `
      <div class="dir-card" data-category="${b.category}">
        <div class="dir-card-header">
          <div class="dir-card-icon">${b.icon}</div>
          <div class="dir-card-info">
            <h4>${b.name}</h4>
            <span class="dir-category">${getCategoryLabel(b.category)}</span>
          </div>
        </div>
        <p>${b.desc}</p>
        <div class="dir-card-footer">
          <span>📍 ${b.location}</span>
          <span>📞 ${b.phone}</span>
        </div>
      </div>
    `).join('');

    // Animate new cards
    requestAnimationFrame(() => {
      directoryGrid.querySelectorAll('.dir-card').forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.4s ease ${i * 0.05}s, transform 0.4s ease ${i * 0.05}s`;
        requestAnimationFrame(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        });
      });
    });
  }

  function getCategoryLabel(cat) {
    const labels = {
      restaurant: 'রেস্তোরাঁ',
      hotel: 'হোটেল',
      hospital: 'হাসপাতাল',
      school: 'স্কুল',
      shop: 'দোকান'
    };
    return labels[cat] || cat;
  }

  // Initial render
  renderDirectory();

  // Filter clicks
  filterTags.forEach(tag => {
    tag.addEventListener('click', () => {
      filterTags.forEach(t => t.classList.remove('active'));
      tag.classList.add('active');
      currentFilter = tag.dataset.filter;
      renderDirectory(currentFilter, searchInput.value);
    });
  });

  // Search input
  searchInput.addEventListener('input', (e) => {
    renderDirectory(currentFilter, e.target.value);
  });

  // ===== NAVBAR SCROLL EFFECT =====
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  function updateNavbar() {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', () => {
    updateNavbar();
    updateActiveLink();
  });

  // ===== MOBILE MENU =====
  const hamburger = document.getElementById('hamburger');
  const navLinksContainer = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinksContainer.classList.toggle('open');
  });

  // Close mobile menu on link click
  navLinksContainer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinksContainer.classList.remove('open');
    });
  });

  // ===== THEME TOGGLE =====
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  // Check saved theme
  const savedTheme = localStorage.getItem('labpurbong-theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('labpurbong-theme', next);
    themeToggle.textContent = next === 'dark' ? '☀️' : '🌙';
  });

  // ===== SCROLL REVEAL ANIMATION =====
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ===== ANIMATED COUNTERS =====
  const counters = document.querySelectorAll('.stat-number[data-target]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        animateCounter(el, target);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  function animateCounter(el, target) {
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);

      el.textContent = current + '+';

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // ===== LIGHTBOX =====
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const galleryItems = document.querySelectorAll('[data-lightbox]');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // ===== BACK TO TOP =====
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const offset = navbar.offsetHeight + 20;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ===== PARALLAX EFFECT ON HERO =====
  const heroBg = document.querySelector('.hero-bg img');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroBg.style.transform = `scale(${1 + scrolled * 0.0003}) translateY(${scrolled * 0.3}px)`;
      }
    });
  }

});
