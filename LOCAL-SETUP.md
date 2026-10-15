# Local Foundermail deployment

Open http://localhost:3022 and register your local MailFlow login. The first user
becomes the admin and open registration then closes automatically.

The local checkout is `~/KhulaNode/KhulaMail`. Its private `.env` pins
`COMPOSE_PROJECT_NAME=mailflow` so the renamed directory continues to use the
existing `mailflow_*` Docker data volumes. Do not remove that setting when using
this machine's existing data. New installations do not need to reuse that project
name. This setting is local only and does not change the Dokploy project.

In Settings → Accounts → Add Account, Foundermail is selected by default:

- IMAP: `imap.foundermail.mx`, port `993` (implicit TLS).
- SMTP: `smtp.foundermail.mx`, port `587`, `STARTTLS`.
- Certificate verification remains enabled.

The GTD theme's light-background override is checked into
`frontend/src/styles/khulamail.css`; new browsers default to GTD. Existing user
preferences still take precedence. Dokploy deployment is documented in
`DOKPLOY.md` and uses a separate Compose file, leaving local ports/volumes intact.

Enter your mailbox address and IMAP password in the UI. If SMTP needs a different
username or password, enter those in the separate SMTP authentication fields.
The MailFlow login and mailbox credentials are separate accounts.

Start or rebuild with `docker compose up -d --build`. Check status with
`docker compose ps` and logs with `docker compose logs --tail=100 backend`.
Stop with `docker compose stop`; do not use `down -v` unless intentionally
deleting all MailFlow data.

The local `.env` contains generated secrets; keep it private and preserve it
alongside database backups. Losing `ENCRYPTION_KEY` makes saved mail credentials
unreadable. Neither `.env` nor `docker-compose.override.yml` is tracked by Git.

Only loopback port 3022 is published. HTTP is for this local test only; the mail
connections themselves still use TLS/STARTTLS. Use HTTPS before exposing this
app beyond this machine. AI/OAuth/push integrations are not configured.
