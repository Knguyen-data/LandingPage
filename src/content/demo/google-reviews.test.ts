import assert from 'node:assert/strict';
import { test } from 'node:test';

import { dashbookingLandingContentByLocale } from '@/content';
import {
  GOOGLE_REVIEWS_THINKING_MS,
  getVisibleGoogleReviews,
  googleReviewsDemoReviews,
  googleReviewsLetterColors,
  reviewMatchesGoogleReviewsFilter,
} from '@/content/demo/google-reviews';
import { googleReviewsSalonPhoto } from '@/content/shared';
import { normalizedPublicAssets } from '@/lib/assets';
import { supportedLocales } from '@/lib/i18n';

test('google reviews section exists for every locale with four benefits and a google title word', () => {
  for (const locale of supportedLocales) {
    const section = dashbookingLandingContentByLocale[locale].googleReviews;

    assert.ok(section.eyebrow.length > 0, `${locale} missing eyebrow`);
    assert.ok(section.headlineLead.length > 0, `${locale} missing headline lead`);
    assert.equal(section.headlineGoogle, 'Google');
    assert.ok(section.subtitle.length > 0, `${locale} missing subtitle`);
    assert.equal(section.benefits.length, 4);
    assert.deepEqual(
      section.benefits.map((item) => item.id),
      ['auto-reply', 'maps-seo', 'google-connect', 'included'],
    );
    assert.ok(section.benefits[3]?.body.length, `${locale} missing included-in-Dash note`);
    assert.equal(section.filters.length, 4);
    assert.equal(section.salonName, 'Your Lovely Salon');
    assert.match(section.categoryLocation, /Winnipeg/);
    assert.ok(section.thinkingLabel.length > 0, `${locale} missing thinking label`);
    assert.ok(section.previousReviewLabel.length > 0, `${locale} missing previous review label`);
    assert.ok(section.nextReviewLabel.length > 0, `${locale} missing next review label`);
    assert.doesNotMatch(section.replyLabel, /generate ai response/i);
    assert.doesNotMatch(section.subtitle, /free stamp|crm/i);
  }
});

test('vietnamese title and benefits match the approved section d copy', () => {
  const section = dashbookingLandingContentByLocale.vi.googleReviews;

  assert.equal(section.headlineLead, 'Trả lời');
  assert.equal(section.headlineTail, 'Reviews dễ dàng hơn với AI.');
  assert.equal(section.benefits[0]?.title, 'Hỗ trợ trả lời tự động');
  assert.equal(section.benefits[1]?.title, 'Hỗ trợ tối ưu hồ sơ Google Maps');
  assert.equal(section.benefits[2]?.title, 'Kết nối với hồ sơ Google của tiệm');
  assert.equal(section.benefits[3]?.title, 'Đã có trong Dash');
  assert.equal(section.benefits[3]?.body, 'Không tính thêm phí.');
  assert.equal(section.replyLabel, 'Gửi phản hồi');
});

test('sample reviews use western names, english salon replies, and emma as the default 2-star review', () => {
  assert.equal(googleReviewsDemoReviews.length, 3);
  assert.deepEqual(
    googleReviewsDemoReviews.map((review) => review.customerName),
    ['Emma Wilson', 'Olivia Carter', 'Sophie Bennett'],
  );
  assert.equal(googleReviewsDemoReviews[0]?.stars, 2);
  assert.match(googleReviewsDemoReviews[0]?.review ?? '', /3 PM/);
  assert.match(googleReviewsDemoReviews[0]?.review ?? '', /20 minutes/);
  assert.match(googleReviewsDemoReviews[0]?.reply ?? '', /Hi Emma/);
  assert.match(googleReviewsDemoReviews[0]?.reply ?? '', /Your Lovely Salon/);
  assert.doesNotMatch(googleReviewsDemoReviews[0]?.reply ?? '', /Dash/);

  for (const review of googleReviewsDemoReviews) {
    assert.doesNotMatch(review.review, /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i);
    assert.doesNotMatch(review.reply, /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i);
    assert.match(review.reply, /Your Lovely Salon/);
  }
});

test('review filters keep all three cards on all and only five-star on the five filter', () => {
  assert.equal(getVisibleGoogleReviews(googleReviewsDemoReviews, 'all').length, 3);
  assert.deepEqual(
    getVisibleGoogleReviews(googleReviewsDemoReviews, 'five').map((review) => review.id),
    ['olivia'],
  );
  assert.equal(getVisibleGoogleReviews(googleReviewsDemoReviews, 'three').length, 0);
  assert.equal(getVisibleGoogleReviews(googleReviewsDemoReviews, 'one').length, 0);
  assert.equal(reviewMatchesGoogleReviewsFilter(googleReviewsDemoReviews[0]!, 'all'), true);
  assert.equal(reviewMatchesGoogleReviewsFilter(googleReviewsDemoReviews[0]!, 'five'), false);
});

test('suggested reply waits through a short thinking beat before revealing copy', () => {
  assert.ok(GOOGLE_REVIEWS_THINKING_MS >= 700);
  assert.ok(GOOGLE_REVIEWS_THINKING_MS <= 1400);
});

test('section d uses the google letter colors and a registered salon photo', () => {
  assert.equal(googleReviewsLetterColors.length, 6);
  assert.equal(googleReviewsSalonPhoto, normalizedPublicAssets.googleReviews.salonPhoto);
  assert.ok(normalizedPublicAssets.googleReviews.salonPhoto.startsWith('/assets/hero/'));
});
