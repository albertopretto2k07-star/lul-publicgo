/* ============================================================
   LUL — Cookie Management & Analytics Collection
   ============================================================ */

(function () {
  'use strict';

  // ── Config ──────────────────────────────────────────────
  const STORAGE_KEY   = 'lul_cookie_consent';
  const ANALYTICS_KEY = 'lul_analytics';
  const MAX_EVENTS    = 500; // max events stored locally

  // ── Utilities ───────────────────────────────────────────
  function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0;
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }

  function getOrCreateSessionId() {
    let sid = sessionStorage.getItem('lul_session_id');
    if (!sid) { sid = uuid(); sessionStorage.setItem('lul_session_id', sid); }
    return sid;
  }

  function parseDevice(ua) {
    if (/mobile/i.test(ua))  return 'mobile';
    if (/tablet|ipad/i.test(ua)) return 'tablet';
    return 'desktop';
  }

  function parseBrowser(ua) {
    if (/firefox/i.test(ua))  return 'Firefox';
    if (/edg/i.test(ua))      return 'Edge';
    if (/chrome/i.test(ua))   return 'Chrome';
    if (/safari/i.test(ua))   return 'Safari';
    if (/opera|opr/i.test(ua)) return 'Opera';
    return 'Other';
  }

  function getStoredAnalytics() {
    try { return JSON.parse(localStorage.getItem(ANALYTICS_KEY) || '[]'); }
    catch { return []; }
  }

  function saveAnalytics(data) {
    try { localStorage.setItem(ANALYTICS_KEY, JSON.stringify(data)); }
    catch { /* quota exceeded — silent fail */ }
  }

  // ── Track an event ─────────────────────────────────────
  function trackEvent(type, extra) {
    const consent = getConsent();
    if (!consent || consent.level === 'none') return;

    const events = getStoredAnalytics();
    if (events.length >= MAX_EVENTS) events.splice(0, 50); // rotate oldest

    const ua = navigator.userAgent;
    events.push({
      id:        uuid(),
      sessionId: getOrCreateSessionId(),
      type:      type,          // 'pageview' | 'click' | 'search' | 'listing_view'
      page:      window.location.pathname,
      title:     document.title,
      referrer:  document.referrer || 'direct',
      device:    parseDevice(ua),
      browser:   parseBrowser(ua),
      language:  navigator.language || 'unknown',
      timestamp: new Date().toISOString(),
      consent:   consent.level,
      ...extra
    });
    saveAnalytics(events);
  }

  // ── Session duration tracking ───────────────────────────
  const sessionStart = Date.now();
  window.addEventListener('beforeunload', () => {
    const duration = Math.round((Date.now() - sessionStart) / 1000);
    trackEvent('session_end', { duration });
  });

  // ── Click tracking ──────────────────────────────────────
  document.addEventListener('click', e => {
    const el = e.target.closest('a, button, [data-track]');
    if (!el) return;
    const label = el.dataset.track || el.innerText?.trim()?.substring(0, 40) || el.className;
    trackEvent('click', { label, tag: el.tagName.toLowerCase() });
  });

  // ── Consent helpers ─────────────────────────────────────
  function getConsent() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)); }
    catch { return null; }
  }

  function setConsent(level, prefs) {
    const consent = { level, prefs, timestamp: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    trackEvent('consent_set', { level });
    return consent;
  }

  // ── Banner DOM ──────────────────────────────────────────
  function buildBanner() {
    const banner = document.getElementById('cookie-banner');
    const modal  = document.getElementById('cookie-modal');
    if (!banner) return;

    // Show banner
    setTimeout(() => banner.classList.add('visible'), 600);

    // Accept All
    banner.querySelector('.btn-cookie-all')?.addEventListener('click', () => {
      setConsent('all', { analytics: true, marketing: false });
      hideBanner();
      trackEvent('pageview');
    });

    // Technical only
    banner.querySelector('.btn-cookie-tech')?.addEventListener('click', () => {
      setConsent('technical', { analytics: false, marketing: false });
      hideBanner();
    });

    // Customize → modal
    banner.querySelector('.btn-cookie-customize')?.addEventListener('click', () => {
      if (modal) { modal.classList.add('open'); }
    });

    // Modal: save
    modal?.querySelector('.btn-modal-save')?.addEventListener('click', () => {
      const analyticsToggle = modal.querySelector('#toggle-analytics');
      const prefs = { analytics: analyticsToggle?.checked || false, marketing: false };
      const level = prefs.analytics ? 'all' : 'technical';
      setConsent(level, prefs);
      modal.classList.remove('open');
      hideBanner();
      if (level === 'all') trackEvent('pageview');
    });

    // Modal: cancel
    modal?.querySelector('.btn-modal-cancel')?.addEventListener('click', () => {
      modal.classList.remove('open');
    });

    // Click outside modal
    modal?.addEventListener('click', e => {
      if (e.target === modal) modal.classList.remove('open');
    });
  }

  function hideBanner() {
    const banner = document.getElementById('cookie-banner');
    if (banner) {
      banner.style.transform = 'translateY(100%)';
      setTimeout(() => banner.remove(), 400);
    }
  }

  // ── Init ────────────────────────────────────────────────
  function init() {
    const consent = getConsent();
    if (!consent) {
      // No consent yet → show banner
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', buildBanner);
      } else {
        buildBanner();
      }
    } else if (consent.level === 'all') {
      // Already consented → track pageview silently
      document.addEventListener('DOMContentLoaded', () => trackEvent('pageview'));
    }
  }

  init();

  // ── Public API (used by analytics.js) ───────────────────
  window.LulCookies = {
    getConsent,
    getStoredAnalytics,
    trackEvent,
    clearAnalytics: () => { localStorage.removeItem(ANALYTICS_KEY); }
  };

})();
