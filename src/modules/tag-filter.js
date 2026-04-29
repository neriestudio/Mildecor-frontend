/**
 * MILDECOR / Tag Filter (URL parameter)
 * ─────────────────────────────────────────────────────────────
 * Auto-applies a tag filter on listing pages when the URL has a
 * ?tag=XXX parameter. Used by:
 *   - Mega menu blocks (e.g. "Best-sellers" → ?tag=Best-seller%20particulier)
 *   - External campaigns
 *
 * Selects the matching <option> in the tag dropdown and triggers
 * the filter button click.
 *
 * @author Julien Laumonerie / Nerie Studio
 * @since v1.0.0
 */

(function () {
  'use strict';

  var U = window.MILDECOR_UTILS;
  if (!U) return;

  function applyTagFilter() {
    var params = new URLSearchParams(window.location.search);
    var tag = params.get('tag');
    if (!tag) return;

    var selects = document.querySelectorAll('.dropdown-select[data-filter-type="TAG"]');
    if (!selects.length) return;

    selects.forEach(function (select) {
      var match = Array.from(select.options).find(function (o) {
        return o.value.toLowerCase() === tag.toLowerCase();
      });
      if (match) {
        select.value = match.value;
        select.classList.remove('show-placeholder');
        select.setAttribute('aria-label', match.value);
        select.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });

    var filterBtn = document.querySelector('.product-list-filter-button');
    if (filterBtn) filterBtn.click();
  }

  U.waitFor('.dropdown-select[data-filter-type="TAG"]', applyTagFilter);

})();
