import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';

const read = path => readFileSync(new URL(path, import.meta.url), 'utf8');

test('all translated customer-facing brand mentions use LSTA Mail; SSO group identifiers remain intact', () => {
  const names = readdirSync(new URL('.', import.meta.url)).filter(name => name.endsWith('.json'));
  assert.ok(names.length > 0);
  for (const name of names) {
    const locale = JSON.parse(read(name));
    const walk = (value, path = '') => {
      if (typeof value === 'string') {
        if (path === 'admin.sso.adminGroupValuePh') {
          assert.equal(value, 'mailflow-admins', `${name}: SSO group identifier`);
        } else {
          assert.doesNotMatch(value, /MailFlow/, `${name}:${path}`);
        }
      } else if (value && typeof value === 'object') {
        for (const [key, entry] of Object.entries(value)) walk(entry, path ? `${path}.${key}` : key);
      }
    };
    walk(locale);
  }
});

test('admin system email form uses LSTA Mail as its suggested sender name', () => {
  const source = read('../components/AdminPanel.jsx');
  const form = source.slice(source.indexOf("const [form, setForm] = useState({ host: '', port: '587'"), source.indexOf("const [form, setForm] = useState({ host: '', port: '587'") + 8000);
  assert.match(form, /fromName: 'LSTA Mail'/);
  assert.match(form, /cfg.fromName \|\| 'LSTA Mail'/);
  assert.match(form, /'fromName', 'text', 'LSTA Mail'/);
  assert.doesNotMatch(form, /fromName: 'MailFlow'|cfg.fromName \|\| 'MailFlow'/);
});

test('error fallback uses LSTA Mail in visible headings and copied diagnostic label', () => {
  const source = read('../components/ErrorBoundary.jsx');
  assert.match(source, /LSTA Mail has been updated/);
  assert.match(source, /LSTA Mail hit an error and stopped/);
  assert.match(source, /LSTA Mail error:/);
});
