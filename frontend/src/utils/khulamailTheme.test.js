import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { getInitialTheme, THEMES } from '../themes.js';

test('KhulaMail defaults to GTD and loads its scoped light CSS', () => {
  assert.equal(getInitialTheme(), 'gtd');
  const entry = readFileSync(new URL('../main.jsx', import.meta.url), 'utf8');
  assert.ok(entry.includes("import './styles/khulamail.css'"));
  const css = readFileSync(new URL('../styles/khulamail.css', import.meta.url), 'utf8');
  assert.ok(css.includes(':root[data-mailflow-theme="gtd"]'));
  assert.ok(css.includes('color-scheme: light;'));
  assert.ok(css.includes('--bg-primary: #ffffff;'));
  assert.ok(css.includes('--text-primary: #18212b;'));
  assert.ok(css.includes('--accent-dim: #e3f0fa;'));
  // Preserve GTD's main accent and semantic colors; only its surfaces change.
  for (const token of ['--accent', '--accent-text', '--green', '--red', '--amber']) {
    assert.ok(!css.includes(`${token}:`));
  }
  assert.equal(THEMES.gtd.vars['--accent'], '#4A9EDD');
});
