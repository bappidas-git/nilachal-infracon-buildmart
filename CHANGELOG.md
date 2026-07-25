# Changelog

All notable changes to the **Nilachal Infracon Private Limited** website. This
project follows the rebuild prompt series in `prompts/`; entries accumulate under
the single unreleased version below as each prompt is merged.

## [1.0.0] — Unreleased — Nilachal Infracon rebuild

### 01 — Project reset & new identity

**Changed**
- Reset the project identity to Nilachal Infracon Private Limited across
  `package.json` (name, version, description, keywords), `README.md`,
  `CHANGELOG.md`, and `CLAUDE.md`.
- Rewrote `CLAUDE.md` for the new site: minimal one-page business website,
  server-side lead store, admin Dashboard + Lead Management. Added a business
  facts block and a focused "DO NOT MODIFY" list (leads API contract, admin sync
  pattern, lead record field keys).
- Updated `.env` / `.env.example` identity, contact, and admin-credential values;
  added a header note that `.env` is committed and all secrets must be rotated
  during the rebuild.
- Replaced the development console banner in `src/index.js` and refreshed the
  hard-coded admin fallback credentials in `src/admin/utils/adminAuth.js`.

**Removed**
- Deleted the `resources/` directory (scanned brochures from the previous build).
- Pruned environment variables that no code reads (build metadata, unused feature
  flags, social/map/CDN placeholders, dead API-endpoint and location vars).
