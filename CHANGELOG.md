# Changelog

All notable changes to the **Nilachal Infracon Private Limited** website. This
project follows the rebuild prompt series in `prompts/`; entries accumulate under
the single unreleased version below as each prompt is merged.

## [1.0.0] — Unreleased — Nilachal Infracon rebuild

### 01 — Project reset & new identity

**Changed**
- Reset the project identity to Nilachal Infracon Private Limited across
  `package.json` (name, version, description, keywords), `README.md`,
  `CHANGELOG.md`, and `CLAUDE.md`.
- Rewrote `CLAUDE.md` for the new site: minimal one-page business website,
  server-side lead store, admin Dashboard + Lead Management. Added a business
  facts block and a focused "DO NOT MODIFY" list (leads API contract, admin sync
  pattern, lead record field keys).
- Updated `.env` / `.env.example` identity, contact, and admin-credential values;
  added a header note that `.env` is committed and all secrets must be rotated
  during the rebuild.
- Replaced the development console banner in `src/index.js` and refreshed the
  hard-coded admin fallback credentials in `src/admin/utils/adminAuth.js`.

**Removed**
- Deleted the `resources/` directory (scanned brochures from the previous build).
- Pruned environment variables that no code reads (build metadata, unused feature
  flags, social/map/CDN placeholders, dead API-endpoint and location vars).

### 02 — Remove ads / analytics / conversion tracking

**Removed**
- Deleted all ad/analytics tracking modules and their consumers: Google Tag
  Manager, Google Ads, Meta Pixel, Meta Conversions API, Google Consent Mode,
  enhanced conversions, event dedup, the GCLID manager, the `EngagementTracker`
  component, the `useGTMTracking` hook, and the admin Google Ads CSV export.
- Deleted the server-side tracking endpoints `public/api/meta-capi.php` and
  `public/api/google-offline-conversions.php`, and the Meta CAPI constants from
  `public/api/config.example.php` (kept `ADMIN_API_KEY`).
- Removed the admin "Record Conversion" feature (Meta CAPI + Google Ads offline
  conversions) from Lead Detail, along with the four ad/tracking setup guides
  (Google Ads, Meta Ads, GTM Setup, Conversion Tracking) and `GTM_GUIDE.md`. The
  status dropdown (including the "completed" state) and the funnel stat tiles
  remain as the business workflow.
- Removed `gclid` capture end-to-end (public form payload and admin CSV export)
  and dropped all tracking env vars from `.env` / `.env.example` and the docs.
- Removed the hard-coded GTM container from `public/index.html` (head snippet and
  `<noscript>` iframe) and the GTM/Meta Pixel/Google Ads disclosures from the
  Footer and enquiry-form privacy copy.

**Kept**
- The entire SEO system (`SEOHead`, `src/config/seo.js`, `src/utils/seo.js`,
  JSON-LD in `index.html`), UTM capture, the `source` field, and the admin CSV
  UTM columns — these are generic link attribution, not ad-platform tracking.
