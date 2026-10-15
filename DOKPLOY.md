# Deploy KhulaMail with Dokploy

This is the working KhulaNode-branded MailFlow setup, including the Foundermail
preset and the saved light-background GTD styling. The mail application is built
from this repository, not pulled from an unmodified upstream MailFlow image.

## Configure

1. Create a **Docker Compose** service in Dokploy (not an Application or Docker
   Stack service). Connect `KhulaNode/KhulaMail`, branch `main`.
2. Select `docker-compose.dokploy.yml` as the Compose file. Build context is the
   repository root. Do not layer the local `docker-compose.override.yml` onto it.
3. In Environment, use `.env.dokploy.example` as the template. Set `APP_URL` to
   exactly the public HTTPS origin, without a trailing slash or path. Generate
   separate secrets locally and paste the values directly into Dokploy:

   ```sh
   openssl rand -hex 32  # SESSION_SECRET
   openssl rand -hex 24  # DB_PASSWORD
   openssl rand -hex 32  # ENCRYPTION_KEY (must be exactly 64 hex characters)
   ```

4. In Domains, add your domain with HTTPS/Let's Encrypt enabled. Select service
   **frontend**, container port **80**, path `/`. Dokploy terminates public TLS;
   nginx is intentionally HTTP-only inside the Docker network. Do not publish
   the backend, PostgreSQL, or Redis ports.
5. Preview Compose: retain the shared `app` network on all four services and
   the `dokploy-network` on `frontend`. The external network must exist on the
   Dokploy host. Set `DOKPLOY_NETWORK` if your host uses a different name. Deploy.

`TRUST_PROXY_HOPS=2` assumes only Dokploy Traefik and MailFlow nginx are between
the browser and backend. Review the chain if adding another proxy; don't expose
nginx or the backend directly while trusting that many forwarded hops.

## First login and mailbox

Register a **new local KhulaMail login**. The first user becomes admin and open
registration closes automatically. The default theme is GTD with light surfaces;
the other themes remain available. Foundermail is preselected in Settings →
Accounts → Add Account:

- IMAP: `imap.foundermail.mx:993`, TLS, certificate verification enabled.
- SMTP: `smtp.foundermail.mx:587`, STARTTLS required.
- Enter mailbox credentials in the UI; separate SMTP credentials are supported.

No local users, passwords, mailbox data, sessions, or generated `.env` secrets
are in Git. A fresh deployment will not carry over your local login or mailbox
accounts. To migrate those too, transfer a private application/database backup
separately, preserving the original `ENCRYPTION_KEY`; never commit it to Git.
AI, OAuth, and VAPID/push integrations remain optional and unconfigured.

## Persistence and recovery

Validate the deployment shape without starting containers or reading `.env`:
`node scripts/check-dokploy.mjs`.

The Compose project owns named volumes `postgres_data`, `redis_data`, and
`image_cache`. Keep the Dokploy project identity stable across redeployments.
Back up PostgreSQL and the environment secrets separately. Losing or changing
`ENCRYPTION_KEY` makes stored mailbox credentials unreadable. Changing
`DB_PASSWORD` in Environment alone does not rotate the password in an existing
PostgreSQL volume; update the database role and environment together.

Do not run `docker compose down -v` against a deployment you want to preserve.
No migration of local data and no deployment to a Dokploy server is performed by
merely pushing this repository.

Dokploy routing reference:
https://docs.dokploy.com/docs/core/docker-compose/domains

## Upstream

Based on https://github.com/maathimself/mailflow, source revision
`c579402`. The upstream history, licenses, and notices are retained. See
`LICENSE`, `LICENSE-COMMERCIAL`, and the original documentation below the
KhulaMail introduction in `README.md`.
