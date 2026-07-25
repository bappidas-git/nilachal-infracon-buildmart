# Prompt 11 — Contact Section, Map & Final Page Assembly

> Read `prompts/README.md` first. Prompts 01–10 are merged.

## Context

The last public-site piece: rebuild `ContactSection` (with the embedded enquiry form and a map), then finalize the one-pager assembly — section order, anchors, scroll behavior, drawer-key pruning, and a whole-page polish pass. After this prompt the public site is content-complete (SEO in 12, admin in 13, cleanup in 14).

## Read first

- `src/components/sections/ContactSection/` (current CIT version embeds UnifiedLeadForm `variant='default'`, `formId='contact-form'`)
- `src/App.jsx` (composition, hash-scroll retries, `useIdlePreload`), `src/context/ModalContext.jsx` (legacy drawer-key aliases from prompt 05)
- `src/data/siteConfig.js`, `locationData.js`

## Tasks

### 1. Rebuild `ContactSection` (`id="contact"`)

Two-column on desktop, stacked on mobile:
- **Left — "Get in Touch"**: eyebrow `CONTACT US`, headline, then quiet contact rows (icon + label + value, hairline-separated): Registered Office (full Nagaon address), Phone (tel:), Email (mailto:), WhatsApp (wa.me chip). Below: **map embed** — Google Maps iframe (`https://www.google.com/maps?q=<url-encoded siteConfig.mapsQuery>&output=embed`, no API key needed), `loading="lazy"`, `title="Nilachal Infracon location"`, rounded 20px, ~300px tall. Under the map: "Serving all of Northeast India" + the 8 serving-state names as quiet text pills (from `locationData.servingStates`).
- **Right — enquiry form card**: UnifiedLeadForm `variant='default'`, `formId='contact-form'`, heading "Send us an Enquiry". White card, 1px border, soft shadow token, 20px radius.
- `useReveal` both columns.

### 2. Final `App.jsx` assembly

- Confirm final order: `Hero → About → Products → Services → Stats → Brands → WhyUs → FAQ → Contact` + Footer; `useIdlePreload` list matches exactly.
- **Prune legacy drawer keys**: remove the CIT alias keys (`apply-now`, `get-details`, `request-callback`, `book-meeting`, `download-brochure`, `fees-scholarship`) from `DRAWER_TITLES` in `ModalContext.jsx`, then `grep -rn "apply-now\|get-details\|request-callback\|book-meeting\|download-brochure\|fees-scholarship" src/` and fix any straggler callers to use the new keys.
- Remove the legacy `Modal` mount + `MODAL_TYPES` real-estate leftovers from `ModalContext.jsx` **if** nothing uses `openModal` (verify by grep first; if used, leave and note for prompt 14).
- Verify scroll-spy in Header highlights the right nav item for the final section ids; update its section list if needed.

### 3. Whole-page polish pass (the "Apple feel" audit)

Walk the full page at 360 / 768 / 1024 / 1440 and fix:
- **Rhythm**: consistent vertical padding scale between sections (e.g. 96–128px desktop / 64px mobile), alternating white / `--color-bg-subtle` backgrounds land correctly with Stats (dark navy) as the intentional break.
- **Type scale**: h2 sizes consistent across sections; eyebrows identical everywhere; no orphan widows in headlines (use `text-wrap: balance`).
- **Motion**: every section reveals exactly once; no jank on mid-page reload (ScrollTrigger refresh after lazy mounts — verify by loading with `/#faq`); reduced-motion path clean.
- **Floating WhatsApp button (desktop only)**: small round green FAB bottom-right (mobile already has WhatsApp in the bottom nav), `wa.me` from siteConfig, appears after scrolling past the hero (GSAP), `aria-label`.
- Back-to-top button restyled to tokens (it lives in `App.jsx`).
- All images: explicit dimensions, `loading="lazy"` below the fold, descriptive `alt`.

### 4. Cleanup & docs

- Delete `src/components/common/LeadForm/` (legacy wrapper) if nothing imports it (verify by grep).
- `CLAUDE.md`: final section list + anchors; CHANGELOG entry.

## Verification

- `npm run build` passes.
- `npm start`: full-page walkthrough — every nav anchor (desktop header, mobile drawer, footer quick links) scrolls to the right section with correct 80px offset; drawer opens from Header CTA, product tiles, service rows, Brands CTA, and mobile "Enquire"; contact form submits (against local PHP if available); map loads lazily; WhatsApp FAB works.
- `grep -rn "apply-now\|book-meeting\|download-brochure\|fees-scholarship" src/` → zero hits.
- Console clean (no React key warnings, no 404s) across a full scroll on desktop + mobile widths.

## Delivery & report

Branch (designated or `feature/nilachal-11-contact-assembly`), commit, push, PR to `main`. End with `### Summary of changes`, `### PR`, `### Next` ("Merge, then run `prompts/12-seo-overhaul.md`").
