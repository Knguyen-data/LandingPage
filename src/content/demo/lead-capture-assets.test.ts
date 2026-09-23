import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';

import { normalizedPublicAssets } from '@/lib/assets';

test('lead capture mockups are registered as public PNG assets', () => {
  const { tabletCalendar, phoneStorefront } = normalizedPublicAssets.leadCapture;

  assert.equal(tabletCalendar.startsWith('/assets/lead-capture/'), true);
  assert.equal(phoneStorefront.startsWith('/assets/lead-capture/'), true);
  assert.equal(existsSync(path.join(process.cwd(), 'public', tabletCalendar)), true);
  assert.equal(existsSync(path.join(process.cwd(), 'public', phoneStorefront)), true);
});
