import { test } from 'vitest';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// The TOTP issuer is visible inside authenticator apps when onboarding.
test('new authenticator enrolments carry B2SA Mail name', () => {
  const totp = readFileSync(new URL('./totp.js', import.meta.url), 'utf8');
  const auth = readFileSync(new URL('./auth.js', import.meta.url), 'utf8');
  assert.match(totp, /authenticator\.keyuri\(username, 'B2SA Mail', secret\)/);
  assert.match(auth, /authenticator\.keyuri\(username, 'B2SA Mail', secret\)/);
});
