# Bali Water Activity

Direct-booking site for watersports at Tanjung Benoa plus rafting, Nusa Penida
and Labuan Bajo tours. Bookings are collected in a form on the site and handed
to the operator over WhatsApp — there is no payment gateway by design.

Built with Next.js 16 (App Router, Turbopack), React 19, Tailwind v4.

> **Next.js 16 has breaking changes.** See [AGENTS.md](AGENTS.md). Notably
> `middleware.ts` is deprecated in favour of `proxy.ts`, which this project uses
> for dashboard auth.

## Running locally

```bash
npm install
cp .env.example .env.local   # then fill in the values below
npm run dev
```

The site runs at http://localhost:3000.

| Command | What it does |
| :--- | :--- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build |
| `npm test` | Unit tests (Vitest) |
| `npm run lint` | ESLint |

**If the project folder ever moves, delete `.next` first.** The Turbopack cache
stores absolute paths and will fail with "Next.js package not found".

The first load after a cold start can sit on the splash screen for ~20 seconds
while routes compile. Later loads are fast.

## Environment variables

Everything lives in `.env.local`; see `.env.example` for the full list.
`NEXT_PUBLIC_*` values are bundled into the browser build and are public —
never prefix a secret with it.

| Variable | Required | Notes |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_WA_NUMBER` | Yes | Operator WhatsApp, digits only. Bookings go nowhere while it is the placeholder. |
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical origin for metadata and the sitemap. |
| `NEXT_PUBLIC_ALLOW_INDEXING` | No | Defaults off. Set `true` only on the live domain. |
| `NEXT_PUBLIC_GTM_ID` | No | Google Tag Manager. Blank disables analytics. |
| `DASHBOARD_USER` / `DASHBOARD_PASSWORD` | For `/dashboard` | Both required, or the dashboard returns 503. |
| `GA4_PROPERTY_ID` / `GA4_CLIENT_EMAIL` / `GA4_PRIVATE_KEY` | For `/dashboard` | Read-only service account. |
| `DASHBOARD_SAMPLE_DATA` | No | Renders labelled fake data for demos. Never in production. |

## How booking works

1. The guest opens the booking form on any activity or tour.
2. `lib/booking.ts` validates the input — international phone format, and the
   H+1 date rule with an 11:00 WITA same-day cut-off.
3. It builds a structured WhatsApp message with a `BWA-` reference, guest
   details, pax and an estimated total, so the operator does not retype anything.
4. The guest is handed to WhatsApp; the operator confirms the slot and the
   final price manually. No upfront payment.

`lib/booking.ts` and `lib/config.ts` are covered by tests. **Price parsing in
particular is worth keeping tested** — a regression there once quoted `Rp350K`
as 350 rupiah.

## Routes

| Route | |
| :--- | :--- |
| `/` | Homepage |
| `/watersport`, `/rafting`, `/nusa-penida`, `/labuan-bajo` | Category listings |
| `/activity/[slug]` | 8 watersport detail pages |
| `/tour/[slug]` | 7 tour package detail pages |
| `/about`, `/contact` | |
| `/dashboard` | Operator analytics, HTTP Basic auth via `proxy.ts` |

## Analytics

Four events go to `dataLayer` for GA4: `view_item`, `begin_checkout`,
`generate_lead` (a completed booking) and `contact_whatsapp` (a plain enquiry,
tagged with its source). `/dashboard` reads them back through the GA4 Data API.

Country, city, language and device data need only a GA4 property. Age and
gender additionally require Google Signals and stay hidden until traffic passes
Google's privacy threshold. Neither needs a Google Ads account.

## Content rules

Two things were removed from the draft and should not come back without real
data behind them:

- **No invented reviews or statistics.** The draft carried stock-photo
  testimonials and fabricated visitor counts. Australia is a target market and
  treats fabricated reviews as misleading conduct.
- **No promises the operator cannot keep.** Bookings are confirmed manually
  during 09:00–16:00 WITA, so the site must not claim instant confirmation.

Open questions for the client are tracked in `information/CLIENT-QUESTIONS.md`
outside this folder.
