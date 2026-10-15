import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Buffer } from 'node:buffer';
import { readFileSync } from 'node:fs';
import { KHULANODE_LOGO } from './khulanodeBrand.js';
import { buildFaviconSvg } from '../themes.js';

test('KhulaNode uses the same embedded PNG for its static and dynamic favicon', () => {
  const png = Buffer.from(KHULANODE_LOGO.split(',')[1], 'base64');
  assert.equal(png.subarray(1, 4).toString(), 'PNG');
  const staticIcon = readFileSync(new URL('../../public/khulanode-favicon.svg', import.meta.url), 'utf8');
  assert.ok(staticIcon.includes(KHULANODE_LOGO));
  assert.ok(buildFaviconSvg().includes(KHULANODE_LOGO));
  assert.ok(!buildFaviconSvg().includes('<text'));
});

test('KhulaNode favicon retains unread badges and caps large counts', () => {
  for (const [count, label] of [[1, '1'], [42, '42'], [100, '99+']]) {
    const svg = buildFaviconSvg(count);
    assert.ok(svg.includes(KHULANODE_LOGO));
    assert.ok(svg.includes(`>${label}</text>`));
  }
});
