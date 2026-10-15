import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const cwd = fileURLToPath(new URL('..', import.meta.url));
const args = ['compose', '--env-file', '/dev/null', '-f', 'docker-compose.dokploy.yml', 'config', '--format', 'json'];
const env = {
  ...process.env,
  APP_URL: 'https://mail.example.com',
  DB_PASSWORD: 'validation-only-not-a-real-password',
  SESSION_SECRET: 'validation-only-not-a-real-session-secret',
  ENCRYPTION_KEY: '0'.repeat(64),
  TRUST_PROXY_HOPS: '2',
};
const config = JSON.parse(execFileSync('docker', args, { cwd, env, encoding: 'utf8' }));
assert.deepEqual(Object.keys(config.services).sort(), ['backend', 'frontend', 'postgres', 'redis']);
for (const [name, service] of Object.entries(config.services)) {
  assert.equal(service.ports, undefined, `${name} must not publish host ports`);
  assert.equal(service.container_name, undefined, `${name} must not use a fixed container name`);
  assert.ok(Object.hasOwn(service.networks, 'app'), `${name} needs the shared app network`);
  if (name !== 'frontend') assert.ok(!Object.hasOwn(service.networks, 'dokploy-network'));
}
assert.ok(Object.hasOwn(config.services.frontend.networks, 'dokploy-network'));
assert.equal(config.networks['dokploy-network'].external, true);
assert.equal(config.services.frontend.environment.NGINX_TLS, 'off');
assert.equal(config.services.backend.environment.TRUST_PROXY_HOPS, '2');
assert.equal(config.services.backend.environment.APP_URL, env.APP_URL);
assert.equal(config.services.backend.environment.DB_PASSWORD, config.services.postgres.environment.POSTGRES_PASSWORD);
for (const key of ['APP_URL', 'DB_PASSWORD', 'SESSION_SECRET', 'ENCRYPTION_KEY']) {
  const missing = { ...env, [key]: '' };
  const result = spawnSync('docker', args, { cwd, env: missing, encoding: 'utf8' });
  assert.notEqual(result.status, 0, `Compose must reject missing ${key}`);
}
console.log('PASS: Dokploy services, networking, proxy hops, persistence wiring, and required secrets');
