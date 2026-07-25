# Prompt 03 — Rebrand Foundation: Names, Identity, Design Tokens

## Context

Prompts 01–02 (already merged) stripped ads tracking and unused modules. This prompt
performs the full identity switch from CIT to **Nilachal Infracon Private Limited** at
the foundation level: package metadata, environment config, brand constants, logos,
favicons, color system, typography, and project docs. Section redesigns come later —
here we make the codebase *belong* to Nilachal.

## Brand facts (use everywhere)

- **Company:** Nilachal Infracon Private Limited
- **Flagship brand:** North East Buildmart (A Brand of Nilachal Infracon Pvt. Ltd.)
- **Tagline:** "Building Tomorrow, Together."
- **Secondary line:** "Built on Trust. Growing the Northeast."
- **Business:** Infrastructure & building materials company — premium construction
  products and professional construction services across Northeast India.
- **Registered office:** Lawkhowa Road, Near Aditya Multispeciality Hospital, Nagaon,
  Assam – 782003
- **Phone:** +91 86385 43526 · **Email:** info@nilachalinfracon.com
- **CIN:** U46630AS2026PTC030754
- **Logo (light backgrounds):** `https://res.cloudinary.com/dn9gyaiik/image/upload/v1784965863/nilachal-logo_v2lolq.png`
- **Logo (dark backgrounds):** `https://res.cloudinary.com/dn9gyaiik/image/upload/v1784965863/nilachal-logo-white_hus13s.png`

## Design direction (applies to the whole series)

Apple-like minimalism: near-white backgrounds, one deep navy primary drawn from the
logo, one green accent, huge clean typography, generous whitespace, hairline dividers,
soft large-radius cards, no gradients-everywhere noise. Define this system once, here.

## Tasks

1. **`package.json`:** rename package to `nilachal-infracon-website`, rewrite
   `description`, `author` (Assam Digital), and `keywords` (building materials,
   construction, Northeast India, Nagaon, Assam, North East Buildmart, infrastructure).

2. **Environment files:** rewrite `.env` and `.env.example` for Nilachal — app name,
   project name, contact phone/WhatsApp/email, office address, admin credentials
   placeholder (`REACT_APP_ADMIN_USERNAME` / `REACT_APP_ADMIN_PASSWORD`), and keep ONLY
   variables that are actually consumed by the remaining code (leads API URL + admin
   key, contact info, social links, hero media if used). Remove everything stale.

3. **Brand constants module:** create `src/config/brand.js` exporting company name,
   flagship brand, taglines, logo URLs (both variants), contact details, address, CIN,
   and social links — sourced from env where appropriate. Refactor `Header`, `Footer`,
   `MobileDrawer`, and admin components to consume it instead of hardcoded CIT text.

4. **Design tokens:** rewrite `src/styles/variables.css` and `src/theme/muiTheme.js`
   with the Nilachal palette derived from the logo:
   - Primary (Deep Navy): `#16324F`
   - Primary Dark: `#0E2238`
   - Accent (NE Green): `#3E7C3A`
   - Accent Light tint for section backgrounds: `#F0F5F1`
   - River Blue (sparing accents/links): `#1F7AC1`
   - Neutrals: `#FFFFFF`, `#F5F7FA`, text `#101828`, muted text `#5A6B7B`
   Include an elegant type scale (system font stack or Inter via self-host/preload),
   spacing scale, radius scale, and shadow scale as CSS variables. Update
   `src/styles/global.css` accordingly. Remove CIT-era color values everywhere
   (`#2D3561`, `#2EC4B6`, `#FF6B35`, `#0C2D48`, etc. — grep and replace with tokens).

5. **Static assets:** update `public/index.html` (title, meta description placeholder,
   theme-color `#16324F`, favicon links), `public/manifest.json` (name, short_name,
   colors, icons), and replace `public/favicon.ico`, `public/favicon.png`,
   `public/apple-touch-icon.png` with versions generated from the Nilachal logo
   (download the Cloudinary logo and produce correctly sized PNG/ICO files:
   favicon 32/48px, apple-touch-icon 180px).

6. **File/folder renames:** rename `src/components/sections/WhyChooseCIT/` →
   `src/components/sections/WhyChooseUs/` (component `WhyChooseUs`), and fix all
   imports. Rename anything else CIT-named revealed by
   `grep -ri "cit\|channabasaveshwara\|tumakuru\|admission\|vtu\|b\.e\." src public`.
   Placeholder copy inside components may remain generic ("Section content coming in a
   later prompt") but must contain zero CIT references.

7. **Rewrite `README.md`** for the Nilachal project (what it is, stack, setup, env
   vars, deploy notes, admin panel usage).

8. **Rewrite `CLAUDE.md`** to describe the Nilachal Infracon project: overview,
   structure, lead storage & sync architecture (unchanged server-store pattern), brand
   color system, customization guide, and remove the CIT/tele-calling/ads content.

9. **Verify:** `npm run build` passes;
   `grep -ri "cit\|channabasaveshwara\|tumakuru\|admission" src public *.md *.json`
   returns zero matches (excluding node_modules, package-lock.json, and legitimate
   words that merely contain the substring "cit" such as "city"/"capacity" — review hits
   manually).

## Acceptance criteria

- Site and admin build & run, fully de-branded from CIT, tokens in place.
- Both Nilachal logos wired into Header/Footer/admin login (swap per background).
- Favicons/manifest show Nilachal branding.
- `README.md` and `CLAUDE.md` describe the new project accurately.

## Delivery

Commit with a clear message, push the branch, and open a Pull Request. Finish your reply
with: (a) a concise summary of the rebrand, and (b) the PR link.
