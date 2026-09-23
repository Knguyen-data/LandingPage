import assert from 'node:assert/strict';
import { test } from 'node:test';

import { parseDashbookingLeadPayload } from '@/lib/leads/payload';

const validLead = {
  name: 'Emma Smith',
  business: 'Glow Nail Studio',
  phone: '2045550100',
  email: 'emma@example.com',
  city: 'Winnipeg',
  interest: 'AI Receptionist',
  platform: 'Google',
  campaign: 'AI_Receptionist_Canada',
};

test('lead payload requires name, business, phone, and email', () => {
  const parsed = parseDashbookingLeadPayload({
    ...validLead,
    name: '',
  });

  assert.equal(parsed.ok, false);
});

test('lead payload normalizes attribution and email', () => {
  const parsed = parseDashbookingLeadPayload(validLead);

  assert.equal(parsed.ok, true);
  if (!parsed.ok) {
    return;
  }

  assert.equal(parsed.honeypotTriggered, false);
  assert.equal(parsed.lead.email, 'emma@example.com');
  assert.equal(parsed.lead.platform, 'google');
  assert.equal(parsed.lead.campaign, 'ai_receptionist_canada');
});

test('lead payload defaults missing attribution to direct', () => {
  const parsed = parseDashbookingLeadPayload({
    name: validLead.name,
    business: validLead.business,
    phone: validLead.phone,
    email: validLead.email,
  });

  assert.equal(parsed.ok, true);
  if (!parsed.ok) {
    return;
  }

  assert.equal(parsed.lead.platform, 'direct');
  assert.equal(parsed.lead.campaign, 'direct');
  assert.equal(parsed.lead.city, '');
  assert.equal(parsed.lead.address, '');
  assert.equal(parsed.lead.region, '');
  assert.equal(parsed.lead.country, '');
  assert.equal(parsed.lead.interest, '');
});

test('lead payload rejects invalid email and unknown interest values', () => {
  const badEmail = parseDashbookingLeadPayload({
    ...validLead,
    email: 'not-an-email',
  });
  const parsed = parseDashbookingLeadPayload({
    ...validLead,
    interest: 'Competitor Software',
  });

  assert.equal(badEmail.ok, false);
  assert.equal(parsed.ok, true);
  if (!parsed.ok) {
    return;
  }

  assert.equal(parsed.lead.interest, '');
});

test('lead payload treats a filled honeypot as a silent success', () => {
  const parsed = parseDashbookingLeadPayload({
    ...validLead,
    website: 'https://spam.example',
  });

  assert.equal(parsed.ok, true);
  if (!parsed.ok) {
    return;
  }

  assert.equal(parsed.honeypotTriggered, true);
});

test('lead payload keeps optional address, region, and country', () => {
  const parsed = parseDashbookingLeadPayload({
    ...validLead,
    address: '5905 Roblin Blvd',
    region: 'MB',
    country: 'Canada',
  });

  assert.equal(parsed.ok, true);
  if (!parsed.ok) {
    return;
  }

  assert.equal(parsed.lead.address, '5905 Roblin Blvd');
  assert.equal(parsed.lead.region, 'MB');
  assert.equal(parsed.lead.country, 'Canada');
});

test('lead payload keeps an optional message', () => {
  const parsed = parseDashbookingLeadPayload({
    ...validLead,
    message: 'We open late on Fridays.\nPlease call after 6.',
  });

  assert.equal(parsed.ok, true);
  if (!parsed.ok) {
    return;
  }

  assert.equal(parsed.lead.message, 'We open late on Fridays.\nPlease call after 6.');
});

test('lead payload falls back to direct for unsafe attribution values', () => {
  const parsed = parseDashbookingLeadPayload({
    ...validLead,
    platform: 'google ads\nhttps://evil.example',
    campaign: '<script>alert(1)</script>',
  });

  assert.equal(parsed.ok, true);
  if (!parsed.ok) {
    return;
  }

  assert.equal(parsed.lead.platform, 'direct');
  assert.equal(parsed.lead.campaign, 'direct');
});