# 🚀 Mildecor Frontend — Deploy Guide (v1.0.0)

> **Target deployment time** : Thursday, 30 April 2026 — 04:00 Paris (09:00 Vietnam)
> **Estimated duration** : 30–60 minutes (deployment + tests)
> **Risk level** : Low (rollback possible in 30 seconds)

---

## 🎯 Goal

Replace ~1300 lines of inline code in Squarespace Header/Footer/Custom CSS with three jsdelivr CDN imports, drastically improving:
- Performance (browser caching + Brotli compression)
- Maintainability (Git versioning)
- Reusability (mildecor.be will use the same bundles)

---

## 📋 Pre-deployment checklist (the day before)

- [ ] All bundles online on jsdelivr (verified via direct URLs)
- [ ] GitHub repo public and accessible
- [ ] Local backup of the 3 current Squarespace files (Header, Footer, CSS)
- [ ] No active customer support tickets affecting checkout/cart
- [ ] No major sale or marketing event scheduled for the next 24h

### Verify CDN URLs return content

Open each URL in a browser. You should see the content of each bundle:

- https://cdn.jsdelivr.net/gh/neriestudio/Mildecor-frontend@main/dist/mildecor.css
- https://cdn.jsdelivr.net/gh/neriestudio/Mildecor-frontend@main/dist/mildecor-header.js
- https://cdn.jsdelivr.net/gh/neriestudio/Mildecor-frontend@main/dist/mildecor.js

If any URL returns a 404 or empty content, **do not proceed**. Investigate first.

---

## 🛡️ Critical: Backup current Squarespace state

Even though you have local backups from yesterday, take fresh ones right before deploying:

1. Open Squarespace → **Settings → Advanced → Code Injection**
2. Copy the entire **Header** content into a new file `_backup-final/header-2026-04-30.html`
3. Copy the entire **Footer** content into `_backup-final/footer-2026-04-30.html`
4. Open Squarespace → **Custom CSS** (Design → Custom CSS)
5. Copy the entire CSS content into `_backup-final/css-2026-04-30.css`
6. Save these 3 files in a **safe location** (Google Drive, Dropbox, Notion)

> If anything breaks during deployment, paste these 3 files back into Squarespace to revert in 30 seconds.

---

## 🚀 Deployment procedure (T-0)

### Step 1 — Open Squarespace Admin

Connect to https://[your-site].squarespace.com/config/ in a browser tab.
Have a second tab open with mildecor.fr (incognito mode) for testing.

### Step 2 — Replace Header Code Injection

1. Go to **Settings → Advanced → Code Injection**
2. **Select all** content of the **Header** field (Cmd+A)
3. **Delete it** (cmd+x to keep a clipboard copy as a safety net)
4. **Paste** the content of `squarespace/header-injection.html`
5. Click **Save**

### Step 3 — Replace Footer Code Injection

1. Same screen, **Footer** field
2. **Select all** content (Cmd+A) and delete
3. **Paste** the content of `squarespace/footer-injection.html`
4. Click **Save**

### Step 4 — Clear Custom CSS

1. Go to **Design → Custom CSS**
2. **Select all** content (Cmd+A) and delete
3. Leave it **completely empty** (the CSS is now loaded via the Header `<link>`)
4. Click **Save**

### Step 5 — Hard refresh and test

1. Go to your incognito tab with mildecor.fr
2. Hard refresh: **Cmd+Shift+R** (force cache reload)
3. Run the smoke test below

---

## ✅ Smoke test (5–10 minutes)

Test these key user paths after deployment. If any fails, see Rollback section.

### Homepage (mildecor.fr)
- [ ] Page loads without visual glitches
- [ ] Header looks correct (logo, navigation, search button)
- [ ] Mobile burger menu opens and looks right
- [ ] Mega menu opens on hover (Boutique, Collections, etc.)
- [ ] Best-seller block in mega menu is clickable

### A Particulier product page
- [ ] Choose any product from the boutique listing
- [ ] Product opens correctly
- [ ] Image borders show
- [ ] Category badges display above title
- [ ] "Vous êtes professionnel?" banner shows below cart button
- [ ] Payment badges (Visa, MC, Apple Pay, etc.) display
- [ ] Add to cart works

