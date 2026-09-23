import assert from 'node:assert/strict';
import { test } from 'node:test';

import { dashbookingLandingContentByLocale } from '@/content';
import { websiteDesignAssets, websiteDesignGallerySalons } from '@/content/shared';
import { supportedLocales } from '@/lib/i18n';

test('website design content exists for every locale with free seo and ads offer', () => {
  for (const locale of supportedLocales) {
    const section = dashbookingLandingContentByLocale[locale].websiteDesign;

    assert.ok(section.titleLead.length > 0, `${locale} missing title`);
    assert.equal(section.titleGoogle, 'Google');
    assert.ok(section.freeSeoLabel.length > 0, `${locale} missing free SEO`);
    assert.ok(section.creditLabel.length > 0, `${locale} missing ads credit`);
    assert.match(section.adsTitle, /nails near me/i);
    assert.equal(section.websiteBullets.length, 4);
    assert.equal(section.outcomes.length, 3);
  }
});

test('website design gallery uses seven live salon mockups', () => {
  assert.equal(websiteDesignGallerySalons.length, 7);
  assert.equal(websiteDesignGallerySalons[0]?.name, 'Your Way Nail Spa');
  assert.equal(websiteDesignGallerySalons[5]?.name, 'Joy of Nails');
  assert.equal(websiteDesignGallerySalons[6]?.name, 'BM Nails Bar');
  assert.match(websiteDesignGallerySalons[0]?.href ?? '', /yourwaynailspa/);
  assert.ok(websiteDesignAssets.laptopYourWay.startsWith('/assets/website-design/'));
  assert.ok(websiteDesignAssets.googleSearchAd.startsWith('/assets/website-design/'));
});
