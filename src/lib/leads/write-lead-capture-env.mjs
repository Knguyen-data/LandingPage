import { chmodSync, copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const source = process.argv[2];

if (!source) {
  throw new Error('Usage: node src/lib/leads/write-lead-capture-env.mjs <credential-json-path>');
}

const parsed = JSON.parse(readFileSync(source, 'utf8'));
if (parsed.type !== 'service_account' || !parsed.client_email || !parsed.private_key) {
  throw new Error('Credential file is not a complete service account JSON');
}

const secretsDir = resolve(root, 'secrets');
mkdirSync(secretsDir, { recursive: true });

const localKeyPath = resolve(secretsDir, 'google-service-account.json');
copyFileSync(source, localKeyPath);
chmodSync(localKeyPath, 0o600);

const envPath = resolve(root, '.env.local');
const env = [
  'GOOGLE_SHEET_ID=1jDd8Wvy6MhBatM5hTGVd90qcn74mOuUv0ErD9If5DAM',
  `GOOGLE_SERVICE_ACCOUNT_EMAIL=${parsed.client_email}`,
  'GOOGLE_APPLICATION_CREDENTIALS=./secrets/google-service-account.json',
  'LEAD_NOTIFICATION_TO=',
  'LEAD_NOTIFICATION_FROM=',
  'TOMTOM_API_KEY=',
].join('\n') + '\n';

writeFileSync(envPath, env, { mode: 0o600 });
chmodSync(envPath, 0o600);

process.stdout.write('wrote local env and credential file\n');
