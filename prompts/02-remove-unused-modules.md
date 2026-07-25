# Prompt 02 — Remove Tele-Calling Module & All Other Unused Files

## Context

Continuing the conversion of this codebase into the **Nilachal Infracon Private Limited**
one-page business website. Prompt 01 (already merged) removed all Google/Meta ads
tracking. This prompt removes entire modules and files that the new website does not
need. The final product is: a single-page business information website + an admin panel
containing only **Login, Dashboard, and Lead Management**.

## Tasks

1. **Remove the Tele-Calling module completely:**
   - `src/admin/pages/TeleCalling.jsx`
   - `src/admin/pages/TeleCallDetail.jsx`
   - `src/admin/components/TelecallFormDialog.jsx`
   - `src/admin/utils/telecallService.js`
   - `src/admin/utils/telecallStatus.js`
   - `public/api/telecalls.php`
   - Remove its routes from `src/admin/components/AdminLayout.jsx`, its nav entry from
     `src/admin/components/AdminTopbar.jsx`, its sync call (`syncTelecallsFromServer`)
     from AdminLayout, any tele-calling references in `src/utils/webhookSubmit.js`
     (the `TELECALLS_API_URL` constant and related helpers), and
     `REACT_APP_TELECALLS_API_URL` from `.env` / `.env.example`.

2. **Remove the admin Guideline module** (it documents CIT-era ads/GTM workflows that no
   longer exist):
   - `src/admin/pages/Guideline.jsx`, `src/admin/pages/Guideline.module.css`
   - the entire `src/admin/pages/guidelineContent/` folder (ConversionTrackingGuide,
     DeploymentGuide, DeveloperGuide, GTMSetupGuide, GoogleAdsGuide, LeadStorageGuide,
     MetaAdsGuide, SEOSetupGuide)
   - its route in `AdminLayout.jsx` and nav entry in `AdminTopbar.jsx`.

3. **Remove unused hooks/utils:** check usage first and delete if now unused —
   `src/hooks/useLocalStorage.js` (leads must never live in localStorage; keep only if
   it is still used for non-lead things such as admin session), and any other utility
   that has zero imports after prompts 01–02.

4. **Remove CIT-era docs from the root:** delete `CUSTOMIZATION_GUIDE.md`,
   `SEO_GUIDE.md`, and `CHANGELOG.md` (they describe the CIT boilerplate and will be
   misleading). `README.md` and `CLAUDE.md` will be rewritten in Prompt 03 — leave them
   for now.

5. **Remove the `resources/` folder** (mockup reference JPEGs) from the repo — they are
   design references only and must not ship with the codebase.

6. **Prune sections that will not exist on the new one-page site.** The new page will be
   rebuilt in prompts 05–11 with these sections only: Hero, About (with
   Mission/Vision/Values/Commitment), North East Buildmart Products, Construction
   Services + Stats, Trusted Brands, Why Choose Us, Contact + Enquiry Form, Footer.
   Delete section components that clearly have no successor (e.g.
   `LocationSection`, `HighlightsSection`, `SecondaryCTASection` — confirm each has no
   unique logic worth keeping before deleting) and remove their imports/renders and
   idle-preload entries from `src/App.jsx`. Keep `HeroSection`, `AboutSection`,
   `ServicesSection`, `StatsSection`, `FeaturesSection`, `CTASection`, `ContactSection`,
   `WhyChooseCIT` (renamed later) as shells to be redesigned in later prompts.

7. **Clean data files:** delete `src/data/locationData.js` and
   `src/data/serviceDetailsData.js` if their consumers were removed. Keep
   `servicesData.js`, `featuresData.js`, `statsData.js` as placeholders for
   Nilachal content (rewritten later).

8. **Verify:** `npm run build` passes; the site renders with the remaining sections;
   admin panel works with only Dashboard, Lead Management (+ Lead Detail) and Login;
   no dead imports or unused-variable warnings introduced.

## Acceptance criteria

- Tele-calling, Guideline, and all listed files are gone; no dangling imports/routes.
- Admin nav shows only Dashboard and Lead Management.
- `npm run build` succeeds cleanly.
- Lead submission → server store → admin list still works end-to-end.

## Delivery

Commit with a clear message, push the branch, and open a Pull Request. Finish your reply
with: (a) a concise summary of everything removed, and (b) the PR link.
