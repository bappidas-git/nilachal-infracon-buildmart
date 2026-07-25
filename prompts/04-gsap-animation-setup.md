# Prompt 04 — GSAP Animation Infrastructure

## Context

The Nilachal Infracon website (rebranded in prompts 01–03, already merged) must have
exceptional, modern, professional motion — subtle and premium like apple.com, never
gimmicky. This prompt installs GSAP and builds the shared animation infrastructure that
all section prompts (05–11) will consume. No section redesigns here — only the motion
system plus migration of existing global animations.

## Tasks

1. **Install GSAP:** `npm install gsap` (includes ScrollTrigger). Register plugins once
   in a central module.

2. **Create `src/animations/` module:**
   - `src/animations/gsap.js` — single place that imports gsap, registers
     `ScrollTrigger`, and exports configured `gsap`/`ScrollTrigger`. Set sensible
     global defaults (ease `power3.out`, duration 0.8–1.0).
   - `src/animations/useGsapReveal.js` — React hook: fade-up + slight y-translate
     reveal on scroll for an element or staggered children
     (`opacity 0→1`, `y 40→0`, stagger 0.08–0.12), triggered at ~80% viewport,
     plays once. Must use `gsap.context()` scoped to a ref and clean up on unmount.
   - `src/animations/useGsapCounter.js` — animated number counter driven by
     ScrollTrigger (replacement for the current AnimatedCounter internals; supports
     suffixes like "+", "%").
   - `src/animations/useGsapParallax.js` — gentle parallax (y movement max ~10–15%)
     for hero/section media.
   - `src/animations/presets.js` — shared variants: `fadeUp`, `fadeIn`, `scaleIn`,
     `staggerChildren`, `lineDraw` (for hairline divider draw-ins), `clipReveal`
     (for image reveals).

3. **Reduced motion & mobile safety:** every hook must respect
   `prefers-reduced-motion: reduce` (skip animation, show final state instantly) and
   avoid heavy per-frame work on mobile. Use `ScrollTrigger.matchMedia`/`gsap.matchMedia`
   where behavior should differ between breakpoints.

4. **Header scroll behavior primitive:** add a small hook (or extend an existing one)
   providing scroll-direction + past-threshold state for the sticky "frosted glass"
   header treatment (used in Prompt 05).

5. **Smooth anchor scrolling:** keep native `scrollTo` behavior for hash links but make
   sure ScrollTrigger positions refresh after lazy sections mount
   (`ScrollTrigger.refresh()` on section mount — expose a tiny helper for sections).

6. **Migrate, don't duplicate:** `framer-motion` is already used by existing shells,
   modal/drawer transitions, and micro-interactions. Decision for this codebase:
   **GSAP owns scroll-driven/section animations; framer-motion may remain ONLY for
   modal/drawer mount transitions** until sections are rebuilt. Remove framer-motion
   usage from anything that is now GSAP-driven. Update `AnimatedCounter` component to
   use `useGsapCounter` internally (keep its public props API so existing usage
   doesn't break).

7. **Prove it works:** wire `useGsapReveal` into ONE existing section shell (e.g. the
   current AboutSection) as a demonstration, verify smoothness at 60fps in dev, then
   `npm run build` must pass.

## Acceptance criteria

- `gsap` in dependencies; central registration; no duplicate plugin registrations.
- Hooks handle cleanup correctly (no ScrollTrigger leaks on route change — verify by
  navigating home → /admin → home).
- `prefers-reduced-motion` fully respected.
- Build passes; demo reveal visible on one section.

## Delivery

Commit with a clear message, push the branch, and open a Pull Request. Finish your reply
with: (a) a concise summary of the animation system and how section prompts should use
it, and (b) the PR link.
