import assert from 'node:assert/strict';
import { test } from 'node:test';

import { dashbookingLandingContentByLocale } from '@/content';
import { posIntegrationAssets } from '@/content/shared';
import { supportedLocales } from '@/lib/i18n';

test('pos integration content exists for every locale without most-popular claims', () => {
  for (const locale of supportedLocales) {
    const section = dashbookingLandingContentByLocale[locale].posIntegration;

    assert.ok(section.titleLead.length > 0, `${locale} missing title`);
    assert.ok(section.titleAccent.length > 0, `${locale} missing accent`);
    assert.equal(section.benefits.length, 5);
    assert.equal(section.amount, '114.98');
    assert.equal(section.clover.id, 'clover');
    assert.equal(section.poynt.id, 'poynt');
    assert.doesNotMatch(`${section.clover.name} ${section.poynt.name}`, /most popular/i);
    assert.ok(section.clover.ctaHref.startsWith('https://'));
  }
});

test('pos integration uses official terminal assets', () => {
  assert.ok(posIntegrationAssets.cloverFront.startsWith('/assets/pos-integration/'));
  assert.ok(posIntegrationAssets.cloverPaid.startsWith('/assets/pos-integration/'));
  assert.ok(posIntegrationAssets.poynt.startsWith('/assets/pos-integration/'));
});
