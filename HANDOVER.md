# The Luxury House — Handover

**Last verified:** 2026-10-17 · **HEAD:** `c6cb852` on `main` (= branch `redesign`), pushed, live

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

## Redesign (live 2026-10-17)

Plan and full progress log: `~/.claude/plans/i-want-to-change-snug-volcano.md`. Built step by step
on branch `redesign`, each step shown on localhost before commit, then fast-forwarded into `main`.

- **Look:** editorial, muted UK palette, one olive accent, Cormorant Garamond + Inter. Tokens and
  `.prose-editorial` in `src/app/globals.css`. See the Design System section of `CLAUDE.md`.
- **Pages:** home rebuilt (film hero, gallery + lightbox, spreads, amenities, occasion cards, guest
  book, prices, enquiry form, FAQ, location, closing CTA); blog, activities, info, terms, privacy and
  cookies restyled; four occasion landing pages added: `/hen-party-house`, `/birthday-party-house`,
  `/beverley-races-accommodation`, `/couples-retreat` (shared `layout/OccasionPage.tsx`).
- **SEO (step 5b):** homepage title "Party House with Heated Pool, East Yorkshire | The Luxury
  House"; keywords chosen from UK Google autocomplete (no hot tub, so pool searches are the target;
  people search "party house", not "celebration house"). Sitemap lists the occasion pages and only
  blog categories that have posts. Sitemap resubmitted and the 4 pages submitted for indexing in
  Google Search Console by Vasu on 2026-10-17.
- **Verified live 2026-10-17:** 21/21 sitemap URLs 200, no console errors at 390 and 1440, Lighthouse
  mobile accessibility 100 on all tested pages, homepage performance 86. Both forms submitted on the
  preview as AUDIT TEST: owner and guest emails all delivered (Vasu confirmed the owner inbox).

### House facts (from Vasu, use these everywhere)

- Sleeps **13 adults + 2 children under 12** (in the bunk beds) = 15. 5 bedrooms, 5 bathrooms.
- Beds: **1** king-size, 3 double, 1 single, 2 bunk beds, 2 double sofa beds (one in the playroom).
- Poolside villa can be booked on its own: sleeps 2 adults + 2 infants in cots.
- About 25 minutes by car to Beverley and its racecourse. Brough station 6.9 miles, Hull 8.3 miles.
- **Never publish the address or map coordinates** (burglary risk). Guests get it before arrival.
- Hen weekends and birthdays are welcome when agreed at booking; only named guests may stay or visit.

---

## Recent history

| Commit | Date | What |
|---|---|---|
| `c6cb852` | 2026-10-17 | Sitemap lists only blog categories with posts (now `main`, live) |
| `f099398` | 2026-10-17 | Hero film after load, reveal opacity (a11y), framer-motion removed |
| `4deae91` | 2026-10-17 | Step 5b: homepage keywords + 4 occasion pages |
| `325ce23` | 2026-10-17 | Step 5: inner pages restyled, old fonts/colours removed |
| `f7d2ada` | 2026-10-16 | Step 4b: home sections, guest book, motion |
| `704c4d3` / `2af95fa` / `7bd47dd` | 2026-10-16 | Steps 4a / 3 / 2: gallery, shared shell, media pipeline |
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
  hydration/flight bootstrap, the JSON-LD in `StructuredData` and `next/font` inject inline
  script or style. Removing it needs per-request
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
- **Previews are behind Vercel login.** Use the Vercel MCP `get_access_to_vercel_url` share link
  (23 h) and carry its cookie into Playwright/Lighthouse. Preview Lighthouse shows SEO 0 and a
  CSP error for `vercel.live` feedback.js: both are preview-only, ignore them.
- **Disk space:** a production build next to the dev server filled the Mac (2 GB free) and the dev
  server silently stopped picking up new routes (404s). Check `df -h /` before building; restart the
  dev server after a disk-full event.
- **zsh:** never name a shell loop variable `path`; it overwrites `$PATH`.
- **ScrollReveal must animate `opacity`, not GSAP `autoAlpha`:** `visibility:hidden` removes
  unrevealed headings from screen readers.
- **Hero film** mounts after window load (`layout/HeroVideo.tsx`) so it does not slow the first
  paint on phones. Replace files via `node scripts/media.mjs videos`.
- Gmail connector found the AUDIT TEST guest copies within a minute this time; Resend is still the
  source of truth for delivery.

---

## Checks

```bash
npx tsc --noEmit                                          # expect exactly 6 errors
node --experimental-strip-types src/lib/escapeHtml.check.ts   # escapeHtml self-check
npm run build
```

---

## Next actions

1. **Prices section text** (`src/components/layout/AccommodationSection.tsx`, Vasu's wording):
   house line still says "14 adults, 2 under-12s & 2 infants", villa says "3 adults". Correct to
   13 adults + 2 children under 12, and villa 2 adults + 2 infants in cots. Vasu revises prices too.
2. **Delete AUDIT TEST emails:** 2 from 2026-10-17 (plus 3 older ones if still there) in `theluxuryhouseuk@gmail.com`, and 2
   from 2026-10-17 in `vakarri@gmail.com`.
3. **Blog optimisation** (Vasu, later): posts use stock Unsplash photos (one shows London for an
   East Yorkshire guide) and American spellings; two categories have no posts.
4. **Next project:** direct booking + dynamic pricing (candidates listed in the plan).
5. **Watch Google Search Console** for the 4 occasion pages being indexed.
6. **Decide on the dead code**: `src/lib/stripe/stripe.ts` and the Google Sheets path.
7. **Clear the 6 pre-existing type errors** (`ignoreBuildErrors` hides them).
8. *(Optional)* Move rate limiting to Vercel KV if abuse becomes real.

### Docs

`README.md` (orientation + local dev) and `DEPLOYMENT.md` (deploy + operations) were rewritten for
Vercel on 2026-09-12 and are current.

`BOOKING_SETUP.md`, `STRIPE_SETUP.md` and `GOOGLE_SHEETS_SETUP.md` describe features that are **not
wired up in production**. Treat them as proposals, not documentation.
