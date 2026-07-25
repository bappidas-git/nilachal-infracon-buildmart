# Prompt 06 — Hero Section (Apple-style, GSAP)

> Read `prompts/README.md` first. Prompts 01–05 are merged.

## Context

`src/components/sections/HeroSection/` is the CIT admissions hero (badge, B.E. copy, embedded desktop lead form, campus image). Rebuild it as a cinematic, minimal Nilachal hero — the single most important screen of the site. This sets the design bar for every following section.

## Read first

- `src/components/sections/HeroSection/HeroSection.jsx` + `HeroSection.module.css` (the 6-layer background stack: gradient → image → video → overlay → pattern → content; the JS image-preload fallback chain)
- `src/animations/` hooks (from prompt 03), `src/data/siteConfig.js`

## Design decisions (already made)

- **Remove the embedded desktop form from the hero.** Apple-minimal heroes don't carry forms; conversion happens via the CTA → quote drawer and the Contact section. (This also removes one of the three UnifiedLeadForm instances — note it for prompt 10.)
- Full-viewport (`min-height: 100svh`) hero, dark cinematic image background with a navy scrim, white text. Layout: content bottom-left-ish on desktop, centered on mobile.
- Copy (from the approved brand content):
  - Eyebrow: `NILACHAL INFRACON PRIVATE LIMITED`
  - H1: `Building the Future of Northeast India` (this is the page's only `<h1>`)
  - Subline: `Building Tomorrow, Together.`
  - Paragraph: "A trusted infrastructure and building materials company delivering premium construction products and professional construction services across Northeast India."
  - CTAs: primary green **"Explore Our Products"** (smooth-scrolls to `#products`), secondary ghost/white **"Request a Quote"** (opens `request-quote` drawer).
  - Trust strip along the hero bottom: `10+ Years` · `5000+ Customers` · `7+ NE States` · `100% Genuine Products` (small, quiet, separated by hairlines).

## Tasks

1. **Background image** — replace the CIT campus Cloudinary image with an open-source photo: modern building under construction / construction site at dusk with cranes, cinematic and not stocky. Source from Unsplash (`https://images.unsplash.com/photo-<id>?auto=format&fit=crop&w=2400&q=80`); pick 2–3 candidates, **verify each returns HTTP 200 with `curl -sI`**, choose the best, and keep one verified fallback in the existing image-fallback chain (the JSX loader with 5s timeout + gradient fallback stays). Provide a `w=1200` variant for the mobile array. Navy scrim: gradient `rgba(15,36,56,.85) → rgba(15,36,56,.45)`; drop the dot-pattern layer (too busy for the minimal look). The unused `.heroVideo` CSS layers can be deleted.
2. **Rebuild `HeroSection.jsx`**: new structure per the design above; `id="home"`; semantic markup (`<section aria-label>`, single h1); `fetchpriority="high"` on the hero image when rendered as `<img>`, or keep the CSS background approach with the preload chain — your call, but LCP must stay good.
3. **GSAP intro timeline** (on mount, not scroll): scrim settles → eyebrow fades in → H1 reveals with a split-line masked slide-up (wrap words/lines in overflow-hidden spans; do NOT add SplitText — it's a paid plugin; hand-roll line wrapping) → paragraph + CTAs fade up staggered → trust strip fades in. Total ≤ 1.6s, `power3.out`. Under `prefers-reduced-motion`: everything appears instantly.
4. **Scroll affordance**: minimal chevron or "Scroll" hint that fades out after the first scroll (GSAP + ScrollTrigger).
5. **Subtle parallax**: background image `yPercent` drift on scroll via `useParallax` (skip on mobile + reduced motion).
6. **Responsive**: test 360px, 768px, 1024px, 1440px. Trust strip wraps to 2×2 on mobile. CTAs stack full-width on ≤480px.
7. Remove now-unused imports (UnifiedLeadForm from the hero, old tracking leftovers already gone), clean `HeroSection.module.css` of CIT comments and dead form/video styles.
8. CHANGELOG entry.

## Guardrails

- Header transparency-over-hero (from prompt 05) must still look right on the dark image.
- Do not touch other sections, the drawer mechanics, or `App.jsx` composition (prompt 07 owns composition).

## Verification

- `npm run build` passes.
- `npm start`: hero renders full-viewport on desktop + mobile widths; intro timeline plays once; both CTAs work ("Explore Our Products" scrolls — target `#products` may not exist yet, must not throw; "Request a Quote" opens the drawer); reduced-motion shows instantly.
- `curl -sI` on every image URL committed → 200.
- `grep -rn "CIT\|admission\|B\.E\|campus\|8069645014" src/components/sections/HeroSection/` → zero hits.

## Delivery & report

Branch (designated or `feature/nilachal-06-hero`), commit, push, PR to `main`. End with `### Summary of changes`, `### PR`, `### Next` ("Merge, then run `prompts/07-page-recomposition-about-section.md`").
