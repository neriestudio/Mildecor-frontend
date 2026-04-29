/**
 * MILDECOR / Color Badges
 * ─────────────────────────────────────────────────────────────
 * Adds a "Couleur" badge to product thumbnails for products
 * tagged "Couleurs".
 *
 * Two contexts handled here (CSS handles the third):
 *
 * 1. Product Blocks (.product-block.sqs-block-product)
 *    - Reads tags from data-product JSON (synchronous)
 *    - Adds badge to .image-container
 *
 * 2. Summary Blocks (.summary-item)
 *    - Fetches /product-url?format=json to get tags (async)
 *    - Adds badge to .summary-thumbnail
 *
 * 3. Product list items (.product-list-item.tag-couleurs)
 *    Handled by CSS only (see styles/mildecor.css → ::before)
 *
 * 4. Product detail page (.product-detail.tag-couleurs)
 *    Handled by CSS only (see styles/mildecor.css → ::before)
 *
 * @author Julien Laumonerie / Nerie Studio
 * @since v1.0.0
 */

(function () {
  'use strict';

  function addBadge(container) {
    if (container.querySelector('.mld-color-badge')) return;
    container.style.position = 'relative';
    var badge = document.createElement('span');
    badge.className = 'mld-color-badge';
    badge.textContent = 'Couleur';
    container.appendChild(badge);
  }

  // ─── A. Product Blocks (data-product JSON) ───────────────────
  function processProductBlocks() {
    var blocks = document.querySelectorAll('.product-block.sqs-block-product');
    blocks.forEach(function (block) {
      if (block.dataset.colorBadgeProcessed === '1') return;
      try {
        var raw = block.getAttribute('data-product');
        if (!raw) return;
        var data = JSON.parse(raw);
        if (!data.tags || !Array.isArray(data.tags)) return;
        if (data.tags.indexOf('Couleurs') === -1) return;
        var imgContainer = block.querySelector('.image-container');
        if (imgContainer) {
          addBadge(imgContainer);
          block.dataset.colorBadgeProcessed = '1';
        }
      } catch (e) { /* ignore parse errors */ }
    });
  }

  // ─── B. Summary Blocks (fetch JSON for tags) ─────────────────
  function processSummaryItems() {
    var items = document.querySelectorAll('.summary-item:not([data-color-badge-processed])');
    items.forEach(function (item) {
      item.setAttribute('data-color-badge-processed', '1');
      var link = item.querySelector('a.summary-thumbnail, a.summary-title-link');
      if (!link) return;
      var href = link.getAttribute('href');
      if (!href) return;

      fetch(href + '?format=json')
        .then(function (r) { return r.json(); })
        .then(function (data) {
          if (!data || !data.item || !data.item.tags) return;
          if (data.item.tags.indexOf('Couleurs') === -1) return;
          var thumb = item.querySelector('.summary-thumbnail.img-wrapper, .summary-thumbnail');
          if (thumb) addBadge(thumb);
        })
        .catch(function () { /* ignore */ });
    });
  }

  function run() {
    processProductBlocks();
    processSummaryItems();
  }

  window.addEventListener('load', function () {
    setTimeout(run, 400);
  });

})();
