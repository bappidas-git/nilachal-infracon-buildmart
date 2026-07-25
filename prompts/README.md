# Nilachal Infracon — Rebuild Prompt Series

This folder contains the complete, ordered prompt series to transform the existing CIT
(Channabasaveshwara Institute of Technology) landing-page codebase into the new
**Nilachal Infracon Private Limited** one-page business website + admin panel.

## How to use

1. Execute the prompts **strictly in order** (01 → 14), one prompt per Claude Code session.
2. Paste the full content of a single prompt file into Claude Code and let it finish.
3. After each prompt, Claude Code will commit, push, open a Pull Request, and give you a
   summary of what was done along with the PR link.
4. **Review and merge each PR before running the next prompt** — every prompt assumes the
   previous ones are already merged into the default branch.

## Prompt index

| # | File | What it does |
|---|------|--------------|
| 01 | `01-remove-ads-tracking.md` | Strip all Google Ads / Meta Ads / GTM / pixel / CAPI code from site + admin (SEO stays) |
| 02 | `02-remove-unused-modules.md` | Remove Tele-Calling module, ads guideline pages, and other unused files/docs |
| 03 | `03-rebrand-foundation.md` | Full rebrand: names, package.json, .env, logos, favicons, brand color system, typography, CLAUDE.md |
| 04 | `04-gsap-animation-setup.md` | Install GSAP + ScrollTrigger and build the shared animation infrastructure |
| 05 | `05-header-footer.md` | Minimal Apple-style header, mobile navigation, and footer |
| 06 | `06-hero-section.md` | Hero section with GSAP entrance animations |
| 07 | `07-about-section.md` | About / Welcome section with Mission, Vision, Values, Commitment |
| 08 | `08-buildmart-products-section.md` | North East Buildmart flagship-brand + products showcase section |
| 09 | `09-services-stats-section.md` | Construction & Infrastructure Services section + animated stats band |
| 10 | `10-brands-why-us-section.md` | Trusted Brands logo showcase + Why Choose Us section |
| 11 | `11-contact-enquiry-form.md` | Contact section + minimalist Enquiry Form wired to the server-side lead store |
| 12 | `12-admin-panel-redesign.md` | Rebrand + redesign admin panel (Login, Dashboard, Lead Management) for Nilachal leads |
| 13 | `13-seo-overhaul.md` | Complete SEO setup: meta, JSON-LD schemas, sitemap, robots, manifest, performance |
| 14 | `14-final-qa-polish.md` | Responsive/accessibility QA, build verification, and final zero-CIT-traces sweep |

## Non-negotiable rules baked into every prompt

- **Lead storage architecture is preserved**: leads POST to the server store
  (`public/api/leads.php`), the admin panel reads only from the server (15s polling),
  and there is **no localStorage copy of leads** — cross-device sync must keep working.
- **SEO stays and gets better** — only paid-ads tracking is removed, never SEO.
- **No traces of CIT** may remain by the end of the series (prompt 14 verifies this).
- Brand assets:
  - Logo (light backgrounds): `https://res.cloudinary.com/dn9gyaiik/image/upload/v1784965863/nilachal-logo_v2lolq.png`
  - Logo (dark backgrounds): `https://res.cloudinary.com/dn9gyaiik/image/upload/v1784965863/nilachal-logo-white_hus13s.png`
- Design north star: **Apple-like** — minimalist, clean, generous whitespace, large
  confident typography, restrained color, subtle premium GSAP motion, flawless on
  mobile, tablet, and desktop.
