# The Luxury House — Deployment & Operations

The site is **already deployed**. This describes how it runs and how to operate it, not how to set
it up from scratch.

**Live:** https://theluxuryhouse.uk (+ `www` → apex, 308 redirect)

Migrated from Netlify to Vercel on 2026-09-12. If you are reading Netlify instructions anywhere in
this repo, they are out of date.

---

## The setup

| | |
|---|---|
| **Host** | Vercel — project `the-luxury-house-website` (`prj_hh21c5DCCZmQdmhwBK2kECtrvx2z`), team `vakarri-gmailcoms-projects` |
| **Repo** | `Vicary50/the-luxury-house-website`, connected to Vercel |
| **Branch** | `main` — pushing to it deploys to production |
| **Build** | `npm run build` (Next.js 16 / Turbopack), output `.next` |
| **Email** | Resend, domain `theluxuryhouse.uk` verified in `eu-west-1` |
| **Sender** | `The Luxury House <noreply@theluxuryhouse.uk>` |
| **DNS** | Namecheap (`dns1`/`dns2.registrar-servers.com`) |

### DNS records

Both apex and `www` are plain A records pointing at Vercel:

```
A   @     76.76.21.21
A   www   76.76.21.21
```

`www` → apex is a **308 redirect from `next.config.ts`**, not a DNS rule. Netlify used to do this
implicitly; Vercel does not, so the redirect lives in the app.

### Environment variables (Vercel → Settings → Environment Variables)

| Variable | Notes |
|---|---|
| `RESEND_API_KEY` | Required. All outbound email. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Owner inbox for enquiries and signed terms. |
| `NEXT_PUBLIC_SITE_URL` | Used in email footers. |
| `MAILDIVER_API_KEY` | **Unused** since `c471571`. Kept only for rollback. |

That is the complete list. `NODE_VERSION` is not needed on Vercel.

**`NEXT_PUBLIC_*` variables are inlined at build time.** Changing one requires a redeploy, not just
a restart. This matters when redirecting test email away from the owner's real inbox.

---

## Deploying

```bash
git add .
git commit -m "Describe the change"
git push origin main
```

Vercel builds and promotes automatically, typically in under a minute. Previous deployments stay
available for instant rollback in the Vercel dashboard.

To deploy without pushing (rare — use only when the Git integration misbehaves):

```bash
npx vercel --prod --yes
```

### Verifying a deploy actually landed

```bash
curl -sSI https://theluxuryhouse.uk/ | grep -iE "^HTTP|content-security-policy|x-vercel-id"
```

---

## Security headers

Set in the `headers()` block of `next.config.ts`:

- `Content-Security-Policy`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`

**HSTS is deliberately not set here.** Vercel already sends
`strict-transport-security: max-age=63072000` on the custom domain; adding it would duplicate the
header.

The CSP keeps `'unsafe-inline'` for **both script and style**, and this is load-bearing. Next's
inline hydration/flight bootstrap, the JSON-LD block in `StructuredData`, styled-jsx in
`TermsContent`, `next/font` and framer-motion all inject inline script or style. Removing it
requires per-request nonces from middleware, which costs the static prerendering the marketing
pages currently get. `'unsafe-eval'` and `ws:` are added for **dev only** via a `NODE_ENV` check.

If you add a third-party script, image host or API, the CSP must be widened or it will fail
**silently** in the browser. Image hosts currently allowed: `placehold.co`,
`images.unsplash.com` (these must also be listed in `images.remotePatterns`).

---

## Email

### An HTTP 200 does not prove an email was sent

Always confirm in the Resend log:

```bash
curl -H "Authorization: Bearer $RESEND_API_KEY" https://api.resend.com/emails?limit=5
```

`GET /emails/{id}` returns the delivered `html`, which is the authoritative way to check what
actually went out. Look for `last_event: delivered`.

Gmail's **search index lags by minutes**, so a fresh send can be `delivered` in Resend and still
not be findable by searching Gmail. Trust Resend.

### Sending test email safely

1. Put `AUDIT TEST - please ignore` in the **name** field — it flows into the subject line of both
   the contact and sign-terms emails.
2. To keep the owner's real inbox clean, point `NEXT_PUBLIC_CONTACT_EMAIL` at a test address **and
   rebuild** (it is inlined at build time), then restore `.env.local` afterwards.
3. Respect the rate limits — contact 5/min, sign-terms 3/min — or you will get 429s and misread
   them as failures.

### If you change the sending domain

The sender address appears in **three** `resend.emails.send()` calls across two files:
`src/app/api/contact/route.ts` (owner + customer) and `src/app/api/sign-terms/route.ts`
(owner + signer). Update all three, and verify the new domain in the Resend dashboard first —
until it is verified, Resend will only send from `onboarding@resend.dev`.

---

## Testing a release

**Enquiry form** — submit at `/#contact-form`, then confirm two `delivered` events in Resend: the
owner notification and the customer confirmation.

