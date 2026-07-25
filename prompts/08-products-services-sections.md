# Prompt 08 — North East Buildmart Products Section + Construction Services Section

> Read `prompts/README.md` first. Prompts 01–07 are merged.

## Context

Two content pillars of the business: the **North East Buildmart** product range (building materials retail) and the **construction & infrastructure services**. The old `ServicesSection` (7 B.E. course cards + Swiper carousel) is replaced; a new `ProductsSection` is created.

## Read first

- `src/components/sections/ServicesSection/` (current: course cards, Swiper mobile carousel, JSON-LD injection via `injectSchema('schema-services', generateServiceSchema(servicesData))`)
- `src/data/productsData.js`, `src/data/servicesData.js`, `src/data/siteConfig.js`, `src/animations/`
- `src/context/ModalContext.jsx` (drawer `extraData` mechanism — ServicesSection shows how per-card context is passed into the drawer)

## Tasks

### 1. New `src/components/sections/ProductsSection/` (`id="products"`)

- Header: eyebrow `OUR FLAGSHIP BRAND`, headline "North East Buildmart", subtext "A brand of Nilachal Infracon Pvt. Ltd. — premium building materials under one roof."
- **10-category grid** from `productsData`: minimal tiles (icon in green on `--color-accent-tint` circle, category name, one-line blurb on hover/desktop or always/mobile). Desktop 5×2, tablet 3-col, mobile 2-col. Whole tile clickable → `openLeadDrawer('product-enquiry', { subtitle: <category name>, service_interest: <category name> })` so the enquiry form arrives pre-filled (prompt 10 wires the prefill into the form; passing it now is forward-compatible).
- Optional flourish (keep tasteful): one wide feature image strip of premium materials (Unsplash, verified) between header and grid, or a dark navy band variant for the whole section to make Buildmart feel like a brand-within-the-brand. Choose one, not both.
- Section CTA: green "Request Product Pricing" → `product-enquiry` drawer.
- Animations: `useReveal` header, `useStaggerReveal` grid; icon micro-scale on hover.

### 2. Rebuild `src/components/sections/ServicesSection/` (`id="services"`)

- Header: eyebrow `WHAT WE DO`, headline "Construction & Infrastructure Services".
- The 5 services from `servicesData` as a **minimal vertical list** (Apple-style rows, not cards): each row = large index numeral or icon, service name, description, 2–3 feature tags, hairline separator; hover reveals an arrow → `openLeadDrawer('service-enquiry', { subtitle: <service name>, service_interest: <service name> })`. Alternate: 2-col grid with one featured image column. Pick the list style — it reads more premium.
- **Remove Swiper entirely** from this section. Mobile: rows stack naturally (no carousel needed for 5 rows). This makes `swiper` an unused dependency — do **not** uninstall here (prompt 14 prunes), but delete all Swiper imports/CSS from the section.
- **Keep the JSON-LD injection pattern** (`injectSchema('schema-services', generateServiceSchema(servicesData))`) — the generator gets construction-correct wording in prompt 12; the wiring stays.
- Rename course-flavored CSS classes (`.courseCard` etc.) to service naming while you're rewriting the module.css.
- Animations: `useReveal` + per-row `useStaggerReveal`.
- Section background `--color-bg-subtle` to alternate rhythm with Products (white).

### 3. Wire into `App.jsx`

Insert `ProductsSection` between About and Services (lazy import + ErrorBoundary/Suspense wrapper + `useIdlePreload` list entry, same pattern as other sections).

### 4. Cleanup & docs

- No CIT strings/comments remain in either section.
- `CLAUDE.md` structure update; CHANGELOG entry.

## Verification

- `npm run build` passes.
- `npm start`: Products and Services render per design at 360/768/1024/1440px; tiles/rows open the drawer with the right title and subtitle; scroll reveals fire once each; no Swiper imports remain (`grep -rn "swiper" src/components/sections/ServicesSection/` → zero).
- `grep -rn "course\|B\.E\|VTU\|admission\|CIT" src/components/sections/ServicesSection/ src/components/sections/ProductsSection/` → zero hits (case-insensitive; allow the word "of course" if it appears in prose — prefer rewording).
- Header nav "Products" anchor now scrolls to the section.

## Delivery & report

Branch (designated or `feature/nilachal-08-products-services`), commit, push, PR to `main`. End with `### Summary of changes`, `### PR`, `### Next` ("Merge, then run `prompts/09-stats-brands-whyus-faq.md`").
