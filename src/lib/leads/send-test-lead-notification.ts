import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { sendDashbookingLeadNotification } from './email';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');

for (const line of readFileSync(resolve(root, '.env.local'), 'utf8').split('\n')) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) {
    continue;
  }
  const separator = trimmed.indexOf('=');
  if (separator === -1) {
    continue;
  }
  const key = trimmed.slice(0, separator);
  const value = trimmed.slice(separator + 1);
  if (!process.env[key]) {
    process.env[key] = value;
  }
}

async function main() {
  await sendDashbookingLeadNotification(
    {
      name: 'Duoc Nguyen',
      business: 'LUX NAILS LINDSAY',
      phone: '+1 905 925 8008',
      email: 'phuong1234@hotmail.com',
      address: '46 Kent Street West',
      city: 'Lindsay',
      region: 'ON',
      country: 'Canada',
      interest: 'AI receptionist',
      message: 'We open late on Fridays.',
      platform: 'direct',
      campaign: 'gmail-template-test',
      submittedAt: new Date().toISOString(),
    },
    ['kiennguyen@dashbooking.com'],
  );

  process.stdout.write('sent test lead notification\n');
}

void main();
