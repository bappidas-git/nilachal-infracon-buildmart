# Prompt 03 — Nilachal Design System + GSAP Animation Foundation

> Read `prompts/README.md` first. Prompts 01–02 are merged (identity reset, tracking removed).

## Context

The codebase still wears CIT's visual identity: navy `#0C2D48` / red `#D82618` / CTA red `#E0301E`, defined in `src/styles/variables.css` and `src/theme/muiTheme.js` **and also hardcoded as inline hex in `sx` props across many components**. This prompt installs the Nilachal design system (tokens + theme + typography) and the GSAP animation foundation that all rebuilt sections (prompts 06–11) will use. Sections themselves are NOT redesigned here — they will temporarily render CIT content in Nilachal colors, which is expected.

## Read first

- `src/styles/variables.css` (token source of truth; legacy alias names `--accent-gold*`, `--accent-orange*` are referenced by many `.module.css` files — keep the names, change the values)
- `src/theme/muiTheme.js` (must change in lockstep; `palette.orange` and `palette.accent` aliases are used via `sx`)
- `src/App.css` (fallback hexes), `src/styles/global.css` (scrollbar color, selection), `src/utils/swalHelper.js` (hardcoded `#0C2D48` confirm button)
- `public/index.html` (splash loader + fonts + theme-color — this prompt owns those; SEO meta stays for prompt 12)
- `src/index.js` (font preloads)

## The Nilachal palette (authoritative)

```css
--color-primary: #16324F;        /* deep steel navy — headings, header, footer */
--color-primary-dark: #0F2438;   /* darkest navy — footer bg, hero scrim */
--color-primary-light: #274B6E;
--color-accent: #1E7B45;         /* Nilachal green — CTAs, highlights, links */
--color-accent-dark: #176437;    /* CTA hover */
--color-accent-tint: #E8F5EE;    /* light green wash for chips/backgrounds */
--color-ink: #101C29;            /* body headings text */
--color-slate: #4A5A6A;          /* secondary text */
--color-bg: #FFFFFF;
--color-bg-subtle: #F5F7FA;      /* alternating section background */
--color-border: #E5EAF0;
```

Design language: Apple-like minimalism — vast whitespace, 1200px max content width, large headlines with `letter-spacing: -0.02em`, thin 1px borders instead of heavy shadows (use one soft shadow token `0 8px 30px rgba(16,28,41,.06)` for elevated cards), 16–20px radius on cards, green used sparingly (primary CTAs + key highlights only).

## Tasks

1. **`src/styles/variables.css`** — replace the CIT palette with the tokens above. Keep every existing variable *name* (including legacy aliases `--accent-gold*` → map to navy, `--accent-orange*` → map to green, admin `--admin-*` vars keep their own values for now — prompt 13 restyles admin). Update CIT-referencing comments. Keep `--header-height: 80px` (scroll code depends on it).
2. **`src/theme/muiTheme.js`** — same swap: `palette.primary` → navy scale, `palette.secondary`/`palette.accent`/`palette.orange` → green (keep the keys), update navy scale values, remove CIT comments. Set typography to **Inter** everywhere (headings included — Poppins is removed), heading weights 600–700, `letterSpacing: '-0.02em'` on h1–h3. Keep the breakpoint values unchanged (640/768/1024/1280/1440 — mobile nav and header logic depend on them).
3. **Typography / fonts**
   - `public/index.html` + `src/index.js`: remove Poppins from the Google Fonts URLs/preloads; keep Inter 300–800 with the existing async-swap pattern.
   - `src/styles/global.css`: body font stack `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`; update scrollbar/selection colors to navy/green tokens.
4. **`public/index.html` splash loader** (brand-owned, not SEO): swap the CIT Cloudinary logo for the Nilachal **white** logo, loader background to `--color-primary-dark` navy, progress bar gradient navy→green, tagline text "Building Tomorrow, Together." Update `theme-color` metas and `msapplication-TileColor` to `#16324F`. Update the noscript heading color. **Do not touch title/meta/JSON-LD** (prompt 12).
5. **Sweep hardcoded CIT hexes** — replace `#0C2D48`, `#081F33`, `#1A5276`, `#D82618`, `#E0301E`, `#B71F12` everywhere they appear in `src/` (inline `sx` props, style objects, module CSS fallbacks, `App.css`, `swalHelper.js` confirm color, `ThemeContext.jsx` meta theme-color) with the appropriate token or hex. `grep -rn "0C2D48\|D82618\|E0301E\|B71F12\|1A5276\|081F33" src/ public/` to find them all.
6. **Install GSAP**: `npm install gsap @gsap/react`.
7. **Animation foundation** — create `src/animations/`:
   - `gsapSetup.js`: registers `ScrollTrigger` (and `useGSAP` from `@gsap/react`), exports a shared `EASE = 'power3.out'` and duration tokens, and a `prefersReducedMotion()` helper. All helpers must no-op (set elements to their final state instantly) when reduced motion is on.
   - `useReveal.js`: hook — fade-up reveal for a section (`y: 40 → 0`, opacity, once, `start: 'top 80%'`).
   - `useStaggerReveal.js`: hook — staggered children reveal (cards/grid items, `stagger: 0.08`).
   - `useCountUp.js`: hook — GSAP number counter driven by ScrollTrigger (will replace AnimatedCounter usage in prompt 09; supports prefix/suffix like `10+`, `100%`).
   - `useParallax.js`: hook — subtle background/image parallax (`yPercent` ±8, scrub).
   - Keep hooks dependency-light and SSR-safe (guard `window`).
8. **Proof of life**: wire `useReveal` into ONE existing section (`AboutSection`) as a smoke test that GSAP + ScrollTrigger work with CRA and lazy-loaded sections (ScrollTrigger must be refreshed when lazy sections mount — handle via `ScrollTrigger.refresh()` in the hook's effect).
9. **`CLAUDE.md`**: add the "Brand Color System" section with the palette above and an "Animations" section documenting `src/animations/` as the mandatory pattern for sections. Add a CHANGELOG entry.

## Guardrails

- Framer Motion stays installed for now (drawers/modals use it; prompt 14 evaluates removal).
- Do not change section content/copy/layout — colors, fonts, and the animation foundation only.
- Keep the SweetAlert z-index rules and `body.drawer-open` scroll-lock CSS in `global.css` intact.

## Verification

- `npm run build` passes.
- `grep -rn "0C2D48\|D82618\|E0301E\|B71F12" src/ public/` → zero hits.
- `grep -rn "Poppins" src/ public/` → zero hits.
- `npm start`: site renders in navy/green, splash loader shows the Nilachal white logo, AboutSection reveals on scroll, and with OS reduced-motion enabled the reveal is instant.

## Delivery & report

Branch (designated or `feature/nilachal-03-design-system`), commit, push, PR to `main`. End with `### Summary of changes`, `### PR`, `### Next` ("Merge, then run `prompts/04-content-data-layer.md`").
