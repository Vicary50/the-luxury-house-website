# The Luxury House Website

The website for The Luxury House holiday rental property in East Yorkshire.

**Live:** https://theluxuryhouse.uk · **Host:** Vercel · **Push to `main` deploys.**

> The folder is named "The Haven". The site, brand and repo are **The Luxury House**.

## Tech stack

- **Framework**: Next.js 16 (App Router, Turbopack) with React 19
- **Styling**: Tailwind CSS v4
- **Email**: Resend
- **Hosting**: Vercel
- **Database**: none — there is no datastore. Enquiries are emailed, not persisted.
- **Analytics**: Google Analytics 4 (optional, currently not configured in prod)

## Features

- Accommodation options — main house and pool villa
- Enquiry form with pricing calculator, emailing both the owner and the customer
- Digitally signed Terms & Conditions, producing a PDF emailed to owner and signer
- Categorised photo gallery, blog with categories, mobile responsive, SEO metadata + sitemap

## Local development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm start
```

Copy `.env.example` to `.env.local` and fill it in before running — the email routes need
`RESEND_API_KEY` to do anything.

### Checks

```bash
npx tsc --noEmit                                             # expect exactly 6 pre-existing errors
node --experimental-strip-types src/lib/escapeHtml.check.ts  # escapeHtml self-check
npm run build
```

`next.config.ts` sets `ignoreBuildErrors` and `ignoreDuringBuilds`, so **a green build proves
nothing about type or lint health**. There are 6 known pre-existing type errors (dynamicPricing ×3,
googleSheets, stripe, a stale `eslint` key). If you see 7, you added one.

## Environment variables

Required:

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Sends all outbound email |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Where enquiries and signed terms are sent |
| `NEXT_PUBLIC_SITE_URL` | Used in email footers |

Optional:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4. Not set in prod, so GA does not currently run. |

`NEXT_PUBLIC_*` variables are **inlined at build time**, not read at runtime — changing one
requires a rebuild, not just a restart.

The codebase also references Stripe and Google Sheets variables that have **never been set** in any
environment. Those paths are dead. See `HANDOVER.md` before wiring anything to them.

## How it works

### Enquiry form (`/#contact-form` → `POST /api/contact`)

1. Emails the owner the customer's details, dates, accommodation and guest counts.
2. Emails the customer a confirmation with a summary of their enquiry.

### Signed terms (`/terms` → `POST /api/sign-terms`)

1. The browser builds a PDF of the agreed terms with the signature drawn on the page (jsPDF).
2. The PDF is posted to the API, which validates it is genuinely a PDF and within 5 MB.
3. The signed PDF is emailed to the owner, and a copy to the signer for their records.

All user input is escaped through `src/lib/escapeHtml.ts` before being interpolated into email
HTML. Keep it that way — these bodies are rendered in a mail client.

### Rate limits

Both public routes are rate limited in `src/lib/rateLimit.ts` — contact 5/min, sign-terms 3/min.
The limiter is in-memory and **per serverless instance**, so it resets on cold start. Space out
test requests or you will hit 429s and misread them.

### Pricing calculator

Calculates from accommodation type, nights (minimum 2) and guest count. Pool Villa enforces a
maximum of 3 adults, and disables the children field once 3 adults are selected.

## Project structure

```
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── contact/          # Enquiry → owner + customer email
│   │   │   ├── sign-terms/       # Signed T&Cs PDF → owner + signer email
│   │   │   └── pricing/dynamic/  # Pricing endpoint
│   │   ├── activities/
│   │   ├── blog/
│   │   ├── terms/                # T&Cs + signing flow
│   │   ├── sitemap.ts            # Generated — every URL here must return 200
│   │   └── page.tsx
│   ├── components/
│   │   ├── layout/               # Header, Footer, page sections
│   │   ├── gallery/
│   │   ├── blog/
│   │   └── ui/                   # SignaturePad, OptimizedImage
│   └── lib/
│       ├── escapeHtml.ts         # Email HTML escaping (+ .check.ts self-check)
│       ├── rateLimit.ts
│       ├── images.ts             # Gallery data
│       └── blog/                 # Blog data
├── public/images/
├── HANDOVER.md                   # Current state, gotchas, open actions — read this first
└── DEPLOYMENT.md                 # Deploy and operations
```

## Documentation

- **`HANDOVER.md`** — current state, gotchas and open actions. Start here.
- **`DEPLOYMENT.md`** — how the site is deployed and operated.
- `BOOKING_SETUP.md`, `STRIPE_SETUP.md`, `GOOGLE_SHEETS_SETUP.md` describe features that are **not
  wired up in production**. Treat them as proposals, not documentation.

## Contact

- **Email**: theluxuryhouseuk@gmail.com
- **Instagram**: [@theluxuryhouseuk](https://www.instagram.com/theluxuryhouseuk/)
- **Facebook**: [The Luxury House](https://www.facebook.com/p/The-Luxury-House-61558062093628/)

## License

Private project for The Luxury House.
