import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { getInitialTheme, THEMES } from '../themes.js';

test('AutoLex defaults to GTD and loads its scoped light CSS', () => {
  assert.equal(getInitialTheme(), 'gtd');
  const entry = readFileSync(new URL('../main.jsx', import.meta.url), 'utf8');
  assert.ok(entry.includes("import './styles/khulamail.css'"));
  const css = readFileSync(new URL('../styles/khulamail.css', import.meta.url), 'utf8');
  assert.ok(css.includes(':root[data-mailflow-theme="gtd"]'));
  assert.ok(css.includes('color-scheme: light;'));
  assert.ok(css.includes('--bg-primary: #ffffff;'));
  assert.ok(css.includes('--text-primary: #081c38;'));
  assert.ok(css.includes('--accent-dim: #e7edfb;'));
  // Branding changes the accent, while semantic status colors stay theme-defined.
  assert.ok(css.includes('--accent: #143eac;'));
  assert.ok(css.includes('--accent-text: #ffffff;'));
  for (const token of ['--green', '--red', '--amber']) {
    assert.ok(!css.includes(`${token}:`));
  }
  assert.equal(THEMES.gtd.vars['--accent'], '#143eac');
});
