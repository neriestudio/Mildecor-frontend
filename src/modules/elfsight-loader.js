/**
 * MILDECOR / Elfsight Lazy Loader
 * ─────────────────────────────────────────────────────────────
 * Defers loading of the Elfsight chat widget until user
 * interaction (scroll) or 3 seconds, whichever comes first.
 *
 * Reduces initial page weight by ~150 KB and improves LCP.
 *
 * Note: The Elfsight container <div class="elfsight-app-..."> is
 * placed in the Squarespace Footer Code Injection (3rd-party
 * marker, not handled here).
 *
 * @author Julien Laumonerie / Nerie Studio
 * @since v1.0.0
 */

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

  // Trigger 1: First scroll
  window.addEventListener('scroll', loadElfsight, { once: true });

  // Trigger 2: Fallback after 3s if no scroll
  setTimeout(loadElfsight, 3000);

})();
