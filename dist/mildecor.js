/**
 * ═════════════════════════════════════════════════════════════
 * MILDECOR FRONTEND - FOOTER BUNDLE
 * ═════════════════════════════════════════════════════════════
 *
 * This is the bundled file served by jsdelivr CDN.
 * It contains all custom code that runs after the page has loaded
 * (Squarespace Footer Code Injection).
 *
 * Depends on the Header bundle (mildecor-header.js) being loaded
 * first, since this file uses MILDECOR_CONFIG, MILDECOR_UTILS,
 * and MILDECOR_PRO defined there.
 *
 * Modules included:
 *   1.  pricing-ht.js         → HT prices (PRO listings, products, cart, blocks)
 *   2.  calculator.js         → Quantity calculator (paint + enduit + revêtement)
 *   3.  color-badges.js       → "Couleur" badges on color products
 *   4.  payment-badges.js     → Visa/MC/Apple Pay/Klarna logos
 *   5.  nuancier-banner.js    → Banner on color products
 *   6.  pro-cta-banner.js     → "You're a pro?" CTA on Particulier products
 *   7.  back-button.js        → Mobile back button on product pages
 *   8.  label-translations.js → from→À partir de, sale→Promotion
 *   9.  tag-filter.js         → URL ?tag= auto-applies filter
 *   10. faq-schema.js         → JSON-LD FAQ structured data (SEO)
 *   11. lightbox-fix.js       → Lightbox margin + input bg fixes
 *   12. elfsight-loader.js    → Lazy load Elfsight chat
 *   13. pro-logo-redirect.js  → Logo redirects to /espace-professionnels on PRO
 *
 * Total bundle size: ~22 KB (minified by jsdelivr ≈ 8 KB Brotli)
 *
 * @author Julien Laumonerie / Nerie Studio
 * @version 1.0.0
 * @license MIT
 */


/* ─────────────────────────────────────────────────────────────
   1. PRICING HT (PRO contexts)
   ───────────────────────────────────────────────────────────── */
