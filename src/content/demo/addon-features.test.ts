import assert from 'node:assert/strict';
import { test } from 'node:test';

import { dashbookingLandingContentByLocale } from '@/content';
import { addonFeaturesAssets } from '@/content/shared';
import { supportedLocales } from '@/lib/i18n';

test('addon features content exists for every locale with gift card and deposit stories', () => {
  for (const locale of supportedLocales) {
    const section = dashbookingLandingContentByLocale[locale].addonFeatures;

    assert.ok(section.titleLead.length > 0, `${locale} missing title`);
    assert.ok(section.titleAccent.length > 0, `${locale} missing accent`);
    assert.equal(section.giftCard.steps.length, 4, `${locale} gift card needs 4 steps`);
    assert.equal(section.deposit.steps.length, 4, `${locale} deposit needs 4 steps`);
    assert.equal(section.giftCard.benefits.length, 3, `${locale} gift card needs 3 benefits`);
    assert.equal(section.deposit.benefits.length, 3, `${locale} deposit needs 3 benefits`);
    assert.equal(section.giftCard.selectedAmount, '$50');
    assert.equal(section.giftCard.recipientEmailPlaceholder, 'name@example.com');
    assert.doesNotMatch(`${section.giftCard.title} ${section.deposit.title} ${section.titleLead}`, /vagaro|fresha|square/i);
    assert.doesNotMatch(section.giftCard.recipientEmailPlaceholder, /\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/);
  }
});

test('addon features uses custom teal svg icons', () => {
  assert.ok(addonFeaturesAssets.giftCardIcon.startsWith('/assets/addon-features/'));
  assert.ok(addonFeaturesAssets.onlineDepositIcon.startsWith('/assets/addon-features/'));
  assert.match(addonFeaturesAssets.giftCardIcon, /gift-card\.svg$/);
  assert.match(addonFeaturesAssets.onlineDepositIcon, /online-deposit\.svg$/);
});
