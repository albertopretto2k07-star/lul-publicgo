/* ============================================================
   LUL — Analytics Dashboard Logic (Chart.js)
   Used only on analytics.html (owner dashboard)
   ============================================================ */

(function () {
  'use strict';

  // ── Wait for DOM + Chart.js ──────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    const raw = window.LulCookies?.getStoredAnalytics?.() || [];

    // ── Seed demo data if empty ──────────────────────────
    function seedDemoData() {
      const pages    = ['/', '/listings.html', '/listing-detail.html', '/pricing.html', '/analytics.html'];
      const devices  = ['desktop', 'mobile', 'tablet'];
      const browsers = ['Chrome', 'Safari', 'Firefox', 'Edge'];
      const langs    = ['en', 'it', 'fr', 'de', 'es'];
      const consents = ['all', 'technical', 'all', 'all', 'none', 'all'];
      const countries = ['Italy', 'Germany', 'France', 'Spain', 'United Kingdom', 'Switzerland', 'USA', 'UAE'];

      const demo = [];
      const now  = Date.now();
      for (let i = 0; i < 180; i++) {
        const daysAgo = Math.floor(Math.random() * 30);
        const ts = new Date(now - daysAgo * 86400000 - Math.random() * 86400000);
        demo.push({
          id:        'demo-' + i,
          sessionId: 'sess-' + Math.floor(i / 3),
          type:      Math.random() > 0.4 ? 'pageview' : 'click',
          page:      pages[Math.floor(Math.random() * pages.length)],
          title:     'LUL',
          referrer:  Math.random() > 0.5 ? 'google.com' : 'direct',
          device:    devices[Math.floor(Math.random() * devices.length)],
          browser:   browsers[Math.floor(Math.random() * browsers.length)],
          language:  langs[Math.floor(Math.random() * langs.length)],
          country:   countries[Math.floor(Math.random() * countries.length)],
          timestamp: ts.toISOString(),
          duration:  Math.floor(Math.random() * 240 + 10),
          consent:   consents[Math.floor(Math.random() * consents.length)]
        });
      }
      return demo;
    }

    const events = raw.length > 0 ? raw : seedDemoData();
    const pageviews = events.filter(e => e.type === 'pageview');

    // ── KPI Cards ────────────────────────────────────────
    const sessions   = new Set(events.map(e => e.sessionId)).size;
    const totalPV    = pageviews.length;
    const avgDur     = Math.round(events.filter(e => e.duration).reduce((s, e) => s + (e.duration || 0), 0) / Math.max(events.filter(e => e.duration).length, 1));
    const consentAll = events.filter(e => e.consent === 'all').length;
    const consentPct = Math.round((consentAll / Math.max(events.length, 1)) * 100);

    function setKPI(id, val) {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    }
    setKPI('kpi-sessions', sessions.toLocaleString());
    setKPI('kpi-pageviews', totalPV.toLocaleString());
    setKPI('kpi-duration', avgDur + 's');
    setKPI('kpi-consent', consentPct + '%');

    // ── Chart defaults ───────────────────────────────────
    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.color       = '#6B6B6B';
    const GOLD   = '#C9A84C';
    const GOLD_T = 'rgba(201,168,76,0.15)';
    const DARK   = '#1A1A1A';

    // ── 1. Pageviews last 30 days (line chart) ───────────
    (function buildLineChart() {
      const ctx = document.getElementById('chart-pageviews');
      if (!ctx) return;

      const labels = [];
      const data   = [];
      const today  = new Date();
      for (let i = 29; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const key = d.toISOString().split('T')[0];
        labels.push(d.toLocaleDateString('en', { month: 'short', day: 'numeric' }));
        data.push(pageviews.filter(e => e.timestamp?.startsWith(key)).length);
      }

      new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: 'Pageviews',
            data,
            borderColor: GOLD,
            backgroundColor: GOLD_T,
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointRadius: 3,
            pointBackgroundColor: GOLD
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: { legend: { display: false }, tooltip: { mode: 'index', intersect: false } },
          scales: {
            y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { stepSize: 1 } },
            x: { grid: { display: false }, ticks: { maxTicksLimit: 8 } }
          }
        }
      });
    })();

    // ── 2. Cookie consent distribution (doughnut) ────────
    (function buildConsentChart() {
      const ctx = document.getElementById('chart-consent');
      if (!ctx) return;
      const all  = events.filter(e => e.consent === 'all').length;
      const tech = events.filter(e => e.consent === 'technical').length;
      const none = events.filter(e => e.consent === 'none').length;
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['All cookies', 'Technical only', 'Refused'],
          datasets: [{ data: [all, tech, none], backgroundColor: [GOLD, '#888', '#ddd'], borderWidth: 0 }]
        },
        options: {
          responsive: true,
          cutout: '65%',
          plugins: { legend: { position: 'bottom', labels: { padding: 16, font: { size: 12 } } } }
        }
      });
    })();

    // ── 3. Devices (doughnut) ────────────────────────────
    (function buildDeviceChart() {
      const ctx = document.getElementById('chart-devices');
      if (!ctx) return;
      const counts = { desktop: 0, mobile: 0, tablet: 0 };
      events.forEach(e => { if (counts[e.device] !== undefined) counts[e.device]++; });
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Desktop', 'Mobile', 'Tablet'],
          datasets: [{ data: Object.values(counts), backgroundColor: [DARK, GOLD, '#b0b0b0'], borderWidth: 0 }]
        },
        options: {
          responsive: true,
          cutout: '65%',
          plugins: { legend: { position: 'bottom', labels: { padding: 16, font: { size: 12 } } } }
        }
      });
    })();

    // ── 4. Top pages (horizontal bar) ────────────────────
    (function buildPagesChart() {
      const ctx = document.getElementById('chart-pages');
      if (!ctx) return;
      const counts = {};
      pageviews.forEach(e => {
        const p = e.page || '/';
        counts[p] = (counts[p] || 0) + 1;
      });
      const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 6);
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: sorted.map(([p]) => p === '/' ? 'Home' : p.replace('.html', '')),
          datasets: [{ label: 'Views', data: sorted.map(([, v]) => v), backgroundColor: GOLD, borderRadius: 4 }]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          plugins: { legend: { display: false } },
          scales: { x: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } }, y: { grid: { display: false } } }
        }
      });
    })();

    // ── 5. Browsers (bar) ────────────────────────────────
    (function buildBrowserChart() {
      const ctx = document.getElementById('chart-browsers');
      if (!ctx) return;
      const counts = {};
      events.forEach(e => { if (e.browser) counts[e.browser] = (counts[e.browser] || 0) + 1; });
      const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: sorted.map(([b]) => b),
          datasets: [{ data: sorted.map(([, v]) => v), backgroundColor: [GOLD, '#888', '#b0b0b0', DARK], borderRadius: 4 }]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } }, x: { grid: { display: false } } }
        }
      });
    })();

    // ── 6. Countries (bar) ───────────────────────────────
    (function buildCountryChart() {
      const ctx = document.getElementById('chart-countries');
      if (!ctx) return;
      const counts = {};
      events.forEach(e => { if (e.country) counts[e.country] = (counts[e.country] || 0) + 1; });
      const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 8);
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: sorted.map(([c]) => c),
          datasets: [{ data: sorted.map(([, v]) => v), backgroundColor: GOLD, borderRadius: 4 }]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } }, x: { grid: { display: false }, ticks: { maxRotation: 30 } } }
        }
      });
    })();

    // ── Export JSON ──────────────────────────────────────
    document.getElementById('btn-export')?.addEventListener('click', () => {
      const blob = new Blob([JSON.stringify(events, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'lul-analytics-' + new Date().toISOString().split('T')[0] + '.json';
      a.click();
    });

    // ── Clear data ───────────────────────────────────────
    document.getElementById('btn-clear')?.addEventListener('click', () => {
      if (confirm('Clear all analytics data? This cannot be undone.')) {
        window.LulCookies?.clearAnalytics?.();
        location.reload();
      }
    });

    // ── Last updated ─────────────────────────────────────
    const lastEl = document.getElementById('last-updated');
    if (lastEl) lastEl.textContent = 'Last updated: ' + new Date().toLocaleString();
  });

})();
