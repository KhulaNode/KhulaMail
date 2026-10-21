# B2SA Mail web edition

The `b2sa` branch is the Back2School Africa branded web edition of KhulaMail.
It uses the two supplied images in `media/b2sa`: the wide logo on sign in and
the circular B2SA mark in the sidebar, browser tab, PWA, and notifications.
The default light and dark palettes use deep green, leaf green, and gold.

Customer-facing copy, system emails, authenticator issuer names, and the
default system sender name use **B2SA Mail**. A sender name explicitly configured
in Settings → Admin → System Email takes precedence.

Before sending account-management email, set the confirmed public `APP_URL` and
configure the actual SMTP host, credentials, and authorized sender address in
Settings → Admin → System Email. User mailboxes still need their own IMAP and
SMTP connections. No B2SA mail domain or provider is assumed by this branch.

The About screen links to this branch's source. Existing backup format markers,
encryption checks, local storage keys, API identifiers, and SSO group values stay
compatible with the base app. Native desktop and Android package identifiers
remain upstream values; this edition targets the web app.

For local verification, run `npm run build` and `npm test` in `frontend`. Backend
tests require its dependencies and permission to bind local HTTP test servers.
