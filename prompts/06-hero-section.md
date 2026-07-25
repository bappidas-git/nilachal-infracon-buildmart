# Prompt 06 — Hero Section

## Context

Chrome (header/footer) is done. Now rebuild the hero — the single most important
screen of the Nilachal Infracon one-pager. Apple-like: enormous confident headline,
minimal supporting copy, two buttons, one stunning image. No clutter, no floating
badge soup, no autoplaying carousels.

## Content

- Eyebrow (small caps, letter-spaced, muted): `NILACHAL INFRACON PRIVATE LIMITED`
- Headline (huge, 2–3 lines):
  `Building the Future of Northeast India`
  — render "Northeast India" in the accent green or with a subtle color emphasis.
- Subheadline: `Building Tomorrow, Together.`
- Supporting line (1–2 sentences, muted): "A trusted infrastructure and building
  materials company delivering premium construction products and professional
  construction services across Northeast India."
- Primary CTA: `Explore Our Products` → smooth-scrolls to `#products`.
- Secondary CTA (outline/ghost): `Request a Quote` → opens the lead form drawer.

## Visual & motion spec

- Layout: split hero on desktop — text left (~55%), imagery right (~45%); stacked on
  mobile (text first). Generous top padding below the fixed header.
- Imagery: ONE high-quality, open-source (royalty-free — Unsplash/Pexels) photo of
  modern construction / glass building / city skyline at golden hour. Serve it
  responsively (`srcset` with ~640/1024/1600w variants via the image CDN URL params
  or multiple files placed in `public/images/`), `width`/`height` attributes set,
  `fetchpriority="high"`, no CLS. Round the image container with the large radius
  token and give it a very subtle shadow. Optionally a small floating stat chip
  ("10+ Years of Experience") anchored to the image corner — max ONE.
- Background: clean near-white; optionally an extremely subtle radial tint of the
  light-green token behind the image side.
- GSAP entrance timeline on first load (not scroll-triggered): eyebrow → headline
  (staggered per line, `y:40→0`) → sub/supporting → CTAs → image `clipReveal`.
  Total under ~1.6s, ease `power3.out`. Respect reduced motion.
- Subtle parallax on the hero image while scrolling (from `useGsapParallax`).

## Tasks

1. Rebuild `src/components/sections/HeroSection/` (JSX + module.css) to the spec,
   consuming `brand.js` and the animation hooks from `src/animations/`.
2. Source and commit the hero image(s) into `public/images/hero/` (verify license is
   free for commercial use; prefer Unsplash). Optimize to WebP/AVIF + JPEG fallback,
   keep the largest file under ~250KB.
3. Section id must be the page top (no anchor needed); ensure the header CTA and nav
   work with it.
4. Mobile: headline scales down cleanly (clamp()), image below text, CTAs full-width
   stacked with proper touch targets (min 48px).
5. Lighthouse check: hero LCP element should be the headline or the optimized image;
   no layout shift. `npm run build` passes.

## Acceptance criteria

- Hero matches spec at all breakpoints, animation is smooth and premium.
- CTAs work (scroll + drawer).
- Image licensed correctly, optimized, no CLS.

## Delivery

Commit with a clear message, push the branch, and open a Pull Request. Finish your reply
with: (a) a concise summary, and (b) the PR link.