**Signed terms** — at `/terms`, sign and submit, then confirm two `delivered` events: the owner copy
and the signer's copy, both carrying `Signed_Terms.pdf`.

**Pool Villa validation** — select Pool Villa, confirm more than 3 adults is blocked and the
children field disables at 3 adults.

**Sitemap** — every URL in it must return 200:

```bash
for u in $(curl -sS https://theluxuryhouse.uk/sitemap.xml | sed -n 's:.*<loc>\(.*\)</loc>.*:\1:p'); do
  printf "%s %s\n" "$(curl -sS -o /dev/null -w '%{http_code}' "$u")" "$u"
done
```

A URL in the sitemap that 404s is an SEO bug — this is exactly how `/booking` was caught.

> Note: the `/terms` submit handler calls `alert()` on failure, which freezes browser automation
> tooling. Override `window.alert` before driving that form programmatically.

---

## Troubleshooting

**Email not sending** — check `RESEND_API_KEY` in Vercel, confirm the domain is still verified in
Resend, then read the function logs (Vercel → project → Logs). Check the Resend log for a
`bounced` or `complained` event rather than assuming the code failed.

**A script, font, image or API call silently does nothing** — suspect the CSP first. Open the
browser console and look for `Refused to load…`. Widen the relevant directive in `next.config.ts`.

**Build fails** — read the Vercel build log. Note that type and lint errors are *ignored* during
builds, so a build failure is usually a genuine runtime or import problem.

**TLS certificate not issued after a DNS change** — Vercel did not auto-issue during the migration.
Force it:

```bash
npx vercel certs issue theluxuryhouse.uk www.theluxuryhouse.uk
```

It completed in about 13 seconds.

**Turbopack crashes with "Symlink node_modules is invalid, it points out of the filesystem root"** —
a `node_modules` symlink into a git worktree. Copy the directory or run `npm ci` instead.

---

## Rollback

**Fastest:** Vercel dashboard → Deployments → pick the previous good build → Promote to Production.

**Back to Netlify** (available until the old site is deleted, planned after ~2026-09-19) — change
DNS at Namecheap:

```
A      @     75.2.60.5
CNAME  www   the-luxury-house-website.netlify.app
```

Netlify site `the-luxury-house-website`, project id `e2d6817d-2713-4fa3-985b-f2649d5004ba`.

---

## Maintenance

**Content** — edit, commit, push. Vercel deploys automatically.

**Blog posts** — edit `src/lib/blog/blogData.ts`, add images under `public/images/blog/`.
New posts are picked up by `src/app/sitemap.ts` automatically.

**Pricing** — edit `src/components/layout/ReserveStaySection.tsx`, test with `npm run dev`.

**Adding a page** — if it should be indexed, add it to `src/app/sitemap.ts`. If it should not be,
leave it out. Never add a sitemap entry for a route that does not exist.

---

## Cost

| Service | Plan | Cost |
|---|---|---|
| Vercel hosting | Hobby | $0/month |
| Resend email | Free (100/day) | $0/month |
| Domain | Namecheap | ~$12/year |
| **Total** | | **~$1/month** |

---

## Monitoring

- **Vercel** → Logs for runtime errors, Deployments for build history
- **Resend** → delivery status, bounces, complaints
- **Google Search Console** → sitemap at `https://theluxuryhouse.uk/sitemap.xml`
- **Browser console** → client-side errors and CSP violations

Google Analytics is wired up but **not configured in production** — `NEXT_PUBLIC_GA_MEASUREMENT_ID`
is unset, so GA does not currently run. Setting it in Vercel and redeploying is all that is needed;
the CSP already allows `googletagmanager.com` and `google-analytics.com`.
