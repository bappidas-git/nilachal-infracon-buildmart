# Prompt 07 — About Section (Welcome + Mission / Vision / Values / Commitment)

## Context

Hero is merged. Now build the About section (`id="about"`) that introduces Nilachal
Infracon and presents its four pillars. Keep the Apple-like restraint: one strong
intro block, one image, four quiet pillar cards.

## Content

- Eyebrow: `WELCOME TO`
- Title: `Nilachal Infracon Private Limited`
- Body (2–3 short paragraphs max):
  "Nilachal Infracon Private Limited is one of Northeast India's emerging
  infrastructure and building materials companies. Through our flagship brand
  **North East Buildmart**, we deliver premium construction materials, quality
  building products, and dependable project solutions for residential, commercial,
  and institutional developments."
  Add one more sentence about trust/quality: "We are committed to providing
  high-quality products, genuine brands and reliable services that build strong
  foundations for a better tomorrow."
- Four pillars (icon + title + 1–2 lines each):
  1. **Our Mission** — To provide quality products and services that create lasting
     value for our customers and partners.
  2. **Our Vision** — To be the most trusted and preferred infrastructure and building
     materials company in Northeast India.
  3. **Our Values** — Integrity, Quality, Commitment, Innovation and Customer
     Satisfaction.
  4. **Our Commitment** — Delivering excellence in every project and building
     long-term relationships.

## Visual & motion spec

- Layout: two-column intro on desktop — image left (~42%), text right; stacked on
  mobile. Below the intro, the four pillars in a 4-up row (desktop) / 2×2 (tablet) /
  1-col (mobile).
- Image: ONE open-source photo suggesting a building-materials showroom / warehouse /
  modern storefront (Unsplash/Pexels, commercial-use license), optimized WebP + JPEG,
  in `public/images/about/`, large radius, subtle `clipReveal` on scroll. Optionally a
  small overlay caption chip: "A Legacy of Trust & Quality".
- Pillar cards: white on the light section background (or hairline-bordered on white),
  thin line icons (use `@iconify/react` line icons in the primary navy or accent
  green), NO heavy shadows. Hover: 2–3px lift with a soft shadow, 200ms.
- Motion: `useGsapReveal` — intro text staggers in; pillars stagger 0.1s each.
- Section background: alternate rhythm — if hero is white, About uses `#F5F7FA` or the
  light green tint token.

## Tasks

1. Rebuild `src/components/sections/AboutSection/` to the spec with `id="about"`.
2. Source, license-check, optimize and commit the About image.
3. Typography, spacing, colors strictly from tokens.
4. Responsive at 360/768/1024/1440. `npm run build` passes.

## Acceptance criteria

- Section matches spec, animates subtly on scroll, fully responsive.
- Nav link "About" lands on it correctly (accounting for fixed header offset).

## Delivery

Commit with a clear message, push the branch, and open a Pull Request. Finish your reply
with: (a) a concise summary, and (b) the PR link.
