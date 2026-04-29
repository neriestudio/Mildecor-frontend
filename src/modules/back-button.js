/**
 * MILDECOR / Back Button
 * ─────────────────────────────────────────────────────────────
 * Adds a "← Retour" link above product detail pages on mobile,
 * using history.back().
 *
 * Visibility is controlled via CSS media queries (see
 * styles/mildecor.css → .mld-back-btn).
 *
 * @author Julien Laumonerie / Nerie Studio
 * @since v1.0.0
 */

(function () {
  'use strict';

  var productEl = document.querySelector('.product-detail');
  if (!productEl) return;

  var btn = document.createElement('a');
  btn.className = 'mld-back-btn';
  btn.href = '#';
  btn.textContent = '← Retour';

  btn.addEventListener('click', function (e) {
    e.preventDefault();
    history.back();
  });

  productEl.parentNode.insertBefore(btn, productEl);

})();
