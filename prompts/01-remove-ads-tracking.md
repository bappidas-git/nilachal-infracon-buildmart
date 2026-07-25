# Prompt 01 — Remove ALL Google Ads / Meta Ads / GTM Tracking Code

## Context

This repository currently contains a landing page built for CIT (an engineering college)
that is being converted into a one-page business website for **Nilachal Infracon Private
Limited**. The new website will **NOT** be promoted via Google Ads or Meta Ads, so every
piece of paid-ads tracking code must be removed from both the public website and the
admin panel.

**IMPORTANT — what must NOT be touched in this prompt:**
- SEO code stays: `src/components/common/SEO/SEOHead.jsx`, `src/config/seo.js`,
  `src/utils/seo.js`, `public/sitemap.xml`, `public/robots.txt`, JSON-LD schemas.
- The server-side lead store stays: `public/api/leads.php`, `public/api/config.example.php`,
  `src/utils/webhookSubmit.js` (only strip its tracking-related fields, see below).
- Do not rename or rebrand anything yet — later prompts handle that.

## Tasks

1. **Delete these tracking utility files** and remove every import/usage of them:
   - `src/utils/gtm.js`
   - `src/utils/consentMode.js`
   - `src/utils/metaPixel.js`
   - `src/utils/metaCAPI.js`
   - `src/utils/googleAds.js`
   - `src/utils/enhancedConversions.js`
   - `src/utils/gclidManager.js`
   - `src/utils/eventDedup.js`
   - `src/hooks/useGTMTracking.js`
   - `src/components/common/EngagementTracker/` (entire folder)
   - `src/admin/utils/googleAdsExport.js`

2. **Delete the server-side ads endpoints:**
   - `public/api/meta-capi.php`
   - `public/api/google-offline-conversions.php`
   - Remove any references to them from `public/api/config.example.php` (keep the
     `ADMIN_API_KEY` part — the leads store needs it).

3. **Clean `src/App.jsx`:** remove imports and calls for `initGTM`, `initConsentMode`,
   `initPixel`, `trackMetaPageView`, `captureGclid`, `initGoogleAds`,
   `setupEnhancedConversions`, `useGTMTracking`, and the `<EngagementTracker />` render.
   The app must still compile and run identically otherwise.

4. **Clean `src/utils/webhookSubmit.js`:** remove the gclid import and the `gclid` field
   from the enriched payload. Keep UTM params capture (harmless and useful for SEO/referral
   attribution), keep everything else about the submission flow EXACTLY as it is —
   the server-side lead store is the single source of truth and must keep working.

5. **Clean the form/lead components:** search `src/components/common/LeadForm/`,
   `UnifiedLeadForm/`, `LeadFormDrawer/`, `src/pages/ThankYou/` and remove every call to
   GTM/dataLayer pushes, Meta Pixel events (`fbq`), Google Ads conversions (`gtag`),
   and CAPI helpers. Form validation, submission, success/error UX must be untouched.

6. **Clean `public/index.html`:** remove the GTM script/noscript snippets and any
   pixel/gtag snippets. Keep everything SEO-related (meta tags, preconnects, fonts,
   initial loader).

7. **Clean the admin panel:** remove Google Ads export button/actions and any
   conversion-tracking UI from `src/admin/pages/LeadManagement.jsx`,
   `src/admin/pages/LeadDetail.jsx`, and `src/admin/pages/Dashboard.jsx`.
   Lead CRUD, status management, notes, and activity log must keep working.

8. **Clean `.env` and `.env.example`:** remove all `REACT_APP_GTM_ID`,
   `REACT_APP_GA4_MEASUREMENT_ID`, `REACT_APP_GOOGLE_ADS_*`, `REACT_APP_META_*`,
   `REACT_APP_FB_PIXEL_ID`, `REACT_APP_ENABLE_CONSENT_MODE` variables.

9. **Delete `GTM_GUIDE.md`** from the repo root.

10. **Verify:** run `npm install` (if needed) and `npm run build` — the build must pass
    with zero references to `gtm`, `dataLayer`, `fbq`, `gtag`, `pixel`, `capi`, `gclid`
    remaining in `src/` (verify with grep). The lead submission flow must be intact.

## Acceptance criteria

- `npm run build` succeeds.
- `grep -ri "gtm\|fbq\|gtag\|dataLayer\|pixel\|gclid\|capi" src/` returns no functional code hits.
- Public form still submits to `/api/leads.php` and admin panel still lists leads.
- SEO components, sitemap, robots.txt untouched.

## Delivery

Commit with a clear message, push the branch, and open a Pull Request. Finish your reply
with: (a) a concise summary of everything removed/changed, and (b) the PR link.
