# Nilachal Infracon Private Limited — Official Website

## Overview

A one-page business website for **Nilachal Infracon Private Limited** — an
infrastructure & building-materials company based in Nagaon, Assam (Northeast
India), whose flagship retail brand is **North East Buildmart**. The site is a
minimal, Apple-like single page (generous whitespace, restrained color, large
tight-tracked headlines) with GSAP + ScrollTrigger animations, an enquiry form
that feeds a server-side lead store, and an admin panel with a **Dashboard** and
**Lead Management**. Built with React 18 (CRA / react-scripts 5), Material UI v5,
and CSS Modules.

> **Rebuild in progress.** This repository is being converted from its previous
> life (a legacy admissions landing page) into the Nilachal Infracon site
> via an ordered prompt series in `prompts/`. Run the prompts one at a time, in
> numeric order — see `prompts/README.md` for the plan and series-wide
> conventions. Earlier prompts are assumed merged into `main` before later ones
> run.

## Business Facts

Single source of truth for identity details used across the site, SEO, and docs:

- **Company**: Nilachal Infracon Private Limited
- **Tagline**: "Building Tomorrow, Together."
- **Flagship brand**: North East Buildmart (building-materials retail brand)
- **Registered office**: Lawkhowa Road, Near Aditya Multispeciality Hospital, Nagaon, Assam – 782003
- **Phone**: +91 86385 43526 · tel/WhatsApp: `+918638543526`
- **Email**: info@nilachalinfracon.com
- **CIN**: U46630AS2026PTC030754
- **Site URL**: `https://www.nilachalinfracon.com`
- **Logos** (use everywhere — never any older brand assets):
  - Color (light backgrounds): `https://res.cloudinary.com/dn9gyaiik/image/upload/v1784965863/nilachal-logo_v2lolq.png`
  - White (dark backgrounds): `https://res.cloudinary.com/dn9gyaiik/image/upload/v1784965863/nilachal-logo-white_hus13s.png`

## Project Structure

_(Paths evolve across the rebuild series; update this list as later prompts move things.)_

- `src/components/sections/` — Page sections (Hero, About, Services, etc.)
- `src/components/common/` — Reusable components (Header, Footer, LeadForm, etc.)
- `src/data/` — Content data files (services, features, stats, locations)
- `src/config/` — Site/SEO configuration
- `src/context/` — React context providers (Modal, Theme)
- `src/hooks/` — Custom hooks (useInView, useMediaQuery, etc.)
- `src/utils/` — Utility functions (webhook submit, validators, etc.)
- `src/admin/` — Admin panel (components, pages, context, utils)
- `src/pages/` — Full pages (ThankYou)
- `public/` — Static assets, index.html, manifest, robots.txt, sitemap.xml
- `public/api/` — Server-side endpoints (`leads.php` shared lead store)

## Lead Storage & Sync

Leads are stored server-side in `public/api/leads.php` (a shared JSON store) —
this is the **single source of truth**. The public enquiry form POSTs each
submission there, and the admin panel reads/writes only the server
(auto-refreshing every 15s, with a **BroadcastChannel** keeping same-browser
tabs in sync), so every browser and device sees the same leads.
**There is no localStorage copy of leads.** Configure with
`REACT_APP_LEADS_API_URL` + `REACT_APP_LEADS_ADMIN_KEY` in `.env` (the key must
match `ADMIN_API_KEY` in `public/api/config.php`).

## Tele-Calling Module

> _This module is scheduled for removal in prompt 13; it is documented here only
> until then._

The **Tele-Calling** admin module (`/admin/tele-calling`) mirrors Lead Management
but its records are entered manually by telecallers (not the public form). It has
its own server store `public/api/telecalls.php` (`data/telecalls.json`), service
`src/admin/utils/telecallService.js`, status config
`src/admin/utils/telecallStatus.js`, list page `TeleCalling.jsx`, detail page
`TeleCallDetail.jsx`, and shared add/edit form
`src/admin/components/TelecallFormDialog.jsx`. It uses the same cross-device sync
pattern as leads (in-memory cache hydrated from the server, 15s poll,
BroadcastChannel for same-browser tabs) and reuses `REACT_APP_LEADS_ADMIN_KEY`
for auth (configure the endpoint with `REACT_APP_TELECALLS_API_URL`).

## Brand Color System

> Brand tokens (palette, typography, MUI theme, CSS variables) are defined in
> **prompt 03** (`prompts/03-design-system-and-gsap.md`). Until that runs, the
> old palette is being phased out — do not treat any hard-coded colors as final.

To customize colors after prompt 03, update `src/styles/variables.css`,
`src/theme/muiTheme.js`, and the CSS variables in `.module.css` files.

## Customization Guide

1. **Content**: Update data files in `src/data/` and hard-coded text in section components
2. **Branding**: Replace the logo URL in `Header.jsx`, `Footer.jsx`, `MobileDrawer.jsx`, and `public/index.html`
3. **Contact Info**: Update the `.env` file and `src/data/locationData.js`
4. **SEO**: Update meta tags, JSON-LD schemas, `src/config/seo.js`, and `public/sitemap.xml`
5. **Forms**: Leads POST to the server store (`/api/leads.php`) via `src/utils/webhookSubmit.js` — usually leave the default endpoint
6. **Admin**: Update `REACT_APP_ADMIN_USERNAME` and `REACT_APP_ADMIN_PASSWORD` in `.env`

## Documentation

- `prompts/README.md` — The rebuild prompt series and series-wide conventions
- `CHANGELOG.md` — Changelog (rebuild entries accumulate under `[1.0.0]`)
- `README.md` — Project overview, quick start, routes, and env reference

## DO NOT MODIFY

These contracts keep the enquiry form and admin panel in sync across devices.
Change them only with a deliberate, coordinated update on both the client and
the PHP endpoint.

- **`public/api/leads.php` request/response contract and its auth model** — the
  action-based API (`create` / list / update / delete), its JSON response shape,
  and the admin-key gate (`REACT_APP_LEADS_ADMIN_KEY` ↔ `ADMIN_API_KEY`).
- **The admin sync pattern** — in-memory cache hydrated from the server, 15s
  poll, and BroadcastChannel for same-browser tabs. Never introduce a
  localStorage copy of lead data.
- **Lead record field keys** — the admin panel and CSV export bind to these
  exact keys; change labels/options, never the keys:
  `lead_id`, `name`, `mobile`, `email`, `service_interest`, `state`, `message`,
  `source`, `status`, `submitted_at`, `updated_at`, `notes[]`, `activity[]`.
