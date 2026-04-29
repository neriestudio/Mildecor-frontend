/**
 * MILDECOR / Pro Class Applier
 * ─────────────────────────────────────────────────────────────
 * Adds the .is-pro class to <html> on PRO pages, enabling the
 * dark theme variant defined in mildecor.css.
 *
 * Reads the centralized PRO_PATHS from MILDECOR_CONFIG (resolves
 * the previous duplication across 5 files).
 *
 * Must run as early as possible (Header) to avoid flash of unstyled
 * content (FOUC) when transitioning between PRO and non-PRO pages.
 *
 * @author Julien Laumonerie / Nerie Studio
 * @since v1.0.0
 */

(function () {
  'use strict';

  if (window.MILDECOR_PRO && typeof window.MILDECOR_PRO.applyProClass === 'function') {
    window.MILDECOR_PRO.applyProClass();
  } else {
    console.warn('[Mildecor] MILDECOR_PRO not loaded yet, .is-pro class skipped.');
  }

})();
