# Prompt 09 — Stats Band, Brands Strip, Why-Choose-Us & FAQ

> Read `prompts/README.md` first. Prompts 01–08 are merged.

## Context

Four lighter sections that complete the page body: animated stats, the partner-brands strip, the why-choose-us value props (replacing the CIT `FeaturesSection` tabs), and a new FAQ accordion (content + SEO value — its entries must match the FAQPage schema prompt 12 will generate from the same data).

## Read first

- `src/components/sections/StatsSection/` (AnimatedCounter usage, `parseStatValue` number parsing)
- `src/components/sections/FeaturesSection/` (to be replaced by WhyUsSection)
- `src/data/statsData.js`, `brandsData.js`, `featuresData.js`, `faqData.js`, `src/animations/` (`useCountUp`)

## Tasks

### 1. Rebuild `StatsSection` → minimal stats band (no `id` needed in nav)

- Dark navy (`--color-primary-dark`) full-width band, the **5 stats** from `statsData` in one row (wraps 2+3 or 2×2+1 centered on mobile): big number (white, 56–72px, Inter 700) via **GSAP `useCountUp`** (replacing AnimatedCounter here — the component itself stays for now; prompt 14 deletes it if unused), label in slate-on-dark below, thin vertical hairlines between items.
- Remove: recruiter logo wall, placehold.co URLs, Apply CTA, `HEADLINE_STAT_IDS` filtering (show all 5), CIT copy.
- `useCountUp` must honor the `10+` / `5000+` / `100%` prefix/suffix format and fire once on scroll into view.

### 2. New `src/components/sections/BrandsSection/` (`id="brands"`)

- Header: eyebrow `TRUSTED BRANDS WE DEAL IN`, one quiet subtitle line.
- The 12 brands from `brandsData` as a calm grid (6×2 desktop, 4×3 tablet, 3×4 or 2-col mobile): each cell renders the brand logo `<img>` from `/images/brands/<slug>.png` **if the file exists** (use `onError` to swap to fallback), else a styled text wordmark (Inter 600, slate, letter-spaced caps) — no broken images, no placeholder services. Grayscale → color on hover for real logos.
- Optional: gentle infinite marquee row instead of a grid on mobile (GSAP `xPercent` loop, pausable, reduced-motion → static grid). Choose grid or marquee per what looks cleaner — do not build both.
- Below the grid: the page's **single mid-page CTA moment** — one centered line "Looking for a specific brand or product?" + green "Request a Quote" button (`request-quote` drawer).

### 3. Replace `FeaturesSection` with `src/components/sections/WhyUsSection/` (`id="why-us"`)

- Delete the tabbed FeaturesSection (folder + App.jsx import/preload references) — the tab UI, awards timeline, and 3-category data model all go.
- WhyUsSection: eyebrow `WHY CHOOSE US`, the **5 value props** from `featuresData` as a single clean row of 5 (icon, title, two-word description) — the mockup's bottom strip, elevated: white background, generous padding, `useStaggerReveal`. Tablet 3+2, mobile 2-col with the 5th full-width.
- Remove the temporary `featuresCategories` compatibility export from `featuresData.js` (added in prompt 04).

### 4. New `src/components/sections/FAQSection/` (`id="faq"`)

- Eyebrow `FREQUENTLY ASKED QUESTIONS`, the 7 FAQs from `faqData` as a minimal accordion: hairline-separated rows, question in ink 500, plus/minus icon rotating 45° (GSAP), answer expands with height auto tween (or CSS grid-rows trick + GSAP opacity). One open at a time. Fully keyboard-accessible (`button` + `aria-expanded` + `aria-controls`).
- Background `--color-bg-subtle`; max-width ~800px centered.

### 5. Wire into `App.jsx`

Order after Services: `Stats → Brands → WhyUs → FAQ` (then Contact). Lazy imports + ErrorBoundary/Suspense + `useIdlePreload` entries; remove FeaturesSection references.

### 6. Cleanup & docs

CIT-trace sweep of all four sections; `CLAUDE.md` structure; CHANGELOG entry.

## Verification

- `npm run build` passes; `grep -rn "FeaturesSection" src/` → zero hits.
- `npm start`: counters animate once and show correct suffixes; brand cells render wordmark fallbacks cleanly (no image files exist yet); accordion opens/closes with keyboard and mouse; all four sections responsive at 360/768/1440px; nav anchors `#brands` and `#why-us` scroll correctly.
- Reduced-motion: counters render final values instantly, marquee (if built) is static.
- `grep -rniE "cit|admission|campus|placement|recruiter" src/components/sections/StatsSection/ src/components/sections/BrandsSection/ src/components/sections/WhyUsSection/ src/components/sections/FAQSection/` → zero hits.

## Delivery & report

Branch (designated or `feature/nilachal-09-stats-brands-whyus-faq`), commit, push, PR to `main`. End with `### Summary of changes`, `### PR`, `### Next` ("Merge, then run `prompts/10-enquiry-form-lead-pipeline.md`").
