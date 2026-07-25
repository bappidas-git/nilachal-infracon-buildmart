# Prompt 07 — Page Recomposition + About Section (Mission/Vision/Values)

> Read `prompts/README.md` first. Prompts 01–06 are merged.

## Context

The page still composes 11 CIT sections. The Nilachal one-pager needs 8. This prompt (a) deletes the CIT sections that have no successor, (b) rebuilds `AboutSection` as the "Welcome to Nilachal Infracon" section with the Mission/Vision/Values/Commitment pillars.

**Target final composition** (App.jsx `HomePageContent`):
`Header → Hero → About → Products (prompt 08) → Services (rebuilt 08) → Stats (rebuilt 09) → Brands (09) → WhyUs (09) → FAQ (09) → Contact (rebuilt 11) → Footer`

## Read first

- `src/App.jsx` — section imports (lazy), the `useIdlePreload` hardcoded import list, ErrorBoundary/Suspense wrappers, hash-scroll logic
- `src/components/sections/AboutSection/` (current CIT version)
- `src/data/aboutData.js`, `src/data/siteConfig.js`, `src/animations/`

## Tasks

### 1. Delete CIT sections with no successor (folders + all references)

- `src/components/sections/WhyChooseCIT/` (CIT-named; its role is covered by WhyUs in prompt 09)
- `src/components/sections/HighlightsSection/` (campus labs grid)
- `src/components/sections/LocationSection/` (its content folds into Contact in prompt 11)
- `src/components/sections/CTASection/` and `src/components/sections/SecondaryCTASection/` (urgency bands — off-brand for the minimal design; the page keeps exactly one mid-page CTA moment, added with Brands in prompt 09)

For each: remove the folder, the lazy `import` in `App.jsx` (WhyChooseCIT is referenced at ~lines 48/322/449), the JSX block with its ErrorBoundary/Suspense wrapper, and the entry in the `useIdlePreload` list. `FeaturesSection`, `ServicesSection`, `StatsSection`, `ContactSection` **stay mounted** (rebuilt in 08–11).

### 2. Rebuild `AboutSection` (`id="about"`)

Minimal two-part layout:
- **Part A — intro split**: left column: eyebrow `WELCOME TO NILACHAL INFRACON`, headline "One of Northeast India's emerging infrastructure & building materials companies", the welcome paragraph from `aboutData` (bold `North East Buildmart` inline), and a quiet text-link CTA "Explore our services →" (`#services`). Right column: one high-quality open-source image (building-materials showroom / architectural detail; Unsplash, verify 200, `w=1200`), rounded 20px, subtle parallax via `useParallax`.
- **Part B — four pillars**: Mission / Vision / Values / Commitment as a 4-up row (2×2 on tablet, stacked on mobile) of borderless cards: thin top hairline, Iconify icon in green, title, text — from `aboutData.pillars`. `useStaggerReveal` on the row; `useReveal` on Part A.
- White background; keep typography per the design system (section eyebrow style should match the Hero's so a shared pattern emerges — if useful, extract a tiny `SectionEyebrow` or reuse `SectionTitle` restyled).

### 3. Cleanup

- Delete `AboutSection`'s CIT image/copy/credibility-points and CIT comments in its module.css.
- `src/App.jsx`: ensure the remaining old sections still render; hash-scroll retry logic untouched.
- If `featuresData.js` still exports the temporary `featuresCategories` alias (from prompt 04) and nothing but FeaturesSection uses it — leave it; prompt 09 removes both.
- `CLAUDE.md` section list + CHANGELOG entry.

## Verification

- `npm run build` passes (catches any missed import of the five deleted folders).
- `grep -rn "WhyChooseCIT\|HighlightsSection\|LocationSection\|CTASection\|SecondaryCTASection" src/` → only hits allowed: none (ContactSection is a different name — must remain).
- `npm start`: page renders Hero → About → (old) Services → (old) Stats → (old) Features → (old) Contact → Footer with no console errors; About matches the new design at 360/768/1440px; pillars stagger in on scroll.
- `grep -rn "CIT\|campus\|VTU\|admission" src/components/sections/AboutSection/` → zero hits.

## Delivery & report

Branch (designated or `feature/nilachal-07-recompose-about`), commit, push, PR to `main`. End with `### Summary of changes`, `### PR`, `### Next` ("Merge, then run `prompts/08-products-services-sections.md`").
