# Prompt 10 — Trusted Brands Showcase + Why Choose Us Section

## Context

Services + Stats are merged. Now build (a) the Trusted Brands section (`id="brands"`)
and (b) the Why Choose Us section (`id="why-us"`), completing the trust story before
the contact/enquiry finale.

## Content — Trusted Brands

- Eyebrow: `PARTNERS IN QUALITY`
- Title: `Trusted Brands We Deal In`
- Brands (12): SAIL · UltraTech Cement · Dalmia Cement · Galaxy Cement · Simpolo
  Tiles & Bathware · Solorex · Jaquar · BELZ Vanity · Oyster Bath Tubs · Corsa ·
  Petra Premium Steel Doors · APL Apollo Window Systems
- Store in `src/data/brandsData.js` (name, optional logo path, category).

## Content — Why Choose Us

- Eyebrow: `WHY NILACHAL`
- Title: `Built on Trust. Growing the Northeast.`
- Five differentiators (rewrite `src/data/featuresData.js`):
  1. **Genuine Products** — 100% authentic and original materials.
  2. **Competitive Pricing** — Best prices for the best quality.
  3. **Fast & Safe Delivery** — Timely delivery across the Northeast.
  4. **Expert Support** — Professional guidance at every step.
  5. **Strong Network** — Wide supply network across the region.

## Visual & motion spec

**Brands:**
- Brand logos are trademarks — do NOT fabricate or hotlink logos. Approach: render
  elegant text wordmarks (brand name in a refined neutral style inside hairline-border
  tiles, grayscale feel, subtle hover to full color/navy). If official logo files are
  later provided they can drop into `brandsData.js` — build the tile to support both
  (image if `logo` present, wordmark otherwise).
- Layout: 6-up grid desktop / 4 tablet / 2–3 mobile, generous tile padding, perfectly
  aligned. Alternative allowed: a slow infinite marquee row (CSS/GSAP, pauses on
  hover, disabled under reduced motion) — choose grid OR marquee, not both.

**Why Choose Us:**
- Restyle the `WhyChooseUs` component (renamed from WhyChooseCIT in Prompt 03).
- Layout: 5 items — center-aligned icon-over-title cards in a single row on wide
  desktop (wrap gracefully), or a 2+3 arrangement. Thin line icons, accent green
  used sparingly (icon color), white/hairline cards, no shadows until hover.
- Motion: stagger reveals for both sections via `useGsapReveal`.
- Section rhythm: Brands on white, Why Us on the light background token (keep the
  alternating rhythm of the page consistent).

## Tasks

1. Create `src/data/brandsData.js`; rewrite `src/data/featuresData.js`.
2. Build `src/components/sections/BrandsSection/` (`id="brands"`).
3. Rebuild `WhyChooseUs` section (`id="why-us"`); remove the old FeaturesSection if it
   is now redundant (one of them survives — do not ship two near-identical sections;
   update `src/App.jsx` accordingly).
4. Responsive + reduced motion; `npm run build` passes.

## Acceptance criteria

- Brands render as clean wordmark tiles (or tasteful marquee), no broken/hotlinked
  images, no fabricated logos.
- Why Choose Us matches spec; page section rhythm looks intentional.
- Header nav "Brands" and "Why Us" anchors land correctly.

## Delivery

Commit with a clear message, push the branch, and open a Pull Request. Finish your reply
with: (a) a concise summary, and (b) the PR link.
