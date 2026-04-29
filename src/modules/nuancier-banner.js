/**
 * MILDECOR / Nuancier Banner
 * ─────────────────────────────────────────────────────────────
 * Displays a banner on color products informing users that all
 * brand tints can be reproduced. Banner appears next to product
 * variants and inside the lightbox when opened.
 *
 * Triggered when the product page has the .tag-couleurs class.
 *
 * @author Julien Laumonerie / Nerie Studio
 * @since v1.0.0
 */

(function () {
  'use strict';

  var productEl = document.querySelector('.product-detail');
  if (!productEl) return;
  if (!productEl.classList.contains('tag-couleurs')) return;

  // Inject styles once
  function injectStyles() {
    if (document.getElementById('mld-nuancier-styles')) return;
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

  injectStyles();

  // 1. Insert banner above variants
  var variants = productEl.querySelector('.product-variants');
  if (variants && variants.parentNode) {
    variants.parentNode.insertBefore(createBanner(false), variants);
  }

  // 2. Insert banner inside lightbox when opened
  var observer = new MutationObserver(function () {
    var lightbox = document.querySelector('.lightbox-content');
    if (lightbox && !lightbox.querySelector('.nuancier-banner')) {
      lightbox.insertBefore(createBanner(true), lightbox.firstChild);
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });

})();