(function () {
  'use strict';
  var U = window.MILDECOR_UTILS;
  var P = window.MILDECOR_PRO;
  if (!U || !P) return;

  var path = P.currentPath;
  var isPro = P.isProProductPage();
  var isEspace = path.indexOf('/espace-professionnels') !== -1;
  var isCart = path.indexOf('/cart') !== -1;
  var isCheckout = path.indexOf('/checkout') !== -1;

  function updateListing() {
    document.querySelectorAll('.product-list-item-price').forEach(function (el) {
      var raw = U.parsePrice(el.innerText);
      if (!isNaN(raw) && raw > 0) {
        var prefix = el.innerText.indexOf('partir') !== -1 ? 'À partir de ' : '';
        U.addTag(el, prefix + U.htText(raw), false);
      }
    });
  }
  function updateProduct() {
    var priceEl = document.querySelector('.product-price-value');
    if (!priceEl) return;
    var existing = document.getElementById('ht-dynamic');
    if (!existing) {
      existing = document.createElement('p');
      existing.id = 'ht-dynamic';
      existing.style.cssText = 'font-weight:600;color:#555;font-size:0.9em;margin-top:4px;';
      priceEl.parentNode.insertBefore(existing, priceEl.nextSibling);
    }
    var raw = U.parsePrice(priceEl.innerText);
    if (!isNaN(raw) && raw > 0) existing.textContent = U.htText(raw);
  }
  function updateCart() {
    document.querySelectorAll('[class*="cart-row-price"]').forEach(function (el) {
      var raw = U.parsePrice(el.innerText);
      if (!isNaN(raw) && raw > 0) U.addTag(el, U.htText(raw), false);
    });
  }
  function updateSummary() {
    document.querySelectorAll('.summary-price .product-price').forEach(function (el) {
      if (el.querySelector('.ht-tag')) return;
      var raw = U.parsePrice(el.innerText);
      if (!isNaN(raw) && raw > 0) {
        var prefix = el.innerText.indexOf('partir') !== -1 ? 'À partir de ' : '';
        U.addTag(el, prefix + U.htText(raw), false);
      }
    });
  }
  function updateCheckout() {
    document.querySelectorAll('[class*="CartItem-totalPrice"]').forEach(function (el) {
      var raw = U.parsePrice(el.innerText);
      if (!isNaN(raw) && raw > 0) U.addTag(el, U.htText(raw), false);
    });
    document.querySelectorAll('[class*="CartItem-eachPrice"]').forEach(function (el) {
      var raw = U.parsePrice(el.innerText);
      if (!isNaN(raw) && raw > 0) U.addTag(el, U.htText(raw), true);
    });
  }
  function updateProductBlocks() {
    document.querySelectorAll('.product-block.sqs-block-product').forEach(function (block) {
      if (block.dataset.htProcessed === '1') return;
      if (!P.isProProductBlock(block)) return;
      var priceEl = block.querySelector('.product-price');
      if (!priceEl || priceEl.querySelector('.ht-tag')) return;
      var rawText = priceEl.innerText;
      var raw = U.parsePrice(rawText);
      if (isNaN(raw) || raw <= 0) return;
      var prefix = rawText.toLowerCase().indexOf('partir') !== -1 ? 'À partir de ' : '';
      U.addTag(priceEl, prefix + U.htText(raw), false);
      block.dataset.htProcessed = '1';
    });
  }

  window.addEventListener('load', function () {
    setTimeout(function () {
      updateProductBlocks();
      if (isPro) { updateListing(); updateProduct(); }
      if (isPro || isEspace) updateSummary();
      if (isCart) updateCart();
      if (isCheckout) updateCheckout();
    }, 300);

    if (isPro) {
      document.addEventListener('change', function (e) {
        if (e.target.closest('.product-variants') || e.target.closest('select')) {
          setTimeout(updateProduct, 300);
        }
      });
      var priceZone = document.querySelector('.product-list-items');
      if (priceZone) {
        new MutationObserver(function () { updateListing(); }).observe(priceZone, { childList: true, subtree: true });
      }
    }

    document.addEventListener('change', function (e) {
      var block = e.target.closest('.product-block.sqs-block-product');
      if (!block) return;
      block.dataset.htProcessed = '';
      var existing = block.querySelector('.product-price .ht-tag');
      if (existing) existing.remove();
      setTimeout(updateProductBlocks, 300);
    });
  });
})();


/* ─────────────────────────────────────────────────────────────
   2. CALCULATOR (paint + enduit + revêtement, unified)
   ───────────────────────────────────────────────────────────── */
