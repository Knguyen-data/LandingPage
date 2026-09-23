import assert from 'node:assert/strict';
import { test } from 'node:test';

import { dashbookingLandingContentByLocale } from '@/content';
import { supportedLocales } from '@/lib/i18n';

test('pricing content exists for every locale with pay-as-you-go copy and six tiers', () => {
  for (const locale of supportedLocales) {
    const section = dashbookingLandingContentByLocale[locale].pricing;

    assert.ok(section.title.length > 0, `${locale} missing title`);
    assert.ok(section.supportLine.length > 0, `${locale} missing support line`);
    assert.ok(section.volumeLabel.length > 0, `${locale} missing volume label`);
    assert.equal(section.tiers.length, 6);
    assert.equal(section.trustChips.length, 3);
    assert.ok(section.tiers[0]?.detail.length, `${locale} missing zero-tier detail`);
    assert.equal(section.tiers[0]?.selectorLabel, '0');
    assert.match(section.tiers[0]?.price ?? '', /\$0/);
  }
});

test('english pricing keeps pay as you go and no-customer-no-fee messaging', () => {
  const section = dashbookingLandingContentByLocale.en.pricing;

  assert.equal(section.title, 'Pay As You Go');
  assert.match(section.supportLine, /No customer, no fee/i);
  assert.equal(section.volumeLabel, 'Monthly online appointments');
  assert.deepEqual(section.trustChips, ['No setup fee', 'No contract', 'Scales with your bookings']);
  assert.match(section.tiers[0]?.detail ?? '', /no monthly charge/i);
});
