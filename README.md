# SK Securities Private Limited website

A responsive Next.js and TypeScript website for financial research and education. The project includes the home page, company pages, an educational insights journal, an IPO information page, a live market dashboard integration, privacy/legal notices, and a validated contact form API.

## Requirements

- Node.js 20 or later
- npm

## Run locally

1. Install packages:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` and add configuration as available. The site works without API credentials: the market dashboard explicitly reports that data is not configured, and the enquiry form reports that delivery is unavailable rather than claiming success.

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Visit <http://localhost:3000>.

Useful checks:

```bash
npm run typecheck
npm run build
```

## Environment variables

| Variable | Purpose |
| --- | --- |
| `TWELVE_DATA_API_KEY` | Server-side Twelve Data API key for quote and historical time-series requests. Never expose it with a `NEXT_PUBLIC_` prefix. Confirm Indian exchange/index coverage and license terms for your account before enabling. |
| `RESEND_API_KEY` | Optional server-side Resend credential for contact enquiry delivery. |
| `CONTACT_TO_EMAIL` | Verified company inbox that receives enquiries. |
| `CONTACT_FROM_EMAIL` | Sender identity verified with the email provider. |
| `WHATSAPP_ACCESS_TOKEN` | Server-side Meta WhatsApp Cloud API access token. Keep it secret; never use a `NEXT_PUBLIC_` prefix. |
| `WHATSAPP_PHONE_NUMBER_ID` | Meta WhatsApp Business Platform phone-number ID used to send notification templates. |
| `WHATSAPP_TEMPLATE_NAME` | Name of a Meta-approved template whose body has five text placeholders, in order: name, email, phone, subject, message. |
| `WHATSAPP_TEMPLATE_LANGUAGE` | Approved template language code (defaults to `en`). |
| `CONTACT_WHATSAPP_TO` | WhatsApp recipient in international digits-only format (defaults to `919676914932`, India country code plus the supplied number). |
| `NEXT_PUBLIC_COMPANY_EMAIL` | Public company email shown on the website (defaults to `reddykishor555@gmail.com`). |
| `NEXT_PUBLIC_COMPANY_PHONE` | Public company telephone (defaults to `9676914932`). |
| `NEXT_PUBLIC_COMPANY_ADDRESS` | Public company location (defaults to `Rayadurg`; this is not represented as a full registered address). |
| `NEXT_PUBLIC_LINKEDIN_URL`, `NEXT_PUBLIC_INSTAGRAM_URL` | Verified social profile URLs (optional). |
| `NEXT_PUBLIC_SITE_URL` | Canonical production URL for metadata. |

## Market data

`/api/markets` proxies an allowlisted set of instruments to Twelve Data, keeping the key server-side. A missing key returns an explicit unconfigured state; provider errors are not replaced with fabricated quotes. Review plan entitlements, exchange coverage, redistribution/display rights, and applicable exchange requirements before launch. Provider data may be delayed. The instrument list and chart intervals are intentionally allowlisted.

## Contact enquiries

The contact endpoint validates submitted fields on the server, checks same-host origins when an Origin header is present, applies a lightweight per-process submission throttle and honeypot, then attempts email and WhatsApp delivery independently. Email uses Resend. WhatsApp uses Meta’s Cloud API and requires an approved utility template with five text placeholders; obtain valid business credentials and use the recipient in international digits-only format. If automatic WhatsApp delivery is not configured or fails, the form offers a prefilled `wa.me` link for the visitor to send manually. The form shows each channel’s delivery status and never reports an undelivered message as sent. Configure a production-grade shared rate limiter (for example, an appropriately configured Vercel Firewall or managed KV) before launch; serverless in-memory limits are best-effort and are not shared across instances. The application does not store submissions in a database.

## Deploy to Vercel

1. Push this project to a Git provider and import it into Vercel.
2. Set the production environment variables in the Vercel project settings. Do not commit `.env.local`.
3. Confirm the production domain in `NEXT_PUBLIC_SITE_URL`.
4. Deploy and test the contact route, provider data terms, mobile layout, legal pages, and page metadata.
5. Add a managed rate limiter and monitoring before accepting public enquiries.

## Before public launch

- Confirm exact legal company name, company registration details (if to be shown), full registered office address, and verify the supplied phone number and email are monitored by the company.
- Obtain Indian legal and compliance review of website copy, privacy notice, terms, disclaimers, and any proposed research/advisory service. Verify any regulatory registrations and professional credentials before making claims.
- Confirm whether actual services could constitute regulated research analyst, investment advisory, or other regulated activity; implement required disclosures, processes, and controls before offering them.
- Obtain and verify all market-data/API credentials, exchange coverage, licensing and display/redistribution permissions, provider attribution and delay requirements.
- Configure and verify Resend sender domain, recipient address, delivery monitoring, and abuse protection.
- Configure Meta WhatsApp Business Cloud API credentials, an approved five-variable enquiry notification template, recipient number in international format, and delivery monitoring.
- Confirm retention/deletion and data-rights procedures for enquiries; publish a privacy contact.
- Replace demonstration educational articles with reviewed, sourced content before presenting any article as company research. The included samples are labelled as demonstrations.
- Add verified IPO data source and validate official issue details before displaying offerings; no data is fabricated when absent.
- Add a production domain, favicon/brand artwork, accessibility QA, analytics/cookie controls if analytics are introduced, and final SEO/social imagery.

## Technology

- Next.js App Router and React
- TypeScript
- Tailwind CSS (with a small custom CSS design system for precise responsive styling)
- Recharts for provider-backed market history
- Zod for server-side contact input validation
