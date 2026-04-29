/**
 * ═════════════════════════════════════════════════════════════
 * MILDECOR FRONTEND - HEADER BUNDLE
 * ═════════════════════════════════════════════════════════════
 *
 * This is the bundled file served by jsdelivr CDN.
 * It contains all custom code that needs to run early
 * (in Squarespace Header Code Injection).
 *
 * Modules included (in order):
 *   1. config.js          → Centralized configuration
 *   2. core/utils.js      → Reusable utilities
 *   3. core/pro-detection.js → PRO page detection
 *   4. modules/pro-class.js   → Apply .is-pro class to <html>
 *   5. modules/analytics.js   → GA4 + Clarity + Google Ads
 *   6. modules/mobile-search.js → Mobile search button injection
 *   7. modules/mega-menu.js   → Mega menu config and click handlers
 *   8. modules/product-categories.js → Category badges
 *
 * Total bundle size: ~6 KB (minified by jsdelivr ≈ 3 KB Brotli)
 *
 * @author Julien Laumonerie / Nerie Studio
 * @version 1.0.0
 * @license MIT
 */


/* ─────────────────────────────────────────────────────────────
   1. CONFIG
   ───────────────────────────────────────────────────────────── */
window.MILDECOR_CONFIG = {
  PRO_PATHS: [
    '/espace-professionnels',
    '/boutique-pro',
    '/pro-accessoires-et-machines',
    '/pro-revetements',
    '/nuanciers-pros',
    '/livraison-pro',
    '/faq-questions-reponses-pro',
    '/rendez-vous-professionnels',
    '/contact-pro',
    '/enduit-pro',
    '/peinture-pro',
    '/outils-et-accessoires-pro',
    '/machines-pro',
    '/vtements-pro'
  ],
  PRO_PRODUCT_SLUGS: [
    '/enduit-pro',
    '/peinture-pro',
    '/outils-et-accessoires-pro',
    '/machines-pro',
    '/pro-revetements',
    '/vtements-pro'
  ],
  PARTICULIER_BOUTIQUES: [
    '/enduit',
    '/boutique',
    '/outils-et-accessoires',
    '/machine',
    '/revetements',
    '/vtements'
  ],
  VAT_RATE: 0.20,
  BRAND: {
    PRIMARY: '#FF7847',
    BACKGROUND: '#F1F1E5',
    FOREGROUND: '#141414',
    BORDER: 'rgba(0,0,0,0.12)'
  },
  ASSETS: {
    PRO_LOGO: 'https://static1.squarespace.com/static/69541faa1b5b1e1843da0bbc/t/69e8a8a49a2cee684070a2f9/1776855204621/PRO+%281%29.png',
    PAYMENT_LOGOS: [
      { src: 'https://static1.squarespace.com/static/69541faa1b5b1e1843da0bbc/t/69ce35704e37ef0de9f0d5ac/1775121776319/visa.png', alt: 'Visa', h: 24 },
      { src: 'https://static1.squarespace.com/static/69541faa1b5b1e1843da0bbc/t/69ce2e16c25de408b71f17ad/1775119894937/Mastercard_icon-icons.com_60554.webp', alt: 'Mastercard', h: 28 },
      { src: 'https://static1.squarespace.com/static/69541faa1b5b1e1843da0bbc/t/69ce35e3231e9843a035dbb8/1775121891051/Apple-Pay-logo.png', alt: 'Apple Pay', h: 20 },
      { src: 'https://static1.squarespace.com/static/69541faa1b5b1e1843da0bbc/t/69ce352439f36773417d2533/1775121700664/Google_Pay_Logo.svg.png', alt: 'Google Pay', h: 20 },
      { src: 'https://static1.squarespace.com/static/69541faa1b5b1e1843da0bbc/t/69ce2e165e9656535ade4ac4/1775119894923/Klarna_Payment_Badge.svg.webp', alt: 'Klarna', h: 22 }
    ]
  },
  TRACKING: {
    GA4: 'G-3HMEEVL6WF',
    GOOGLE_ADS: 'AW-10783285337',
    CLARITY: 'w4fsokl1ah'
  },
  CALCULATOR_PRESETS: {
    'calculateur-mil3f':    { label: "Enduit Mil'3F",            mode: 'peinture',  rendement: 1.2, unit: 'L',  packs: [15],            jointsMode: true, jointsRendement: 0.3, note: "1,2 m²/L · Pot 15 L · Bandes à joints : 0,3 L/ml" },
    'calculateur-mil2f':    { label: "Enduit Mil'2F",            mode: 'enduit_kg', rendement: 1,   unit: 'kg', packs: [25],                                                  note: "1 kg/m² · Sac 25 kg" },
    'calculateur-premium':  { label: 'Peinture premium & laque', mode: 'peinture',  rendement: 11,  unit: 'L',  packs: [0.75, 2.5, 3, 10], couches: true,                      note: "11 m²/L par couche · Dekso, Mil'21/54/64/75, Strong Finish, High Finish" },
    'calculateur-standard': { label: 'Peinture',                 mode: 'peinture',  rendement: 9,   unit: 'L',  packs: [0.75, 3, 10],      couches: true,                      note: "9 m²/L par couche · Flutex Pro, Flutex 2S, Primers, Wood Tex" },
    'calculateur-revetement': { label: 'Revêtement de sol',      mode: 'paquets',   rendement: 2.23, unit: 'paquet', packs: [1],                                              note: "1 paquet = 2,23 m² · 7 paquets = 15,60 m²" }
  },
  MEGA_MENU_BLOCKS: {
    'block-yui_3_17_2_1_1775219252842_6279': '/boutique?tag=Best-seller%20particulier',
    'block-33d652a4a421268c277e':            '/boutique/kit',
    'block-1ac55bcd68fd5d56a015':            '/boutique?tag=Mildecor'
  },
  MEGA_MENU_SLUGS: [
    '/boutique',
    '/accessoires-et-machines',
    '/collections',
    '/mildecor-rdv',
    '/maison-mildecor'
  ]
};


