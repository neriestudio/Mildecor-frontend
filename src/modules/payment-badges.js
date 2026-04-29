/**
 * MILDECOR / Payment Badges
 * ─────────────────────────────────────────────────────────────
 * Injects payment provider logos (Visa, Mastercard, Apple Pay,
 * Google Pay, Klarna) below the add-to-cart button on product pages.
 *
 * Logo URLs live in MILDECOR_CONFIG.ASSETS.PAYMENT_LOGOS.
 *
 * @author Julien Laumonerie / Nerie Studio
 * @since v1.0.0
 */

(function () {
  'use strict';

  var U = window.MILDECOR_UTILS;
  if (!U) return;

  var LOGOS = (window.MILDECOR_CONFIG && window.MILDECOR_CONFIG.ASSETS &&
               window.MILDECOR_CONFIG.ASSETS.PAYMENT_LOGOS) || [];

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
