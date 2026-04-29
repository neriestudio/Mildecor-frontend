/**
 * MILDECOR_PRO
 * ─────────────────────────────────────────────────────────────
 * Centralized PRO page detection.
 *
 * BEFORE: 5 different files each had their own PRO_PATHS array,
 *         creating drift bugs when adding new PRO categories.
 * AFTER:  Everything reads from MILDECOR_CONFIG.PRO_PATHS.
 *
 * Public methods:
 * - isProPage()              → true if current URL is a PRO page
 * - isProProductPage()       → true if current URL is a PRO product
 * - isProBoutique()          → true if current URL is a PRO category listing
 * - applyProClass()          → adds .is-pro to <html> (used by CSS)
 * - isProProductBlock(el)    → true if a Code Block product has tag "Pro"
 *
 * @author Julien Laumonerie / Nerie Studio
 * @since v1.0.0
 */

window.MILDECOR_PRO = (function () {
  'use strict';

  var path = window.location.pathname;

  /**
   * Is the current page anywhere in the PRO universe?
   */
  function isProPage() {
    var paths = (window.MILDECOR_CONFIG && window.MILDECOR_CONFIG.PRO_PATHS) || [];
    return paths.some(function (p) {
      return path === p || path.indexOf(p + '/') === 0;
    });
  }

  /**
   * Is the current page a PRO product page (deeper than a category listing)?
   */
  function isProProductPage() {
    var slugs = (window.MILDECOR_CONFIG && window.MILDECOR_CONFIG.PRO_PRODUCT_SLUGS) || [];
    return slugs.some(function (s) { return path.indexOf(s) === 0; });
  }

  /**
   * Is the current page a PRO category listing (top-level boutique pro)?
   */
  function isProBoutique() {
    var slugs = (window.MILDECOR_CONFIG && window.MILDECOR_CONFIG.PRO_PRODUCT_SLUGS) || [];
    return slugs.some(function (s) { return path === s; });
  }

  /**
   * Is the current page in the particulier boutique (where pro CTA banner shows)?
   */
  function isParticulierBoutique() {
    var slugs = (window.MILDECOR_CONFIG && window.MILDECOR_CONFIG.PARTICULIER_BOUTIQUES) || [];
    return slugs.some(function (s) { return path.indexOf(s) === 0; });
  }

  /**
   * Adds .is-pro class to <html> if on a PRO page.
   * Used by CSS to apply the dark theme variant.
   */
  function applyProClass() {
    if (isProPage()) {
      document.documentElement.classList.add('is-pro');
    }
  }

  /**
   * Detect if a product Code Block element represents a PRO product.
   * Checks the JSON tag list first, falls back to URL-based detection.
   *
   * @param {HTMLElement} blockEl - .product-block.sqs-block-product
   * @returns {boolean}
   */
  function isProProductBlock(blockEl) {
    if (!blockEl) return false;

    // Method 1: tag "Pro" in data-product JSON
    try {
      var raw = blockEl.getAttribute('data-product');
      if (raw) {
        var data = JSON.parse(raw);
        if (data && Array.isArray(data.tags) && data.tags.indexOf('Pro') !== -1) {
          return true;
        }
      }
    } catch (e) { /* ignore parse errors */ }

    // Method 2: URL fallback (link to PRO category)
    var link = blockEl.querySelector('a.product-title') ||
               blockEl.querySelector('.image-container a');
    if (link) {
      var href = link.getAttribute('href') || '';
      var slugs = (window.MILDECOR_CONFIG && window.MILDECOR_CONFIG.PRO_PRODUCT_SLUGS) || [];
      return slugs.some(function (s) { return href.indexOf(s) === 0; });
    }

    return false;
  }

  // ─── Public API ─────────────────────────────────────────────
  return {
    isProPage: isProPage,
    isProProductPage: isProProductPage,
    isProBoutique: isProBoutique,
    isParticulierBoutique: isParticulierBoutique,
    applyProClass: applyProClass,
    isProProductBlock: isProProductBlock,
    // Useful constants for other modules
    currentPath: path
  };

})();