(function () {
  'use strict';
  var U = window.MILDECOR_UTILS;
  if (!U) return;

  function detectConfig() {
    var presets = (window.MILDECOR_CONFIG && window.MILDECOR_CONFIG.CALCULATOR_PRESETS) || {};
    var el = document.querySelector('.product-detail');
    if (!el) return null;
    var keys = Object.keys(presets);
    for (var i = 0; i < keys.length; i++) {
      if (el.classList.contains('tag-' + keys[i])) return presets[keys[i]];
    }
    var path = window.location.pathname;
    if (path.indexOf('/revetements/') !== -1 || path.indexOf('/pro-revetements/') !== -1) {
      return presets['calculateur-revetement'] || null;
    }
    return null;
  }

  function detectPacksFromVariants(unit) {
    var detail = document.querySelector('.product-detail');
    if (!detail) return null;
    var mainVariants = detail.querySelector('#main-product-variants');
    if (!mainVariants) return null;
    var els = mainVariants.querySelectorAll('select option, .variant-option label, label, button, [data-variant-option-value]');
    var packs = [];
    var unitPattern = unit === 'kg' ? /(\d+(?:[.,]\d+)?)\s*(?:kg|KG|kilo)/i : /(\d+(?:[.,]\d+)?)\s*(?:L|l|litre|liter|litres|cl)/i;
    els.forEach(function (el) {
      var match = el.textContent.trim().match(unitPattern);
      if (match) {
        var val = parseFloat(match[1].replace(',', '.'));
        if (/cl/i.test(match[0])) val = val / 100;
        if (!isNaN(val) && val > 0 && packs.indexOf(val) === -1) packs.push(val);
      }
    });
    return packs.length > 0 ? packs.sort(function (a, b) { return a - b; }) : null;
  }

  function suggestPacks(qty, packs) {
    var sorted = packs.slice().sort(function (a, b) { return b - a; });
    var remaining = qty;
    var result = [];
    for (var i = 0; i < sorted.length; i++) {
      if (remaining <= 0.001) break;
      var n = Math.floor(remaining / sorted[i]);
      if (n > 0) { result.push({ size: sorted[i], count: n }); remaining -= n * sorted[i]; }
    }
    if (remaining > 0.001) {
      var sm = sorted[sorted.length - 1];
      var last = result[result.length - 1];
      if (last && last.size === sm) last.count++;
      else result.push({ size: sm, count: 1 });
    }
    return result;
  }

  function renderPacks(suggestion, unit) {
    return suggestion.map(function (p) {
      return '<span style="color:#FF7847;font-size:19px;font-weight:700;">' + p.count + '\u00A0\u00D7\u00A0' + p.size + '\u202F' + unit + '</span>';
    }).join('<span style="color:#bbb;margin:0 8px;font-size:16px;">+</span>');
  }

  function injectStyles() {
    if (document.getElementById('mld-calc-styles')) return;
    var s = document.createElement('style');
    s.id = 'mld-calc-styles';
    s.textContent = '.pcalc-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.52);z-index:9999;align-items:center;justify-content:center;}.pcalc-overlay.open{display:flex;}.pcalc-modal{background:#fff;border-radius:14px;padding:2rem;max-width:460px;width:92%;position:relative;box-shadow:0 24px 64px rgba(0,0,0,.18);}.pcalc-close{position:absolute;top:14px;right:18px;font-size:20px;cursor:pointer;color:#aaa;background:none;border:none;line-height:1;transition:color .15s;}.pcalc-close:hover{color:#141414;}.pcalc-modal h3{margin:0 0 .15rem;font-size:19px;font-weight:700;color:#141414;}.pcalc-sub{font-size:12px;color:#aaa;margin:0 0 1.4rem;letter-spacing:.02em;}.pcalc-tabs{display:flex;gap:6px;margin-bottom:1.2rem;}.pcalc-tab{flex:1;padding:9px 6px;font-size:13px;font-weight:500;border:1.5px solid #e0e0e0;border-radius:8px;background:#f5f5f5;cursor:pointer;text-align:center;transition:all .15s;}.pcalc-tab.active{background:#fff0eb;color:#FF7847;border-color:#FF7847;font-weight:700;}.pcalc-label{font-size:13px;color:#666;margin:0 0 .45rem;display:block;font-weight:500;}.pcalc-input{width:100%;box-sizing:border-box;font-size:16px;padding:10px 14px;border:1.5px solid #e0e0e0;border-radius:8px;margin-bottom:.9rem;outline:none;transition:border-color .15s;color:#141414;}.pcalc-input:focus{border-color:#FF7847;}.pcalc-couches{display:flex;gap:8px;margin-bottom:.4rem;}.pcalc-couches button{flex:1;padding:10px 8px;font-size:13px;border:1.5px solid #e0e0e0;border-radius:8px;background:#f5f5f5;cursor:pointer;transition:all .15s;color:#666;line-height:1.3;text-align:center;}.pcalc-couches button.active{background:#fff0eb;color:#FF7847;border-color:#FF7847;font-weight:700;}.pcalc-couches button small{display:block;font-size:10px;font-weight:400;color:#999;margin-top:2px;}.pcalc-couches button.active small{color:#FF7847;}.pcalc-hint{font-size:11px;color:#999;margin:0 0 1.1rem;text-align:center;line-height:1.4;}.pcalc-result{background:#F1F1E5;border-radius:10px;padding:1.15rem 1.3rem;display:none;}.pcalc-row{margin-bottom:.7rem;}.pcalc-row:last-child{margin-bottom:0;}.pcalc-row p{margin:0 0 4px;font-size:12px;color:#999;}.pcalc-row strong{font-size:16px;font-weight:500;color:#141414;}.pcalc-hr{border:none;border-top:1px solid #ddd;margin:.85rem 0;}.pcalc-note{font-size:11px;color:#bbb;margin-top:.9rem;line-height:1.6;}';
    document.head.appendChild(s);
  }

  function init() {
    if (!document.querySelector('.product-detail')) return;
    if (document.querySelector('.paint-calc-trigger')) return;
    var cfg = detectConfig();
    if (!cfg) return;

    var livePacks = detectPacksFromVariants(cfg.unit);
    var packs = livePacks || cfg.packs;
    injectStyles();

    var hasJoints = !!cfg.jointsMode;
    var hasCouches = !!cfg.couches;
    var isPaquetMode = cfg.mode === 'paquets';

    var overlay = document.createElement('div');
    overlay.className = 'pcalc-overlay';
    overlay.innerHTML = [
      '<div class="pcalc-modal">',
      '<button class="pcalc-close" aria-label="Fermer">&#x2715;</button>',
      '<h3>Calculateur de quantité</h3>',
      '<p class="pcalc-sub">' + cfg.label + '</p>',
      hasJoints ? '<div class="pcalc-tabs"><button class="pcalc-tab active" id="pcalc-tab-s">Surface murale</button><button class="pcalc-tab" id="pcalc-tab-j">Bandes à joints</button></div>' : '',
      '<div id="pcalc-sec-s">',
      '<label class="pcalc-label">Surface à couvrir (m²)</label>',
      '<input type="number" id="pcalc-surf" class="pcalc-input" min="0" step="0.5" placeholder="Ex : 25 m²">',
      hasCouches ? '<div class="pcalc-couches"><button id="pcalc-c1">1 couche<small>primaire / sous-couche</small></button><button id="pcalc-c2" class="active">2 couches<small>finition</small></button></div><p class="pcalc-hint">1 couche pour un primaire, 2 couches pour une finition.</p>' : '',
      '</div>',
      hasJoints ? '<div id="pcalc-sec-j" style="display:none;"><label class="pcalc-label">Longueur de bandes à joints (ml)</label><input type="number" id="pcalc-joints" class="pcalc-input" min="0" step="0.5" placeholder="Ex : 15 ml"></div>' : '',
      '<div class="pcalc-result" id="pcalc-result">',
      '<div class="pcalc-row"><p id="pcalc-qty-lbl">Quantité nécessaire</p><strong id="pcalc-qty">\u2014</strong></div>',
      '<hr class="pcalc-hr">',
      '<div class="pcalc-row"><p>Conditionnement conseillé</p><div id="pcalc-packs" style="margin-top:4px;">\u2014</div></div>',
      '</div>',
      '<p class="pcalc-note">' + cfg.note + '</p>',
      '</div>'
    ].join('');
    document.body.appendChild(overlay);

    var couches = 2;
    var tab = 'surface';

    function run() {
      var res = document.getElementById('pcalc-result');
      var qty = 0, label = '';
      if (tab === 'surface') {
        var surf = parseFloat(document.getElementById('pcalc-surf').value);
        if (!surf || surf <= 0) { res.style.display = 'none'; return; }
        if (cfg.mode === 'enduit_kg') { qty = surf * cfg.rendement; label = 'Kilogrammes nécessaires'; }
        else if (isPaquetMode) { qty = Math.ceil(surf / cfg.rendement); label = 'Paquets nécessaires'; }
        else if (hasCouches) { qty = (surf / cfg.rendement) * couches; label = 'Litres nécessaires (' + couches + ' couche' + (couches > 1 ? 's' : '') + ')'; }
        else { qty = surf / cfg.rendement; label = 'Litres nécessaires'; }
      } else {
        var ml = parseFloat(document.getElementById('pcalc-joints').value);
        if (!ml || ml <= 0) { res.style.display = 'none'; return; }
        qty = ml * cfg.jointsRendement;
        label = 'Litres nécessaires (bandes à joints)';
      }
      document.getElementById('pcalc-qty-lbl').textContent = label;
      document.getElementById('pcalc-qty').textContent = qty.toFixed(2) + '\u202F' + cfg.unit;
      document.getElementById('pcalc-packs').innerHTML = renderPacks(suggestPacks(qty, packs), cfg.unit);
      res.style.display = 'block';
    }

    document.getElementById('pcalc-surf').addEventListener('input', run);
    if (hasJoints) {
      document.getElementById('pcalc-joints').addEventListener('input', run);
      document.getElementById('pcalc-tab-s').addEventListener('click', function () {
        tab = 'surface';
        document.getElementById('pcalc-tab-s').classList.add('active');
        document.getElementById('pcalc-tab-j').classList.remove('active');
        document.getElementById('pcalc-sec-s').style.display = '';
        document.getElementById('pcalc-sec-j').style.display = 'none';
        document.getElementById('pcalc-result').style.display = 'none';
      });
      document.getElementById('pcalc-tab-j').addEventListener('click', function () {
        tab = 'joints';
        document.getElementById('pcalc-tab-j').classList.add('active');
        document.getElementById('pcalc-tab-s').classList.remove('active');
        document.getElementById('pcalc-sec-j').style.display = '';
        document.getElementById('pcalc-sec-s').style.display = 'none';
        document.getElementById('pcalc-result').style.display = 'none';
      });
    }
    if (hasCouches) {
      document.getElementById('pcalc-c1').addEventListener('click', function () {
        couches = 1;
        document.getElementById('pcalc-c1').classList.add('active');
        document.getElementById('pcalc-c2').classList.remove('active');
        run();
      });
      document.getElementById('pcalc-c2').addEventListener('click', function () {
        couches = 2;
        document.getElementById('pcalc-c2').classList.add('active');
        document.getElementById('pcalc-c1').classList.remove('active');
        run();
      });
    }

    overlay.querySelector('.pcalc-close').addEventListener('click', function () { overlay.classList.remove('open'); });
    overlay.addEventListener('click', function (e) { if (e.target === overlay) overlay.classList.remove('open'); });

    var detail = document.querySelector('.product-detail');
    var productMeta = detail.querySelector('.product-meta');
    var mainAddToCart = productMeta && productMeta.querySelector('.product-add-to-cart');
    if (!mainAddToCart) return;

    var btn = document.createElement('a');
    btn.className = 'paint-calc-trigger';
    btn.textContent = '📐 Calculer la quantité nécessaire';
    btn.style.cssText = 'display:inline-flex;align-items:center;gap:8px;font-size:14px;font-weight:600;color:#141414;background:#F1F1E5;padding:10px 18px;border-radius:8px;text-decoration:none;cursor:pointer;margin-bottom:16px;width:fit-content;border:1px solid #ddd;';
    btn.addEventListener('click', function (e) { e.preventDefault(); overlay.classList.add('open'); });

    var mainVariants = detail.querySelector('#main-product-variants');
    if (mainVariants && productMeta.contains(mainVariants)) mainVariants.parentNode.insertBefore(btn, mainVariants);
    else mainAddToCart.parentNode.insertBefore(btn, mainAddToCart);
  }

  U.waitFor('.product-detail', init);
})();


