# Prompt 13 — Complete SEO Overhaul (Best Practices for Fast Indexing & Ranking)

## Context

The Nilachal Infracon site is functionally complete. This prompt makes the SEO
world-class so the page indexes quickly and ranks for relevant queries. The site is a
single page (plus /thank-you and /admin which must NOT be indexed). No paid-ads
tracking exists — pure organic SEO.

## Target queries (weave naturally, never stuff)

"building materials Nagaon", "building materials supplier Assam",
"construction company Northeast India", "North East Buildmart",
"Nilachal Infracon", "TMT bars / cement / tiles / sanitaryware dealer Nagaon Assam",
"construction services Assam".

## Tasks

1. **`src/config/seo.js` + `SEOHead` component** — rewrite for Nilachal:
   - Title (≤60 chars): e.g. `Nilachal Infracon Pvt. Ltd. | Building Materials & Construction — Northeast India`
   - Meta description (≤160 chars) with company, offerings, region and a soft CTA.
   - Canonical URL (site domain from env, e.g. `REACT_APP_SITE_URL` — add it to .env
     files and use it everywhere instead of hardcoded domains).
   - Open Graph (og:title/description/type/url/image — create a branded 1200×630
     og-image with the logo on navy, commit to `public/images/og-image.jpg`) and
     Twitter Card (summary_large_image).
   - robots meta: index,follow on home; `noindex,nofollow` on /thank-you and all
     /admin routes (verify SEOHead switches per route).

2. **JSON-LD structured data** (validate shapes against schema.org):
   - `Organization` — name, legalName, url, logo, contactPoint (phone, email), sameAs
     (social URLs from env when present).
   - `LocalBusiness` (or `HomeAndConstructionBusiness`) — address
     (streetAddress: Lawkhowa Road, Near Aditya Multispeciality Hospital,
     addressLocality: Nagaon, addressRegion: Assam, postalCode: 782003,
     addressCountry: IN), geo coordinates for the Lawkhowa Road location, telephone,
     openingHours, areaServed (Northeast Indian states).
   - `WebSite` with potentialAction disabled (no site search) — optional, include if
     clean.
   - `BreadcrumbList` only if meaningful (single page — likely skip).
   - `FAQPage` — OPTIONAL: if adding, first add a small real FAQ accordion section
     near Contact (4–5 genuine questions about delivery areas, brands, quotes);
     schema must mirror visible content exactly.

3. **`public/index.html`:** correct `lang="en"`, title/description fallbacks,
   preconnect to Cloudinary (`res.cloudinary.com`), font preloads, theme-color.

4. **`public/sitemap.xml`:** only the home page (and nothing else) with correct
   domain, lastmod. **`public/robots.txt`:** allow all, `Disallow: /admin`,
   `Disallow: /thank-you`, sitemap reference.

5. **Semantic & content SEO pass over the built sections:** exactly one `<h1>` (hero
   headline), logical h2/h3 hierarchy per section, descriptive alt text on every image
   (mention products/region naturally), semantic landmarks (`header`, `main`,
   `section` with aria-labels, `footer`, `address` tag for the office address).

6. **Performance for Core Web Vitals:** verify lazy-loading below-the-fold images,
   explicit dimensions everywhere (no CLS), font-display swap, hero image
   fetchpriority, and run `npm run build` + Lighthouse (if runnable) — target 90+
   Performance/SEO/Accessibility/Best-Practices; report the scores you achieve.

7. **`public/manifest.json`** final check: correct name/short_name/description/icons/
   colors for PWA installability.

## Acceptance criteria

- All meta/OG/JSON-LD validate (test JSON-LD mentally against schema.org specs; no
  invented properties).
- /admin and /thank-you are noindexed; sitemap/robots correct.
- One h1; images all have meaningful alt text.
- Build passes; Lighthouse SEO ≥ 95 if measurable.

## Delivery

Commit with a clear message, push the branch, and open a Pull Request. Finish your reply
with: (a) a concise summary of the SEO setup + any scores measured, and (b) the PR link.
