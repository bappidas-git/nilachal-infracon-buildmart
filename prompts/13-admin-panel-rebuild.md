# Prompt 13 — Admin Panel Rebuild (Dashboard + Lead Management)

> Read `prompts/README.md` first. Prompts 01–12 are merged.

## Context

The admin panel (`/admin/*`) still wears CIT branding ("CIT Admissions Lead Management", CIT logo, admissions vocabulary) and contains the **Tele-Calling module** — a CIT-campaign feature with a hardcoded roster of real telecaller names. Per the site owner's spec, the admin panel is **Dashboard + Lead Management only**, neat and professional.

> **Decision (default)**: the Tele-Calling module is removed entirely. If the owner wants to keep it, skip section 4 and instead rebrand its copy — but removal is the default.

**Known bug to fix**: `getLeadStats` computes conversion rate from `status === 'converted'`, a status that no code ever sets (the convert flow sets `'completed'`). The dashboard's Conversion Rate is therefore always 0%.

## Read first

- `src/admin/` — all of it: components (AdminLayout, AdminLogin, AdminTopbar, ProtectedRoute, TelecallFormDialog), context, pages (Dashboard, LeadManagement, LeadDetail, TeleCalling, TeleCallDetail, Guideline + guidelineContent/), utils (adminAuth, leadService, leadStatus, telecallService, telecallStatus)
- `src/App.jsx` admin routes; `src/styles/variables.css` `--admin-*` tokens; `public/api/telecalls.php`

## Tasks

### 1. Rebrand + restyle the admin shell (clean, professional, minimal)

- **`--admin-*` tokens** in `variables.css`: align with the Nilachal system — admin primary `#16324F`, accent `#1E7B45`, bg `#F5F7FA`, cards white with 1px `#E5EAF0` borders + the soft shadow token. (The old "Assam Digital brand — do not change" comment is obsolete; remove it.)
- **AdminLogin**: Nilachal color logo, title "Nilachal Infracon", subtitle "Admin Panel", clean centered card.
- **AdminTopbar**: Nilachal logo, nav = Dashboard · Leads · Guidelines (Tele-Calling link removed), user chip + logout. Remove the "Admissions" badge.
- Vocabulary sweep everywhere: "Admission Leads" → "Enquiries" / "Enquiry Leads", "Course Interested" → "Interested In", "Applicant Details" → "Contact Details".

### 2. Lead status taxonomy (labels only — keys are persisted, never rename keys)

In `src/admin/utils/leadStatus.js`, remap display labels for the construction funnel:

| Persisted key (keep) | New label | Color |
|---|---|---|
| `new` | New | blue |
| `contacted` | Contacted | teal |
| `consultation_booked` | Quote Sent | amber |
| `procedure_scheduled` | Follow-Up | violet |
| `completed` | Converted | green |
| `not_interested` | Not Interested | grey |

Update `describeStatusChange`/`formatActivityAction` label maps accordingly. **Fix the stats bug**: `getLeadStats` (and any other `'converted'` checks in LeadManagement/Dashboard) must count `status === 'completed'`.

### 3. Dashboard redesign (relevant, clean)

- Stat tiles: **Total Enquiries · New Today · This Week · Conversion Rate** (now correct) — restyled minimal (white card, icon in tinted circle, big number).
- **Add a 14-day enquiry trend**: hand-rolled SVG bar/line sparkline from `getLeads()` grouped by day — no chart library.
- **Add a status breakdown row**: horizontal stacked bar or chip-count row per status with the new labels/colors.
- Recent enquiries table (5): Name · Mobile · Interested In · State · Status chip · time-ago. Row click → LeadDetail.
- Quick actions: View All Leads, Export CSV. Welcome header "Nilachal Infracon — Lead Management". Keep the 15s sync/refresh mechanics untouched.

### 4. Remove the Tele-Calling module

Delete: `src/admin/pages/TeleCalling.jsx`, `TeleCallDetail.jsx`, `src/admin/components/TelecallFormDialog.jsx`, `src/admin/utils/telecallService.js`, `telecallStatus.js` (contains real staff names — must go), `public/api/telecalls.php`. Remove: routes in `AdminLayout.jsx`, the `syncTelecallsFromServer` warm-up call, topbar nav item, `REACT_APP_TELECALLS_API_URL` from `.env`/`.env.example`, `TELECALLS_API_URL` from `getConfig()` in `webhookSubmit.js`, tele-calling sections in `CLAUDE.md`/`README.md`. Note in the PR: any deployed `api/data/telecalls.json` can be archived/deleted server-side.

### 5. LeadManagement + LeadDetail polish

- **LeadManagement**: title "Enquiry Leads"; stat cards (Total, New Today, Conversion Rate — fixed, Top Source); filters (search name/mobile/email/interest, status select with new labels, source, date range); table columns Name · Mobile · Interested In · State · Source · Status · Date; CSV export keeps UTM columns (headers "Interested In" not "Course Interested"); bulk actions stay. Clean table styling per admin tokens.
- **LeadDetail**: header with status Select (new labels); cards — Contact Details (name, tel: mobile, mailto: email), Enquiry (Interested In, State, Message), Source (source, page_url, UTM values if present); Notes (add/list) and Activity timeline stay. Remove any leftover conversion-tracking vocabulary.
- Restyle both to the minimal admin look (whitespace, hairlines, no heavy shadows). `TeleCalling`-shared CSS imports disappear with the module — ensure `LeadManagement.module.css` / `LeadDetail.module.css` have no dangling references.

### 6. Guideline hub

- Tabs remaining: Lead Storage · SEO Setup · Deployment · For Developers. Rebrand each guide's examples to Nilachal (SEOSetupGuide still shows cittumkur.org/CIT phone — purge; DeveloperGuide: new palette values, correct default creds reference — no real passwords printed, point to `.env`; DeploymentGuide: nilachalinfracon.com examples, drop stale Google-Sheets/email checklist rows).
- Change the hardcoded guideline password (`ad@9707112233` in `Guideline.jsx`) to a new value; note it in the PR for the owner.

### 7. Docs

`CLAUDE.md` admin section rewrite (structure, statuses table, no tele-calling); CHANGELOG entry.

## Guardrails

- Do NOT touch: `leads.php` contract, `leadService` sync mechanics (cache/poll/BroadcastChannel/optimistic writes), persisted status **keys**, lead field keys, auth flow structure (`AdminAuthContext`/`ProtectedRoute`).
- Admin panel must remain fully responsive (the mobile card views in LeadManagement/Dashboard stay functional).

## Verification

- `npm run build` passes; `grep -rn "telecall\|TeleCall\|Telecall" src/ public/ .env .env.example` → zero hits.
- `grep -rniE "cit|admission|course|applicant|seat booked" src/admin/` → zero hits.
- With local PHP (`php -S 127.0.0.1:8080 -t public` + env override): log in with `.env` creds → Dashboard shows correct stats + trend for seeded test leads; status change on LeadDetail persists and survives refresh; second browser tab reflects changes (BroadcastChannel); CSV exports with new headers. If PHP unavailable, verify by review + note.
- Conversion Rate shows non-zero after marking a test lead Converted.

## Delivery & report

Branch (designated or `feature/nilachal-13-admin-panel`), commit, push, PR to `main`. End with `### Summary of changes`, `### PR`, `### Next` ("Merge, then run `prompts/14-final-cleanup-qa.md`").
