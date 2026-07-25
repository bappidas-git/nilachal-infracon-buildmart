# Prompt 02 — Remove ALL Google Ads / Meta Ads / GTM / Conversion-Tracking Code

> Read `prompts/README.md` first. Prompt 01 (project identity) is already merged.

## Context

The Nilachal Infracon site will **not** be promoted via Google or Meta ads. Every trace of ad/analytics tracking must be removed from the website, the admin panel, the PHP layer, env files, and docs. **SEO code is NOT tracking — keep the entire SEO system** (`SEOHead`, `src/config/seo.js`, `src/utils/seo.js`, JSON-LD in `index.html`) untouched; prompt 12 rebuilds it.

**Danger**: 14 JS files import the tracking modules. Deleting a tracking util without editing all of its importers in the same change is a hard CRA compile failure. Follow the removal map below exactly, then build.

## Decisions already made (do not re-litigate)

- **Remove `gclid`** capture end-to-end (it exists only for Google Ads attribution).
- **Keep `utm_*` capture** in `webhookSubmit.js` and the UTM columns in the admin CSV export — UTM params are generic link attribution (WhatsApp/social/print QR links), not ad-platform code. Keep the `source` field too.
- **Remove the admin "Record Conversion" feature entirely** (it exists to fire Meta CAPI Purchase events). The status dropdown (which includes the "converted" state `completed`) is the business workflow that remains.
- The "Conversion Rate" stat tiles in Dashboard/LeadManagement are **business funnel metrics**, not tracking — keep them (prompt 13 fixes their logic and labels).

## Removal map

### A. Delete these files/directories outright
- `src/utils/gtm.js`, `src/utils/metaPixel.js`, `src/utils/metaCAPI.js`, `src/utils/googleAds.js`, `src/utils/gclidManager.js`, `src/utils/consentMode.js`, `src/utils/enhancedConversions.js`, `src/utils/eventDedup.js`
- `src/hooks/useGTMTracking.js`
- `src/components/common/EngagementTracker/` (whole directory)
- `src/admin/utils/googleAdsExport.js`
- `public/api/meta-capi.php`, `public/api/google-offline-conversions.php`
- `src/admin/pages/guidelineContent/GoogleAdsGuide.jsx`, `MetaAdsGuide.jsx`, `GTMSetupGuide.jsx`, `ConversionTrackingGuide.jsx`
- `GTM_GUIDE.md`

### B. Edit every importer (exact locations from the audit)
1. **`src/App.jsx`** — remove imports of EngagementTracker (line ~27), useGTMTracking (~29), initGTM (~30), initConsentMode (~31), initPixel/trackMetaPageView (~32), captureGclid (~33), initGoogleAds (~34), setupEnhancedConversions (~35); the `useGTMTracking()` call (~379); the `trackMetaPageView` route effect (~381-384); the whole tracking-init `useEffect` (~538-553, including the `REACT_APP_GTM_ID` read); the `<EngagementTracker />` mount (~645-646).
2. **`src/components/common/UnifiedLeadForm/UnifiedLeadForm.jsx`** — remove tracking imports (lines ~31-36) and the entire post-success tracking block (~688-724). Nothing in that block is awaited, so the submit flow (duplicate handling → SweetAlert → sessionStorage flags → drawer close → `/thank-you` navigation) is unaffected. Verify that flow still works.
3. **`src/utils/webhookSubmit.js`** — remove the `getStoredGclid` import (~line 15) and the `gclid` field from the payload (~line 76). Keep the `utm_*` capture lines (~71-75).
4. **`src/context/ModalContext.jsx`** — remove `trackCTAClick` import (~7) and its call in `openLeadDrawer` (~168).
5. **`src/components/common/Header/Header.jsx`** — remove tracking imports (~10-14) and calls at ~131, ~222, ~248, ~277, ~342.
6. **`src/components/common/MobileNavigation/MobileNavigation.jsx`** — remove import (~10) and calls at ~91, ~95, ~102.
7. **`src/components/common/MobileDrawer/MobileDrawer.jsx`** — remove import (~21) and calls at ~283, ~295.
8. **Sections** — remove `trackCTAClick` import + calls in: `HeroSection.jsx` (~20; ~241-245, ~276), `CTASection.jsx` (~13; ~61, ~66), `StatsSection.jsx` (~12; ~118), `SecondaryCTASection.jsx` (~12; ~130, ~151, ~168), `WhyChooseCIT.jsx` (~14; ~89, ~94).
9. **`src/pages/ThankYou/ThankYou.jsx`** — remove the raw `window.dataLayer` pushes (~76-86). It has no tracking imports; the sessionStorage gate and confetti stay.
10. **`src/admin/pages/LeadDetail.jsx`** — remove: `updateLeadConversion` import (~30), `sendConversionEvent` import (~40), `generateEventId` import (~41), conversion state (~127-130), `handleSendConversion` (~237-295), the Record-Conversion modal JSX (~674-746), the "Conversion Tracking" status card (~561-600), and the GCLID parts of the UTM/attribution card (~444-475 — keep a simplified "Source" card showing `source`, `page_url`, and remaining `utm_*` values).
11. **`src/admin/pages/LeadManagement.jsx`** — remove `exportGoogleAdsCSV` import (~57), `handleGoogleAdsExport` (~357-373), the desktop "Export for Google Ads" button (~487-499), and the mobile menu item (~549-557). The regular CSV export stays (drop only its GCLID column; keep UTM columns).
12. **`src/admin/utils/leadService.js`** — remove `updateLeadConversion` (~370-402) and the GCLID column from `exportLeadsCSV` (~443-448 header, ~471-476 rows). Keep UTM columns.
13. **`src/admin/pages/Guideline.jsx`** — remove the four deleted guide imports (~12-15), their TABS entries (~25-32), and render branches (~181-184); renumber remaining tabs (Lead Storage, SEO Setup, Deployment, For Developers).
14. **`src/admin/pages/guidelineContent/DeveloperGuide.jsx`** — surgical edits: tracking references at ~85-86, ~103, ~107, ~112, ~213, ~319-323, and the env-var table rows for GTM/GA4/Google Ads/Meta vars (~429-474).
15. **`src/admin/pages/guidelineContent/DeploymentGuide.jsx`** — remove the GTM/Pixel verification rows (~388-394).
16. **`src/admin/pages/LeadDetail.module.css`** — remove the "Conversion Tracking Card" block (from ~line 358: `trackingGrid`/`trackingRow`/`trackingChip*`) and now-unused `utmGrid` classes if you removed their markup.

