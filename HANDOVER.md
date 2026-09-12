# The Luxury House — Handover

**Last verified:** 2026-09-12 · **HEAD:** `e224de7` · working tree clean, pushed to `origin/main`

> The folder is called "The Haven". The site, brand and repo are **The Luxury House**.

---

## Current state

| | |
|---|---|
| **Live** | https://theluxuryhouse.uk (+ `www` → apex, 308) |
| **Host** | Vercel, project `the-luxury-house-website` (`prj_hh21c5DCCZmQdmhwBK2kECtrvx2z`), team `vakarri-gmailcoms-projects` |
| **Repo** | `Vicary50/the-luxury-house-website` — push to `main` auto-deploys |
| **Stack** | Next.js 16 + React 19 + TypeScript + Tailwind v4. **No database.** |
| **Email** | Resend (`theluxuryhouse.uk` verified, eu-west-1) |
| **DNS** | Namecheap (`dns1/dns2.registrar-servers.com`) — apex and `www` are plain A records → `76.76.21.21` |

Not the usual Convex/Clerk stack. There is no backend beyond the three API routes.

### Prod environment variables

Only these are set: `RESEND_API_KEY`, `MAILDIVER_API_KEY` (unused since `c471571`, kept for
rollback), `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_CONTACT_EMAIL`.

The codebase *references* Stripe and Google Sheets vars that were **never set** on Netlify and are
not set on Vercel either. Those paths were already degraded in production before the migration.
Do not "fix" this by inventing values — find out whether the features are wanted first.

---

## Recent history

| Commit | Date | What |
|---|---|---|
| `e224de7` | 2026-09-12 | Audit issues 3/4/6/7 — escaping, sitemap, security headers, signer PDF copy |
| `29e5d80` | 2026-09-12 | Audit issues 1/2/5 — rate limits, PDF validation, www→apex 308 |
| `c471571` | 2026-09-12 | Maildiver → Resend, `/api/sign-terms` added |
| `48945c3` | 2026-09-12 | Netlify → Vercel migration |

### 2026-09-12 audit — all 7 issues closed

- **1, 2, 5** (`29e5d80`) — rate limiting, signed-PDF upload validation, host canonicalisation.
- **3 HTML injection** — `src/lib/escapeHtml.ts`, applied at every user-input interpolation in
  `api/contact` and `api/sign-terms`. Two bugs fell out of the same root cause: guest counts arrive
  as **strings**, so "Total guests" concatenated (`"210"`) instead of summing (`3`) — now coerced
  with `Number()`; and the untrusted `name` fed `replyTo` as `Name <addr>`, where `<>` or a newline
  breaks the address parse and 422s the whole submission — now stripped.
- **4 `/booking` 404** — removed from `src/app/sitemap.ts`. **Decision 2026-09-12: do not build the
  page.** Nothing links to it; booking intent goes to `/#contact-form`. The only other reference is
  dead Stripe code. All 19 live sitemap URLs now return 200.
- **6 security headers** — `headers()` block in `next.config.ts` adds CSP, `X-Content-Type-Options`,
  `Referrer-Policy`. **HSTS is deliberately absent** — Vercel already sends it on the custom domain
  and setting it here would duplicate the header.
- **7 signer confirmation** — `api/sign-terms` now emails the signer their own signed PDF.
  Best-effort (logged, not fatal) so a failure cannot make a guest re-sign and double-notify the
  owner. The form had promised this in two places and never delivered it.

Verified live, not just locally: 4 emails reached `delivered` in the Resend log with injected markup
escaped in the delivered bodies; the signer copy carried `Signed_Terms.pdf`; `/terms` drives its
signature pad, jsPDF and submit under the live CSP with zero violations.

---

## Gotchas

