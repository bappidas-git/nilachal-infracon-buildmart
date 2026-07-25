# Prompt 14 — Final QA, Polish & Zero-CIT Verification

## Context

All build prompts (01–13) are merged. This is the final quality gate before launch of
the Nilachal Infracon website. Treat this as a professional release QA: find and fix,
don't just report.

## Tasks

### 1. Zero-CIT sweep (hard requirement)
- Run `grep -ri "cit\|channabasaveshwara\|tumakuru\|admission\|b\.e\.\|vtu\|engineering college\|assam digital" src public *.md *.json --exclude-dir=node_modules`
  (review "cit" substring false-positives like "city"/"capacity" manually).
- Also sweep for leftover ads-era terms: `grep -ri "gtm\|meta pixel\|fbq\|gtag\|dataLayer\|gclid\|capi\|telecall" src public`.
- Fix every genuine hit: code, comments, CSS class names, alt texts, docs, manifest,
  package-lock is exempt.

### 2. Full-page UX audit (act like a design reviewer)
- Load the page at 360, 390, 414, 768, 834, 1024, 1280, 1440, 1920 widths. Fix any
  horizontal scroll, cramped spacing, orphaned words in headlines, misaligned grids,
  or inconsistent section paddings (vertical rhythm should feel identical between
  sections — pick one spacing scale and enforce it).
- Verify section order and anchors: Hero → About → Products → Services → Stats →
  Brands → Why Us → Contact; every header/footer/mobile-drawer link lands with correct
  fixed-header offset.
- Dark navy panels: confirm the WHITE logo variant is used on them everywhere and the
  standard logo on light surfaces.
- Buttons/links: consistent hover/focus/active states; visible keyboard focus ring
  everywhere.

### 3. Animation polish
- Scroll the whole page slowly and quickly: no reveal that fires late/never, no jank,
  no content flashing invisible before animating (elements must be hidden via GSAP's
  initial state, not CSS opacity:0 that can strand content if JS fails — verify
  content is visible with JS disabled or use `.no-js` fallback).
- Reduced-motion check: with `prefers-reduced-motion: reduce`, all content is
  immediately visible and counters show final values.
- `ScrollTrigger.refresh()` fires after lazy sections mount (no dead trigger positions).

### 4. Form & lead pipeline end-to-end
- Submit leads from: contact form, header CTA drawer, products CTA, services CTA.
  Verify each arrives with the right `source`, renders in Lead Management, and the
  Dashboard counts update. Verify validation errors, duplicate handling, and the
  thank-you flow. Confirm zero lead data in localStorage.

### 5. Admin QA
- Login/logout, wrong-password state, protected route redirect, mobile admin layout,
  status changes, notes, CSV export, 15s auto-refresh, two-tab sync.

### 6. Technical hygiene
- `npm run build` → zero errors; treat new warnings as fixable issues.
- Remove dead code: unused components, hooks, CSS modules, data files, deps
  (`npx depcheck` — remove genuinely unused packages such as leftover swiper/
  canvas-confetti/framer-motion if nothing imports them anymore).
- Console must be clean at runtime (no errors/warnings/log spam) on both site and
  admin.
- Check bundle: no accidental double animation libraries; report main bundle size.
- Verify favicon set, manifest, robots.txt, sitemap.xml one final time.
- Update `README.md` and `CLAUDE.md` if anything drifted during prompts 04–13
  (final source of truth for the shipped architecture).

### 7. Release notes
- Produce a short LAUNCH_CHECKLIST.md at the repo root: env vars to set in
  production (`ADMIN_API_KEY` in `public/api/config.php`, admin credentials, site
  URL, contact info), hosting requirements (PHP for /api), and post-launch SEO steps
  (Google Search Console verification + sitemap submission, Google Business Profile
  suggestion).

## Acceptance criteria

- All greps clean; build clean; console clean.
- Every issue found in the audit is FIXED in this PR, not just listed.
- LAUNCH_CHECKLIST.md exists and is accurate.

## Delivery

Commit with a clear message, push the branch, and open a Pull Request. Finish your reply
with: (a) a QA report summary (what was found and fixed, final bundle size, Lighthouse
scores if measured), and (b) the PR link.
