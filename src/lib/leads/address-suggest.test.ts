import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  isUsableTomTomPlaceId,
  normalizeDashbookingPlaceId,
  parseDashbookingPlaceDetails,
} from '@/lib/leads/address-suggest';

test('place id trims TomTom entity identifiers', () => {
  assert.equal(normalizeDashbookingPlaceId('  g6JpZK84NDAwNjEw  '), 'g6JpZK84NDAwNjEw');
  assert.equal(isUsableTomTomPlaceId('g6JpZK84NDAwNjEw'), true);
  assert.equal(isUsableTomTomPlaceId('short'), false);
  assert.equal(isUsableTomTomPlaceId('id with spaces here'), false);
});

test('address details map street, city, region, and country for Canadian addresses', () => {
  const parsed = parseDashbookingPlaceDetails({
    id: 'CA-ADDR-12345678',
    type: 'Point Address',
    address: {
      streetNumber: '5905',
      streetName: 'Roblin Blvd',
      municipality: 'Winnipeg',
      countrySubdivision: 'Manitoba',
      countrySubdivisionCode: 'MB',
      country: 'Canada',
      countryCode: 'CA',
      freeformAddress: '5905 Roblin Blvd, Winnipeg, MB',
    },
  });

  assert.deepEqual(parsed, {
    address: '5905 Roblin Blvd',
    city: 'Winnipeg',
    region: 'MB',
    country: 'Canada',
  });
});

test('address details keep countries outside the US and Canada', () => {
  const parsed = parseDashbookingPlaceDetails({
    address: {
      streetName: 'Rue de Rivoli',
      municipality: 'Paris',
      country: 'France',
      countryCode: 'FR',
    },
  });

  assert.deepEqual(parsed, {
    address: 'Rue de Rivoli',
    city: 'Paris',
    region: '',
    country: 'France',
  });
});
