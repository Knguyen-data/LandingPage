import assert from 'node:assert/strict';
import { test } from 'node:test';

import { dashbookingLandingContentByLocale } from '@/content';
import { bookingJourneyNodeOrder, journeyCalendarRows } from '@/content/demo/journey';
import { normalizedPublicAssets } from '@/lib/assets';
import { supportedLocales } from '@/lib/i18n';

test('booking journey content exists for every locale with seven lifecycle nodes', () => {
  for (const locale of supportedLocales) {
    const journey = dashbookingLandingContentByLocale[locale].bookingJourney;

    assert.ok(journey.titleLead.length > 0, `${locale} missing journey title`);
    assert.ok(journey.titleAccent.length > 0, `${locale} missing journey accent`);
    assert.ok(journey.handwrittenLeft.length > 0, `${locale} missing left note`);
    assert.ok(journey.handwrittenRight.length > 0, `${locale} missing right note`);
    assert.ok(journey.muteLabel.length > 0, `${locale} missing mute label`);
    assert.ok(journey.unmuteLabel.length > 0, `${locale} missing unmute label`);
    assert.equal(journey.nodes.length, 7);
    assert.deepEqual(
      journey.nodes.map((node) => node.id),
      [...bookingJourneyNodeOrder],
    );

    for (const node of journey.nodes) {
      assert.ok(node.title.length > 0, `${locale} missing title for ${node.id}`);
      assert.ok(node.benefit.length > 0, `${locale} missing benefit for ${node.id}`);
    }

    assert.ok(journey.discover.searchQuery.length > 0);
    assert.equal(journey.discover.salonName, 'Your Lovely Salon');
    assert.ok(journey.booking.cta.length > 0);
    assert.ok(journey.reminder.sentLabel.length > 0);
    assert.ok(journey.completed.heading.length > 0);
    assert.ok(journey.completed.statusLabel.length > 0);
    assert.ok(journey.review.cta.length > 0);
    assert.ok(journey.growth.line1.length > 0);
  }
});

test('booking journey demo calendar has an entering appointment and growth bars', () => {
  assert.equal(journeyCalendarRows.length, 4);
  assert.equal(journeyCalendarRows.filter((row) => row.entering).length, 1);
  assert.ok(normalizedPublicAssets.journey.successChime.startsWith('/assets/journey/'));
});
