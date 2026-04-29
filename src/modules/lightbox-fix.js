/**
 * MILDECOR / Lightbox Fix
 * ─────────────────────────────────────────────────────────────
 * Fixes Squarespace lightbox display issues:
 *
 * 1. Removes inline margin-top/margin-bottom on mobile that can
 *    push content off-screen.
 * 2. Forces white background on all input fields inside the
 *    lightbox (Squarespace sometimes injects dark theme styles).
 *
 * Triggered on every click (lightboxes can open at any time).
 * Polls 10 times at 100ms intervals to catch async-loaded content.
 *
 * @author Julien Laumonerie / Nerie Studio
 * @since v1.0.0
 */

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
