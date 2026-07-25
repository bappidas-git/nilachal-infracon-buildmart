# Prompt 12 — Admin Panel Redesign (Login · Dashboard · Lead Management)

## Context

The public site and enquiry pipeline are merged. Now redesign the admin panel to a
neat, clean, professional standard for Nilachal Infracon. Modules: **Login, Dashboard,
Lead Management (list + detail)** — nothing else. The server-sync architecture stays
exactly as is: in-memory cache hydrated from `public/api/leads.php`, 15-second polling,
BroadcastChannel across same-browser tabs, admin key auth via
`REACT_APP_LEADS_ADMIN_KEY`. Do not introduce localStorage lead storage.

## Design system (admin)

- Light professional theme: background `#F5F7FA`, white surfaces, hairline borders,
  primary navy for actions, accent green for positive states. 8px radius cards,
  restrained shadows. Typography same family as the site, slightly denser scale.
- Admin chrome: keep the existing topbar-based layout (`AdminTopbar`), restyled:
  Nilachal logo (light variant) left, nav (Dashboard · Leads), user menu right with
  logout. Fully responsive — on mobile the nav collapses into a menu.

## Tasks

### 1. Login (`src/admin/components/AdminLogin*`)
- Centered card on a near-white background, Nilachal logo, "Admin Panel" subtitle,
  username + password with show/hide toggle, primary submit, calm error state.
  Keep the existing auth mechanism (`adminAuth.js`, env credentials) unchanged.

### 2. Dashboard (`src/admin/pages/Dashboard*`)
Rebuild with genuinely useful lead analytics computed from the server data:
- KPI cards row: Total Leads · New (status "new") · This Week · This Month ·
  Converted (won status).
- **Leads over time** — line/area chart of the last 30 days.
- **Leads by status** — donut or horizontal bars.
- **Leads by interest** (`service_interest`) — horizontal bars.
- **Recent leads** — last 8, compact table linking into detail pages.
- Charts: use a lightweight approach already available in the stack (build simple SVG
  charts by hand or with MUI X Charts if adding a dep is justified — prefer hand-rolled
  minimal SVG for bundle size). Consistent colors from the admin palette. Empty states
  designed (no leads yet → friendly illustration/text).
- Auto-refresh with the existing 15s poll; show "last updated" time + manual refresh.

### 3. Lead Management (`src/admin/pages/LeadManagement*`, `LeadDetail*`)
- List: clean table (desktop) / card list (mobile) with: name, mobile (tap-to-call),
  interest, source, status chip, submitted date. Search (name/mobile/email), filter by
  status + interest + date range, sort by newest/oldest. Pagination or virtualized
  list if >50.
- Status workflow — replace CIT-era statuses with a sales pipeline suited to a building
  materials/construction business, defined in `src/admin/utils/leadStatus.js`:
  `New` · `Contacted` · `Quotation Sent` · `Follow Up` · `Won` · `Lost`.
  Distinct, accessible chip colors.
- Detail page: contact header with quick actions (call, WhatsApp, email), status
  updater, notes (add/edit), activity timeline (existing pattern), lead metadata
  (source, page URL, UTM fields, submitted/updated timestamps). Delete with confirm.
- CSV export of the (filtered) lead list — plain CSV download, client-side.

### 4. Cleanup
- Purge every remaining CIT-era string, course/state references, and status values in
  the admin (`grep -ri "cit\|course\|admission\|b\.e\." src/admin`).
- `src/admin/utils/leadService.js`: keep the sync logic; update any field mappings to
  the Nilachal lead shape from Prompt 11.

### 5. Verify
- Seed a few test leads through the public form (or by POSTing to a local mock),
  confirm dashboard numbers, filters, status changes, notes, and CSV export all work.
- Two-tab test: change a status in one tab, see it reflected in another
  (BroadcastChannel + poll). `npm run build` passes.

## Acceptance criteria

- Admin looks professional and consistent with the Nilachal brand; mobile-usable.
- Dashboard analytics correct against seeded data.
- Full lead lifecycle works cross-device via the server store only.

## Delivery

Commit with a clear message, push the branch, and open a Pull Request. Finish your reply
with: (a) a concise summary with the new status workflow, and (b) the PR link.
