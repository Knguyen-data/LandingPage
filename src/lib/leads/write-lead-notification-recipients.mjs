import { chmodSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const envPath = resolve(root, '.env.local');
const from = 'kiennguyen@dashbooking.com';
const to = 'kiennguyen@dashbooking.com, annadang@dashbooking.com';

let env = '';
try {
  env = readFileSync(envPath, 'utf8');
} catch {
  env = '';
}

const lines = env.split('\n').filter((line) => {
  const trimmed = line.trim();
  return (
    trimmed &&
    !trimmed.startsWith('LEAD_NOTIFICATION_TO=') &&
    !trimmed.startsWith('LEAD_NOTIFICATION_FROM=') &&
    !trimmed.startsWith('RESEND_API_KEY=')
  );
});

lines.push(`LEAD_NOTIFICATION_FROM=${from}`);
lines.push(`LEAD_NOTIFICATION_TO=${to}`);
writeFileSync(envPath, `${lines.join('\n')}\n`, { mode: 0o600 });
chmodSync(envPath, 0o600);
process.stdout.write(`wrote lead notification from ${from}\n`);
