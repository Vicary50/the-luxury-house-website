import { NextRequest } from 'next/server';

// ponytail: in-memory fixed-window limiter. Ceiling: state is per serverless
// instance and resets on cold start, so a determined attacker spread across
// instances gets more than `limit` through. Good enough to stop casual bot
// floods on a low-traffic site with no datastore. Upgrade path if abuse gets
// real: swap the Map for Vercel KV / Upstash, keeping this same signature.
const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(
  request: NextRequest,
  { limit = 5, windowMs = 60_000 }: { limit?: number; windowMs?: number } = {}
): { ok: true } | { ok: false; retryAfter: number } {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
  const now = Date.now();

  // Drop expired entries so the Map cannot grow without bound.
  for (const [key, entry] of hits) {
    if (entry.resetAt <= now) hits.delete(key);
  }

  const entry = hits.get(ip);
  if (!entry || entry.resetAt <= now) {
    hits.set(ip, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }

  if (entry.count >= limit) {
    return { ok: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }

  entry.count += 1;
  return { ok: true };
}
