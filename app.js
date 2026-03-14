/* ============================================================
   LUL — Main Application JS
   Navigation · Language Switcher · Hero · Gallery · UI
   ============================================================ */

(function () {
  'use strict';

  // ── Language definitions ─────────────────────────────────
  const LANGUAGES = {
    en: { flag: '🇬🇧', label: 'EN', name: 'English' },
    it: { flag: '🇮🇹', label: 'IT', name: 'Italiano' },
    fr: { flag: '🇫🇷', label: 'FR', name: 'Français' },
    de: { flag: '🇩🇪', label: 'DE', name: 'Deutsch' },
    es: { flag: '🇪🇸', label: 'ES', name: 'Español' },
    ru: { flag: '🇷🇺', label: 'RU', name: 'Русский' }
  };

  // ── Translations (extend as needed) ─────────────────────
  const I18N = {
    en: {
      nav_homes:      'Homes',
      nav_cars:       'Cars',
      nav_yachts:     'Yachts',
      nav_jets:       'Private Jets',
      nav_villas:     'Villas',
      nav_watches:    'Watches',
      nav_jewellery:  'Jewellery',
      nav_other:      'Other',
      publish:        'List with Us',
      login:          'Sign In',
      hero_eyebrow:   'The World\'s Finest Listings',
      hero_h1_1:      'Discover the Art of',
      hero_h1_em:     'Exceptional Living',
      hero_sub:       'Curated luxury real estate, vehicles, yachts, jets and collectibles from elite dealers worldwide.',
      search_ph:      'Search by make, model, location…',
      btn_search:     'Search',
      cat_homes:      'Homes & Estates',
      cat_cars:       'Luxury Cars',
      cat_yachts:     'Yachts',
      cat_jets:       'Private Jets',
      cat_villas:     'Villas',
      cat_watches:    'Watches',
      cat_jewellery:  'Jewellery',
      cat_other:      'Collectibles',
      featured_label: 'Featured Listings',
      featured_title: 'Handpicked for Discerning Buyers',
      view_all:       'View All Listings',
      categories_label:'Browse by Category',
      categories_title:'Every Luxury, One Destination',
      how_label:      'How It Works',
      how_title:      'Simple. Elegant. Effortless.',
      footer_copy:    '© 2025 LUL — Luxury Unique Listings. All rights reserved.'
    },
    it: {
      nav_homes:      'Case',
      nav_cars:       'Auto',
      nav_yachts:     'Yacht',
      nav_jets:       'Jet Privati',
      nav_villas:     'Ville',
      nav_watches:    'Orologi',
      nav_jewellery:  'Gioielli',
      nav_other:      'Altro',
      publish:        'Pubblica Inserzione',
      login:          'Accedi',
      hero_eyebrow:   'I Migliori Listing al Mondo',
      hero_h1_1:      'Scopri l\'Arte del',
      hero_h1_em:     'Vivere Eccellente',
      hero_sub:       'Immobili di lusso, veicoli, yacht, jet e collezioni da dealer d\'élite in tutto il mondo.',
      search_ph:      'Cerca per marca, modello, luogo…',
      btn_search:     'Cerca',
      cat_homes:      'Case & Tenute',
      cat_cars:       'Auto di Lusso',
      cat_yachts:     'Yacht',
      cat_jets:       'Jet Privati',
      cat_villas:     'Ville',
      cat_watches:    'Orologi',
      cat_jewellery:  'Gioielli',
      cat_other:      'Oggetti da Collezione',
      featured_label: 'Inserzioni in Evidenza',
      featured_title: 'Selezionate per Acquirenti Esigenti',
      view_all:       'Vedi Tutte le Inserzioni',
      categories_label:'Sfoglia per Categoria',
      categories_title:'Ogni Lusso, Un\'Unica Destinazione',
      how_label:      'Come Funziona',
      how_title:      'Semplice. Elegante. Senza Sforzo.',
      footer_copy:    '© 2025 LUL — Luxury Unique Listings. Tutti i diritti riservati.'
    },
    fr: {
      nav_homes:      'Maisons',
      nav_cars:       'Voitures',
      nav_yachts:     'Yachts',
      nav_jets:       'Jets Privés',
      nav_villas:     'Villas',
      nav_watches:    'Montres',
      nav_jewellery:  'Bijoux',
      nav_other:      'Autre',
      publish:        'Publier une annonce',
      login:          'Connexion',
      hero_eyebrow:   'Les Meilleures Annonces du Monde',
      hero_h1_1:      'Découvrez l\'Art de',
      hero_h1_em:     'Vivre Exceptionnellement',
      hero_sub:       'Immobilier de luxe, véhicules, yachts, jets et objets de collection de revendeurs d\'élite dans le monde entier.',
      search_ph:      'Rechercher par marque, modèle, lieu…',
      btn_search:     'Rechercher',
      cat_homes:      'Maisons & Domaines',
      cat_cars:       'Voitures de Luxe',
      cat_yachts:     'Yachts',
      cat_jets:       'Jets Privés',
      cat_villas:     'Villas',
      cat_watches:    'Montres',
      cat_jewellery:  'Bijoux',
      cat_other:      'Objets de Collection',
      featured_label: 'Annonces en Vedette',
      featured_title: 'Sélectionnées pour des Acheteurs Exigeants',
      view_all:       'Voir Toutes les Annonces',
      categories_label:'Parcourir par Catégorie',
      categories_title:'Chaque Luxe, Une Destination',
      how_label:      'Comment Ça Marche',
      how_title:      'Simple. Élégant. Effortless.',
      footer_copy:    '© 2025 LUL — Luxury Unique Listings. Tous droits réservés.'
    },
    de: {
      nav_homes:      'Häuser',
      nav_cars:       'Autos',
      nav_yachts:     'Yachten',
      nav_jets:       'Privatjets',
      nav_villas:     'Villen',
      nav_watches:    'Uhren',
      nav_jewellery:  'Schmuck',
      nav_other:      'Sonstiges',
      publish:        'Inserat aufgeben',
      login:          'Anmelden',
      hero_eyebrow:   'Die Besten Listings der Welt',
      hero_h1_1:      'Entdecken Sie die Kunst des',
      hero_h1_em:     'Außergewöhnlichen Lebens',
      hero_sub:       'Luxusimmobilien, Fahrzeuge, Yachten, Jets und Sammlerstücke von Elite-Händlern weltweit.',
      search_ph:      'Nach Marke, Modell, Ort suchen…',
      btn_search:     'Suchen',
      cat_homes:      'Häuser & Güter',
      cat_cars:       'Luxusautos',
      cat_yachts:     'Yachten',
      cat_jets:       'Privatjets',
      cat_villas:     'Villen',
      cat_watches:    'Uhren',
      cat_jewellery:  'Schmuck',
      cat_other:      'Sammlerstücke',
      featured_label: 'Empfohlene Inserate',
      featured_title: 'Handverlesen für Anspruchsvolle Käufer',
      view_all:       'Alle Inserate Anzeigen',
      categories_label:'Nach Kategorie Durchsuchen',
      categories_title:'Jeder Luxus, Ein Ziel',
      how_label:      'So Funktioniert Es',
      how_title:      'Einfach. Elegant. Mühelos.',
      footer_copy:    '© 2025 LUL — Luxury Unique Listings. Alle Rechte vorbehalten.'
    },
    es: {
      nav_homes:      'Casas',
      nav_cars:       'Coches',
      nav_yachts:     'Yates',
      nav_jets:       'Jets Privados',
      nav_villas:     'Villas',
      nav_watches:    'Relojes',
      nav_jewellery:  'Joyería',
      nav_other:      'Otro',
      publish:        'Publicar Anuncio',
      login:          'Iniciar Sesión',
      hero_eyebrow:   'Los Mejores Listings del Mundo',
      hero_h1_1:      'Descubre el Arte de',
      hero_h1_em:     'Vivir Excepcionalmente',
      hero_sub:       'Inmuebles de lujo, vehículos, yates, jets y coleccionables de distribuidores de élite en todo el mundo.',
      search_ph:      'Buscar por marca, modelo, lugar…',
      btn_search:     'Buscar',
      cat_homes:      'Casas y Fincas',
      cat_cars:       'Coches de Lujo',
      cat_yachts:     'Yates',
      cat_jets:       'Jets Privados',
      cat_villas:     'Villas',
      cat_watches:    'Relojes',
      cat_jewellery:  'Joyería',
      cat_other:      'Coleccionables',
      featured_label: 'Anuncios Destacados',
      featured_title: 'Seleccionados para Compradores Exigentes',
      view_all:       'Ver Todos los Anuncios',
      categories_label:'Explorar por Categoría',
      categories_title:'Todo el Lujo, Un Solo Destino',
      how_label:      'Cómo Funciona',
      how_title:      'Simple. Elegante. Sin Esfuerzo.',
      footer_copy:    '© 2025 LUL — Luxury Unique Listings. Todos los derechos reservados.'
    },
    ru: {
      nav_homes:      'Дома',
      nav_cars:       'Авто',
      nav_yachts:     'Яхты',
      nav_jets:       'Частные Джеты',
      nav_villas:     'Виллы',
      nav_watches:    'Часы',
      nav_jewellery:  'Ювелирные украшения',
      nav_other:      'Другое',
      publish:        'Разместить объявление',
      login:          'Войти',
      hero_eyebrow:   'Лучшие объявления в мире',
      hero_h1_1:      'Откройте для себя Искусство',
      hero_h1_em:     'Исключительной Жизни',
      hero_sub:       'Элитная недвижимость, автомобили, яхты, джеты и коллекционные предметы от лучших дилеров по всему миру.',
      search_ph:      'Поиск по марке, модели, месту…',
      btn_search:     'Поиск',
      cat_homes:      'Дома и Поместья',
      cat_cars:       'Люксовые Авто',
      cat_yachts:     'Яхты',
      cat_jets:       'Частные Джеты',
      cat_villas:     'Виллы',
      cat_watches:    'Часы',
      cat_jewellery:  'Украшения',
      cat_other:      'Коллекционное',
      featured_label: 'Избранные Объявления',
      featured_title: 'Подобрано для Взыскательных Покупателей',
      view_all:       'Смотреть Все Объявления',
      categories_label:'Обзор по Категориям',
      categories_title:'Каждая Роскошь — Одно Место',
      how_label:      'Как Это Работает',
      how_title:      'Просто. Элегантно. Без Усилий.',
      footer_copy:    '© 2025 LUL — Luxury Unique Listings. Все права защищены.'
    }
  };

  // ── Current language state ───────────────────────────────
  let currentLang = localStorage.getItem('lul_lang') || 'en';

  function applyLanguage(lang) {
    if (!LANGUAGES[lang]) lang = 'en';
    currentLang = lang;
    localStorage.setItem('lul_lang', lang);
    document.documentElement.lang = lang;

    const t = I18N[lang] || I18N.en;

    // Update all [data-i18n] elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (t[key] !== undefined) el.textContent = t[key];
    });

    // Update [data-i18n-ph] placeholders
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const key = el.dataset.i18nPh;
      if (t[key] !== undefined) el.placeholder = t[key];
    });

    // Update lang button
    const langBtn = document.querySelector('.lang-btn');
    if (langBtn) {
      langBtn.querySelector('.lang-flag').textContent = LANGUAGES[lang].flag;
      langBtn.querySelector('.lang-code').textContent = LANGUAGES[lang].label;
    }

    // Mark selected option
    document.querySelectorAll('.lang-option').forEach(opt => {
      opt.classList.toggle('selected', opt.dataset.lang === lang);
    });
  }

  // ── Language switcher init ───────────────────────────────
  function initLangSwitcher() {
    const btn      = document.querySelector('.lang-btn');
    const dropdown = document.querySelector('.lang-dropdown');
    if (!btn || !dropdown) return;

    // Build dropdown options
    dropdown.innerHTML = Object.entries(LANGUAGES).map(([code, info]) => `
      <div class="lang-option${code === currentLang ? ' selected' : ''}" data-lang="${code}">
        <span class="flag">${info.flag}</span>
        <span>${info.name}</span>
        <small style="color:var(--color-muted);margin-left:auto">${info.label}</small>
      </div>
    `).join('');

    btn.addEventListener('click', e => {
      e.stopPropagation();
      dropdown.classList.toggle('open');
      btn.classList.toggle('open');
    });

    dropdown.addEventListener('click', e => {
      const opt = e.target.closest('.lang-option');
      if (!opt) return;
      applyLanguage(opt.dataset.lang);
      dropdown.classList.remove('open');
      btn.classList.remove('open');
    });

    document.addEventListener('click', () => {
      dropdown.classList.remove('open');
      btn.classList.remove('open');
    });
  }

  // ── Mobile menu ──────────────────────────────────────────
  function initMobileMenu() {
    const toggle  = document.querySelector('.header-menu-toggle');
    const menu    = document.querySelector('.mobile-menu');
    const closeBtn = document.querySelector('.mobile-menu-close');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => menu.classList.add('open'));
    closeBtn?.addEventListener('click', () => menu.classList.remove('open'));
    menu.addEventListener('click', e => {
      if (e.target === menu) menu.classList.remove('open');
    });
  }

  // ── Hero category tabs ───────────────────────────────────
  function initHeroTabs() {
    document.querySelectorAll('.hero-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.hero-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
      });
    });
  }

  // ── Gallery (listing detail) ─────────────────────────────
  function initGallery() {
    const thumbs  = document.querySelectorAll('.gallery-thumb');
    const mainImg = document.querySelector('.gallery-main img');
    if (!thumbs.length || !mainImg) return;

    const images = Array.from(thumbs).map(t => t.querySelector('img')?.src);
    let currentIndex = 0;

    function setActive(index) {
      if (index < 0) index = images.length - 1;
      if (index >= images.length) index = 0;
      currentIndex = index;
      mainImg.src = images[index];
      thumbs.forEach((t, i) => t.classList.toggle('active', i === index));
    }

    thumbs.forEach((thumb, i) => {
      thumb.addEventListener('click', () => setActive(i));
    });

    // Lightbox
    const lightbox   = document.getElementById('lightbox');
    const lbImg      = document.querySelector('.lightbox-img');
    const lbClose    = document.querySelector('.lightbox-close');
    const lbPrev     = document.querySelector('.lightbox-prev');
    const lbNext     = document.querySelector('.lightbox-next');
    const expandBtn  = document.querySelector('.gallery-expand');

    function openLightbox(index) {
      if (!lightbox || !lbImg) return;
      currentIndex = index;
      lbImg.src = images[index];
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeLightbox() {
      lightbox?.classList.remove('open');
      document.body.style.overflow = '';
    }
    expandBtn?.addEventListener('click', () => openLightbox(currentIndex));
    document.querySelector('.gallery-main')?.addEventListener('click', e => {
      if (!e.target.closest('.gallery-expand')) openLightbox(currentIndex);
    });
    lbClose?.addEventListener('click', closeLightbox);
    lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
    lbPrev?.addEventListener('click', () => { currentIndex--; if (currentIndex < 0) currentIndex = images.length - 1; lbImg.src = images[currentIndex]; setActive(currentIndex); });
    lbNext?.addEventListener('click', () => { currentIndex++; if (currentIndex >= images.length) currentIndex = 0; lbImg.src = images[currentIndex]; setActive(currentIndex); });

    document.addEventListener('keydown', e => {
      if (!lightbox?.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') lbPrev?.click();
      if (e.key === 'ArrowRight') lbNext?.click();
    });

    setActive(0);
  }

  // ── Detail tabs ──────────────────────────────────────────
  function initDetailTabs() {
    const tabs     = document.querySelectorAll('.detail-tab');
    const contents = document.querySelectorAll('.detail-tab-content');
    if (!tabs.length) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        const target = document.getElementById(tab.dataset.tab);
        if (target) target.classList.add('active');
      });
    });
  }

  // ── FAQ accordion ────────────────────────────────────────
  function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(q => {
      q.addEventListener('click', () => {
        const item = q.closest('.faq-item');
        const wasOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        if (!wasOpen) item.classList.add('open');
      });
    });
  }

  // ── Pricing toggle (monthly / annual) ───────────────────
  function initPricingToggle() {
    const toggle = document.getElementById('pricing-toggle');
    if (!toggle) return;
    toggle.addEventListener('change', () => {
      const annual = toggle.checked;
      document.querySelectorAll('[data-price-monthly]').forEach(el => {
        const monthly = parseFloat(el.dataset.priceMonthly);
        if (!monthly) return;
        const price = annual ? Math.round(monthly * 10) : monthly; // 2 months free
        el.textContent = monthly === 0 ? 'Free' : '€' + price;
      });
      document.querySelectorAll('[data-price-period]').forEach(el => {
        el.textContent = annual ? '/ year' : '/ month';
      });
      const saveBadge = document.getElementById('save-badge');
      if (saveBadge) saveBadge.style.display = annual ? 'inline' : 'none';
    });
  }

  // ── Scroll animations (IntersectionObserver) ────────────
  function initScrollAnimations() {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.listing-card, .category-card, .step, .pricing-card, .kpi-card').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });
  }

  // ── Sticky header shadow ─────────────────────────────────
  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    window.addEventListener('scroll', () => {
      header.style.boxShadow = window.scrollY > 8
        ? '0 2px 20px rgba(0,0,0,0.25)'
        : 'none';
    }, { passive: true });
  }

  // ── Active nav link ──────────────────────────────────────
  function initActiveNav() {
    const page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.header-nav a').forEach(a => {
      const href = a.getAttribute('href');
      if (href && page.startsWith(href.replace('.html', ''))) {
        a.classList.add('active');
      }
    });
  }

  // ── Init all ─────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    applyLanguage(currentLang);
    initLangSwitcher();
    initMobileMenu();
    initHeroTabs();
    initGallery();
    initDetailTabs();
    initFAQ();
    initPricingToggle();
    initScrollAnimations();
    initHeaderScroll();
    initActiveNav();
  });

  // ── Public ───────────────────────────────────────────────
  window.LulApp = { applyLanguage, LANGUAGES, I18N };

})();
