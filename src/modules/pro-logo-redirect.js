/**
 * MILDECOR / Pro Logo Redirect
 * ─────────────────────────────────────────────────────────────
 * On PRO pages, makes the header logo link to /espace-professionnels
 * (instead of homepage /), so PRO users stay in their universe.
 *
 * Reads MILDECOR_PRO.isProPage() to determine context.
 *
 * @author Julien Laumonerie / Nerie Studio
 * @since v1.0.0
 */

(function () {
  'use strict';

  var U = window.MILDECOR_UTILS;
  var P = window.MILDECOR_PRO;
  if (!U || !P) return;

  if (!P.isProPage()) return;

  function redirectLogo() {
    var logoLinks = document.querySelectorAll('.header-title-logo a, .header-title-text a');
    logoLinks.forEach(function (link) {
      link.setAttribute('href', '/espace-professionnels');
    });
  }

  U.waitFor('.header-title-logo a, .header-title-text a', redirectLogo);

})();
