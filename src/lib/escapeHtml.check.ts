// Self-check for escapeHtml. Run: node --experimental-strip-types src/lib/escapeHtml.check.ts
import assert from 'node:assert/strict';
import { escapeHtml } from './escapeHtml.ts';

assert.equal(
  escapeHtml('<img src=x onerror="alert(1)">'),
  '&lt;img src=x onerror=&quot;alert(1)&quot;&gt;'
);
assert.equal(escapeHtml("O'Brien & Sons"), 'O&#39;Brien &amp; Sons');
assert.equal(escapeHtml('Jane Smith'), 'Jane Smith', 'ordinary text is untouched');
assert.equal(escapeHtml(3), '3', 'numeric guest counts coerce');
assert.equal(escapeHtml(undefined), '', 'missing optional fields render empty');
// Ampersand must be escaped first or the other replacements double-encode.
assert.equal(escapeHtml('&lt;'), '&amp;lt;');

console.log('escapeHtml: all checks passed');
