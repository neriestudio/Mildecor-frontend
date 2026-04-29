/**
 * MILDECOR_UTILS
 * ─────────────────────────────────────────────────────────────
 * Reusable utility functions used across modules.
 *
 * - waitFor(selector, callback, timeout)  → MutationObserver-based DOM wait
 * - parsePrice(text)                      → Extract numeric value from "1 234,56 €"
 * - htText(rawTTC)                        → Convert TTC → HT string ("X € HT")
 * - addTag(parent, text, inline)          → Append a styled .ht-tag span
 * - onReady(callback)                     → DOMContentLoaded shortcut
 *
 * @author Julien Laumonerie / Nerie Studio
 * @since v1.0.0
 */

window.MILDECOR_UTILS = (function () {
  'use strict';

  /**
   * Wait for a DOM element to appear, then run callback.
   * Uses MutationObserver (cleaner than setTimeout retries).
   *
   * @param {string} selector - CSS selector to wait for
   * @param {Function} callback - Called with the element once found
   * @param {number} [timeout=5000] - Max wait time in ms
   */
  function waitFor(selector, callback, timeout) {
    var el = document.querySelector(selector);
    if (el) { callback(el); return; }

    var timer;
    var observer = new MutationObserver(function () {
      var found = document.querySelector(selector);
      if (!found) return;
      observer.disconnect();
      clearTimeout(timer);
      callback(found);
    });

    observer.observe(document.body, { childList: true, subtree: true });
    timer = setTimeout(function () { observer.disconnect(); }, timeout || 5000);
  }

  /**
   * Parse a price string into a number.
   * Handles French formatting: "1 234,56 €" → 1234.56
   *
   * @param {string} text
   * @returns {number} NaN if parsing fails
   */
  function parsePrice(text) {
    if (!text) return NaN;
    return parseFloat(
      String(text)
        .replace(/[^0-9,\s]/g, '')
        .replace(/\s/g, '')
        .replace(',', '.')
    );
  }

  /**
   * Convert a TTC price (number) into a formatted HT string.
   *
   * @param {number} rawTTC
   * @returns {string} e.g. "29,99 € HT"
   */
  function htText(rawTTC) {
    var vat = (window.MILDECOR_CONFIG && window.MILDECOR_CONFIG.VAT_RATE) || 0.20;
    return (rawTTC / (1 + vat)).toFixed(2).replace('.', ',') + ' € HT';
  }

  /**
   * Append a .ht-tag span to an element with the given text.
   * Idempotent: skips if a .ht-tag already exists in the parent.
   *
   * @param {HTMLElement} parent
   * @param {string} text
   * @param {boolean} [inline=false] - Inline (right of price) or block (below)
   */
  function addTag(parent, text, inline) {
    if (!parent || parent.querySelector('.ht-tag')) return;
    var span = document.createElement('span');
    span.className = 'ht-tag';
    span.style.cssText = inline
      ? 'font-size:0.8em;color:#888;margin-left:6px;'
      : 'display:block;font-size:0.8em;color:#888;margin-top:2px;';
    span.textContent = text;
    parent.appendChild(span);
  }

  /**
   * Run callback on DOMContentLoaded (or immediately if already loaded).
   *
   * @param {Function} callback
   */
  function onReady(callback) {
    if (document.readyState !== 'loading') {
      callback();
    } else {
      document.addEventListener('DOMContentLoaded', callback);
    }
  }

  // ─── Public API ─────────────────────────────────────────────
  return {
    waitFor: waitFor,
    parsePrice: parsePrice,
    htText: htText,
    addTag: addTag,
    onReady: onReady
  };

})();

// Backwards-compatible global aliases (existing code still calls waitFor() directly)
window.waitFor = window.MILDECOR_UTILS.waitFor;
