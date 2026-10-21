# LSTA Mail web edition

The `lsta` branch is the Limpopo Scholar Transport Alliance web edition of
KhulaMail. The supplied logo in `media/lsta` provides the copper hand emblem.
The artwork's wordmark has low contrast, so the app pairs that emblem with clear
text on sign in and in the sidebar. The website reference image supplies the
black, copper and warm neutral colour direction. The app does not use the
website screenshot as a UI asset.

Customer-facing copy, system emails, authenticator issuer names, and the default
system sender name use **LSTA Mail**. A sender name explicitly configured in
Settings → Admin → System Email takes precedence.

Before sending account-management email, set the confirmed public `APP_URL` and
configure the actual SMTP host, credentials, and authorized sender address in
Settings → Admin → System Email. User mailboxes still need their own IMAP and
SMTP connections. No mail domain or provider is assumed by this branch.

The About screen links to this branch's source. Existing backup format markers,
encryption checks, local storage keys, API identifiers, and SSO group values stay
compatible with the base app. Native desktop and Android package identifiers
remain upstream values; this edition targets the web app.

For local verification, run `npm run build` and `npm test` in `frontend`. Backend
tests require its dependencies and permission to bind local HTTP test servers.
