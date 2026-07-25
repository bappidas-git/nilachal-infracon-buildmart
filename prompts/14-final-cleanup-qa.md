# Prompt 14 — Final Cleanup, Zero-Trace Audit & QA

> Read `prompts/README.md` first. Prompts 01–13 are merged. This is the release-readiness pass.

## Context

The rebuild is functionally complete. This prompt removes every dead file and dependency the migration left behind, proves zero CIT/legacy traces remain, and runs the full quality bar: build, responsiveness, accessibility, performance, and the cross-device lead-sync flow.

## Tasks

### 1. Dead code sweep (verify each with grep before deleting)

- `src/hooks/useLocalStorage.js` (empty), `src/utils/helpers.js` (empty), `src/hooks/useInView.js` (custom hook — sections use GSAP now; delete if unimported)
- `src/components/common/LeadForm/` if it survived prompt 11; `src/components/common/AnimatedCounter/` if `useCountUp` replaced all uses; `src/components/common/Card/` and `SectionTitle/` only if truly unimported (keep if any section uses them)
- Legacy `Modal` system: if prompt 11 left it, decide now — `openModal`/`MODAL_TYPES` with real-estate leftovers (`SITE_VISIT`, `FLOOR_PLAN`) should not ship; remove the dead paths, keep the component only if something renders it
- Any remaining `*.module.css` orphans from deleted components; unused images/asset references

### 2. Dependency prune (`package.json`)

For each, `grep -rn "<pkg>" src/` first; uninstall only if unused: `swiper` (removed in prompt 08), `canvas-confetti` (removed in prompt 10), `react-intersection-observer` (was never used by sections), `sweetalert2-react-content` (only if swalHelper doesn't use it — check), `@mui/lab` (check usage), `web-vitals` (keep — reportWebVitals uses it), `framer-motion` (**likely still required** by LeadFormDrawer/MobileDrawer/Modal/Header menu — keep unless fully migrated; do not force-migrate now). Run `npm install`, commit the pruned lockfile, confirm build.

### 3. Zero-trace audit (the release gate)

All case-insensitive, `--exclude-dir=node_modules --exclude-dir=prompts`:
```
grep -rniE "cit\b|cittumkur|channabasaveshwara|tumakuru|tumkur|vtu|admission|b\.e\.|comedk|kcet|monjoven|8069645014|logo-cit|CIT-Campus|CIT-Map|placehold\.co|GTM-|dataLayer|fbq\(|gtag\(|gclid" .
```
Expected: **zero hits** (word-boundary `cit\b` avoids false positives like "explicit" — manually clear any remainder). Allowed exceptions: the "Developed by Assam Digital" footer credit and this `prompts/` folder. Also verify visually: favicon, splash loader, hero, footer, admin login, thank-you page, drawer — no CIT pixel anywhere.

### 4. Functional QA matrix

- **Build**: `npm run build` clean; note the gzipped main bundle size in the PR (flag if main chunk > 250KB gzip).
- **Cross-device lead flow** (the core promise): with `php -S 127.0.0.1:8080 -t public` + `REACT_APP_LEADS_API_URL` override — submit an enquiry in browser window A (mobile viewport), open `/admin` in window B: the lead appears on next sync (≤15s or manual Refresh). Change its status in B; confirm persistence via the API. Then delete test data.
- **Responsive walkthrough**: 360, 390, 768, 1024, 1440 — no horizontal scroll, no overlapping text, drawer + bottom nav correct on mobile, header correct at all widths.
- **Accessibility pass**: keyboard-only run (tab through nav → CTAs → form → FAQ accordion → footer); focus visible everywhere; form errors announced (`aria-describedby` on fields); color-contrast spot-check green-on-white and slate-on-navy (fix any < 4.5:1 body text).
- **Motion**: `prefers-reduced-motion` renders everything instantly; no ScrollTrigger jank when loading mid-page anchors directly.
- **Perf quick wins**: hero image preloaded/fetchpriority, below-fold images lazy, fonts swap correctly, no console errors/warnings. If Chrome + Lighthouse CLI available (`npx lighthouse http://localhost:3000 --preset=desktop --quiet`), record Performance/SEO/A11y/Best-Practices scores in the PR; target ≥90 SEO & A11y.

### 5. Docs final pass

- `CUSTOMIZATION_GUIDE.md`: rewrite as the **Nilachal maintenance guide** (how to change copy via `src/data/*`, brand tokens, logo swap, admin creds, deploy steps incl. PHP requirements + `config.php` ADMIN_API_KEY pairing, SPA redirect rules per host). Purge boilerplate/Monjoven/CIT remnants.
- `README.md` + `CLAUDE.md` accuracy check against the final codebase; finalize `CHANGELOG.md` `[1.0.0]` with the date.
- Add a short `DEPLOYMENT.md` if the deploy notes don't fit naturally in the customization guide: build output + `public/api/*.php` must be hosted on a PHP-capable server; create `public/api/config.php` from the example with the real `ADMIN_API_KEY`; verify `api/data/` is writable & web-denied; point `REACT_APP_LEADS_API_URL` at the live endpoint; post-launch SEO checklist pointer.

### 6. Optional (only if everything above is green)

Delete the `prompts/` folder in this final PR **only if the owner confirms**; default: keep it as the rebuild record.

## Verification

Everything in tasks 3–4 IS the verification. The PR description must include: the audit-grep output (empty), bundle size, QA matrix results with any fixes made, and Lighthouse scores if run.

## Delivery & report

Branch (designated or `feature/nilachal-14-cleanup-qa`), commit, push, PR to `main`. End with `### Summary of changes`, `### PR`, and `### Next` — "Series complete. After merging: deploy to a PHP-capable host, create `public/api/config.php` with the rotated ADMIN_API_KEY, point the domain, then run the post-launch SEO checklist in SEO_GUIDE.md (Search Console verification + sitemap submission)."
