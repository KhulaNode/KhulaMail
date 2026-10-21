import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const text = (p) => readFileSync(path.join(root, p), 'utf8');

test('B2SA Mail identity is used on login, inbox and browser chrome', () => {
  const login = text('src/components/LoginPage.jsx');
  const sidebar = text('src/components/Sidebar.jsx');
  const html = text('index.html');
  const app = text('src/components/MailApp.jsx');
  assert.match(login, /src="\/b2sa-logo\.jpeg"/);
  assert.match(login, /alt="Back2School Africa"/);
  assert.match(login, /background: '#ffffff'/);
  assert.match(text('src/components/LogoMark.jsx'), /background: '#ffffff'/);
  assert.match(sidebar, /B2SA Mail/);
  assert.match(html, /<title>B2SA Mail<\/title>/);
  assert.match(app, /document\.title = 'B2SA Mail'/);
});

test('B2SA Mail supplied logos drive static and unread-count favicons', async () => {
  const { B2SA_MARK } = await import('./b2saBrand.js');
  const { buildFaviconSvg } = await import('../themes.js');
  assert.ok(B2SA_MARK.startsWith('data:image/jpeg;base64,'));
  assert.ok(buildFaviconSvg().includes(B2SA_MARK));
  assert.ok(buildFaviconSvg(42).includes('>42</text>'));
  for (const asset of ['b2sa-logo.jpeg','b2sa-mark.jpeg','b2sa-icon-192.svg','b2sa-icon-512.svg']) {
    assert.ok(existsSync(path.join(root, 'public', asset)), asset);
  }
});

test('PWA identity and default UI palette use B2SA Mail brand', async () => {
  const manifest = JSON.parse(text('public/manifest.json'));
  const { THEMES, getInitialTheme } = await import('../themes.js');
  assert.equal(manifest.name, 'B2SA Mail');
  assert.equal(manifest.short_name, 'B2SA Mail');
  assert.equal(manifest.theme_color, '#003b26');
  assert.deepEqual(manifest.icons.map(icon => icon.sizes), ['192x192', '512x512']);
  assert.equal(getInitialTheme(), 'gtd');
  assert.equal(THEMES.gtd.vars['--accent'], '#00663d');
  assert.match(text('src/styles/khulamail.css'), /--accent:\s*#00663d/);
  assert.match(text('index.html'), /b2sa-mark\.jpeg/);
});
