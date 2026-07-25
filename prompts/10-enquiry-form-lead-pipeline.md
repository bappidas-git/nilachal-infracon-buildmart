# Prompt 10 — Enquiry Form, Lead Pipeline & Thank-You Page

> Read `prompts/README.md` first. Prompts 01–09 are merged.

## Context

The conversion machinery: `UnifiedLeadForm` (single form used by the drawer and, after prompt 11, the Contact section), `webhookSubmit.js` (POSTs to the server lead store), `public/api/leads.php` (single source of truth), and the `/thank-you` page. The pipeline architecture is sound and **must be preserved** — this prompt re-contents it for Nilachal and rotates the shared admin key.

**Cross-device requirement (the core promise)**: a lead submitted on any device POSTs to `leads.php` (server JSON store). The admin panel reads only the server (15s poll + BroadcastChannel). No localStorage. Do not break this.

## Read first

- `src/components/common/UnifiedLeadForm/UnifiedLeadForm.jsx` (1293 lines: fields, validation, variants, submit flow, duplicate handling, privacy modal)
- `src/utils/webhookSubmit.js`, `src/utils/validators.js`, `public/api/leads.php` (auth model: `X-Admin-Key`, committed fallback key), `public/api/config.example.php`
- `src/pages/ThankYou/ThankYou.jsx`, `src/components/common/LeadFormDrawer/LeadFormDrawer.jsx`
- `src/data/productsData.js`, `servicesData.js`, `locationData.js`, `siteConfig.js`

## Form specification (keep field KEYS, change labels/options)

| Field | Key (unchanged) | Label | Rules |
|---|---|---|---|
| Full Name | `name` | "Full Name" | required, existing 2–50 regex |
| Mobile | `mobile` | "Mobile Number" | required, Indian 10-digit (existing) |
| Email | `email` | "Email (optional)" | optional, existing validation-when-filled |
| Interested In | `service_interest` | "Interested In" | required select — grouped options: **Products** (the 10 Buildmart categories), **Services** (the 5 services), plus "General Enquiry" |
| State | `state` | "State" | required select — 8 NE states + Other (from `locationData.servingStates`) |
| Message | `message` | "Message (optional)" | optional, ≤500 chars, placeholder "Tell us about your requirement…" |

## Tasks

1. **`UnifiedLeadForm.jsx` rebuild (content + styling, not plumbing)**
   - Replace `COURSE_OPTIONS` with the grouped `INTEREST_OPTIONS` above (import from data files — no hardcoded lists). MUI Select with `ListSubheader` groups; keep the `MenuProps` z-index override (drawer compatibility).
   - **Prefill support**: when the drawer passes `extraData.service_interest` (wired by prompts 08's tiles/rows), preselect it.
   - Restyle minimal: clean outlined fields, 12px radius, green focus ring, generous spacing, submit button "Send Enquiry" (green, full-width in drawer variant). Remove CIT trust badges row; replace with one quiet reassurance line under the button: "We respond within 24 hours. Your details stay private."
   - Rewrite: all placeholder/help text, consent line ("I agree to be contacted by Nilachal Infracon regarding my enquiry."), the privacy-policy modal content (align with Footer's from prompt 05), success/duplicate/error SweetAlert copy (duplicate: "Already received! We have your earlier enquiry — our team will contact you shortly. Need it faster? Call {phoneDisplay}.").
   - Variants: keep `default`/`drawer` working (hero variant is unused since prompt 06 — leave the code path or remove it cleanly if trivial; note your choice).
   - Keep untouched: per-field blur validation flow, submit pipeline, sessionStorage flags, drawer close + `/thank-you` navigation.
2. **`webhookSubmit.js`** — replace the CIT phone in the 3 user-facing error strings (lines ~92/122/131) with `siteConfig.phoneDisplay` (import it); update "B.E. course" JSDoc comments. No logic changes.
3. **Rotate the lead-store admin key** (currently the committed `skdfjsdfweiormcnzxmzdlkfjds`):
   - Generate a new 40+ char random key. Set it in `.env` (`REACT_APP_LEADS_ADMIN_KEY`) and update the PHP fallback constant in **both** `public/api/leads.php` and `public/api/telecalls.php` (telecalls dies in prompt 13 but must keep matching until then), and the placeholder guidance in `config.example.php`.
   - Add a deploy note in the PR description: any live `public/api/config.php` must set the same `ADMIN_API_KEY`.
4. **`LeadFormDrawer.jsx`** — confirm title/subtitle/icon defaults are the prompt-05 Nilachal ones; the submit button label comes from the form ("Send Enquiry").
5. **`/thank-you` page rebuild** (`ThankYou.jsx`) — keep the sessionStorage gate, greeting-by-name, and 5-minute flag expiry. Replace: confetti with a subtle GSAP checkmark-draw + soft green burst (delete `canvas-confetti` usage; dependency pruned in prompt 14); CIT next-steps with Nilachal's ("Our team reviews your enquiry", "We call or WhatsApp you within 24 hours", "You get a quotation / consultation"); CTAs → Call and WhatsApp (siteConfig), "Back to Home". Minimal navy-on-white design consistent with the site (not the old dark CIT treatment).
6. **End-to-end test with the real store**: run `php -S 127.0.0.1:8080 -t public` (PHP is usually available; if not, note it and test by code review) with `REACT_APP_LEADS_API_URL=http://127.0.0.1:8080/api/leads.php npm start`; submit a lead → verify HTTP 200, `public/api/data/leads.json` contains it with the new key auth for list (`curl -H "X-Admin-Key: <newkey>" "http://127.0.0.1:8080/api/leads.php?action=list"`), duplicate mobile returns the duplicate flow, and `/thank-you` renders. Clean up test data + ensure `public/api/data/` stays gitignored.
7. `CLAUDE.md` (form + key rotation notes) + CHANGELOG entry.

## Guardrails

- Never rename lead record keys (`service_interest`, `state`, …) — the admin panel and CSV export bind to them.
- `leads.php` logic/contract unchanged except the fallback key constant.
- Mobile-number dedup behavior stays (one lead per mobile; duplicates get the info alert).

## Verification

- `npm run build` passes.
- Full E2E per task 6 (or documented fallback).
- `grep -rniE "cit|admission|course|b\.e|8069645014" src/components/common/UnifiedLeadForm/ src/components/common/LeadFormDrawer/ src/pages/ThankYou/ src/utils/webhookSubmit.js` → zero hits.
- `grep -rn "skdfjsdfweiormcnzxmzdlkfjds" . --exclude-dir=node_modules` → zero hits.

## Delivery & report

Branch (designated or `feature/nilachal-10-enquiry-pipeline`), commit, push, PR to `main`. End with `### Summary of changes`, `### PR`, `### Next` ("Merge, then run `prompts/11-contact-section-final-assembly.md`").
