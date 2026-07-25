# Nilachal Infracon — Rebuild Prompt Series

This folder contains the complete, ordered prompt series to convert this codebase (currently the **CIT Tumakuru admissions landing page**) into the **Nilachal Infracon Private Limited** one-page business website with a clean admin panel.

## How to use

1. Execute the prompts **one at a time, in numeric order**, each in a fresh Claude Code session. Paste the full content of the prompt file (or tell Claude Code to read and execute it, e.g. *"Read `prompts/01-project-reset-and-identity.md` and execute it"*).
2. Every prompt ends with Claude Code committing, pushing, and opening a **pull request**, then reporting a **summary of what was done + the PR link**.
3. **Merge each PR before running the next prompt.** Later prompts assume the earlier ones are merged into `main`.
4. If a prompt's verification step fails, fix it within the same session before opening the PR.

## Series overview

| # | File | What it delivers |
|---|------|------------------|
| 01 | `01-project-reset-and-identity.md` | New project identity (package.json, README, CLAUDE.md, CHANGELOG, .env), CIT brochure deletion |
| 02 | `02-remove-ads-tracking.md` | Complete removal of Google Ads / Meta / GTM / conversion-tracking code (site + admin + PHP + docs) |
| 03 | `03-design-system-and-gsap.md` | Nilachal brand tokens, typography, MUI theme, GSAP + ScrollTrigger animation foundation |
| 04 | `04-content-data-layer.md` | Centralized site config + all content data files (products, services, stats, brands, FAQs, location) |
| 05 | `05-header-footer-navigation.md` | Header, Footer, mobile drawer/bottom-nav rebuilt for Nilachal; new drawer titles |
| 06 | `06-hero-section.md` | Minimal, Apple-style hero with GSAP intro timeline |
| 07 | `07-page-recomposition-about-section.md` | Page slimmed to the one-pager plan; About + Mission/Vision/Values section |
| 08 | `08-products-services-sections.md` | North East Buildmart products section + Construction Services section |
| 09 | `09-stats-brands-whyus-faq.md` | Stats counters, Brands strip, Why-Choose-Us, FAQ accordion |
| 10 | `10-enquiry-form-lead-pipeline.md` | Enquiry form rebuilt for Nilachal; lead pipeline, thank-you page, admin key rotation |
| 11 | `11-contact-section-final-assembly.md` | Contact section with embedded form + map; final page assembly and scroll polish |
| 12 | `12-seo-overhaul.md` | Full SEO rebuild: index.html, schemas, sitemap/robots/manifest, favicons, OG image |
| 13 | `13-admin-panel-rebuild.md` | Admin panel rebrand + dashboard redesign; tele-calling module removal; status taxonomy |
| 14 | `14-final-cleanup-qa.md` | Dead code/dependency pruning, zero-trace audit, build/perf/responsive QA, docs final pass |

## Series-wide conventions (every prompt inherits these)

### The business
- **Company**: Nilachal Infracon Private Limited — infrastructure & building materials company, Northeast India.
- **Tagline**: "Building Tomorrow, Together."
- **Flagship brand**: **North East Buildmart** (building materials retail brand).
- **Registered office**: Lawkhowa Road, Near Aditya Multispeciality Hospital, Nagaon, Assam – 782003.
- **Phone**: +91 86385 43526 (tel/WhatsApp: `+918638543526`) · **Email**: info@nilachalinfracon.com
- **CIN**: U46630AS2026PTC030754 · **Site URL**: `https://www.nilachalinfracon.com`
- **Logos** (use everywhere; never the old CIT Cloudinary assets):
  - Color (light backgrounds): `https://res.cloudinary.com/dn9gyaiik/image/upload/v1784965863/nilachal-logo_v2lolq.png`
  - White (dark backgrounds): `https://res.cloudinary.com/dn9gyaiik/image/upload/v1784965863/nilachal-logo-white_hus13s.png`

### Design language
- Minimalistic, clean, Apple-like: generous whitespace, large tight-tracked headlines, restrained color, no gradients-everywhere, no clutter.
- **Palette** (defined as tokens in prompt 03): primary navy `#16324F`, deep navy `#0F2438`, accent green `#1E7B45` (hover `#176437`), tint `#E8F5EE`, ink `#101C29`, slate `#4A5A6A`, background `#FFFFFF` / subtle `#F5F7FA`, border `#E5EAF0`.
- **Typography**: Inter only (300–800). Poppins is removed.
- **Animation**: GSAP + ScrollTrigger for all public page sections (scroll reveals, staggers, counters, subtle parallax). Framer Motion may remain only inside existing drawer/modal mechanics. All motion must respect `prefers-reduced-motion`.

### Architecture rules
- Stack stays: React 18 + CRA (react-scripts 5), MUI v5, CSS Modules, Iconify (`mdi:*`), react-router v7.
- **Lead storage**: the server store `public/api/leads.php` (JSON file, admin-key gated) is the single source of truth. The admin panel syncs via in-memory cache + 15s poll + BroadcastChannel. **Never introduce a localStorage lead copy.** This is what makes a lead submitted on one device appear in the admin panel on another device.
- One-page site: all sections on `/`, anchor navigation. Section ids after the rebuild: `home`, `about`, `products`, `services`, `brands`, `why-us`, `faq`, `contact`. Header scroll offset is 80px (kept in sync across Header/App/MobileDrawer).
- Keep the lead record field keys (`service_interest`, `state`, etc.) — the admin panel and CSV export bind to them. Change labels/options, not keys.
- Images: use open-source photography (Unsplash/Pexels) via their CDN URLs with explicit size params, verify each URL returns 200 before committing, and always set `width`/`height`/`alt`.

### Delivery rules (every prompt)
- Work on a dedicated branch: use your session's designated branch if the environment assigned one; otherwise create `feature/nilachal-XX-<slug>` from the latest `main`.
- `npm install` first (node_modules is not committed). `npm run build` must pass before the PR is opened.
- Commit with clear messages, push, open a PR to `main`.
- End your final message with three sections: `### Summary of changes` (bullets), `### PR` (the PR URL), `### Next` (the next prompt file to run after this PR is merged).
