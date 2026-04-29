/**
 * MILDECOR / Analytics
 * ─────────────────────────────────────────────────────────────
 * Loads tracking scripts and blocks Squarespace's native GA4 tag
 * to prevent double-tracking.
 *
 * Includes:
 * - GA4 native tag blocker (MutationObserver + beforescriptexecute)
 * - GA4 manual tag
 * - Microsoft Clarity
 * - Google Ads
 *
 * Note: HelpfulCrowd is loaded directly in Squarespace Header Injection
 * (3rd-party plugin, separate concern).
 *
 * @author Julien Laumonerie / Nerie Studio
 * @since v1.0.0
 */

(function () {
  'use strict';

  var cfg = window.MILDECOR_CONFIG && window.MILDECOR_CONFIG.TRACKING;
  if (!cfg) {
    console.warn('[Mildecor] MILDECOR_CONFIG.TRACKING not found, analytics skipped.');
    return;
  }

  // ─── 1. Block Squarespace's native GA4 tag ──────────────────
  // Prevents double-tracking when SQSP injects its own gtag.
  function blockNativeGA4() {
    // Method 1: Firefox
    document.addEventListener('beforescriptexecute', function (e) {
      if (e.target.src && e.target.src.indexOf('cx=c&gtm=') !== -1) {
        e.preventDefault();
      }
    }, true);

    // Method 2: Chrome/Safari (more reliable)
    if (window.MutationObserver) {
      var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          Array.prototype.forEach.call(mutation.addedNodes, function (node) {
            if (node.tagName === 'SCRIPT' && node.src && node.src.indexOf('cx=c&gtm=') !== -1) {
              if (node.parentNode) node.parentNode.removeChild(node);
            }
          });
        });
      });
      observer.observe(document.documentElement, {
        childList: true,
        subtree: true
      });
    }
  }

  // ─── 2. Load GA4 (manual) ───────────────────────────────────
  function loadGA4() {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + cfg.GA4;
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', cfg.GA4);
  }

  // ─── 3. Load Microsoft Clarity ──────────────────────────────
  function loadClarity() {
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', cfg.CLARITY);
  }

  // ─── 4. Load Google Ads ─────────────────────────────────────
  function loadGoogleAds() {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + cfg.GOOGLE_ADS;
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag('config', cfg.GOOGLE_ADS);
  }

  // ─── Init ───────────────────────────────────────────────────
  blockNativeGA4();
  loadGA4();
  loadClarity();
  loadGoogleAds();

})();
