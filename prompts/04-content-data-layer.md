# Prompt 04 — Nilachal Content & Data Layer

> Read `prompts/README.md` first. Prompts 01–03 are merged (identity, tracking removal, design system).

## Context

Contact details and copy are currently duplicated across ~10 CIT components, and the `src/data/` files hold B.E.-course content. This prompt creates **one centralized content layer** that every rebuilt section (prompts 05–11) will consume, so the site content lives in data files, not scattered in JSX.

## Read first

- `src/data/servicesData.js`, `featuresData.js`, `statsData.js`, `locationData.js`, `serviceDetailsData.js` (current shapes and consumers)
- `src/components/sections/ServicesSection/ServicesSection.jsx` (binds to every servicesData field + injects a JSON-LD schema from it)
- `src/components/sections/StatsSection/StatsSection.jsx` (parses `stat` strings — they must start with a number)

## Tasks

### 1. Create `src/data/siteConfig.js` — the single source of business truth

```js
export const siteConfig = {
  legalName: 'Nilachal Infracon Private Limited',
  brandName: 'Nilachal Infracon',
  flagshipBrand: 'North East Buildmart',
  tagline: 'Building Tomorrow, Together.',
  cin: 'U46630AS2026PTC030754',
  phone: '+918638543526',
  phoneDisplay: '+91 86385 43526',
  whatsapp: '+918638543526',
  whatsappMessage: 'Hello Nilachal Infracon, I would like to enquire about your products/services.',
  email: 'info@nilachalinfracon.com',
  address: { line1: 'Lawkhowa Road', line2: 'Near Aditya Multispeciality Hospital', city: 'Nagaon', state: 'Assam', pincode: '782003' },
  siteUrl: 'https://www.nilachalinfracon.com',
  logo: 'https://res.cloudinary.com/dn9gyaiik/image/upload/v1784965863/nilachal-logo_v2lolq.png',
  logoWhite: 'https://res.cloudinary.com/dn9gyaiik/image/upload/v1784965863/nilachal-logo-white_hus13s.png',
  mapsQuery: 'Nilachal Infracon Private Limited, Lawkhowa Road, Nagaon, Assam 782003',
  social: {},   // fill when the client provides profiles; components must hide empty entries
}
```
Add derived helpers: `telHref`, `waHref` (wa.me link with encoded message), `mailHref`, `fullAddress`.

### 2. Rewrite the data files (keep file names & shapes the consumers bind to)

- **`src/data/productsData.js`** (new) — the 10 North East Buildmart categories, each `{ id, name, icon, blurb }` with `mdi:*` icons: Steel Doors (`mdi:door`), UPVC Doors, WPC Doors & Frames, Tiles (`mdi:view-grid-outline`), Sanitaryware (`mdi:toilet`), Bath Fittings (`mdi:shower-head`), Cement (`mdi:cube-outline`), TMT Bars (`mdi:chart-timeline-variant` or better), Hardware (`mdi:hammer-wrench`), Construction Materials (`mdi:wall`). One-line blurbs, professional tone.
- **`src/data/servicesData.js`** — replace the 7 B.E. courses with the 5 services (keep the object shape: `id, name, shortName, target, duration→scope, description, features[4], badge, icon`): Residential Projects, Commercial Buildings, Institutional Projects, Renovation & Maintenance, Project Management. Write real, specific copy (e.g. Residential: "Independent homes, apartments and housing developments — from foundation to finish."). Badges: mark Residential "Most Popular" only; others null.
- **`src/data/statsData.js`** — 5 stats (strings MUST start with a number for counter parsing): `10+` Years of Experience, `5000+` Products & Solutions, `5000+` Happy Customers, `7+` States Served in Northeast India, `100%` Quality Assurance. Keep `{id, icon, title, description, stat, statLabel}` shape.
- **`src/data/brandsData.js`** (new) — the 12 partner brands as `{ id, name, logoFile }`: SAIL, UltraTech Cement, Dalmia Cement, Galaxy Cement, Simpolo, Solorex, Jaquar, BELZ Vanity, Oyster Bath Tubs, Corsa, Petra Steel Doors, APL Apollo. `logoFile` points to `/images/brands/<slug>.png`; the Brands section (prompt 09) renders a styled text wordmark when the file is missing, so no placeholder images are needed. Create the empty `public/images/brands/` directory with a `README.md` listing the expected filenames + recommended size (transparent PNG, ~360×140).
- **`src/data/featuresData.js`** — replace with the 5 why-choose-us points: Genuine Products ("100% authentic and original"), Competitive Pricing ("Best prices for best quality"), Fast & Safe Delivery ("Timely delivery across Northeast"), Expert Support ("Professional guidance at every step"), Strong Network ("Wide supply network across the region"). Shape: flat array `{id, icon, title, description}` (the old 3-category-tab shape dies with FeaturesSection in prompt 09 — note this breaking change; the build must still pass, so if FeaturesSection still consumes the old shape, keep a temporary `featuresCategories` export mirroring the old structure and mark it `// TODO remove in prompt 09`).
- **`src/data/aboutData.js`** (new) — welcome paragraph (from the approved copy: "Nilachal Infracon Private Limited is one of Northeast India's emerging infrastructure and building materials companies. Through our flagship brand North East Buildmart, we deliver premium construction materials, quality building products, and dependable project solutions for residential, commercial, and institutional developments.") plus the four pillars `{ id, icon, title, text }`: Mission ("To provide quality products and services that create lasting value for our customers and partners."), Vision ("To be the most trusted and preferred infrastructure and building materials company in Northeast India."), Values ("Integrity, Quality, Commitment, Innovation and Customer Satisfaction."), Commitment ("Delivering excellence in every project and building long-term relationships.").
- **`src/data/faqData.js`** (new) — 7 real FAQs with genuinely useful answers (they feed both the FAQ section and FAQPage schema): what Nilachal Infracon does; what North East Buildmart sells; delivery coverage across NE states; whether products are genuine/branded; do they handle end-to-end construction projects; how to request a quote; where the store/office is located.
- **`src/data/locationData.js`** — Nilachal office: name, full Nagaon address, phone/WhatsApp from siteConfig (import it), `mapsQuery`, `servingStates`: Assam, Arunachal Pradesh, Meghalaya, Manipur, Mizoram, Nagaland, Tripura, Sikkim. Remove `warehouses`, CIT map image, `nearbyAreas` CIT content.
- **Delete `src/data/serviceDetailsData.js`** — verified dead (no imports).

### 3. Compatibility check

`ServicesSection`, `StatsSection`, `FeaturesSection`, `LocationSection`, `ContactSection` still render the old UI until prompts 08–11. Adjust their bindings **minimally** so the build passes and pages render with the new data (labels may look odd — acceptable interim state). Do not redesign them here.

### 4. Docs

Update `CLAUDE.md` project structure (new data files, siteConfig pattern: "all contact/company facts come from `src/data/siteConfig.js` — never hardcode them in components"). CHANGELOG entry.

## Verification

- `npm run build` passes; `npm start` renders every section without runtime errors.
- `grep -rn "servicesData\|featuresData\|statsData\|locationData" src/ | grep import` — all consumers resolve.
- `grep -rn "serviceDetailsData" src/` → zero hits.

## Delivery & report

Branch (designated or `feature/nilachal-04-content-data`), commit, push, PR to `main`. End with `### Summary of changes`, `### PR`, `### Next` ("Merge, then run `prompts/05-header-footer-navigation.md`").
