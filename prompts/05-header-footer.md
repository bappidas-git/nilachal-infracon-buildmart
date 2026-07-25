# Prompt 05 — Minimal Apple-Style Header, Mobile Nav & Footer

## Context

Foundation (01–04) is merged: clean codebase, Nilachal branding tokens, GSAP
infrastructure. Now rebuild the site chrome — Header, mobile navigation, and Footer —
to an Apple-level minimal standard. Use `src/config/brand.js` for all brand
text/logos/contacts; never hardcode.

## Design spec

**Header (desktop):**
- Slim sticky bar (~64–72px), white/near-white with subtle bottom hairline. On scroll
  past the hero it becomes a frosted-glass bar (`backdrop-filter: blur`, slight
  translucency) using the scroll hook from Prompt 04.
- Left: Nilachal logo (light-background variant), height ~40px, links to top.
- Center/right: text nav links — About · Products · Services · Brands · Why Us ·
  Contact — quiet typography (14–15px, medium weight, muted color, primary color on
  hover with a subtle underline slide-in). These are same-page anchor links
  (`/#about`, `/#products`, `/#services`, `/#brands`, `/#why-us`, `/#contact`).
- Far right: a single restrained CTA button "Enquire Now" (primary navy, small radius,
  no gradient) that opens the lead form drawer via the existing ModalContext.

**Header (mobile):**
- Logo left, hamburger right. Hamburger opens the existing MobileDrawer (keep its
  mechanics; restyle contents): dark-navy panel using the WHITE logo variant, large
  touch-friendly nav links, contact shortcuts (call, WhatsApp, email), and an
  "Enquire Now" button. Keep the existing bottom MobileNavigation bar if it exists,
  restyled to the new tokens (or remove it if the drawer covers everything — pick one,
  don't ship both if they feel cluttered; prefer the simpler option).

**Footer:**
- Deep navy (`--primary-dark`) background, WHITE logo variant.
- Four columns on desktop, stacked on mobile:
  1. Company: white logo, "Building Tomorrow, Together.", short one-liner, North East
     Buildmart mention ("A Brand of Nilachal Infracon Pvt. Ltd.").
  2. Registered Office: full address (from brand.js).
  3. Contact: phone, email, WhatsApp link.
  4. Company info: CIN number, quick nav links.
- Social icons row (only if URLs configured in env — hide empty ones).
- Bottom bar: "© {current year} Nilachal Infracon Private Limited. All Rights Reserved."
  with a top hairline in translucent white.

## Tasks

1. Rebuild `src/components/common/Header/` (JSX + module.css) to the spec. Smooth
   GSAP-powered entrance (header fades/slides in once on load) and frosted state
   transition. Active-section highlighting on nav links (IntersectionObserver or
   ScrollTrigger) is a nice-to-have — include it if clean.
2. Restyle `src/components/common/MobileDrawer/` content for Nilachal (keep the
   existing open/close mechanics and accessibility).
3. Decide on and implement the mobile nav approach (drawer-only vs bottom bar) per the
   spec note above.
4. Rebuild `src/components/common/Footer/` to the spec.
5. All logos come from `brand.js` URLs with proper `alt` text, explicit width/height
   to prevent CLS, and `loading="lazy"` for the footer logo only (header logo eager).
6. Responsive: verify at 360px, 390px, 768px, 1024px, 1280px, 1536px. No horizontal
   scroll at any width.
7. `npm run build` passes.

## Acceptance criteria

- Header/footer match the minimal spec, use tokens only (no raw hex in components).
- Anchor navigation scrolls smoothly to placeholder sections.
- "Enquire Now" opens the existing lead drawer.
- Zero CIT remnants in chrome components.

## Delivery

Commit with a clear message, push the branch, and open a Pull Request. Finish your reply
with: (a) a concise summary + screenshots if possible, and (b) the PR link.