### A PRO product page
- [ ] Visit `/peinture-pro/...` (any product)
- [ ] Header is dark (Pro theme)
- [ ] Logo is the Pro version
- [ ] HT prices appear under TTC prices
- [ ] No "Vous êtes professionnel?" banner (only on Particulier)

### A "tag-couleurs" product
- [ ] Visit any color product
- [ ] "Couleur" badge shows on top-right of product image
- [ ] Nuancier banner (🎨 "Nous réalisons les teintes...") shows
- [ ] Variants update price correctly

### Calculator
- [ ] Visit a paint or enduit product (e.g. tag-calculateur-mil2f or tag-calculateur-premium)
- [ ] "📐 Calculer la quantité nécessaire" button appears
- [ ] Click opens the modal
- [ ] Surface input → results show with packs suggestion
- [ ] Close modal works

### Boutique listing with URL filter
- [ ] Visit `/boutique?tag=Best-seller%20particulier`
- [ ] Filter is auto-applied (only matching products show)

### Cart and checkout
- [ ] Add a product to cart
- [ ] Open `/cart`
- [ ] If product is PRO, HT prices show
- [ ] Click "Checkout" → checkout page opens
- [ ] No JS errors in browser console (F12)

### Browser console
- [ ] Open DevTools (F12) → Console tab
- [ ] No errors in red about MILDECOR_CONFIG, MILDECOR_UTILS, MILDECOR_PRO
- [ ] GA4, Clarity, Google Ads all loading (Network tab)

---

## 🛑 Rollback procedure

If anything is broken (visual glitches, JS errors, broken cart, etc.):

### Option A — Quick rollback (recommended)

1. Go to **Squarespace → Settings → Advanced → Code Injection**
2. **Replace Header** with `_backup-final/header-2026-04-30.html` content
3. **Replace Footer** with `_backup-final/footer-2026-04-30.html` content
4. Save
5. Go to **Design → Custom CSS**
6. **Paste back** `_backup-final/css-2026-04-30.css` content
7. Save
8. Hard refresh — site is back to v0 in ~30 seconds

### Option B — Pin a specific version (advanced)

If a future commit breaks something, you can pin Squarespace to an older version by changing `@main` to a Git tag. Example:

```html
<!-- before -->
<script src="https://cdn.jsdelivr.net/gh/neriestudio/Mildecor-frontend@main/dist/mildecor.js"></script>

<!-- pinned to v1.0.0 -->
<script src="https://cdn.jsdelivr.net/gh/neriestudio/Mildecor-frontend@v1.0.0/dist/mildecor.js"></script>
```

To create a Git tag, see "Versioning" section in the README.

---

## 📊 Post-deployment

### Right after deployment (T+30 min)
- Check Microsoft Clarity → No spike in JS errors
- Check Google Analytics → Real-time users still tracked
- Check a PRO order flow end-to-end

### 24h later (T+1 day)
- Check PageSpeed Insights desktop and mobile
- Compare conversion rate vs. previous week
- Check Search Console for crawl errors

### 1 week later (T+7 days)
- Verify Core Web Vitals improved (CrUX data)
- Plan v1.0.1 with any small fixes accumulated

---

## 🔄 Future deployments (after v1.0.0)

Once v1.0.0 is stable, the workflow becomes:

1. Edit a file in `src/` locally (e.g. `src/modules/calculator.js`)
2. Update the matching bundle in `dist/` (manual concatenation for now)
3. Commit & push via GitHub Desktop
4. (Optional) Create a Git tag for stable releases (`v1.0.1`, `v1.0.2`, ...)
5. jsdelivr automatically serves the new version

> jsdelivr caches files for ~12 hours. To force a faster refresh, use a versioned URL with a Git tag.

---

## 📞 Support

If something unexpected happens:
- Take a screenshot of the issue + browser console errors (F12)
- Document what you did just before the issue appeared
- Roll back first (see Option A above), then investigate calmly
- Contact: contact@julienlaumonerie.com

---

**Good luck with the deploy! Tu as fait un excellent travail de préparation.** 🚀
