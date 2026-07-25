# Prompt 01 — Project Reset & New Identity (Nilachal Infracon)

> Read `prompts/README.md` first — it defines the business facts, brand assets, and delivery rules for the whole series.

## Context

This repository is currently the **CIT Tumakuru "Direct B.E. Admissions 2026"** landing page (React 18 CRA + MUI + CSS Modules) built by Assam Digital. It is being converted into a **one-page business website for Nilachal Infracon Private Limited** (infrastructure & building-materials company, Nagaon, Assam) with its flagship brand **North East Buildmart**, plus a lead-capturing enquiry form and an admin panel.

This first prompt resets the **project identity and documentation** so every later prompt (each runs in a fresh Claude Code session that auto-loads `CLAUDE.md`) starts with correct instructions instead of CIT-era ones. **Do not redesign any UI in this prompt.**

## Read first

- `CLAUDE.md`, `README.md`, `CHANGELOG.md`, `package.json`, `.env`, `.env.example`
- `resources/` (7 CIT brochure scans)
- `src/index.js` (contains a CIT console banner around line 136)

## Critical: rewrite CLAUDE.md

The current `CLAUDE.md` describes CIT and contains a **"DO NOT MODIFY"** list (component structure, layout, animations, form logic, `webhookSubmit.js`, `swalHelper.js`, mobile navigation mechanics, drawer/modal behavior, video background system) that would block the rebuild. Rewrite it entirely:

1. **Overview**: Nilachal Infracon Private Limited one-page business website — minimal, Apple-like design, GSAP animations, enquiry form feeding a server-side lead store, admin panel with Dashboard + Lead Management. Mention the rebuild is in progress via the `prompts/` series.
2. **Keep** (they stay true): the project-structure section (update paths as they change in later prompts), the **Lead Storage & Sync** section (leads.php single source of truth, 15s poll, BroadcastChannel, no localStorage), and the customization pointers.
3. **Remove**: everything about CIT, admissions, GTM/Meta CAPI/Google Ads, the Tele-Calling module description will be removed later (leave it for now, prompt 13 deletes the module), and the old brand color table (prompt 03 will add the Nilachal palette — put a placeholder note "Brand tokens defined in prompt 03").
4. **New "DO NOT MODIFY" list** (much smaller): `public/api/leads.php` request/response contract and its auth model; the admin sync pattern (in-memory cache + poll + BroadcastChannel); lead record field keys (`lead_id`, `name`, `mobile`, `email`, `service_interest`, `state`, `message`, `source`, `status`, `submitted_at`, `updated_at`, `notes[]`, `activity[]`).
5. Add the business facts block (company, tagline, brand, address, phone, email, CIN, logo URLs) from `prompts/README.md` so future sessions always have them.

## Tasks

1. **Delete CIT artifacts**
   - Delete the entire `resources/` directory (7 scanned CIT brochures — they leak CIT phone numbers and CET/COMEDK codes).
2. **package.json identity**
   - `name`: `nilachal-infracon-website` · `version`: `1.0.0`
   - `description`: "Nilachal Infracon Private Limited — one-page business website for Northeast India's infrastructure & building materials company (flagship brand: North East Buildmart). React 18 + MUI + GSAP, with lead-capturing enquiry form and admin panel."
   - `keywords`: `["nilachal-infracon", "north-east-buildmart", "building-materials", "construction", "infrastructure", "northeast-india", "assam", "nagaon", "landing-page", "lead-generation"]`
   - `author` stays `Assam Digital`. Keep `license: UNLICENSED`.
   - Run `npm install` so `package-lock.json` picks up the new name (it embeds the old name twice).
3. **README.md** — full rewrite for Nilachal Infracon: what the site is, tech stack, quick start (`npm install`, `npm start`, `npm run build`), project structure, routes table (`/`, `/thank-you`, `/admin/login`, `/admin/*`), lead-storage architecture summary, environment variable table, and a pointer to `prompts/` for the rebuild series. **Do not publish admin credentials in the README** (the old one did).
4. **CHANGELOG.md** — start fresh: a single `[1.0.0] — Unreleased` section titled "Nilachal Infracon rebuild" that will accumulate entries from later prompts. Delete the CIT/boilerplate history.
5. **`.env` and `.env.example` identity values** (leave tracking vars alone — prompt 02 removes them; leave `REACT_APP_LEADS_ADMIN_KEY` alone — prompt 10 rotates it):
   - App/project name vars → "Nilachal Infracon" / "Nilachal Infracon Private Limited — Official Website".
   - Contact vars: phone `+91-8638543526`, WhatsApp `+918638543526`, email `info@nilachalinfracon.com`, address "Lawkhowa Road, Near Aditya Multispeciality Hospital, Nagaon, Assam - 782003".
   - **Admin credentials**: set `REACT_APP_ADMIN_USERNAME=nilachaladmin` and generate a strong random password (16+ chars, mixed) for `REACT_APP_ADMIN_PASSWORD`. Also update the hardcoded fallback credentials in `src/admin/utils/adminAuth.js` (currently `'cit'` / `'cit@2026admissions'` around line 59) to match the new username and a non-CIT fallback.
   - Delete env vars that **no code reads** (verified dead): `BUILD_DATE`, `BUILD_NUMBER`, `DEVELOPER_NAME`, `ENABLE_CHAT_WIDGET`, `ENABLE_EMI_CALCULATOR`, `ENABLE_VIRTUAL_TOUR`, `ENVIRONMENT`, `FACEBOOK_URL`, `INSTAGRAM_URL`, `LINKEDIN_URL`, `YOUTUBE_URL`, `GOOGLE_MAPS_API_KEY`, `IMAGE_CDN_URL`, `LAZY_LOAD_OFFSET`, `LEAD_SUBMISSION_ENDPOINT`, `API_BASE_URL`, `OFFICE_ADDRESS`, `PROJECT_LATITUDE`, `PROJECT_LONGITUDE`, `PROJECT_LOCATION`, `PROJECT_NAME`, `SUPPORT_EMAIL`, `VERSION` (all with `REACT_APP_` prefixes where applicable). Keep the ones code actually consumes.
   - Note: `.env` is committed to git (existing agency workflow). Keep it committed, but this is why all secrets in it must be rotated during this series. Add a comment at the top of `.env` saying so.
6. **`src/index.js`**: replace the styled `CIT Admissions 2026` console banner with a plain "Nilachal Infracon — Official Website" banner (or remove it).

## Guardrails

- Do **not** touch components, sections, styles, tracking code, or PHP endpoints in this prompt — later prompts own those. The site must look and behave exactly as before; only identity/docs/env change.
- `npm run build` must pass.

## Verification

- `npm run build` succeeds.
- `grep -ri "cit" package.json README.md CHANGELOG.md CLAUDE.md .env .env.example` → no CIT-the-college matches (ignore incidental substrings like "explicit").
- `ls resources` → directory gone.
- Admin login still works locally with the new credentials (`npm start`, visit `/admin/login`).

## Delivery & report

Branch (designated session branch, or `feature/nilachal-01-project-reset`), commit, push, open PR to `main`. End your final message with:
- `### Summary of changes` — bullets of what was done
- `### PR` — the PR link
- `### Next` — "Merge this PR, then run `prompts/02-remove-ads-tracking.md`"
