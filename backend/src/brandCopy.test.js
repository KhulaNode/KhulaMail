import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';

const read = path => readFileSync(new URL(path, import.meta.url), 'utf8');
const auth = read('./routes/auth.js');
const admin = read('./routes/admin.js');
const mailer = read('./services/mailer.js');

describe('customer-facing AutoLex system email copy', () => {
  it('brands OTP subject and HTML without changing the OTP token format', () => {
    const email = auth.slice(auth.indexOf('await sendSystemEmail({'), auth.indexOf('router.post(\'/2fa/send-email-otp\''));
    expect(email).toContain("subject: 'Your AutoLex sign-in code'");
    expect(email).toContain('sign in to AutoLex');
    expect(email).toContain('>AutoLex</span>');
    expect(email).toContain('${code}');
    expect(email).toContain('10 minutes');
    expect(email).not.toMatch(/MailFlow|#7c6af7|#f5f4ff/);
  });
  it('brands password reset subject, text and HTML while retaining the reset link', () => {
    const email = auth.slice(auth.indexOf('const emailSubject ='), auth.indexOf('let transport = null;', auth.indexOf('const emailSubject =')));
    expect(email).toContain("'Reset your AutoLex password'");
    expect(email).toContain('your AutoLex account');
    expect(email).toContain('>AutoLex</span>');
    expect(email).toContain('${resetUrl}');
    expect(email).toContain('1 hour');
    expect(email).not.toMatch(/MailFlow|#7c6af7/);
  });
  it('brands invite subject, body and HTML while retaining the invite link', () => {
    const email = admin.slice(admin.indexOf("subject: 'You"), admin.indexOf('      });', admin.indexOf("subject: 'You")));
    expect(email).toContain("invited to AutoLex'");
    expect(email).toContain('join AutoLex');
    expect(email).toContain('>AutoLex</span>');
    expect(email).toContain('${inviteUrl}');
    expect(email).toContain('7 days');
    expect(email).not.toMatch(/MailFlow|#7c6af7/);
  });
  it('defaults system sender names to AutoLex without replacing configured names', () => {
    expect(auth).toContain("cfg.fromName || 'AutoLex'");
    expect(admin).toContain("cfg.fromName || 'AutoLex'");
    expect(admin).toContain("(fromName || '').trim() || 'AutoLex'");
    expect(mailer).toContain("cfg.fromName || 'AutoLex'");
    for (const source of [auth, admin, mailer]) expect(source).toContain('cfg.fromEmail || cfg.user');
  });
});
