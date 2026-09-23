import assert from 'node:assert/strict';
import { test } from 'node:test';

import { buildDashbookingLeadGmailRaw } from '@/lib/leads/email';

test('gmail raw payload includes from, to, subject, and html body', () => {
  const raw = buildDashbookingLeadGmailRaw({
    from: 'sales@dashbooking.com',
    to: ['owner@example.com'],
    subject: 'New Dash Lead — direct — direct — Glow Nail Studio',
    text: 'Full Name: Emma',
    html: '<p>Full Name: Emma</p>',
  });

  const decoded = Buffer.from(raw.replaceAll('-', '+').replaceAll('_', '/'), 'base64').toString('utf8');

  assert.match(decoded, /From: sales@dashbooking.com/);
  assert.match(decoded, /To: owner@example.com/);
  assert.match(decoded, /Subject: =\?UTF-8\?B\?/);
  assert.match(decoded, /Full Name: Emma/);
  assert.match(decoded, /<p>Full Name: Emma<\/p>/);
  assert.doesNotMatch(raw, /[+/=]/);
});
