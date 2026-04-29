/**
 * MILDECOR / Product Categories
 * ─────────────────────────────────────────────────────────────
 * Displays category badges above the product title on product pages.
 *
 * Fetches the product JSON to get its categoryIds, then matches them
 * against the page's nestedCategories.itemCategories list, and
 * renders clickable category links.
 *
 * Visual styling defined in styles/mildecor.css → .wm-product-categories
 *
 * @author Julien Laumonerie / Nerie Studio
 * @since v1.0.0
 */

(function () {
  'use strict';

  // Make category badges clickable links (vs plain divs)
  var IS_LINK = true;

  async function init() {
    var bodyCL = document.body.classList;
    if (!bodyCL.contains('view-item') || !bodyCL.contains('collection-type-products')) return;

    var json;
    try {
      var res = await fetch(window.location.pathname + '?format=json&' + Date.now());
      json = await res.json();
    } catch (e) {
      return;
    }

    if (!json.item || !json.item.categoryIds) return;

    var categoryIds = json.item.categoryIds;
    var itemCategories = (json.nestedCategories && json.nestedCategories.itemCategories) || [];

    var title = document.querySelector(
      '.ProductItem-details-title, .product-meta .product-title'
    );
    if (!title) return;

    var productCategories = itemCategories.filter(function (category) {
      return categoryIds.indexOf(category.id) !== -1;
    });

    if (productCategories.length === 0) return;

    var wrapper = document.createElement('div');
    wrapper.className = 'wm-product-categories';

    productCategories.forEach(function (category) {
      var el = document.createElement(IS_LINK ? 'a' : 'div');
      el.className = 'product-category';
      el.setAttribute('data-category-id', category.id);
      el.setAttribute('data-category-slug', category.shortSlug);
      el.textContent = category.displayName;
      if (IS_LINK) el.href = category.fullUrl;
      wrapper.appendChild(el);
    });

    title.insertAdjacentElement('beforebegin', wrapper);
  }

  window.addEventListener('DOMContentLoaded', init);

})();
