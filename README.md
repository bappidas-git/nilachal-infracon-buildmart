# Nilachal Infracon Private Limited — Official Website

A minimal, mobile-first **one-page business website** for **Nilachal Infracon
Private Limited**, an infrastructure & building-materials company based in
Nagaon, Assam (Northeast India), whose flagship retail brand is **North East
Buildmart**. The page presents the company, its products and construction
services, and captures qualified enquiries through a lead form backed by a
server-side store and a lightweight admin panel.

Built and maintained by **Assam Digital**.

> **Rebuild in progress.** This codebase is being converted from a previous
> landing page into the Nilachal Infracon site through an ordered prompt series
> in [`prompts/`](prompts/README.md). Execute the prompts one at a time, in
> numeric order — each is designed to run in a fresh session and open its own
> pull request. See `prompts/README.md` for the full plan and conventions.

## Tech Stack

- **React 18** (CRA / `react-scripts` 5, concurrent features, lazy loading)
- **Material UI v5** + **Emotion**
- **CSS Modules** + CSS custom properties
- **GSAP + ScrollTrigger** for public-page scroll animations _(introduced in prompt 03)_
- **React Router v7**
- **Iconify** (`mdi:*` icons), **SweetAlert2**, **Swiper**
- **PHP** server-side lead store (`public/api/leads.php`)
- **Web Vitals** monitoring

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Create your local environment file
cp .env.example .env    # then fill in the values (see "Environment Variables" below)

# 3. Start the dev server
npm start               # http://localhost:3000

# 4. Production build
npm run build           # outputs to build/
```

Admin credentials are configured through `.env` (`REACT_APP_ADMIN_USERNAME` /
`REACT_APP_ADMIN_PASSWORD`) — they are intentionally **not** published here.

## Project Structure

```
├── public/
│   ├── api/                # Server-side endpoints (leads.php shared store, config)
│   ├── index.html          # HTML template (SEO meta, JSON-LD)
│   ├── manifest.json       # PWA manifest
│   ├── robots.txt          # Search-engine directives
│   └── sitemap.xml         # Sitemap
├── src/
│   ├── admin/              # Admin panel (components, pages, context, utils)
│   ├── components/
│   │   ├── common/         # Header, Footer, LeadForm, navigation, etc.
│   │   └── sections/       # Hero, About, Services, and other page sections
│   ├── config/             # Site / SEO configuration
│   ├── context/            # ModalContext, ThemeContext
│   ├── data/               # Content data files (edit these first)
│   ├── hooks/              # useInView, useMediaQuery, and other hooks
│   ├── pages/              # ThankYou page
│   ├── styles/             # Global CSS, variables, animations, responsive
│   ├── theme/              # MUI theme configuration
│   └── utils/              # webhookSubmit, validators, and helpers
├── prompts/                # The rebuild prompt series (run in order)
├── .env.example            # Environment variables template
├── CHANGELOG.md            # Changelog
└── CLAUDE.md               # Project instructions for AI-assisted work
```

## Routes

| Route | Description |
|-------|-------------|
| `/` | One-page site (all public sections) |
| `/thank-you` | Post-submission thank-you page (requires a submission session flag) |
| `/admin/login` | Admin authentication |
| `/admin/*` | Protected admin panel — `dashboard`, `lms` (Lead Management + lead detail), `guideline` |

## Lead Storage Architecture

Leads are the product of this site, so they are stored **server-side** and treated
as a single source of truth:

- The public enquiry form POSTs each submission to `public/api/leads.php`
  (a shared JSON store) via `src/utils/webhookSubmit.js`.
- The admin panel reads and writes **only** the server, auto-refreshing every
  **15 seconds**, and broadcasts changes to other open tabs in the same browser
  via **BroadcastChannel**.
- There is **no `localStorage` copy of leads** — a lead submitted on one device
  appears in the admin panel on every other device.
- Duplicate prevention (by mobile number) is enforced server-side.

Configure the endpoint and its shared admin key with `REACT_APP_LEADS_API_URL`
and `REACT_APP_LEADS_ADMIN_KEY`; the key must match `ADMIN_API_KEY` in
`public/api/config.php` (copy `public/api/config.example.php` to `config.php`).

## Environment Variables

`.env` is committed to the repository as part of the existing agency workflow,
so **every secret in it must be rotated during the rebuild series**. The core
variables:

| Variable | Purpose |
|----------|---------|
| `REACT_APP_NAME` | App display name |
| `REACT_APP_ADMIN_USERNAME` | Admin panel username |
| `REACT_APP_ADMIN_PASSWORD` | Admin panel password (rotate before deploy) |
| `REACT_APP_SALES_PHONE` | Public contact phone |
| `REACT_APP_WHATSAPP_NUMBER` | WhatsApp number (digits only, with country code) |
| `REACT_APP_SALES_EMAIL` | Public contact email |
| `REACT_APP_HERO_VIDEO_URL` | Optional hero background video URL |
| `REACT_APP_LEADS_API_URL` | Leads API endpoint (default `/api/leads.php`) |
| `REACT_APP_LEADS_ADMIN_KEY` | Shared secret for admin lead operations — must match `ADMIN_API_KEY` in `public/api/config.php` |
| `REACT_APP_TELECALLS_API_URL` | Tele-calling API endpoint (module removed in prompt 13) |

## Documentation

- **[prompts/README.md](prompts/README.md)** — The rebuild prompt series and series-wide conventions
- **[CHANGELOG.md](CHANGELOG.md)** — What has changed
- **[CLAUDE.md](CLAUDE.md)** — Project instructions and non-negotiable contracts

## License

Proprietary — `UNLICENSED`. © Nilachal Infracon Private Limited. All rights reserved.
