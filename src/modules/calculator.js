/**
 * MILDECOR / Calculator
 * ─────────────────────────────────────────────────────────────
 * Quantity calculator for paints, enduits, and floor coverings.
 *
 * MERGES two previous scripts (revêtements + peinture/enduit) into
 * a single configurable module driven by MILDECOR_CONFIG.CALCULATOR_PRESETS.
 *
 * Detects the active preset via product CSS class:
 *   .product-detail.tag-calculateur-mil3f
 *   .product-detail.tag-calculateur-mil2f
 *   .product-detail.tag-calculateur-premium
 *   .product-detail.tag-calculateur-standard
 *   .product-detail.tag-calculateur-revetement (or via URL fallback for revetements)
 *
 * Each preset can specify:
 *   - rendement (m²/L or m²/kg or m²/paquet)
 *   - unit ('L' | 'kg' | 'paquet')
 *   - packs (available container sizes)
 *   - couches (boolean: enable 1-couche/2-couches toggle)
 *   - jointsMode (boolean: enable surface/joints tabs)
 *
 * @author Julien Laumonerie / Nerie Studio
 * @since v1.0.0
 */

(function () {
  'use strict';

  var U = window.MILDECOR_UTILS;
  if (!U) return;

  function detectConfig() {
    var presets = (window.MILDECOR_CONFIG && window.MILDECOR_CONFIG.CALCULATOR_PRESETS) || {};
    var el = document.querySelector('.product-detail');
    if (!el) return null;

    // Method 1: tag-* class
    var keys = Object.keys(presets);
    for (var i = 0; i < keys.length; i++) {
      if (el.classList.contains('tag-' + keys[i])) return presets[keys[i]];
    }

    // Method 2: URL fallback for floor coverings
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

    var els = mainVariants.querySelectorAll(
      'select option, .variant-option label, label, button, [data-variant-option-value]'
    );
    var packs = [];
    var unitPattern = unit === 'kg'
      ? /(\d+(?:[.,]\d+)?)\s*(?:kg|KG|kilo)/i
      : /(\d+(?:[.,]\d+)?)\s*(?:L|l|litre|liter|litres|cl)/i;

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
      if (n > 0) {
        result.push({ size: sorted[i], count: n });
        remaining -= n * sorted[i];
      }
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
      return '<span style="color:#FF7847;font-size:19px;font-weight:700;">' +
        p.count + '\u00A0\u00D7\u00A0' + p.size + '\u202F' + unit + '</span>';
    }).join('<span style="color:#bbb;margin:0 8px;font-size:16px;">+</span>');
  }

  function injectStyles() {
    if (document.getElementById('mld-calc-styles')) return;
    var s = document.createElement('style');
    s.id = 'mld-calc-styles';
    s.textContent = [
      '.pcalc-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.52);z-index:9999;align-items:center;justify-content:center;}',
      '.pcalc-overlay.open{display:flex;}',
      '.pcalc-modal{background:#fff;border-radius:14px;padding:2rem;max-width:460px;width:92%;position:relative;box-shadow:0 24px 64px rgba(0,0,0,.18);}',
      '.pcalc-close{position:absolute;top:14px;right:18px;font-size:20px;cursor:pointer;color:#aaa;background:none;border:none;line-height:1;transition:color .15s;}',
      '.pcalc-close:hover{color:#141414;}',
      '.pcalc-modal h3{margin:0 0 .15rem;font-size:19px;font-weight:700;color:#141414;}',
      '.pcalc-sub{font-size:12px;color:#aaa;margin:0 0 1.4rem;letter-spacing:.02em;}',
      '.pcalc-tabs{display:flex;gap:6px;margin-bottom:1.2rem;}',
      '.pcalc-tab{flex:1;padding:9px 6px;font-size:13px;font-weight:500;border:1.5px solid #e0e0e0;border-radius:8px;background:#f5f5f5;cursor:pointer;text-align:center;transition:all .15s;}',
      '.pcalc-tab.active{background:#fff0eb;color:#FF7847;border-color:#FF7847;font-weight:700;}',
      '.pcalc-label{font-size:13px;color:#666;margin:0 0 .45rem;display:block;font-weight:500;}',
      '.pcalc-input{width:100%;box-sizing:border-box;font-size:16px;padding:10px 14px;border:1.5px solid #e0e0e0;border-radius:8px;margin-bottom:.9rem;outline:none;transition:border-color .15s;color:#141414;}',
      '.pcalc-input:focus{border-color:#FF7847;}',
      '.pcalc-couches{display:flex;gap:8px;margin-bottom:.4rem;}',
      '.pcalc-couches button{flex:1;padding:10px 8px;font-size:13px;border:1.5px solid #e0e0e0;border-radius:8px;background:#f5f5f5;cursor:pointer;transition:all .15s;color:#666;line-height:1.3;text-align:center;}',
      '.pcalc-couches button.active{background:#fff0eb;color:#FF7847;border-color:#FF7847;font-weight:700;}',
      '.pcalc-couches button small{display:block;font-size:10px;font-weight:400;color:#999;margin-top:2px;}',
      '.pcalc-couches button.active small{color:#FF7847;}',
      '.pcalc-hint{font-size:11px;color:#999;margin:0 0 1.1rem;text-align:center;line-height:1.4;}',
      '.pcalc-result{background:#F1F1E5;border-radius:10px;padding:1.15rem 1.3rem;display:none;}',
      '.pcalc-row{margin-bottom:.7rem;}',
      '.pcalc-row:last-child{margin-bottom:0;}',
      '.pcalc-row p{margin:0 0 4px;font-size:12px;color:#999;}',
      '.pcalc-row strong{font-size:16px;font-weight:500;color:#141414;}',
      '.pcalc-hr{border:none;border-top:1px solid #ddd;margin:.85rem 0;}',
      '.pcalc-note{font-size:11px;color:#bbb;margin-top:.9rem;line-height:1.6;}'
    ].join('');
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
        hasJoints
          ? '<div class="pcalc-tabs"><button class="pcalc-tab active" id="pcalc-tab-s">Surface murale</button><button class="pcalc-tab" id="pcalc-tab-j">Bandes à joints</button></div>'
          : '',
        '<div id="pcalc-sec-s">',
          '<label class="pcalc-label">Surface à couvrir (m²)</label>',
          '<input type="number" id="pcalc-surf" class="pcalc-input" min="0" step="0.5" placeholder="Ex : 25 m²">',
          hasCouches
            ? '<div class="pcalc-couches"><button id="pcalc-c1">1 couche<small>primaire / sous-couche</small></button><button id="pcalc-c2" class="active">2 couches<small>finition</small></button></div><p class="pcalc-hint">1 couche pour un primaire, 2 couches pour une finition.</p>'
            : '',
        '</div>',
        hasJoints
          ? '<div id="pcalc-sec-j" style="display:none;"><label class="pcalc-label">Longueur de bandes à joints (ml)</label><input type="number" id="pcalc-joints" class="pcalc-input" min="0" step="0.5" placeholder="Ex : 15 ml"></div>'
          : '',
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

        if (cfg.mode === 'enduit_kg') {
          qty = surf * cfg.rendement;
          label = 'Kilogrammes nécessaires';
        } else if (isPaquetMode) {
          qty = Math.ceil(surf / cfg.rendement);
          label = 'Paquets nécessaires';
        } else if (hasCouches) {
          qty = (surf / cfg.rendement) * couches;
          label = 'Litres nécessaires (' + couches + ' couche' + (couches > 1 ? 's' : '') + ')';
        } else {
          qty = surf / cfg.rendement;
          label = 'Litres nécessaires';
        }
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

    overlay.querySelector('.pcalc-close').addEventListener('click', function () {
      overlay.classList.remove('open');
    });
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) overlay.classList.remove('open');
    });

    var detail = document.querySelector('.product-detail');
    var productMeta = detail.querySelector('.product-meta');
    var mainAddToCart = productMeta && productMeta.querySelector('.product-add-to-cart');
    if (!mainAddToCart) return;

    var btn = document.createElement('a');
    btn.className = 'paint-calc-trigger';
    btn.textContent = '📐 Calculer la quantité nécessaire';
    btn.style.cssText = 'display:inline-flex;align-items:center;gap:8px;font-size:14px;font-weight:600;color:#141414;background:#F1F1E5;padding:10px 18px;border-radius:8px;text-decoration:none;cursor:pointer;margin-bottom:16px;width:fit-content;border:1px solid #ddd;';
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      overlay.classList.add('open');
    });

    var mainVariants = detail.querySelector('#main-product-variants');
    if (mainVariants && productMeta.contains(mainVariants)) {
      mainVariants.parentNode.insertBefore(btn, mainVariants);
    } else {
      mainAddToCart.parentNode.insertBefore(btn, mainAddToCart);
    }
  }

  U.waitFor('.product-detail', init);

})();