/* ─────────────────────────────────────────────────────────────
   2. CORE UTILS
   ───────────────────────────────────────────────────────────── */
window.MILDECOR_UTILS = (function () {
  'use strict';

  function waitFor(selector, callback, timeout) {
    var el = document.querySelector(selector);
    if (el) { callback(el); return; }
    var timer;
    var observer = new MutationObserver(function () {
      var found = document.querySelector(selector);
      if (!found) return;
      observer.disconnect();
      clearTimeout(timer);
      callback(found);
    });
    observer.observe(document.body, { childList: true, subtree: true });
    timer = setTimeout(function () { observer.disconnect(); }, timeout || 5000);
  }

  function parsePrice(text) {
    if (!text) return NaN;
    return parseFloat(
      String(text).replace(/[^0-9,\s]/g, '').replace(/\s/g, '').replace(',', '.')
    );
  }

  function htText(rawTTC) {
    var vat = (window.MILDECOR_CONFIG && window.MILDECOR_CONFIG.VAT_RATE) || 0.20;
    return (rawTTC / (1 + vat)).toFixed(2).replace('.', ',') + ' € HT';
  }

  function addTag(parent, text, inline) {
    if (!parent || parent.querySelector('.ht-tag')) return;
    var span = document.createElement('span');
    span.className = 'ht-tag';
    span.style.cssText = inline
      ? 'font-size:0.8em;color:#888;margin-left:6px;'
      : 'display:block;font-size:0.8em;color:#888;margin-top:2px;';
    span.textContent = text;
    parent.appendChild(span);
  }

  function onReady(callback) {
    if (document.readyState !== 'loading') callback();
    else document.addEventListener('DOMContentLoaded', callback);
  }

  return { waitFor: waitFor, parsePrice: parsePrice, htText: htText, addTag: addTag, onReady: onReady };
})();
window.waitFor = window.MILDECOR_UTILS.waitFor;


