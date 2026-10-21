import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const text = (p) => readFileSync(path.join(root, p), 'utf8');

test('LSTA Mail identity is used on login, inbox and browser chrome', () => {
  const login = text('src/components/LoginPage.jsx');
  const sidebar = text('src/components/Sidebar.jsx');
  const html = text('index.html');
  const app = text('src/components/MailApp.jsx');
  assert.match(login, /<LogoMark size=\{72\}/);
  assert.match(login, /Limpopo Scholar Transport Alliance/);
  assert.match(text('src/components/LogoMark.jsx'), /src="\/lsta-logo\.png"/);
  assert.match(sidebar, /LSTA Mail/);
  assert.match(html, /<title>LSTA Mail<\/title>/);
  assert.match(app, /document\.title = 'LSTA Mail'/);
});

test('LSTA artwork drives static and unread-count favicons', () => {
  const themes = text('src/themes.js');
  assert.match(themes, /img\.src = '\/lsta-icon-192\.svg'/);
  assert.match(themes, /_drawBadge\(ctx, count\)/);
  for (const asset of ['lsta-logo.png','lsta-icon-192.svg','lsta-icon-512.svg']) {
    assert.ok(existsSync(path.join(root, 'public', asset)), asset);
  }
});

test('PWA identity and default UI palette use LSTA Mail brand', async () => {
  const manifest = JSON.parse(text('public/manifest.json'));
  const { THEMES, getInitialTheme } = await import('../themes.js');
  assert.equal(manifest.name, 'LSTA Mail');
  assert.equal(manifest.short_name, 'LSTA Mail');
  assert.equal(manifest.theme_color, '#17130f');
  assert.deepEqual(manifest.icons.map(icon => icon.sizes), ['192x192', '512x512']);
  assert.equal(getInitialTheme(), 'gtd');
  assert.equal(THEMES.gtd.vars['--accent'], '#86521f');
  assert.match(text('src/styles/khulamail.css'), /--accent:\s*#86521f/);
  assert.match(text('index.html'), /lsta-icon-192\.svg/);
});
