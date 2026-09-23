import assert from 'node:assert/strict';
import { test } from 'node:test';

import { dashbookingLandingContentByLocale } from '@/content';
import { dashbookingLeadInterestValues } from '@/content/lead-capture';
import { supportedLocales } from '@/lib/i18n';

test('lead capture content exists for every locale with required fields and interest values', () => {
  for (const locale of supportedLocales) {
    const section = dashbookingLandingContentByLocale[locale].leadCapture;

    assert.ok(section.title.length > 0, `${locale} missing title`);
    assert.ok(section.subtitle.length > 0, `${locale} missing subtitle`);
    assert.ok(section.submitLabel.length > 0, `${locale} missing submit label`);
    assert.ok(section.successTitle.length > 0, `${locale} missing success title`);
    assert.ok(section.successBody.length > 0, `${locale} missing success body`);
    assert.equal(section.interestOptions.length, dashbookingLeadInterestValues.length);
    assert.deepEqual(
      section.interestOptions.map((option) => option.value),
      [...dashbookingLeadInterestValues],
    );
    assert.ok(section.addressLabel.length > 0, `${locale} missing address label`);
    assert.ok(section.regionLabel.length > 0, `${locale} missing region label`);
    assert.ok(section.countryLabel.length > 0, `${locale} missing country label`);
    assert.ok(section.countryPlaceholder.length > 0, `${locale} missing country placeholder`);
    assert.ok(section.messageLabel.length > 0, `${locale} missing message label`);
    assert.ok(section.messageHint.length > 0, `${locale} missing message hint`);
    assert.doesNotMatch(`${section.title} ${section.subtitle} ${section.submitLabel}`, /vagaro|fresha|square/i);
  }
});

test('english lead capture keeps the handoff title and CTA', () => {
  const section = dashbookingLandingContentByLocale.en.leadCapture;

  assert.equal(section.title, 'Ready to see if Dash fits your salon?');
  assert.equal(section.submitLabel, 'Get advice for your salon');
  assert.equal(section.successKicker, 'Thanks!');
  assert.equal(section.successTitle, 'We got your request.');
  assert.equal(section.submittedLabel, 'Submitted');
  assert.equal(section.visualBullets.length, 3);
  assert.equal(section.successChips.length, 3);
});