# Prompt 11 — Contact Section + Minimalist Enquiry Form (Server-Synced Leads)

## Context

All display sections are merged. This prompt builds the conversion finale: the Contact
section (`id="contact"`) with a clean, minimalist Enquiry Form, and aligns the entire
lead pipeline (form → server store → admin panel) with Nilachal's fields.

**CRITICAL ARCHITECTURE RULE (do not deviate):** leads are stored ONLY in the
server-side store `public/api/leads.php` via `src/utils/webhookSubmit.js`. No
localStorage copies. A lead submitted on any device must appear in the admin panel on
any other device (admin polls the server every 15s). Preserve this exact pattern —
only adapt fields and UI.

## Form fields (the new Nilachal lead shape)

1. **Full Name** — required, text.
2. **Mobile Number** — required, 10-digit Indian mobile validation (existing
   validators pattern; +91 handled as before).
3. **Email** — optional, validated when present.
4. **I'm interested in** — required select:
   `Building Materials (North East Buildmart)` · `Construction Services` ·
   `Project Consultation` · `Dealership / Partnership` · `Other`.
   Keep the payload key `service_interest` (the admin panel maps it already).
5. **Message** — optional multiline, placeholder "Tell us about your requirement…".

Submission keeps the existing enrichment (lead_id, status "new", timestamps, page_url,
user_agent, UTM params, notes[], activity[]) from `webhookSubmit.js`.

## Contact section spec

- Two-column desktop: LEFT — contact info panel on deep navy (WHITE logo, "Let's build
  together." heading, registered office address, phone (tel: link), email (mailto:),
  WhatsApp button, an embedded Google Maps iframe (lazy-loaded, `loading="lazy"`,
  correct title attr) for Lawkhowa Road, Nagaon); RIGHT — the enquiry form on white.
  Stacked on mobile (form first).
- Form design: Apple-minimal — generous field height (~52px), hairline borders,
  clear labels above fields (no floating-label gimmicks), 16px input font (prevents
  iOS zoom), single primary submit button `Send Enquiry` full-width, subtle focus
  rings in the accent color, inline validation messages in a calm red.
- States: submitting (button spinner + disabled), success (existing SweetAlert2 helper
  restyled to brand colors → then navigate to `/thank-you` as today, or show an inline
  elegant success state — keep whichever flow the codebase already uses, restyled),
  error (non-blocking retry message). Honeypot field for spam protection.
- Motion: gentle reveal of the two panels; NO animation on the form fields themselves.

## Tasks

1. Rebuild `src/components/common/UnifiedLeadForm/` (the single form component) with
   the new fields, and ensure `LeadForm`, `LeadFormDrawer` (drawer variant used by all
   "Enquire Now"/"Request a Quote" CTAs) and the Contact section all render this one
   component with a `source` prop (`contact-form`, `drawer`, etc.).
2. Rebuild `src/components/sections/ContactSection/` to the spec (`id="contact"`).
3. Update `src/utils/validators.js` options/labels for the new interest select.
4. Restyle `src/pages/ThankYou/` for Nilachal (logo, copy: "Thank you — our team will
   contact you shortly.", button back to home). Remove any leftover tracking calls.
5. Remove the old CTASection/SecondaryCTASection slots from `src/App.jsx` if still
   present — the final page order is: Hero → About → Products → Services → Stats →
   Brands → Why Us → Contact → Footer.
6. **End-to-end test:** run the app, submit a test lead, verify the POST hits
   `/api/leads.php` shape-correctly (inspect network/payload; if PHP can't run locally,
   verify the request payload matches what `leads.php` expects by reading its code),
   and confirm the admin panel code will render the new `service_interest` values.
7. Responsive at all breakpoints; keyboard/screen-reader accessible (labels, aria,
   focus order); `npm run build` passes.

## Acceptance criteria

- One shared form component everywhere; drawer + contact section both work.
- Payload matches `leads.php` expectations; no localStorage lead writes anywhere
  (`grep -ri "localStorage" src/` shows no lead-data usage).
- Thank-you flow works; form is beautiful, minimal, and mobile-perfect.

## Delivery

Commit with a clear message, push the branch, and open a Pull Request. Finish your reply
with: (a) a concise summary including the exact lead payload shape, and (b) the PR link.
