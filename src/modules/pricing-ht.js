/**
 * MILDECOR / Pricing HT
 * ─────────────────────────────────────────────────────────────
 * Displays HT prices alongside TTC prices on PRO contexts.
 *
 * MERGES two previous scripts that did the same thing:
 * - Old footer #8: HT on listing/product/cart/checkout (URL-based)
 * - Old footer #16: HT on product Code Blocks (tag "Pro" based)
 *
 * Now everything goes through MILDECOR_PRO and MILDECOR_UTILS.
 *
 * Contexts where HT is shown:
 * - PRO product listing pages (product cards)
 * - PRO product detail page (main price)
 * - PRO Code Block products (blocks tagged "Pro")
 * - Cart and Checkout (when PRO products are in cart)
 * - Summary blocks on PRO and Espace Pro pages
 *
 * @author Julien Laumonerie / Nerie Studio
 * @since v1.0.0
 */

(function () {
  'use strict';

  var U = window.MILDECOR_UTILS;
  var P = window.MILDECOR_PRO;
  if (!U || !P) return;

  var path = P.currentPath;
  var isPro = P.isProProductPage();
  var isEspace = path.indexOf('/espace-professionnels') !== -1;
  var isCart = path.indexOf('/cart') !== -1;
  var isCheckout = path.indexOf('/checkout') !== -1;

  // ─── A. PRO listing + product + cart + checkout (URL-based) ──
  function updateListing() {
    document.querySelectorAll('.product-list-item-price').forEach(function (el) {
      var raw = U.parsePrice(el.innerText);
      if (!isNaN(raw) && raw > 0) {
        var prefix = el.innerText.indexOf('partir') !== -1 ? 'À partir de ' : '';
        U.addTag(el, prefix + U.htText(raw), false);
      }
    });
  }

  function updateProduct() {
    var priceEl = document.querySelector('.product-price-value');
    if (!priceEl) return;
    var existing = document.getElementById('ht-dynamic');
    if (!existing) {
      existing = document.createElement('p');
      existing.id = 'ht-dynamic';
      existing.style.cssText = 'font-weight:600;color:#555;font-size:0.9em;margin-top:4px;';
      priceEl.parentNode.insertBefore(existing, priceEl.nextSibling);
    }
    var raw = U.parsePrice(priceEl.innerText);
    if (!isNaN(raw) && raw > 0) existing.textContent = U.htText(raw);
  }

  function updateCart() {
    document.querySelectorAll('[class*="cart-row-price"]').forEach(function (el) {
      var raw = U.parsePrice(el.innerText);
      if (!isNaN(raw) && raw > 0) U.addTag(el, U.htText(raw), false);
    });
  }

  function updateSummary() {
    document.querySelectorAll('.summary-price .product-price').forEach(function (el) {
      if (el.querySelector('.ht-tag')) return;
      var raw = U.parsePrice(el.innerText);
      if (!isNaN(raw) && raw > 0) {
        var prefix = el.innerText.indexOf('partir') !== -1 ? 'À partir de ' : '';
        U.addTag(el, prefix + U.htText(raw), false);
      }
    });
  }

  function updateCheckout() {
    document.querySelectorAll('[class*="CartItem-totalPrice"]').forEach(function (el) {
      var raw = U.parsePrice(el.innerText);
      if (!isNaN(raw) && raw > 0) U.addTag(el, U.htText(raw), false);
    });
    document.querySelectorAll('[class*="CartItem-eachPrice"]').forEach(function (el) {
      var raw = U.parsePrice(el.innerText);
      if (!isNaN(raw) && raw > 0) U.addTag(el, U.htText(raw), true);
    });
  }

  // ─── B. Code Block products (tag "Pro" based) ────────────────
  function updateProductBlocks() {
    var blocks = document.querySelectorAll('.product-block.sqs-block-product');
    blocks.forEach(function (block) {
      if (block.dataset.htProcessed === '1') return;
      if (!P.isProProductBlock(block)) return;

      var priceEl = block.querySelector('.product-price');
      if (!priceEl || priceEl.querySelector('.ht-tag')) return;

      var rawText = priceEl.innerText;
      var raw = U.parsePrice(rawText);
      if (isNaN(raw) || raw <= 0) return;

      var prefix = rawText.toLowerCase().indexOf('partir') !== -1 ? 'À partir de ' : '';
      U.addTag(priceEl, prefix + U.htText(raw), false);
      block.dataset.htProcessed = '1';
    });
  }

  // ─── Init ────────────────────────────────────────────────────
  window.addEventListener('load', function () {
    setTimeout(function () {
      // Always run product blocks scan (anywhere on the site)
      updateProductBlocks();

      // PRO context-specific scans
      if (isPro) {
        updateListing();
        updateProduct();
      }
      if (isPro || isEspace) updateSummary();
      if (isCart) updateCart();
      if (isCheckout) updateCheckout();
    }, 300);

    // Re-run on variant change (price might update)
    if (isPro) {
      document.addEventListener('change', function (e) {
        if (e.target.closest('.product-variants') || e.target.closest('select')) {
          setTimeout(updateProduct, 300);
        }
      });

      // Re-scan listings on dynamic update (filters, infinite scroll)
      var priceZone = document.querySelector('.product-list-items');
      if (priceZone) {
        new MutationObserver(function () { updateListing(); }).observe(priceZone, {
          childList: true, subtree: true
        });
      }
    }

    // Re-process product blocks when their variants change
    document.addEventListener('change', function (e) {
      var block = e.target.closest('.product-block.sqs-block-product');
      if (!block) return;
      block.dataset.htProcessed = '';
      var existing = block.querySelector('.product-price .ht-tag');
      if (existing) existing.remove();
      setTimeout(updateProductBlocks, 300);
    });
  });

})();