/* ─────────────────────────────────────────────────────────────
   3. PRO DETECTION
   ───────────────────────────────────────────────────────────── */
window.MILDECOR_PRO = (function () {
  'use strict';
  var path = window.location.pathname;

  function isProPage() {
    var paths = (window.MILDECOR_CONFIG && window.MILDECOR_CONFIG.PRO_PATHS) || [];
    return paths.some(function (p) { return path === p || path.indexOf(p + '/') === 0; });
  }

  function isProProductPage() {
    var slugs = (window.MILDECOR_CONFIG && window.MILDECOR_CONFIG.PRO_PRODUCT_SLUGS) || [];
    return slugs.some(function (s) { return path.indexOf(s) === 0; });
  }

  function isParticulierBoutique() {
    var slugs = (window.MILDECOR_CONFIG && window.MILDECOR_CONFIG.PARTICULIER_BOUTIQUES) || [];
    return slugs.some(function (s) { return path.indexOf(s) === 0; });
  }

  function applyProClass() {
    if (isProPage()) document.documentElement.classList.add('is-pro');
  }

  function isProProductBlock(blockEl) {
    if (!blockEl) return false;
    try {
      var raw = blockEl.getAttribute('data-product');
      if (raw) {
        var data = JSON.parse(raw);
        if (data && Array.isArray(data.tags) && data.tags.indexOf('Pro') !== -1) return true;
      }
    } catch (e) { /* ignore */ }
    var link = blockEl.querySelector('a.product-title') || blockEl.querySelector('.image-container a');
    if (link) {
      var href = link.getAttribute('href') || '';
      var slugs = (window.MILDECOR_CONFIG && window.MILDECOR_CONFIG.PRO_PRODUCT_SLUGS) || [];
      return slugs.some(function (s) { return href.indexOf(s) === 0; });
    }
    return false;
  }

  return {
    isProPage: isProPage,
    isProProductPage: isProProductPage,
    isParticulierBoutique: isParticulierBoutique,
    applyProClass: applyProClass,
    isProProductBlock: isProProductBlock,
    currentPath: path
  };
})();


/* ─────────────────────────────────────────────────────────────
   4. APPLY .is-pro CLASS (must run early)
   ───────────────────────────────────────────────────────────── */
window.MILDECOR_PRO.applyProClass();


/* ─────────────────────────────────────────────────────────────
   5. ANALYTICS (GA4 blocker + GA4 + Clarity + Google Ads)
   ───────────────────────────────────────────────────────────── */
(function () {
  'use strict';
  var cfg = window.MILDECOR_CONFIG && window.MILDECOR_CONFIG.TRACKING;
  if (!cfg) return;

  // Block native GA4
  document.addEventListener('beforescriptexecute', function (e) {
    if (e.target.src && e.target.src.indexOf('cx=c&gtm=') !== -1) e.preventDefault();
  }, true);
  if (window.MutationObserver) {
    new MutationObserver(function (mutations) {
      mutations.forEach(function (m) {
        Array.prototype.forEach.call(m.addedNodes, function (n) {
          if (n.tagName === 'SCRIPT' && n.src && n.src.indexOf('cx=c&gtm=') !== -1) {
            if (n.parentNode) n.parentNode.removeChild(n);
          }
        });
      });
    }).observe(document.documentElement, { childList: true, subtree: true });
  }

  // GA4
  var s1 = document.createElement('script');
  s1.async = true;
  s1.src = 'https://www.googletagmanager.com/gtag/js?id=' + cfg.GA4;
  document.head.appendChild(s1);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', cfg.GA4);

  // Clarity
  (function (c, l, a, r, i, t, y) {
    c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
    t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
    y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
  })(window, document, 'clarity', 'script', cfg.CLARITY);

  // Google Ads
  var s2 = document.createElement('script');
  s2.async = true;
  s2.src = 'https://www.googletagmanager.com/gtag/js?id=' + cfg.GOOGLE_ADS;
  document.head.appendChild(s2);
  window.gtag('config', cfg.GOOGLE_ADS);
})();


