# B2SA Mail

Back2School Africa's webmail edition of KhulaMail, based on
[MailFlow](https://github.com/maathimself/mailflow). It includes the B2SA logos,
green and gold palette, and client-facing mail identity.

- [B2SA branding and mail setup](docs/B2SA.md).

- [Deploy with Dokploy](DOKPLOY.md) using `docker-compose.dokploy.yml`.
- [Local installation notes](LOCAL-SETUP.md).
- No credentials, mailbox data, or generated environment secrets are included.
---

## Security notes

- The first registered user becomes the admin automatically
- Close open registration in Settings → Users once you've set up your accounts
- Use the invite system to onboard additional users
- Enable two-factor authentication in Settings → Security — supports TOTP (authenticator app), email OTP fallback, and persistent device trust. TOTP codes are one-time and cannot be replayed within their validity window
- Session cookies are `HttpOnly`, `SameSite=Lax`, with a 7-day TTL. The `Secure` flag is set automatically when the connection is HTTPS (direct or via a proxy that forwards `X-Forwarded-Proto: https`)
- Passwords are bcrypt-hashed (cost factor 12)
- Login and registration endpoints are rate-limited (10 attempts per 15 minutes per IP)
- Password reset tokens are consumed atomically — concurrent reset requests cannot both succeed
- Database and Redis are not exposed outside the Docker network
- IMAP/SMTP credentials are stored at rest in the database (standard for webmail clients — protect access to your server and database volume accordingly)
- Responses set a strict `Content-Security-Policy`, clickjacking protection via `X-Frame-Options`, and a restrictive `Referrer-Policy`
- Email HTML is sanitized before rendering, including stripping external `url()` references from CSS style blocks to prevent tracking
