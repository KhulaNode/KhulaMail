import { test } from 'node:test';
import assert from 'node:assert/strict';
import { FOUNDERMAIL_PRESET } from './foundermailPreset.js';

test('Foundermail uses IMAP TLS and SMTP STARTTLS without embedded credentials', () => {
  assert.deepEqual(FOUNDERMAIL_PRESET, {
    imap_host: 'imap.foundermail.mx', imap_port: 993, imap_skip_tls_verify: false,
    smtp_host: 'smtp.foundermail.mx', smtp_port: 587, smtp_tls: 'STARTTLS',
  });
  assert.equal(Object.keys(FOUNDERMAIL_PRESET).some(key => /pass|auth/.test(key)), false);
});