/* ─────────────────────────────────────────────────────────────
   6. MOBILE SEARCH BUTTON
   ───────────────────────────────────────────────────────────── */
(function () {
  'use strict';
  function inject() {
    var container = document.querySelector(
      '.header-display-mobile .header-actions.header-actions--right .showOnMobile'
    );
    if (!container) return;
    container.style.display = 'flex';
    container.style.flexDirection = 'row';
    container.style.alignItems = 'center';
    container.style.gap = '8px';
    if (container.querySelector('#mobile-search-btn')) return;

    var wrapper = document.createElement('div');
    wrapper.className = 'header-actions-action header-actions-action--search';
    wrapper.id = 'mobile-search-btn';
    var link = document.createElement('a');
    link.href = '/search';
    link.setAttribute('aria-label', 'Rechercher');
    link.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';
    wrapper.appendChild(link);
    container.appendChild(wrapper);
  }
  window.MILDECOR_UTILS.onReady(inject);
})();


/* ─────────────────────────────────────────────────────────────
   7. MEGA MENU (config + click handlers)
   ───────────────────────────────────────────────────────────── */
window.wmMegaMenuSettings = { layout: 'full-width', openAnimation: 'slide' };

(function () {
  'use strict';
  var slugs = (window.MILDECOR_CONFIG && window.MILDECOR_CONFIG.MEGA_MENU_SLUGS) || [];
  var blocks = (window.MILDECOR_CONFIG && window.MILDECOR_CONFIG.MEGA_MENU_BLOCKS) || {};

  function preventDefaultOnTopLevel() {
    slugs.forEach(function (slug) {
      var el = document.querySelector('.header-display-desktop a[href="' + slug + '"]');
      if (!el) return;
      el.addEventListener('click', function (e) { e.preventDefault(); });
    });
  }

  function initBlockClicks() {
    Object.keys(blocks).forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      el.style.cursor = 'pointer';
      el.onclick = function () { window.location.href = blocks[id]; };
    });
  }

  window.MILDECOR_UTILS.waitFor('.header-display-desktop a[href="/boutique"]', preventDefaultOnTopLevel);
  var firstBlockId = Object.keys(blocks)[0];
  if (firstBlockId) window.MILDECOR_UTILS.waitFor('#' + firstBlockId, initBlockClicks);
})();


/* ─────────────────────────────────────────────────────────────
   8. PRODUCT CATEGORIES BADGES
   ───────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  async function init() {
    var bodyCL = document.body.classList;
    if (!bodyCL.contains('view-item') || !bodyCL.contains('collection-type-products')) return;

    var json;
    try {
      var res = await fetch(window.location.pathname + '?format=json&' + Date.now());
      json = await res.json();
    } catch (e) { return; }

    if (!json.item || !json.item.categoryIds) return;
    var categoryIds = json.item.categoryIds;
    var itemCategories = (json.nestedCategories && json.nestedCategories.itemCategories) || [];
    var title = document.querySelector('.ProductItem-details-title, .product-meta .product-title');
    if (!title) return;

    var productCategories = itemCategories.filter(function (c) { return categoryIds.indexOf(c.id) !== -1; });
    if (productCategories.length === 0) return;

    var wrapper = document.createElement('div');
    wrapper.className = 'wm-product-categories';
    productCategories.forEach(function (category) {
      var el = document.createElement('a');
      el.className = 'product-category';
      el.setAttribute('data-category-id', category.id);
      el.setAttribute('data-category-slug', category.shortSlug);
      el.textContent = category.displayName;
      el.href = category.fullUrl;
      wrapper.appendChild(el);
    });
    title.insertAdjacentElement('beforebegin', wrapper);
  }

  window.addEventListener('DOMContentLoaded', init);
})();


/* ─────────────────────────────────────────────────────────────
   END OF HEADER BUNDLE
   ───────────────────────────────────────────────────────────── */