- **An HTTP 200 does not prove an email sent.** Verify in the Resend log:
  `curl -H "Authorization: Bearer $RESEND_API_KEY" https://api.resend.com/emails?limit=5`
  (`GET /emails/{id}` returns the delivered `html`, which is how escaping was proven).
  Gmail's *search index* lags minutes behind, so a fresh send can be `delivered` in Resend and still
  not findable via the Gmail connector. Trust Resend.
- **A green build proves nothing.** `next.config.ts` sets `ignoreBuildErrors: true` and
  `ignoreDuringBuilds: true`. `npx tsc --noEmit` reports **6 pre-existing errors**
  (dynamicPricing ×3, googleSheets, stripe, the stale `eslint` key). Not regressions — if you see 7,
  you added one.
- **CSP keeps `'unsafe-inline'` for script *and* style, and it is load-bearing.** Next's inline
  hydration/flight bootstrap, the JSON-LD in `StructuredData`, styled-jsx in `TermsContent`,
  `next/font` and framer-motion all inject inline script or style. Removing it needs per-request
  nonces from middleware, which costs the static prerendering the marketing pages currently get.
  `'unsafe-eval'` and `ws:` are dev-only via a `NODE_ENV` check.
- **Rate limits are in-memory and per serverless instance**, resetting on cold start
  (`src/lib/rateLimit.ts`). Contact 5/min, sign-terms 3/min — space out test requests or you will hit
  429s and misread them. Upgrade path is Vercel KV / Upstash, same function signature.
- **The `/terms` submit handler calls `alert()` on failure, which freezes browser automation.**
  Override `window.alert` before driving that form.
- **`NEXT_PUBLIC_*` vars are inlined at build time**, not read at runtime. To send test mail without
  hitting the owner's real inbox, point `NEXT_PUBLIC_CONTACT_EMAIL` at a test address **and rebuild**,
  then restore `.env.local`. Tag tests by putting "AUDIT TEST - please ignore" in the **name** field —
  it flows into the subject of both contact and sign-terms emails.
- `tsconfig.json` sets `allowImportingTsExtensions: true` so `escapeHtml.check.ts` can
  `import './escapeHtml.ts'`. Safe because `noEmit` is on.
- **Vercel did not auto-issue the TLS cert** after the DNS change; `vercel certs issue <apex> <www>`
  forced it in 13s.
- A `node_modules` **symlink** into a git worktree crashes Turbopack
  ("Symlink node_modules is invalid, it points out of the filesystem root"). Copy or `npm ci`.
- `src/lib/stripe/stripe.ts` **is imported by nothing.** Stripe is dead code.

---

## Checks

```bash
npx tsc --noEmit                                          # expect exactly 6 errors
node --experimental-strip-types src/lib/escapeHtml.check.ts   # escapeHtml self-check
npm run build
```

---

## Next actions

1. **Delete the old Netlify site after ~2026-09-19** — project `the-luxury-house-website`,
   id `e2d6817d-2713-4fa3-985b-f2649d5004ba`. It is the rollback path until then.
   *Rollback = point DNS back: apex A → `75.2.60.5`, `www` CNAME → `the-luxury-house-website.netlify.app`.*
2. **Delete the AUDIT TEST emails** — 3 in `theluxuryhouseuk@gmail.com` (owner's real inbox),
   4 in `vakarri@gmail.com`.
3. **Decide on the dead code** — `src/lib/stripe/stripe.ts` and the Google Sheets path. Both are
   unreachable in production. Delete them, or say the features are wanted. Product call.
4. **Clear the 6 pre-existing type errors** — needs its own pass; `ignoreBuildErrors` is hiding them.
5. *(Optional)* Move rate limiting to Vercel KV if abuse becomes real.

### Stale docs — read with caution

`DEPLOYMENT.md` and `README.md` still describe a **Netlify** deployment and predate the Vercel
migration. This file is the current source of truth. `BOOKING_SETUP.md`, `STRIPE_SETUP.md` and
`GOOGLE_SHEETS_SETUP.md` describe features that are not wired up in production.