/* ─────────────────────────────────────────────────────────────
   3. COLOR BADGES
   ───────────────────────────────────────────────────────────── */
(function () {
  'use strict';
  function addBadge(container) {
    if (container.querySelector('.mld-color-badge')) return;
    container.style.position = 'relative';
    var badge = document.createElement('span');
    badge.className = 'mld-color-badge';
    badge.textContent = 'Couleur';
    container.appendChild(badge);
  }
  function processProductBlocks() {
    document.querySelectorAll('.product-block.sqs-block-product').forEach(function (block) {
      if (block.dataset.colorBadgeProcessed === '1') return;
      try {
        var raw = block.getAttribute('data-product');
        if (!raw) return;
        var data = JSON.parse(raw);
        if (!data.tags || !Array.isArray(data.tags)) return;
        if (data.tags.indexOf('Couleurs') === -1) return;
        var imgContainer = block.querySelector('.image-container');
        if (imgContainer) { addBadge(imgContainer); block.dataset.colorBadgeProcessed = '1'; }
      } catch (e) { }
    });
  }
  function processSummaryItems() {
    document.querySelectorAll('.summary-item:not([data-color-badge-processed])').forEach(function (item) {
      item.setAttribute('data-color-badge-processed', '1');
      var link = item.querySelector('a.summary-thumbnail, a.summary-title-link');
      if (!link) return;
      var href = link.getAttribute('href');
      if (!href) return;
      fetch(href + '?format=json')
        .then(function (r) { return r.json(); })
        .then(function (data) {
          if (!data || !data.item || !data.item.tags) return;
          if (data.item.tags.indexOf('Couleurs') === -1) return;
          var thumb = item.querySelector('.summary-thumbnail.img-wrapper, .summary-thumbnail');
          if (thumb) addBadge(thumb);
        })
        .catch(function () { });
    });
  }
  window.addEventListener('load', function () {
    setTimeout(function () { processProductBlocks(); processSummaryItems(); }, 400);
  });
})();


