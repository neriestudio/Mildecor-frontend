/**
 * MILDECOR / Mobile Search
 * ─────────────────────────────────────────────────────────────
 * Injects a search button into the mobile header.
 *
 * Squarespace doesn't natively show the search icon on mobile when
 * Monocle Search is used. This module manually adds it.
 *
 * Note: The search icon is hidden via CSS on PRO pages
 * (see styles/mildecor.css → html.is-pro #mobile-search-btn).
 *
 * @author Julien Laumonerie / Nerie Studio
 * @since v1.0.0
 */

(function () {
  'use strict';

  function inject() {
    var container = document.querySelector(
      '.header-display-mobile .header-actions.header-actions--right .showOnMobile'
    );
    if (!container) return;

    // Set flex layout
    container.style.display = 'flex';
    container.style.flexDirection = 'row';
    container.style.alignItems = 'center';
    container.style.gap = '8px';

    // Idempotent: skip if already injected
    if (container.querySelector('#mobile-search-btn')) return;

    var wrapper = document.createElement('div');
    wrapper.className = 'header-actions-action header-actions-action--search';
    wrapper.id = 'mobile-search-btn';

    var link = document.createElement('a');
    link.href = '/search';
    link.setAttribute('aria-label', 'Rechercher');
    link.innerHTML =
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"' +
      ' stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
      '<circle cx="11" cy="11" r="8"/>' +
      '<line x1="21" y1="21" x2="16.65" y2="16.65"/>' +
      '</svg>';

    wrapper.appendChild(link);
    container.appendChild(wrapper);
  }

  // Run on DOM ready (search header exists early, no need for waitFor)
  if (window.MILDECOR_UTILS && window.MILDECOR_UTILS.onReady) {
    window.MILDECOR_UTILS.onReady(inject);
  } else if (document.readyState !== 'loading') {
    inject();
  } else {
    document.addEventListener('DOMContentLoaded', inject);
  }

})();
