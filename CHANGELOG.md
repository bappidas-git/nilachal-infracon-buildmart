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

### 03 — Design system & GSAP animation foundation

**Added**
- Installed the Nilachal brand tokens in `src/styles/variables.css` and
  `src/theme/muiTheme.js`: steel navy (`#16324F` / `#0F2438` / `#274B6E`),
  Nilachal green (`#1E7B45` / `#176437`, tint `#E8F5EE`), ink `#101C29`, slate
  `#4A5A6A`, subtle bg `#F5F7FA`, border `#E5EAF0`, plus a soft elevation token
  `0 8px 30px rgba(16,28,41,.06)`. Kept every existing variable/palette **name**
  (including legacy `--accent-gold*` → navy and `--accent-orange*`/`--accent-amber*`
  → green aliases) so `.module.css` references stay valid.
- Added the GSAP + ScrollTrigger animation foundation in `src/animations/`
  (`gsapSetup.js`, `useReveal`, `useStaggerReveal`, `useCountUp`, `useParallax`,
  barrel `index.js`) — SSR-safe hooks that refresh ScrollTrigger for lazy sections
  and no-op to the final state under `prefers-reduced-motion`. Installed `gsap`
  and `@gsap/react`.
- Documented the Brand Color System and Animations patterns in `CLAUDE.md`.

**Changed**
- Set typography to **Inter everywhere** (headings included; heading weights
  600–700, `letter-spacing: -0.02em` on h1–h3) and removed Poppins from the MUI
  theme, `public/index.html`, `src/index.js`, and `src/styles/global.css` font
  URLs/preloads.
- Reworked the `index.html` splash loader for Nilachal: white logo on a navy
  (`#0F2438`) background, progress bar gradient navy→green, tagline
  "Building Tomorrow, Together." Updated `theme-color` / `msapplication-TileColor`
  / mask-icon and `manifest.json` `theme_color` to `#16324F`, and the noscript
  fallback colors.
- Swept every hardcoded CIT hex (`#0C2D48`, `#081F33`, `#1A5276`, `#D82618`,
  `#E0301E`, `#B71F12`) and their `rgba()` equivalents out of `src/` and `public/`,
  plus `global.css`/`App.css` fallbacks, `swalHelper.js`/`Modal.jsx` confirm
  colors, and the `ThemeContext` meta theme-color — replaced with navy/green
  tokens. Admin `--admin-*` tokens moved off the retired CIT hexes onto navy/green
  (+ semantic amber/red); full admin restyle is deferred to prompt 13.
- Wired `useReveal` into `AboutSection` as a proof-of-life smoke test (GSAP now
  drives its scroll reveal; Framer Motion retained only for the image hover).