### C. HTML, PHP, env, legal, docs
17. **`public/index.html`** — remove the hardcoded GTM container `GTM-T3TL3ZNK`: head snippet (lines ~4-17) and body `<noscript>` iframe (~651-660). Touch nothing else in this file.
18. **`public/api/config.example.php`** — strip the Meta CAPI constants block (META_PIXEL_ID, META_ACCESS_TOKEN, META_API_VERSION, META_TEST_EVENT_CODE); **keep `ADMIN_API_KEY`** (it authenticates the lead store — deleting it breaks the admin panel).
19. **`.env` and `.env.example`** — delete all tracking vars: `REACT_APP_GTM_ID`, `REACT_APP_GA4_MEASUREMENT_ID`, `REACT_APP_GOOGLE_ADS_ID`, `REACT_APP_GOOGLE_ADS_CONVERSION_LABEL`, `REACT_APP_GOOGLE_ADS_CONVERSION_VALUE`, `REACT_APP_GOOGLE_ADS_ENHANCED_CONVERSIONS`, `REACT_APP_META_PIXEL_ID`, `REACT_APP_FB_PIXEL_ID`, `REACT_APP_META_CAPI_ENDPOINT`, `REACT_APP_META_TEST_EVENT_CODE`, `REACT_APP_ENABLE_CONSENT_MODE`, `REACT_APP_ENABLE_ANALYTICS`.
20. **Privacy/legal text** — `src/components/common/Footer/Footer.jsx` (~51-55, ~87-89, ~93-101) and the privacy modal inside `UnifiedLeadForm.jsx` explicitly promise GTM/Meta Pixel/CAPI/Google Ads data collection. Remove those tracking disclosures now (minimal edit — say data is used only to respond to the enquiry). The full Nilachal privacy policy rewrite happens in prompt 05.
21. **Docs** — remove tracking references from `README.md`, `CUSTOMIZATION_GUIDE.md`, `CLAUDE.md` (feature lists, env tables, GTM_GUIDE links). Add a CHANGELOG entry.

## Verification

- `npm run build` passes (this catches any missed importer).
- `grep -rniE "gtag|dataLayer|fbq|pixel|capi|gclid|googletagmanager|consent.?mode|enhanced.?conversion|GTM-" src/ public/ --include="*.js" --include="*.jsx" --include="*.php" --include="*.html"` → zero hits (the form's contact-consent copy and CSS `consentText` class are allowed if they no longer mention tracking platforms).
- `npm start`: submit a test lead (with a local PHP server if available: `php -S 127.0.0.1:8080 -t public` and `REACT_APP_LEADS_API_URL=http://127.0.0.1:8080/api/leads.php`) — the success flow (alert → thank-you page) must still work; if PHP isn't available, verify the submit path by code review and note it in the PR.

## Delivery & report

Branch (designated or `feature/nilachal-02-remove-tracking`), commit, push, PR to `main`. End with `### Summary of changes`, `### PR` (link), `### Next` ("Merge, then run `prompts/03-design-system-and-gsap.md`").