/* ─────────────────────────────────────────────────────────────
   4. PAYMENT BADGES
   ───────────────────────────────────────────────────────────── */
(function () {
  'use strict';
  var U = window.MILDECOR_UTILS;
  if (!U) return;
  var LOGOS = (window.MILDECOR_CONFIG && window.MILDECOR_CONFIG.ASSETS && window.MILDECOR_CONFIG.ASSETS.PAYMENT_LOGOS) || [];

  function inject() {
    if (!document.querySelector('.product-detail')) return;
    if (document.querySelector('.mld-payment-badges')) return;
    var target = document.querySelector('.product-meta > .product-add-to-cart');
    if (!target) return;

    var wrapper = document.createElement('div');
    wrapper.className = 'mld-payment-badges';
    wrapper.style.cssText = 'display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-top:14px;padding-top:14px;border-top:1px solid #e8e8e8';

    LOGOS.forEach(function (logo) {
      var badge = document.createElement('div');
      badge.style.cssText = 'background:#ffffff;border-radius:6px;border:1px solid rgba(0,0,0,0.08);height:32px;padding:0 8px;display:flex;align-items:center;justify-content:center';
      var img = document.createElement('img');
      img.src = logo.src;
      img.alt = logo.alt;
      img.loading = 'lazy';
      img.style.cssText = 'height:' + logo.h + 'px;width:auto;display:block;';
      badge.appendChild(img);
      wrapper.appendChild(badge);
    });

    var label = document.createElement('div');
    label.style.cssText = 'width:100%;margin-top:6px;display:flex;align-items:center;gap:5px;';
    label.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg><span style="font-size:11px;color:#888;">Paiement 100% sécurisé</span>';
    wrapper.appendChild(label);
    target.appendChild(wrapper);
  }

  U.waitFor('.product-meta > .product-add-to-cart', inject);
})();


