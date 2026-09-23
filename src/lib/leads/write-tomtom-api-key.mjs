import { chmodSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const keyPath = resolve(root, 'secrets', 'tomtom-api-key.txt');
const envPath = resolve(root, '.env.local');
const key = readFileSync(keyPath, 'utf8').trim();

if (!key || key.length < 16) {
  throw new Error('TomTom key file is missing or too short');
}

let env = '';
try {
  env = readFileSync(envPath, 'utf8');
} catch {
  env = '';
}

const lines = env.split('\n').filter((line) => {
  const trimmed = line.trim();
  return trimmed && !trimmed.startsWith('GOOGLE_PLACES_API_KEY=') && !trimmed.startsWith('TOMTOM_API_KEY=');
});

lines.push(`TOMTOM_API_KEY=${key}`);
writeFileSync(envPath, `${lines.join('\n')}\n`, { mode: 0o600 });
chmodSync(envPath, 0o600);
process.stdout.write('wrote tomtom api key to local env\n');
