import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const text = (p) => readFileSync(path.join(root, p), 'utf8');

test('AutoLex identity is used on login, inbox and browser chrome', () => {
  const login = text('src/components/LoginPage.jsx');
  const sidebar = text('src/components/Sidebar.jsx');
  const html = text('index.html');
  const app = text('src/components/MailApp.jsx');
  assert.match(login, /src="\/autolex-logo\.png"/);
  assert.match(login, /alt="AutoLex"/);
  assert.match(login, /background: '#ffffff'/);
  assert.match(text('src/components/LogoMark.jsx'), /background: '#ffffff'/);
  assert.match(sidebar, /AutoLex/);
  assert.match(html, /<title>AutoLex Mail<\/title>/);
  assert.match(app, /document\.title = 'AutoLex Mail'/);
});

test('AutoLex supplied logos drive static and unread-count favicons', async () => {
  const { AUTOLEX_MARK } = await import('./autolexBrand.js');
  const { buildFaviconSvg } = await import('../themes.js');
  assert.ok(AUTOLEX_MARK.startsWith('data:image/png;base64,'));
  assert.ok(buildFaviconSvg().includes(AUTOLEX_MARK));
  assert.ok(buildFaviconSvg(42).includes('>42</text>'));
  assert.ok(text('public/autolex-favicon.svg').includes(AUTOLEX_MARK));
  for (const asset of ['autolex-logo.png','autolex-mark.png','icon-72.png','icon-192.png','icon-512.png','badge-96.png']) {
    assert.ok(existsSync(path.join(root, 'public', asset)), asset);
  }
});

test('PWA identity and default UI palette use AutoLex brand', async () => {
  const manifest = JSON.parse(text('public/manifest.json'));
  const { THEMES, getInitialTheme } = await import('../themes.js');
  assert.equal(manifest.name, 'AutoLex Mail');
  assert.equal(manifest.short_name, 'AutoLex');
  assert.equal(manifest.theme_color, '#081c38');
  assert.equal(getInitialTheme(), 'gtd');
  assert.equal(THEMES.gtd.vars['--accent'], '#143eac');
  assert.match(text('src/styles/khulamail.css'), /--accent:\s*#143eac/);
  assert.match(text('index.html'), /autolex-favicon\.svg/);
});
