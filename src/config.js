/**
 * MILDECOR_CONFIG
 * ─────────────────────────────────────────────────────────────
 * Centralized configuration for all custom modules.
 *
 * BEFORE: PRO_PATHS arrays were duplicated across 5 files,
 *         leading to drift and bugs when adding new PRO categories.
 * AFTER:  Single source of truth here. Update once, applies everywhere.
 *
 * @author Julien Laumonerie / Nerie Studio
 * @since v1.0.0
 */

window.MILDECOR_CONFIG = {

  // ─── PRO paths (used by: pro-detection, pricing-ht, ui-injections, mega-menu) ───
  PRO_PATHS: [
    '/espace-professionnels',
    '/boutique-pro',
    '/pro-accessoires-et-machines',
    '/pro-revetements',
    '/nuanciers-pros',
    '/livraison-pro',
    '/faq-questions-reponses-pro',
    '/rendez-vous-professionnels',
    '/contact-pro',
    '/enduit-pro',
    '/peinture-pro',
    '/outils-et-accessoires-pro',
    '/machines-pro',
    '/vtements-pro'
  ],

  // ─── PRO product slugs (used to detect PRO product pages specifically) ───
  PRO_PRODUCT_SLUGS: [
    '/enduit-pro',
    '/peinture-pro',
    '/outils-et-accessoires-pro',
    '/machines-pro',
    '/pro-revetements',
    '/vtements-pro'
  ],

  // ─── Particulier boutiques (where pro-banner CTA shows) ───
  PARTICULIER_BOUTIQUES: [
    '/enduit',
    '/boutique',
    '/outils-et-accessoires',
    '/machine',
    '/revetements',
    '/vtements'
  ],

  // ─── VAT rate (used for HT calculations) ───
  VAT_RATE: 0.20,

  // ─── Brand tokens ───
  BRAND: {
    PRIMARY: '#FF7847',     // Orange
    BACKGROUND: '#F1F1E5',  // Cream
    FOREGROUND: '#141414',  // Dark
    BORDER: 'rgba(0,0,0,0.12)'
  },

  // ─── External assets ───
  ASSETS: {
    PRO_LOGO: 'https://static1.squarespace.com/static/69541faa1b5b1e1843da0bbc/t/69e8a8a49a2cee684070a2f9/1776855204621/PRO+%281%29.png',
    PAYMENT_LOGOS: [
      { src: 'https://static1.squarespace.com/static/69541faa1b5b1e1843da0bbc/t/69ce35704e37ef0de9f0d5ac/1775121776319/visa.png', alt: 'Visa', h: 24 },
      { src: 'https://static1.squarespace.com/static/69541faa1b5b1e1843da0bbc/t/69ce2e16c25de408b71f17ad/1775119894937/Mastercard_icon-icons.com_60554.webp', alt: 'Mastercard', h: 28 },
      { src: 'https://static1.squarespace.com/static/69541faa1b5b1e1843da0bbc/t/69ce35e3231e9843a035dbb8/1775121891051/Apple-Pay-logo.png', alt: 'Apple Pay', h: 20 },
      { src: 'https://static1.squarespace.com/static/69541faa1b5b1e1843da0bbc/t/69ce352439f36773417d2533/1775121700664/Google_Pay_Logo.svg.png', alt: 'Google Pay', h: 20 },
      { src: 'https://static1.squarespace.com/static/69541faa1b5b1e1843da0bbc/t/69ce2e165e9656535ade4ac4/1775119894923/Klarna_Payment_Badge.svg.webp', alt: 'Klarna', h: 22 }
    ]
  },

  // ─── Tracking IDs ───
  TRACKING: {
    GA4: 'G-3HMEEVL6WF',
    GOOGLE_ADS: 'AW-10783285337',
    CLARITY: 'w4fsokl1ah'
  },

  // ─── Calculator presets (used by calculator.js) ───
  CALCULATOR_PRESETS: {
    'calculateur-mil3f':    { label: "Enduit Mil'3F",            mode: 'peinture',  rendement: 1.2, unit: 'L',  packs: [15],            jointsMode: true, jointsRendement: 0.3, note: "1,2 m²/L · Pot 15 L · Bandes à joints : 0,3 L/ml" },
    'calculateur-mil2f':    { label: "Enduit Mil'2F",            mode: 'enduit_kg', rendement: 1,   unit: 'kg', packs: [25],                                                  note: "1 kg/m² · Sac 25 kg" },
    'calculateur-premium':  { label: 'Peinture premium & laque', mode: 'peinture',  rendement: 11,  unit: 'L',  packs: [0.75, 2.5, 3, 10], couches: true,                      note: "11 m²/L par couche · Dekso, Mil'21/54/64/75, Strong Finish, High Finish" },
    'calculateur-standard': { label: 'Peinture',                 mode: 'peinture',  rendement: 9,   unit: 'L',  packs: [0.75, 3, 10],      couches: true,                      note: "9 m²/L par couche · Flutex Pro, Flutex 2S, Primers, Wood Tex" },
    'calculateur-revetement': { label: 'Revêtement de sol',      mode: 'paquets',   rendement: 2.23, unit: 'paquet', packs: [1],                                              note: "1 paquet = 2,23 m² · 7 paquets = 15,60 m²" }
  },

  // ─── Mega menu block IDs (clickable cards in mega menu) ───
  MEGA_MENU_BLOCKS: {
    'block-yui_3_17_2_1_1775219252842_6279': '/boutique?tag=Best-seller%20particulier',
    'block-33d652a4a421268c277e':            '/boutique/kit',
    'block-1ac55bcd68fd5d56a015':            '/boutique?tag=Mildecor'
  },

  // ─── Mega menu top-level slugs (prevent default click) ───
  MEGA_MENU_SLUGS: [
    '/boutique',
    '/accessoires-et-machines',
    '/collections',
    '/mildecor-rdv',
    '/maison-mildecor'
  ]

};
