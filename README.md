# Mildecor Frontend

Custom JavaScript and CSS modules powering [mildecor.fr](https://www.mildecor.fr/) — a French paint and coating products retailer running on Squarespace Commerce Advanced 7.1.

> Maintained by **Julien Laumonerie / [Nerie Studio](https://www.julienlaumonerie.com)** — Squarespace Circle Gold Expert.

---

## 🎯 Purpose

This repository centralizes all custom frontend logic injected into Squarespace via Code Injection. Hosting these files on a CDN (jsdelivr) instead of inline injection provides:

- **Performance** — Browser caching + Brotli compression (~70% lighter)
- **Maintainability** — One file = one concern (the `src/` folder)
- **Versioning** — Git history of every change
- **Reusability** — Same codebase shared between mildecor.fr and mildecor.be

---

## 📁 Structure

```
mildecor-frontend/
├── src/                  # Source code (one concern per file)
│   ├── config.js         # Centralized configuration (PRO paths, brand colors, VAT)
│   ├── core/             # Reusable utilities
│   │   ├── utils.js      # waitFor, parsePrice, htText, DOM helpers
│   │   └── pro-detection.js  # isPro page detection logic
│   ├── modules/          # Self-contained features
│   │   ├── analytics.js
│   │   ├── pricing-ht.js
│   │   ├── calculator.js
│   │   └── ...
│   └── styles/
│       └── mildecor.css  # Custom CSS bundle
│
├── dist/                 # Production bundles (served by jsdelivr)
│   ├── mildecor-header.js  # Loaded in Squarespace Header Code Injection
│   ├── mildecor.js         # Loaded in Squarespace Footer Code Injection
│   └── mildecor.css        # Loaded in Squarespace Header Code Injection
│
└── squarespace/          # Code snippets to paste into Squarespace
    ├── header-injection.html
    ├── footer-injection.html
    └── DEPLOY-GUIDE.md
```

---

## 🚀 How it works

1. Squarespace Header/Footer Code Injection contains **only `<script>` and `<link>` tags pointing to jsdelivr**
2. jsdelivr serves the files in `dist/` via its global CDN
3. Browser caches each file for 1 year (versioning via Git tags handles updates)

### CDN URLs

```
https://cdn.jsdelivr.net/gh/[username]/mildecor-frontend@[version]/dist/mildecor.css
https://cdn.jsdelivr.net/gh/[username]/mildecor-frontend@[version]/dist/mildecor-header.js
https://cdn.jsdelivr.net/gh/[username]/mildecor-frontend@[version]/dist/mildecor.js
```

> Replace `[username]` with the actual GitHub username and `[version]` with a tag (e.g., `v1.0.0`) or branch (e.g., `main`).

---

## 🔄 Deployment workflow

1. Edit a file in `src/`
2. Update the corresponding bundle in `dist/` (manual concatenation for now)
3. Commit & push to GitHub via GitHub Desktop
4. (Optional) Create a Git tag for stable releases (`v1.0.1`, `v1.0.2`...)
5. jsdelivr automatically serves the new version

> ⚠️ jsdelivr caches files for ~12h. To force a refresh, use a versioned URL (`@v1.0.1` instead of `@main`).

---

## 🛡️ Rollback procedure

If anything breaks in production:

1. Open Squarespace > Settings > Advanced > Code Injection
2. Replace the Header/Footer content with the backup from `_backup_2026-04-29/`
3. Save → site reverts within 30 seconds

---

## 🏗️ Tech stack

- **Vanilla JavaScript** (IIFE pattern, no build step required)
- **CSS** (custom properties, no preprocessor)
- **CDN** : [jsdelivr](https://www.jsdelivr.com/) (free, 99.99% uptime)
- **Hosting** : GitHub (this repository)

---

## 📊 Brand tokens

| Token | Value |
|-------|-------|
| Primary | `#FF7847` (orange) |
| Background | `#F1F1E5` (cream) |
| Foreground | `#141414` (dark) |
| Font | `Inter`, sans-serif |

---

## 📝 License

MIT — see [LICENSE](./LICENSE).

---

## 📞 Contact

**Julien Laumonerie** — Nerie Studio
[contact@julienlaumonerie.com](mailto:contact@julienlaumonerie.com)
[julienlaumonerie.com](https://www.julienlaumonerie.com)