/* ─────────────────────────────────────────────────────────────
   5. NUANCIER BANNER (color products)
   ───────────────────────────────────────────────────────────── */
(function () {
  'use strict';
  var productEl = document.querySelector('.product-detail');
  if (!productEl) return;
  if (!productEl.classList.contains('tag-couleurs')) return;

  if (!document.getElementById('mld-nuancier-styles')) {
    var style = document.createElement('style');
    style.id = 'mld-nuancier-styles';
    style.textContent = '.nuancier-banner{display:flex;align-items:center;gap:12px;background:#F1F1E5;border-left:3px solid #FF7A49;padding:14px 20px;margin:16px 0;border-radius:20px;font-family:inherit;flex-wrap:wrap;width:fit-content;}.nuancier-icon{font-size:18px;}.nuancier-text{font-size:14px;color:#555;}.nuancier-cta{font-size:14px;font-weight:600;color:#FF7A49;text-decoration:none;border-bottom:1px solid #FF7A49;padding-bottom:1px;transition:color 0.2s;}';
    document.head.appendChild(style);
  }

  function createBanner(openInNewTab) {
    var banner = document.createElement('div');
    banner.className = 'nuancier-banner';
    var icon = document.createElement('span');
    icon.className = 'nuancier-icon';
    icon.textContent = '🎨';
    var text = document.createElement('span');
    text.className = 'nuancier-text';
    text.textContent = 'Nous réalisons les teintes de toutes les marques. à renseigner à ajout au panier.';
    var link = document.createElement('a');
    link.href = '/nuanciers';
    link.className = 'nuancier-cta';
    link.textContent = 'Voir des exemples de nuanciers →';
    if (openInNewTab) link.target = '_blank';
    banner.appendChild(icon);
    banner.appendChild(text);
    banner.appendChild(link);
    return banner;
  }

  var variants = productEl.querySelector('.product-variants');
  if (variants && variants.parentNode) {
    variants.parentNode.insertBefore(createBanner(false), variants);
  }
  var observer = new MutationObserver(function () {
    var lightbox = document.querySelector('.lightbox-content');
    if (lightbox && !lightbox.querySelector('.nuancier-banner')) {
      lightbox.insertBefore(createBanner(true), lightbox.firstChild);
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();


/* ─────────────────────────────────────────────────────────────
   6. PRO CTA BANNER (Particulier products only)
   ───────────────────────────────────────────────────────────── */
(function () {
  'use strict';
  var U = window.MILDECOR_UTILS;
  var P = window.MILDECOR_PRO;
  if (!U || !P) return;
  if (P.isProProductPage()) return;
  if (!P.isParticulierBoutique()) return;

  function init() {
    var detail = document.querySelector('.product-detail');
    if (!detail) return;
    if (document.querySelector('.mld-pro-banner')) return;
    var addToCart = detail.querySelector('.product-meta > .product-add-to-cart');
    if (!addToCart) return;

    var banner = document.createElement('a');
    banner.className = 'mld-pro-banner';
    banner.href = '/inscription';
    banner.style.cssText = 'display:inline-flex;align-items:center;gap:14px;flex-wrap:nowrap;background:#141414;padding:10px 16px;border-radius:10px;margin-top:16px;text-decoration:none;font-family:inherit;transition:background 0.2s;cursor:pointer;width:fit-content;max-width:100%;';
    banner.innerHTML = '<div style="display:flex;align-items:center;gap:10px;min-width:0;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF7847" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg><div style="line-height:1.3;"><div style="font-size:13px;font-weight:700;color:#FF7847;">Vous êtes professionnel ?</div><div style="font-size:11px;color:#bbb;font-weight:400;margin-top:2px;">Tarifs préférentiels & conditions dédiées</div></div></div><span style="font-size:12px;font-weight:600;color:#FF7847;white-space:nowrap;flex-shrink:0;">S\'inscrire →</span>';
    banner.addEventListener('mouseenter', function () { banner.style.background = '#222'; });
    banner.addEventListener('mouseleave', function () { banner.style.background = '#141414'; });
    addToCart.parentNode.insertBefore(banner, addToCart.nextSibling);
  }

  U.waitFor('.product-detail', init);
})();


/* ─────────────────────────────────────────────────────────────
   7. BACK BUTTON (mobile, product pages)
   ───────────────────────────────────────────────────────────── */
(function () {
  'use strict';
  var productEl = document.querySelector('.product-detail');
  if (!productEl) return;
  var btn = document.createElement('a');
  btn.className = 'mld-back-btn';
  btn.href = '#';
  btn.textContent = '← Retour';
  btn.addEventListener('click', function (e) { e.preventDefault(); history.back(); });
  productEl.parentNode.insertBefore(btn, productEl);
})();


/* ─────────────────────────────────────────────────────────────
   8. LABEL TRANSLATIONS (from→À partir de, sale→Promotion)
   ───────────────────────────────────────────────────────────── */
(function () {
  'use strict';
  function fixSummaryLabels() {
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    var node;
    while ((node = walker.nextNode())) {
      var parent = node.parentElement;
      if (!parent) continue;
      if (parent.closest('.cart-checkout-button, button, input, select, textarea, script, style')) continue;
      var original = node.nodeValue;
      var updated = original.replace(/\bfrom\b/gi, 'À partir de').replace(/\bsale\b/gi, 'Promotion');
      if (updated !== original) node.nodeValue = updated;
    }
  }
  document.addEventListener('DOMContentLoaded', fixSummaryLabels);
  setTimeout(fixSummaryLabels, 800);
})();


/* ─────────────────────────────────────────────────────────────
   9. TAG FILTER (URL ?tag= auto-applies filter)
   ───────────────────────────────────────────────────────────── */
(function () {
  'use strict';
  var U = window.MILDECOR_UTILS;
  if (!U) return;
  function applyTagFilter() {
    var params = new URLSearchParams(window.location.search);
    var tag = params.get('tag');
    if (!tag) return;
    var selects = document.querySelectorAll('.dropdown-select[data-filter-type="TAG"]');
    if (!selects.length) return;
    selects.forEach(function (select) {
      var match = Array.from(select.options).find(function (o) { return o.value.toLowerCase() === tag.toLowerCase(); });
      if (match) {
        select.value = match.value;
        select.classList.remove('show-placeholder');
        select.setAttribute('aria-label', match.value);
        select.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
    var filterBtn = document.querySelector('.product-list-filter-button');
    if (filterBtn) filterBtn.click();
  }
  U.waitFor('.dropdown-select[data-filter-type="TAG"]', applyTagFilter);
})();


/* ─────────────────────────────────────────────────────────────
   10. FAQ SCHEMA (JSON-LD)
   ───────────────────────────────────────────────────────────── */
(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', function () {
    var faqBlock = document.querySelector('.faq-schema');
    if (!faqBlock) return;
    var questions = faqBlock.querySelectorAll('.faq-question');
    var answers = faqBlock.querySelectorAll('.faq-answer');
    if (!questions.length || questions.length !== answers.length) return;
    var faqData = { '@context': 'https://schema.org', '@type': 'FAQPage', 'mainEntity': [] };
    questions.forEach(function (question, index) {
      faqData.mainEntity.push({
        '@type': 'Question',
        'name': question.innerText.trim(),
        'acceptedAnswer': { '@type': 'Answer', 'text': answers[index].innerText.trim() }
      });
    });
    var script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(faqData);
    document.head.appendChild(script);
  });
})();


/* ─────────────────────────────────────────────────────────────
   11. LIGHTBOX FIX (margins + input bg)
   ───────────────────────────────────────────────────────────── */
(function () {
  'use strict';
  document.addEventListener('click', function () {
    var attempts = 0;
    var interval = setInterval(function () {
      attempts++;
      var lc = document.querySelector('.lightbox-content.bright-inverse');
      if (lc) {
        if (window.innerWidth <= 767) {
          lc.style.removeProperty('margin-top');
          lc.style.removeProperty('margin-bottom');
        }
        lc.querySelectorAll('input, textarea').forEach(function (el) {
          el.style.setProperty('background-color', '#ffffff', 'important');
        });
      }
      if (attempts >= 10) clearInterval(interval);
    }, 100);
  }, true);
})();


/* ─────────────────────────────────────────────────────────────
   12. ELFSIGHT LAZY LOADER
   ───────────────────────────────────────────────────────────── */
(function () {
  'use strict';
  function loadElfsight() {
    if (window.elfsightLoaded) return;
    window.elfsightLoaded = true;
    var script = document.createElement('script');
    script.src = 'https://elfsightcdn.com/platform.js';
    script.async = true;
    document.body.appendChild(script);
  }
  window.addEventListener('scroll', loadElfsight, { once: true });
  setTimeout(loadElfsight, 3000);
})();


/* ─────────────────────────────────────────────────────────────
   13. PRO LOGO REDIRECT
   ───────────────────────────────────────────────────────────── */
(function () {
  'use strict';
  var U = window.MILDECOR_UTILS;
  var P = window.MILDECOR_PRO;
  if (!U || !P) return;
  if (!P.isProPage()) return;
  function redirectLogo() {
    var logoLinks = document.querySelectorAll('.header-title-logo a, .header-title-text a');
    logoLinks.forEach(function (link) { link.setAttribute('href', '/espace-professionnels'); });
  }
  U.waitFor('.header-title-logo a, .header-title-text a', redirectLogo);
})();


/* ─────────────────────────────────────────────────────────────
   END OF FOOTER BUNDLE
   ───────────────────────────────────────────────────────────── */
