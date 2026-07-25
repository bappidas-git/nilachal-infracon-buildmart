# Prompt 09 — Construction Services Section + Animated Stats Band

## Context

Products section is merged. Now build (a) the Construction & Infrastructure Services
section (`id="services"`) and (b) the horizontal Stats band that sits right after it.

## Content — Services

- Eyebrow: `WHAT WE DO`
- Title: `Construction & Infrastructure Services`
- Intro line: "End-to-end project capabilities — from materials supply to complete
  execution."
- Five services (icon + title + 1–2 line description each), stored in
  `src/data/servicesData.js` (rewrite the file for Nilachal):
  1. **Residential Projects** — Quality homes and housing developments built to last.
  2. **Commercial Buildings** — Modern commercial spaces engineered for business.
  3. **Institutional Projects** — Schools, hospitals and public infrastructure.
  4. **Renovation & Maintenance** — Upgrades, retrofits and dependable upkeep.
  5. **Project Management** — Planning, procurement and on-site execution, managed
     end to end.
- CTA: `Discuss Your Project` → opens lead form drawer (`source: 'services-section'`).

## Content — Stats band

Rewrite `src/data/statsData.js` with:
- `10+` Years of Experience
- `5000+` Products & Solutions
- `5000+` Happy Customers
- `7+` States Served in Northeast India
- `100%` Quality Assurance

## Visual & motion spec

- Services layout: mirror-balance with the Products section — if Products used the
  navy-intro-left pattern, Services puts imagery/intro on the RIGHT. One high-quality
  open-source photo (modern architecture/villa at dusk, commercial license, optimized,
  `public/images/services/`), and the five services as a clean vertical list with thin
  icons and hairline separators (list > cards here; feels more editorial/Apple).
- Stats band: full-width strip on white with hairline top/bottom borders, 5 columns
  desktop / 2–3 wrap on mobile. Big numerals (48–64px, primary navy), small muted
  labels. Numbers count up via `useGsapCounter` when scrolled into view (once).
  No icons needed — numbers are the design.
- Motion: services list items stagger-reveal; image `clipReveal` + slight parallax.

## Tasks

1. Rewrite `src/data/servicesData.js` and `src/data/statsData.js`.
2. Rebuild `src/components/sections/ServicesSection/` to the spec (`id="services"`).
3. Rebuild `src/components/sections/StatsSection/` as the stats band (rendered
   directly after Services in `src/App.jsx`).
4. Source/license-check/optimize the services image.
5. Responsive + reduced motion (counters render final values instantly);
   `npm run build` passes.

## Acceptance criteria

- Both sections match spec at all breakpoints; counters animate once, correctly.
- Data-driven from the two data files.
- CTA opens the enquiry drawer with the services source tag.

## Delivery

Commit with a clear message, push the branch, and open a Pull Request. Finish your reply
with: (a) a concise summary, and (b) the PR link.
