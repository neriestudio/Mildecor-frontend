/**
 * MILDECOR / Label Translations
 * ─────────────────────────────────────────────────────────────
 * Translates Squarespace's hardcoded English labels into French.
 *
 * Targets:
 *   "from"   →  "À partir de"
 *   "sale"   →  "Promotion"
 *
 * Uses a TreeWalker (text nodes only) to avoid breaking HTML
 * structure or interactive elements (the previous innerHTML
 * approach broke the checkout button).
 *
 * Skip list: cart-checkout-button, button, input, select, textarea,
 *            script, style — to avoid mangling functional elements.
 *
 * @author Julien Laumonerie / Nerie Studio
 * @since v1.0.0
 */

(function () {
  'use strict';

  function fixSummaryLabels() {
    var walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );
    var node;
    while ((node = walker.nextNode())) {
      var parent = node.parentElement;
      if (!parent) continue;
      if (parent.closest('.cart-checkout-button, button, input, select, textarea, script, style')) continue;

      var original = node.nodeValue;
      var updated = original
        .replace(/\bfrom\b/gi, 'À partir de')
        .replace(/\bsale\b/gi, 'Promotion');

      if (updated !== original) node.nodeValue = updated;
    }
  }

  document.addEventListener('DOMContentLoaded', fixSummaryLabels);
  setTimeout(fixSummaryLabels, 800);

})();
