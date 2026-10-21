# AutoLex Mail web edition

The `Autolex` branch of KhulaMail contains the AutoLex webmail branding. The
separate `autolex` repository supplies the original assets in `public/branding`.
The web app uses the full wordmark on login and the AL lightning mark for the
sidebar, favicon, unread badge and installable PWA icons. Default light and dark
palettes use AutoLex navy, royal blue and gold.

## Mail identity and provider setup

The default system sender display name is **AutoLex**. This applies to invitations,
sign-in codes and password resets. A configured sender name takes precedence.

Before using system email, supply these confirmed values:

- Public HTTPS URL for this instance: set `APP_URL` in the deployment environment.
  Invitations and password resets use this URL. The About screen links to the
  current instance automatically.
- Actual sender address and mail provider: enter the provider's SMTP host, port,
  TLS mode, username, password and authorized From address in Settings → Admin →
  System Email. Use AutoLex for the sender name. Store credentials there, not in Git.
- User mailboxes: add each real account using the provider's IMAP and SMTP settings
  (or its supported OAuth flow). System SMTP sends account-management messages;
  it does not create or host user mailboxes.

The website's displayed `info@autolex.co.za` is not treated as a verified mailbox.
No mail domain, provider or public URL has been invented or hardcoded. Confirm
these details with the mailbox administrator before filling them in.

After configuring the separate instance, use the System Email test action, then
verify an invitation, a sign-in code, a password reset, and normal inbound and
outbound mailbox mail. Check that links open the confirmed AutoLex URL and that
messages show the expected AutoLex sender. No live email has been sent as part of
this branding change.

## Scope and compatibility

Dokploy deployment and desktop/Android packaging are outside this change's scope.
Native app IDs, installers and native bridge identifiers retain their upstream
values. About links to the Autolex branch's source code and retains the licence
information; the Support development section and donation links are omitted.

Existing backup JSON markers, encryption checks, filenames, API/CSRF identifiers,
local storage keys and SSO group values are preserved. Backup messages are branded
AutoLex while the underlying format stays compatible with existing backups.
Existing authenticator registrations remain usable; new registrations show AutoLex.

## Local verification

Use Node 22.22 or a compatible Node 22 release. Run `npm run build`, `npm test` and
`npm run lint` in `frontend`, and `npm test` and `npm run lint` in `backend`.
Backend route tests start local HTTP servers and need permission to bind a port.
