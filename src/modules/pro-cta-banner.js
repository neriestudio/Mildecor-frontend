/**
 * MILDECOR / Pro CTA Banner
 * ─────────────────────────────────────────────────────────────
 * Shows a "You're a professional?" banner on Particulier product
 * pages, encouraging visitors to sign up for the PRO program.
 *
 * Visible only on PARTICULIER product pages
 * (skipped on PRO pages, cart, checkout).
 *
 * Banner is inserted right after .product-add-to-cart in product-meta.
 *
 * @author Julien Laumonerie / Nerie Studio
 * @since v1.0.0
 */

(function () {
  'use strict';

  var U = window.MILDECOR_UTILS;
  var P = window.MILDECOR_PRO;
  if (!U || !P) return;

  // Skip on PRO pages
  if (P.isProProductPage()) return;

  // Show only on Particulier boutique pages
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

    banner.innerHTML = ''
      + '<div style="display:flex;align-items:center;gap:10px;min-width:0;">'
      +   '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF7847" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;">'
      +     '<rect x="2" y="7" width="20" height="14" rx="2"/>'
      +     '<path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>'
      +   '</svg>'
      +   '<div style="line-height:1.3;">'
      +     '<div style="font-size:13px;font-weight:700;color:#FF7847;">Vous êtes professionnel ?</div>'
      +     '<div style="font-size:11px;color:#bbb;font-weight:400;margin-top:2px;">Tarifs préférentiels & conditions dédiées</div>'
      +   '</div>'
      + '</div>'
      + '<span style="font-size:12px;font-weight:600;color:#FF7847;white-space:nowrap;flex-shrink:0;">S\'inscrire →</span>';

    banner.addEventListener('mouseenter', function () { banner.style.background = '#222'; });
    banner.addEventListener('mouseleave', function () { banner.style.background = '#141414'; });

    addToCart.parentNode.insertBefore(banner, addToCart.nextSibling);
  }

  U.waitFor('.product-detail', init);

})();
