# Prompt 08 — North East Buildmart Products Section

## Context

About is merged. Now build the Products section (`id="products"`) showcasing the
flagship brand **North East Buildmart** and its product categories. This replaces the
old ServicesSection-style card grid with a cleaner, premium product-category
presentation.

## Content

- Eyebrow: `OUR FLAGSHIP BRAND`
- Title: `North East Buildmart`
- Subtitle: `A Brand of Nilachal Infracon Pvt. Ltd.` + one line: "Premium building
  materials and construction products — genuine brands, dependable quality, delivered
  across the Northeast."
- Product categories (10):
  1. Steel Doors
  2. uPVC Doors
  3. WPC Doors & Frames
  4. Tiles
  5. Sanitaryware
  6. Bath Fittings
  7. Cement
  8. TMT Bars
  9. Hardware
  10. Construction Materials
- Section CTA: `Enquire About Products` → opens lead form drawer (prefill
  `source: 'products-section'`).

## Visual & motion spec

- Store the categories in `src/data/productsData.js` (replace/rename the old
  `servicesData.js` if it exists — id, name, short line, icon name, image path).
- Layout options — pick the cleaner one and commit to it:
  **(A) Minimal tile grid**: 5-up on wide desktop, 3-up tablet, 2-up mobile. Each tile:
  small line icon OR small square product photo, category name, 1-line descriptor.
  Hairline borders, white tiles, hover lift.
  **(B) Feature split**: left sticky intro (brand block on deep navy with the WHITE
  logo treatment and the CTA), right a scrolling 2-col grid of category tiles.
  Option B echoes the mockup's navy Buildmart panel — prefer B on desktop,
  degrading to stacked (intro block then grid) on mobile.
- Product imagery: use small, consistent open-source photos (Unsplash/Pexels,
  commercial-use) OR consistent line icons via `@iconify/react` — do NOT mix styles.
  If photos: same aspect ratio (1:1 or 4:3), optimized WebP ≤60KB each, in
  `public/images/products/`.
- Motion: section title reveal, then grid tiles stagger in (0.05–0.08s) with
  `useGsapReveal`; the navy intro panel gets a `clipReveal`.

## Tasks

1. Create `src/data/productsData.js` with the 10 categories.
2. Rebuild the section component as
   `src/components/sections/ProductsSection/ProductsSection.jsx` (+ module.css),
   `id="products"`; remove/replace the old ServicesSection usage for this slot in
   `src/App.jsx` (the Services slot gets rebuilt in Prompt 09 — keep imports coherent).
3. Source/optimize any images; strictly consistent visual language.
4. Responsive + reduced-motion; `npm run build` passes.

## Acceptance criteria

- Products section matches spec, tiles are perfectly aligned at all breakpoints.
- CTA opens the enquiry drawer with the products source tag.
- Data-driven rendering from `productsData.js` (no hardcoded category markup).

## Delivery

Commit with a clear message, push the branch, and open a Pull Request. Finish your reply
with: (a) a concise summary, and (b) the PR link.
