# Prompt 05 — Header, Footer & Mobile Navigation

> Read `prompts/README.md` first. Prompts 01–04 are merged (identity, tracking removal, design system, data layer).

## Context

Header, Footer, MobileDrawer and MobileNavigation still carry CIT branding, the CIT phone (+91 8069645014), CIT WhatsApp prefill messages, admissions nav labels, and a CIT/Assam-Digital privacy policy. This prompt rebuilds all four for Nilachal with a minimal, Apple-like feel. All contact facts must come from `src/data/siteConfig.js` — no hardcoded phones/emails/addresses.

## Read first

- `src/components/common/Header/Header.jsx` + module.css (scroll-spy, 80px offset logic, `.scrolled` class)
- `src/components/common/Footer/Footer.jsx` + module.css (contains the inline privacy-policy modal)
- `src/components/common/MobileDrawer/MobileDrawer.jsx`, `src/components/common/MobileNavigation/MobileNavigation.jsx`
- `src/context/ModalContext.jsx` (DRAWER_TITLES — this prompt rewrites it)
- `src/data/siteConfig.js`

## Target navigation (one-pager anchors)

`About` → `#about` · `Products` → `#products` · `Services` → `#services` · `Brands` → `#brands` · `Why Us` → `#why-us` · `Contact` → `#contact`. Logo click → `#home`. Primary CTA everywhere: **"Request a Quote"** → `openLeadDrawer('request-quote')`.

Note: `#products`, `#brands`, `#why-us`, `#faq` don't exist in the DOM until prompts 08–09. The existing hash-scroll retry logic tolerates missing targets; nav items may temporarily dead-end — acceptable interim state, note it in the PR.

## Tasks

1. **`src/context/ModalContext.jsx` — DRAWER_TITLES rewrite.** New keys with Nilachal copy:
   - `request-quote`: "Request a Quote" / "Tell us what you need and our team will get back within 24 hours."
   - `product-enquiry`: "Product Enquiry" / "Ask about availability, brands and pricing."
   - `service-enquiry`: "Service Enquiry" / "Discuss your construction or renovation project with us."
   - `callback`: "Request a Callback" / "Share your details and we'll call you back."
   - `default`: "Send an Enquiry" / "We usually respond within 24 hours."
   - **Keep the old CIT keys** (`apply-now`, `get-details`, `request-callback`, etc.) as aliases pointing to the new copy for now — sections rebuilt in later prompts still call them; prompt 11 prunes the aliases. Do not change the drawer open/close/scroll-lock mechanics.
2. **Header** — minimal rebuild:
   - Nilachal color logo (from siteConfig) at comfortable size (~44px height); remove the CIT accreditation strip under the logo.
   - Transparent-over-hero → solid white with subtle border/blur on scroll (keep the existing `.scrolled` mechanism; restyle with tokens). Keep scroll-spy and the 80px offset logic exactly as-is.
   - Desktop: the 6 nav anchors, phone number as a quiet text link (from siteConfig), and the green "Request a Quote" button.
   - Mobile (<1024px): logo + hamburger (existing inline menu mechanics stay; restyle minimal).
   - Subtle GSAP entrance on first paint (logo + nav fade-down once; respect reduced motion).
3. **Footer** — clean 4-column layout on `--color-primary-dark`:
   - Col 1: **white** logo, legal name, tagline, one-line about; "North East Buildmart — A Brand of Nilachal Infracon Pvt. Ltd."
   - Col 2: Quick Links (the 6 anchors).
   - Col 3: Contact — full address, phone (tel:), email (mailto:), WhatsApp chip (wa.me from siteConfig).
   - Col 4: "Registered Office" + CIN `U46630AS2026PTC030754`.
   - Bottom bar: `© 2026 Nilachal Infracon Private Limited. All Rights Reserved.` · Privacy Policy link · "Developed by Assam Digital" credit (keep, links to assamdigital.com).
   - **Privacy policy modal**: rewrite the inline legal text for Nilachal Infracon — data collected (name, phone, email, enquiry details), used only to respond to enquiries, stored on the site's own server, never sold, no ad-platform tracking, contact email for removal requests. Keep the existing modal mechanics.
4. **MobileDrawer** (bottom sheet menu) — Nilachal logo, the 6 nav items + Home, contact footer buttons (Call / WhatsApp with siteConfig message), CTA button "Request a Quote". Keep SwipeableDrawer mechanics, scroll-lock, Escape handling, 80px scroll offset.
5. **MobileNavigation** (bottom bar) — 4 actions: Call, WhatsApp, **Enquire** (primary, green, opens `request-quote` drawer; icon `mdi:file-document-edit-outline` or similar — not the school icon), Menu. Keep show/hide-on-scroll mechanics.
6. **LeadFormDrawer defaults** (`src/components/common/LeadFormDrawer/LeadFormDrawer.jsx`): header icon → `mdi:office-building-outline`, default title/subtitle → the `request-quote` copy. (Form fields themselves are prompt 10.)
7. Sweep the four components for any remaining CIT strings/comments ("Assam Digital campaign" comments can go), and update `CLAUDE.md` branding pointers + CHANGELOG.

## Guardrails

- Do not modify: drawer/modal open-close mechanics, body scroll-lock implementations, scroll-spy/offset logic, MUI breakpoint behavior (bottom nav < 768px, hamburger < 1024px).
- Old sections (Hero etc.) still reference old drawer keys — they must keep compiling via the alias mapping.

## Verification

- `npm run build` passes.
- `grep -rn "8069645014\|cittumkur\|logo-cit\|CIT" src/components/common/Header src/components/common/Footer src/components/common/MobileDrawer src/components/common/MobileNavigation src/context/ModalContext.jsx` → zero hits.
- `npm start`: header/footer/mobile nav show Nilachal branding on desktop + a phone-width viewport; "Request a Quote" opens the drawer with the new title; privacy modal shows the new policy; About/Contact anchors scroll correctly.

## Delivery & report

Branch (designated or `feature/nilachal-05-header-footer-nav`), commit, push, PR to `main`. End with `### Summary of changes`, `### PR`, `### Next` ("Merge, then run `prompts/06-hero-section.md`").
