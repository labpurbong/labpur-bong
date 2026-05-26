/* ============================================
   LABPUR BONG — Interactive Map (Leaflet.js)
   All locations of Labpur, Birbhum, WB
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const mapEl = document.getElementById('labpurMap');
  if (!mapEl || typeof L === 'undefined') return;

  // ===== INITIALIZE MAP =====
  const map = L.map('labpurMap', {
    center: [23.8397, 87.8336],  // Labpur center
    zoom: 14,
    scrollWheelZoom: true,
    zoomControl: true
  });

  // ===== TILE LAYER (Dark/Light theme aware) =====
  const theme = document.documentElement.getAttribute('data-theme');

  const darkTiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
    maxZoom: 19
  });

  const lightTiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19
  });

  if (theme === 'light') {
    lightTiles.addTo(map);
  } else {
    darkTiles.addTo(map);
  }

  // Listen for theme changes
  const themeObserver = new MutationObserver(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'light') {
      map.removeLayer(darkTiles);
      lightTiles.addTo(map);
    } else {
      map.removeLayer(lightTiles);
      darkTiles.addTo(map);
    }
  });
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  // ===== CUSTOM MARKER ICONS =====
  function createIcon(emoji, color) {
    return L.divIcon({
      html: `<div style="
        background: ${color};
        width: 36px; height: 36px;
        border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        font-size: 18px;
        border: 2px solid rgba(255,255,255,0.8);
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        cursor: pointer;
      ">${emoji}</div>`,
      iconSize: [36, 36],
      iconAnchor: [18, 18],
      popupAnchor: [0, -20],
      className: 'custom-map-marker'
    });
  }

  const icons = {
    mandir:   createIcon('🛕', '#d4a853'),
    masjid:   createIcon('🕌', '#4CAF50'),
    hospital: createIcon('🏥', '#e53935'),
    school:   createIcon('🎓', '#2196F3'),
    shop:     createIcon('🛒', '#FF9800'),
    thana:    createIcon('🏛️', '#9C27B0'),
    landmark: createIcon('📍', '#c45e3a'),
    transport:createIcon('🚂', '#607D8B'),
    bank:     createIcon('🏦', '#00BCD4'),
    post:     createIcon('📮', '#795548')
  };

  // ===== ALL LABPUR LOCATIONS =====
  const locations = [
    // === মন্দির (Temples) ===
    { lat: 23.8405, lng: 87.8340, name: 'শিব মন্দির (লাবপুর বাজার)', desc: 'প্রাচীন শিব মন্দির। প্রতিদিন পূজা হয়।', cat: 'mandir' },
    { lat: 23.8420, lng: 87.8310, name: 'কালী মন্দির', desc: 'লাবপুরের পুরনো কালী মন্দির। কালীপূজায় বিশেষ আয়োজন।', cat: 'mandir' },
    { lat: 23.8380, lng: 87.8360, name: 'রাধাকৃষ্ণ মন্দির', desc: 'রাধাকৃষ্ণ জিউ মন্দির। জন্মাষ্টমীতে বিশেষ উৎসব।', cat: 'mandir' },
    { lat: 23.8435, lng: 87.8295, name: 'দুর্গা মন্দির', desc: 'দুর্গাপূজার প্রধান মণ্ডপ।', cat: 'mandir' },
    { lat: 23.8370, lng: 87.8380, name: 'হনুমান মন্দির', desc: 'মঙ্গলবার ও শনিবার বিশেষ পূজা।', cat: 'mandir' },
    { lat: 23.8450, lng: 87.8350, name: 'লক্ষ্মীনারায়ণ মন্দির', desc: 'টেরাকোটা সজ্জিত প্রাচীন মন্দির।', cat: 'mandir' },
    { lat: 23.8390, lng: 87.8280, name: 'সত্যনারায়ণ মন্দির', desc: 'প্রতি পূর্ণিমায় সত্যনারায়ণ পূজা।', cat: 'mandir' },
    { lat: 23.8412, lng: 87.8400, name: 'মনসা মন্দির', desc: 'শ্রাবণ মাসে বিশেষ পূজা ও মেলা।', cat: 'mandir' },
    { lat: 23.8460, lng: 87.8320, name: 'রামকৃষ্ণ মঠ', desc: 'শান্ত পরিবেশে ধ্যান ও প্রার্থনা।', cat: 'mandir' },

    // === মসজিদ (Mosques) ===
    { lat: 23.8395, lng: 87.8320, name: 'জামে মসজিদ', desc: 'লাবপুরের কেন্দ্রীয় জামে মসজিদ। জুম্মার নামাজে বিশেষ জমায়েত।', cat: 'masjid' },
    { lat: 23.8425, lng: 87.8370, name: 'মিল্লাত মসজিদ', desc: 'স্থানীয় মসজিদ। পাঁচ ওয়াক্ত নামাজ।', cat: 'masjid' },
    { lat: 23.8360, lng: 87.8300, name: 'নূরানি মসজিদ', desc: 'মাদ্রাসা সংযুক্ত মসজিদ।', cat: 'masjid' },
    { lat: 23.8440, lng: 87.8280, name: 'ইদগাহ ময়দান', desc: 'ঈদের নামাজের জন্য উন্মুক্ত ময়দান।', cat: 'masjid' },

    // === হাসপাতাল (Hospitals/Clinics) ===
    { lat: 23.8400, lng: 87.8345, name: 'লাবপুর গ্রামীণ হাসপাতাল', desc: 'সরকারি গ্রামীণ হাসপাতাল। ২৪ ঘণ্টা ইমার্জেন্সি, OPD, প্যাথলজি।', cat: 'hospital' },
    { lat: 23.8385, lng: 87.8315, name: 'লাইফকেয়ার ডায়াগনস্টিক সেন্টার', desc: 'ব্লাড টেস্ট, X-Ray, আল্ট্রাসাউন্ড — সব ডায়াগনস্টিক সেবা।', cat: 'hospital' },
    { lat: 23.8415, lng: 87.8305, name: 'মা তারা ক্লিনিক', desc: 'প্রাইভেট ক্লিনিক। জেনারেল ও স্পেশালিস্ট চিকিৎসা।', cat: 'hospital' },
    { lat: 23.8375, lng: 87.8355, name: 'জনস্বাস্থ্য কেন্দ্র (PHC)', desc: 'প্রাইমারি হেলথ সেন্টার। টিকাকরণ ও মা-শিশু সেবা।', cat: 'hospital' },
    { lat: 23.8430, lng: 87.8335, name: 'নিউ লাইফ ফার্মেসি', desc: 'সব ধরনের ওষুধ ও সার্জিক্যাল আইটেম। ২৪ ঘণ্টা খোলা।', cat: 'hospital' },

    // === স্কুল/কলেজ (Schools/Colleges) ===
    { lat: 23.8408, lng: 87.8325, name: 'লাবপুর উচ্চ বিদ্যালয়', desc: 'প্রাচীন ঐতিহ্যবাহী বিদ্যালয়। মাধ্যমিক ও উচ্চমাধ্যমিক।', cat: 'school' },
    { lat: 23.8392, lng: 87.8350, name: 'লাবপুর বালিকা বিদ্যালয়', desc: 'মেয়েদের জন্য মানসম্মত বিদ্যালয়।', cat: 'school' },
    { lat: 23.8445, lng: 87.8310, name: 'রাজা রামমোহন রায় মহাবিদ্যালয়', desc: 'লাবপুরের প্রধান কলেজ। BA, BSc, BCom কোর্স।', cat: 'school' },
    { lat: 23.8365, lng: 87.8340, name: 'আদর্শ প্রাথমিক বিদ্যালয়', desc: 'শিশুদের জন্য প্রাথমিক শিক্ষা।', cat: 'school' },
    { lat: 23.8420, lng: 87.8380, name: 'লাবপুর মাদ্রাসা', desc: 'ধর্মীয় ও আধুনিক শিক্ষা।', cat: 'school' },
    { lat: 23.8455, lng: 87.8290, name: 'বিবেকানন্দ শিশু শিক্ষা কেন্দ্র', desc: 'প্রি-প্রাইমারি ও প্রাথমিক শিক্ষা।', cat: 'school' },
    { lat: 23.8378, lng: 87.8290, name: 'নেতাজি সুভাষ বিদ্যামন্দির', desc: 'মাধ্যমিক বিদ্যালয়।', cat: 'school' },

    // === দোকান/বাজার (Shops/Markets) ===
    { lat: 23.8398, lng: 87.8335, name: 'লাবপুর বাজার (মেইন মার্কেট)', desc: 'লাবপুরের প্রধান বাজার। শাকসবজি, মাছ, মাংস, কাপড় — সব পাওয়া যায়।', cat: 'shop' },
    { lat: 23.8402, lng: 87.8330, name: 'শ্রী কৃষ্ণ মিষ্টান্ন ভাণ্ডার', desc: 'সিতাভোগ, সন্দেশ, রসগোল্লা — ঐতিহ্যবাহী বাঙালি মিষ্টি।', cat: 'shop' },
    { lat: 23.8395, lng: 87.8342, name: 'রয়্যাল বিরিয়ানি হাউস', desc: 'চিকেন বিরিয়ানি, কাবাব — মোগলাই খাবার।', cat: 'shop' },
    { lat: 23.8407, lng: 87.8318, name: 'বাংলা ক্লথ হাউস', desc: 'শাড়ি, পাঞ্জাবি, কুর্তা — সব ধরনের পোশাক।', cat: 'shop' },
    { lat: 23.8388, lng: 87.8328, name: 'ডিজিটাল সেবা কেন্দ্র', desc: 'আধার, প্যান কার্ড, মোবাইল রিচার্জ, প্রিন্ট ও জেরক্স।', cat: 'shop' },
    { lat: 23.8410, lng: 87.8350, name: 'মা তারা রেস্তোরাঁ', desc: 'খাঁটি বাঙালি রান্নার স্বাদ — মাছের ঝোল, ভাত।', cat: 'shop' },
    { lat: 23.8393, lng: 87.8310, name: 'গ্রিন ফার্মেসি', desc: 'ওষুধ, সার্জিক্যাল আইটেম।', cat: 'shop' },
    { lat: 23.8418, lng: 87.8345, name: 'লাবপুর সুপার মার্কেট', desc: 'গ্রোসারি, FMCG পণ্য, দৈনন্দিন প্রয়োজনীয় জিনিস।', cat: 'shop' },
    { lat: 23.8382, lng: 87.8365, name: 'হার্ডওয়্যার স্টোর', desc: 'নির্মাণ সামগ্রী, ইলেকট্রিক্যাল, প্লাম্বিং।', cat: 'shop' },
    { lat: 23.8440, lng: 87.8340, name: 'সোমবার হাট', desc: 'সাপ্তাহিক হাট। তাজা শাকসবজি, ফল, মাছ।', cat: 'shop' },
    { lat: 23.8370, lng: 87.8320, name: 'স্বর্ণ জুয়েলার্স', desc: 'সোনা ও রূপার গহনা।', cat: 'shop' },

    // === থানা/সরকারি (Government/Police) ===
    { lat: 23.8403, lng: 87.8355, name: 'লাবপুর থানা (Police Station)', desc: 'লাবপুর থানা। জরুরি: 100 / 112।', cat: 'thana' },
    { lat: 23.8412, lng: 87.8330, name: 'ব্লক ডেভেলপমেন্ট অফিস (BDO)', desc: 'লাবপুর ব্লক উন্নয়ন দপ্তর। সরকারি প্রকল্প ও যোজনা।', cat: 'thana' },
    { lat: 23.8398, lng: 87.8310, name: 'পঞ্চায়েত সমিতি অফিস', desc: 'গ্রাম পঞ্চায়েত কার্যালয়।', cat: 'thana' },
    { lat: 23.8425, lng: 87.8340, name: 'পোস্ট অফিস (লাবপুর)', desc: 'ভারতীয় ডাক বিভাগ। PIN: 731303।', cat: 'thana' },
    { lat: 23.8418, lng: 87.8315, name: 'অগ্নিনির্বাপণ কেন্দ্র', desc: 'ফায়ার স্টেশন। জরুরি: 101।', cat: 'thana' },
    { lat: 23.8390, lng: 87.8295, name: 'বিদ্যুৎ অফিস (WBSEDCL)', desc: 'বিদ্যুৎ সংযোগ ও অভিযোগ নিষ্পত্তি।', cat: 'thana' },

    // === দর্শনীয় স্থান (Landmarks) ===
    { lat: 23.8397, lng: 87.8336, name: 'লাবপুর মোড় (শহর কেন্দ্র)', desc: 'লাবপুরের প্রধান চৌরাস্তা ও ব্যবসায়িক কেন্দ্র।', cat: 'landmark' },
    { lat: 23.8380, lng: 87.8400, name: 'অজয় নদী ঘাট', desc: 'অজয় নদীর ধারে সুন্দর প্রাকৃতিক দৃশ্য। সন্ধ্যায় হাঁটার আদর্শ জায়গা।', cat: 'landmark' },
    { lat: 23.8465, lng: 87.8310, name: 'লাবপুর রেলস্টেশন', desc: 'সাহেবগঞ্জ লুপ লাইনে অবস্থিত। হাওড়া-রামপুরহাট লাইন।', cat: 'landmark' },
    { lat: 23.8350, lng: 87.8360, name: 'নীলকুঠি (ঐতিহাসিক)', desc: 'ব্রিটিশ আমলের নীলকুঠি। ঐতিহাসিক নিদর্শন।', cat: 'landmark' },
    { lat: 23.8475, lng: 87.8280, name: 'বাসস্ট্যান্ড (লাবপুর)', desc: 'বোলপুর, সিউড়ি, কলকাতা — সব রুটের বাস পাওয়া যায়।', cat: 'landmark' },
    { lat: 23.8340, lng: 87.8330, name: 'পুরনো রাজবাড়ি', desc: 'জমিদার আমলের ঐতিহাসিক রাজবাড়ি।', cat: 'landmark' },
    { lat: 23.8430, lng: 87.8370, name: 'করুণাময়ী সঙ্ঘ', desc: 'সাংস্কৃতিক সংগঠন। নাটক, গান ও সাংস্কৃতিক অনুষ্ঠান।', cat: 'landmark' },
    { lat: 23.8355, lng: 87.8290, name: 'লাবপুর স্টেডিয়াম', desc: 'ক্রিকেট ও ফুটবল মাঠ। বার্ষিক টুর্নামেন্ট আয়োজিত হয়।', cat: 'landmark' },

    // === ব্যাঙ্ক (Banks) ===
    { lat: 23.8400, lng: 87.8328, name: 'স্টেট ব্যাঙ্ক অফ ইন্ডিয়া (SBI)', desc: 'ATM সহ পূর্ণ শাখা।', cat: 'thana' },
    { lat: 23.8405, lng: 87.8350, name: 'ব্যাঙ্ক অফ বরোদা', desc: 'ব্যাঙ্কিং সেবা ও ATM।', cat: 'thana' },
    { lat: 23.8395, lng: 87.8305, name: 'গ্রামীণ ব্যাঙ্ক', desc: 'কৃষি ঋণ ও গ্রামীণ ব্যাঙ্কিং।', cat: 'thana' },
  ];

  // ===== CREATE MARKERS =====
  let allMarkers = [];

  locations.forEach(loc => {
    const icon = icons[loc.cat] || icons.landmark;
    const marker = L.marker([loc.lat, loc.lng], { icon })
      .bindPopup(`
        <div style="font-family:'Noto Sans Bengali','Inter',sans-serif;min-width:200px;">
          <h4 style="margin:0 0 6px;font-size:15px;color:#d4a853;">${loc.name}</h4>
          <p style="margin:0;font-size:13px;color:#ccc;line-height:1.5;">${loc.desc}</p>
          <p style="margin:6px 0 0;font-size:11px;color:#888;">📂 ${getCatLabel(loc.cat)}</p>
        </div>
      `, { className: 'labpur-popup' })
      .addTo(map);

    marker._labpurCat = loc.cat;
    allMarkers.push(marker);
  });

  function getCatLabel(cat) {
    const labels = {
      mandir: 'মন্দির',
      masjid: 'মসজিদ',
      hospital: 'হাসপাতাল/ক্লিনিক',
      school: 'স্কুল/কলেজ',
      shop: 'দোকান/বাজার',
      thana: 'সরকারি/ব্যাঙ্ক',
      landmark: 'দর্শনীয় স্থান'
    };
    return labels[cat] || cat;
  }

  // ===== MAP FILTER =====
  const mapFilterTags = document.querySelectorAll('[data-mapfilter]');

  mapFilterTags.forEach(tag => {
    tag.addEventListener('click', () => {
      mapFilterTags.forEach(t => t.classList.remove('active'));
      tag.classList.add('active');
      const filter = tag.dataset.mapfilter;

      allMarkers.forEach(marker => {
        if (filter === 'all' || marker._labpurCat === filter) {
          marker.addTo(map);
        } else {
          map.removeLayer(marker);
        }
      });
    });
  });

  // ===== CUSTOM POPUP STYLES =====
  const popupStyle = document.createElement('style');
  popupStyle.textContent = `
    .labpur-popup .leaflet-popup-content-wrapper {
      background: rgba(15, 15, 25, 0.95);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(212, 168, 83, 0.3);
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.4);
    }
    .labpur-popup .leaflet-popup-tip {
      background: rgba(15, 15, 25, 0.95);
      border: 1px solid rgba(212, 168, 83, 0.3);
    }
    .labpur-popup .leaflet-popup-close-button {
      color: #d4a853 !important;
      font-size: 18px !important;
    }
    .custom-map-marker {
      background: transparent !important;
      border: none !important;
    }
    [data-theme="light"] .labpur-popup .leaflet-popup-content-wrapper {
      background: rgba(255, 255, 255, 0.95);
      border-color: rgba(212, 168, 83, 0.4);
    }
    [data-theme="light"] .labpur-popup .leaflet-popup-tip {
      background: rgba(255, 255, 255, 0.95);
    }
    [data-theme="light"] .labpur-popup h4 { color: #8B6914 !important; }
    [data-theme="light"] .labpur-popup p { color: #555 !important; }
    .map-section .filter-tags {
      flex-wrap: wrap;
      justify-content: center;
      margin-bottom: 1.5rem;
    }
  `;
  document.head.appendChild(popupStyle);

  // Fix map rendering if section was hidden
  setTimeout(() => map.invalidateSize(), 500);

  // Invalidate on scroll into view
  const mapObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        map.invalidateSize();
      }
    });
  }, { threshold: 0.1 });
  mapObserver.observe(mapEl);

});
