import assert from 'node:assert/strict';
import { test } from 'node:test';

import { dashbookingLandingContentByLocale } from '@/content';
import { heroAppointmentDemo, heroFilledAppointmentCount, heroStaffColumnOrder } from '@/content/demo/hero';
import { heroBusinessProfilePhotos, heroStaffPortraits } from '@/content/shared';
import { normalizedPublicAssets } from '@/lib/assets';
import { supportedLocales } from '@/lib/i18n';

test('hero content exists for every locale with both comparison states', () => {
  for (const locale of supportedLocales) {
    const hero = dashbookingLandingContentByLocale[locale].hero;

    assert.ok(hero.headlineLead.length > 0, `${locale} missing headline lead`);
    assert.ok(hero.headlineAccent.length > 0, `${locale} missing headline accent`);
    assert.ok(hero.subtitle.length > 0, `${locale} missing shared subtitle`);
    assert.equal(hero.primaryCtaHref, '#lead-capture');
    assert.ok(hero.primaryCta.length > 0, `${locale} missing contact CTA label`);
    assert.ok(hero.calendarHeading.length > 0, `${locale} missing calendar heading`);
    assert.match(hero.partnerProofHighlight, /4[.,\s]000\+/, `${locale} missing 4,000+ count`);
    assert.ok(hero.partnerProofNoun.length > 0, `${locale} missing proof noun`);
    assert.ok(hero.partnerProofTail.length > 0, `${locale} missing proof tail`);
    assert.ok(hero.partnerProofPlace.length > 0, `${locale} missing proof place`);
    assert.ok(hero.googleIllustrationLabel.length > 0, `${locale} missing Google illustration label`);
    assert.ok(hero.withoutDashExampleLabel.length > 0, `${locale} missing without-Dash example label`);
    assert.ok(hero.emptySlotLabel.length > 0, `${locale} missing empty slot label`);
    assert.equal(hero.staff.length, 3);
    assert.equal(hero.chips.length, 3);
    assert.equal(hero.withoutDash.annotations.length, 2);
    assert.equal(hero.withDash.annotations.length, 2);
    assert.equal(hero.businessProfile.name, 'Your Lovely Salon');
    assert.equal(hero.businessProfile.hours.includes('Open'), true);
    assert.equal(hero.businessProfile.hours.includes('Đóng'), false);
  }
});

test('hero demo calendar stays sparse without Dash and readable with Dash', () => {
  const withoutDash = heroAppointmentDemo.filter((item) => item.presentIn === 'without-dash');
  const withDash = heroAppointmentDemo.filter((item) => item.presentIn === 'with-dash');

  assert.equal(withoutDash.length, 1);
  assert.equal(withDash.length, 7);
  assert.equal(heroFilledAppointmentCount, 7);
  assert.deepEqual(heroStaffColumnOrder, ['amy', 'bella', 'chloe']);
});

test('section A hero assets are registered as public paths', () => {
  assert.equal(heroStaffPortraits.amy, normalizedPublicAssets.hero.staffAmy);
  assert.equal(heroStaffPortraits.bella, normalizedPublicAssets.hero.staffBella);
  assert.equal(heroStaffPortraits.chloe, normalizedPublicAssets.hero.staffChloe);
  assert.equal(heroBusinessProfilePhotos.length, 3);
  assert.ok(normalizedPublicAssets.hero.businessProfileLead.startsWith('/assets/hero/'));
});
