# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-04-30

### Added
- Initial release: refactored Squarespace inline injection (~1300 lines) into modular bundles served via jsdelivr CDN
- Centralized configuration (`MILDECOR_CONFIG`) for PRO paths, brand colors, VAT rate
- `core/utils.js` — Reusable utilities (`waitFor`, `parsePrice`, `htText`, `addTag`)
- `core/pro-detection.js` — Centralized PRO page detection (replaces 5 duplicated arrays)
- `modules/analytics.js` — GA4, Microsoft Clarity, Google Ads
- `modules/mobile-search.js` — Monocle Search button injection
- `modules/color-badges.js` — "Couleur" badge on color products
- `modules/product-categories.js` — Category badges above product titles
- `modules/pricing-ht.js` — Unified HT price display (merged 2 previous scripts)
- `modules/calculator.js` — Unified quantity calculator (merged 2 previous scripts)
- `modules/ui-injections.js` — Payment badges, nuancier banner, pro inscription banner
- `modules/mega-menu.js` — Mega menu click handlers + WM init
- `modules/faq-schema.js` — JSON-LD FAQ structured data
- `modules/tag-filter.js` — URL `?tag=` parameter filter
- `modules/lightbox-fix.js` — Lightbox margin and input background fixes
- `modules/label-translations.js` — French label translations (TreeWalker approach)
- `modules/back-button.js` — Mobile back button on product pages
- `modules/elfsight-loader.js` — Lazy load Elfsight chat widget
- `modules/pro-logo-redirect.js` — Logo redirect to /espace-professionnels on PRO pages
- `styles/mildecor.css` — Consolidated custom CSS

### Removed
- Pro migration popup (110 lines, no longer needed)
- Duplicated PRO_PATHS arrays (now centralized in `config.js`)
- Duplicated HT pricing logic across 2 scripts

### Changed
- All custom code now served via jsdelivr CDN with browser caching (1 year)
- Brotli compression reduces payload by ~70%
- Squarespace Code Injection reduced from ~1300 lines to ~10 lines
