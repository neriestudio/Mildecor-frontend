/**
 * MILDECOR / Mega Menu Behavior
 * ─────────────────────────────────────────────────────────────
 * Manages custom interactions on top of the WM Mega Menu plugin.
 *
 * 1. WM Mega Menu configuration
 *    Sets layout and animation options consumed by the plugin.
 *
 * 2. Prevent default click on top-level menu items
 *    (Boutique, Collections, etc.) so the mega menu opens without
 *    navigating away.
 *
 * 3. Clickable blocks inside the mega menu
 *    Specific blocks (cards) are made clickable and link to
 *    filtered boutique views (best-sellers, kits, etc.).
 *
 * Note: The actual Mega Menu plugin is loaded from Will Myers' CDN
 * directly in Squarespace (3rd-party, not our concern).
 *
 * @author Julien Laumonerie / Nerie Studio
 * @since v1.0.0
 */

(function () {
  'use strict';

  // ─── 1. Configure WM Mega Menu plugin ───────────────────────
  window.wmMegaMenuSettings = {
    layout: 'full-width',
    openAnimation: 'slide'
  };

  // ─── 2. Prevent default on top-level slugs ──────────────────
  function preventDefaultOnTopLevel() {
    var slugs = (window.MILDECOR_CONFIG && window.MILDECOR_CONFIG.MEGA_MENU_SLUGS) || [];

    slugs.forEach(function (slug) {
      var el = document.querySelector('.header-display-desktop a[href="' + slug + '"]');
      if (!el) return;
      el.addEventListener('click', function (e) {
        e.preventDefault();
      });
    });
  }

  // ─── 3. Make specific blocks clickable ──────────────────────
  function initBlockClicks() {
    var blocks = (window.MILDECOR_CONFIG && window.MILDECOR_CONFIG.MEGA_MENU_BLOCKS) || {};

    Object.keys(blocks).forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      el.style.cursor = 'pointer';
      el.onclick = function () {
        window.location.href = blocks[id];
      };
    });
  }

  // ─── Init ───────────────────────────────────────────────────
  var waitFor = window.MILDECOR_UTILS && window.MILDECOR_UTILS.waitFor;
  if (!waitFor) return;

  // Wait for the desktop boutique link to exist before binding handlers
  waitFor('.header-display-desktop a[href="/boutique"]', preventDefaultOnTopLevel);

  // Wait for the first known mega menu block before binding clicks
  var firstBlockId = Object.keys(
    (window.MILDECOR_CONFIG && window.MILDECOR_CONFIG.MEGA_MENU_BLOCKS) || {}
  )[0];
  if (firstBlockId) {
    waitFor('#' + firstBlockId, initBlockClicks);
  }

})();
