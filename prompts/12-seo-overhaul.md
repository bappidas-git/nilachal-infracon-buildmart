# Prompt 12 — SEO Overhaul (index.html, Schemas, Sitemap, Favicons, OG)

> Read `prompts/README.md` first. Prompts 01–11 are merged; the public site is content-complete.

## Context

The SEO system is **dual-layer**: static meta + JSON-LD fallbacks in `public/index.html`, then `SEOHead` re-injects runtime schemas (matching element ids) from `src/config/seo.js` via `src/utils/seo.js`. Both layers are still 100% CIT (CollegeOrUniversity schemas, cittumkur.org, admission FAQs). Rebuild both **in lockstep** for Nilachal Infracon with full SEO best practices, so the site indexes fast and ranks for its brand + category terms.

Target queries: "Nilachal Infracon", "North East Buildmart", "building materials Nagaon", "construction materials Assam", "building materials supplier Northeast India", "construction company Nagaon Assam".

## Read first

- `public/index.html` (~650 lines), `src/config/seo.js`, `src/utils/seo.js`, `src/components/common/SEO/SEOHead.jsx`
- `public/robots.txt`, `public/sitemap.xml`, `public/manifest.json`
- `src/data/faqData.js`, `servicesData.js`, `siteConfig.js` (schemas must be generated from these — single source of truth)

## Tasks

### 1. `src/config/seo.js` — full rewrite

- `siteName: 'Nilachal Infracon'`, `siteUrl: 'https://www.nilachalinfracon.com'`, locale `en_IN`.
- `defaultTitle`: `Nilachal Infracon Pvt. Ltd. — Building Materials & Construction Services in Northeast India` (≤60 chars ideal; this is 68 — trim to e.g. `Nilachal Infracon — Building Materials & Construction, Northeast India`).
- `defaultDescription` (~155 chars): mention North East Buildmart, premium building materials, construction services, Nagaon/Assam, Northeast India, and a call to action.
- `organization`: legalName, url, logo (color logo URL), phone, email, full Nagaon postal address, `foundingDate: '2026'`, areaServed (the 8 NE states), sameAs [] (fill when socials exist).
- `localBusiness`: `@type: ['LocalBusiness','HomeAndConstructionBusiness']` with `additionalType` hint for building-materials supply; geo for Nagaon (`26.3465, 92.6840` — verify against the address with a quick lookup and adjust), openingHours (Mon–Sat 09:00–19:00 placeholder, mark as TODO for client confirmation), `hasMap` (Google Maps query URL), priceRange `₹₹`.
- `faqs`: import/derive from `src/data/faqData.js` — **the FAQPage schema must exactly match the visible FAQ section** (Google guideline).
- `pages`: home (title/description/robots index,follow), thankYou + admin (noindex,nofollow) — keep the key shapes `SEOHead` reads.

### 2. `src/utils/seo.js` — de-CIT the generators

- Remove hardcoded `'CollegeOrUniversity'` types (~lines 129/164) and `'B.E. Engineering Programs'` catalog names (~158/248): schema types and catalog names must come from config. `generateServiceSchema` should emit `ItemList` of `Service` entries from `servicesData` (name, description, provider = organization, areaServed NE states).
- Keep `updatePageSEO` / `injectSchema` / `removeSchema` mechanics untouched.

### 3. `public/index.html` — full head rewrite (static fallback layer)

- `<html lang="en-IN">`, new title/description/keywords/author (Nilachal Infracon), `robots index,follow`.
- Open Graph + Twitter cards (og:type website, og:site_name, og:url/canonical → `https://www.nilachalinfracon.com/`, og:image → `/og-image.png` with `og:image:width/height` 1200×630 + alt).
- Geo tags: `IN-AS`, Nagaon, the geo coordinates from seo.js.
- Rewrite the five static JSON-LD blocks (same element ids so runtime overrides keep working): Organization, LocalBusiness/HomeAndConstructionBusiness, FAQPage (same Q&As as faqData — all 7), BreadcrumbList (single Home crumb), WebPage/WebSite (with potentialAction SearchAction omitted — no search on site).
- Keep: Inter font preloads, iconify preconnect, inline critical CSS, splash loader (already Nilachal from prompt 03), noscript fallback.
- Fix the **broken icon links**: remove references to non-existent `apple-touch-icon-152/167/180` and `safari-pinned-tab.svg` OR generate those files (next task generates the core set; drop the exotic ones).

### 4. Favicons + PWA icons from the Nilachal logo

- Download the color logo (Cloudinary URL). Using `sharp` (`npm i -D sharp`) or ImageMagick, generate: `favicon.png` (32), `favicon.ico` (16+32+48 — `npx png-to-ico` or sharp+ico lib), `apple-touch-icon.png` (180, on white background with padding), `logo192.png`, `logo512.png` (maskable-safe padding). Replace the CIT shield files in `public/`. If the logo's aspect ratio doesn't suit a square icon, crop to the emblem/monogram portion of the logo tastefully.
- `public/manifest.json`: name "Nilachal Infracon", short_name "Nilachal", new description, `theme_color #16324F`, `background_color #FFFFFF`, categories `["business","shopping"]`, icons list matching the real files (192/512 maskable + favicon.ico).

### 5. OG image

- Generate `public/og-image.png` (1200×630, <300KB): navy `#0F2438` background, white Nilachal logo centered-left, headline "Building the Future of Northeast India", tagline + site URL small at bottom. Build it with a small node script using sharp compositing an SVG text layer; commit the PNG (the script can live in `scripts/generate-og.js`).

### 6. Crawl files

- `public/robots.txt`: allow all, `Disallow: /admin/` + `/thank-you`, `Sitemap: https://www.nilachalinfracon.com/sitemap.xml` (drop the non-standard `Host:` line).
- `public/sitemap.xml`: single URL `https://www.nilachalinfracon.com/`, `lastmod` = today, changefreq monthly, priority 1.0.

### 7. On-page semantics audit (quick pass)

Single `<h1>` (hero), sections use `<h2>`, pillar/card titles `<h3>`; every image has meaningful `alt`; anchor nav uses real `<a href="#...">`; `SEOHead` still noindexes `/thank-you` and `/admin*`. Fix violations found.

### 8. Docs

- Rewrite `SEO_GUIDE.md` with Nilachal examples (it still contains **Monjoven**, an even earlier client — purge it) and a **post-launch checklist**: verify domain in Google Search Console, submit sitemap, request indexing, set up Bing Webmaster, confirm rich results with the Rich Results Test URLs.
- `CLAUDE.md` SEO section + CHANGELOG entry.

## Verification

- `npm run build` passes; `npm start` → view-source shows the new head; DevTools shows runtime schemas replacing static ones with identical ids.
- Paste each JSON-LD block into a validator (or `npx ajv` sanity / manual JSON.parse check in node) — all parse; FAQ schema questions == visible FAQ questions.
- `curl -sI` the two Cloudinary logo URLs → 200; `file public/favicon.ico public/logo192.png public/logo512.png public/og-image.png apple-touch-icon.png` → correct types/dimensions.
- `grep -rniE "cittumkur|monjoven|CollegeOrUniversity|admission|tumakuru" public/ src/config/ src/utils/seo.js SEO_GUIDE.md` → zero hits.

## Delivery & report

Branch (designated or `feature/nilachal-12-seo`), commit, push, PR to `main`. End with `### Summary of changes`, `### PR`, `### Next` ("Merge, then run `prompts/13-admin-panel-rebuild.md`").
