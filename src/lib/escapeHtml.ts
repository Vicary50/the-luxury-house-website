/**
 * Escape a value for interpolation into an HTML email body.
 *
 * Form fields are attacker-controlled: a `name` of `<img src=x onerror=...>`
 * renders as live markup in the owner's mail client unless escaped here.
 * Non-string inputs (numeric guest counts) are coerced, so every interpolation
 * point can call this without a type guard.
 */
export function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
