import {
  dashbookingLeadAttributionDefaults,
  dashbookingLeadCaptureLimits,
  dashbookingLeadInterestValues,
} from '@/content/lead-capture';

export interface DashbookingLeadRecord {
  readonly name: string;
  readonly business: string;
  readonly phone: string;
  readonly email: string;
  readonly address: string;
  readonly city: string;
  readonly region: string;
  readonly country: string;
  readonly interest: string;
  readonly message: string;
  readonly platform: string;
  readonly campaign: string;
}

export interface DashbookingLeadParseSuccess {
  readonly ok: true;
  readonly lead: DashbookingLeadRecord;
  readonly honeypotTriggered: boolean;
}

export interface DashbookingLeadParseFailure {
  readonly ok: false;
  readonly message: string;
  readonly field?: 'name' | 'business' | 'phone' | 'email';
}

export type DashbookingLeadParseResult = DashbookingLeadParseSuccess | DashbookingLeadParseFailure;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ATTRIBUTION_PATTERN = /^[a-z0-9._-]+$/;
const CONTROL_CHARS = /[\u0000-\u001F\u007F]/g;

function clean(value: unknown, max: number): string {
  return String(value ?? '')
    .replace(CONTROL_CHARS, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);
}

function cleanAttribution(value: unknown, max: number): string {
  const normalized = clean(value, max).toLowerCase();

  if (!normalized || !ATTRIBUTION_PATTERN.test(normalized)) {
    return dashbookingLeadAttributionDefaults.platform;
  }

  return normalized;
}

function hasUsablePhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
}

function allowedInterest(value: string): string {
  return dashbookingLeadInterestValues.includes(value as (typeof dashbookingLeadInterestValues)[number])
    ? value
    : '';
}

function cleanMessage(value: unknown, max: number): string {
  return String(value ?? '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/\r\n/g, '\n')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, max);
}

export function parseDashbookingLeadPayload(input: unknown): DashbookingLeadParseResult {
  if (input === null || typeof input !== 'object') {
    return { ok: false, message: 'Invalid payload' };
  }

  const body = input as Record<string, unknown>;
  const honeypot = clean(body.website, 80);

  if (honeypot.length > 0) {
    return {
      ok: true,
      honeypotTriggered: true,
      lead: {
        name: '',
        business: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        region: '',
        country: '',
        interest: '',
        message: '',
        platform: dashbookingLeadAttributionDefaults.platform,
        campaign: dashbookingLeadAttributionDefaults.campaign,
      },
    };
  }

  const name = clean(body.name, dashbookingLeadCaptureLimits.name);
  const business = clean(body.business, dashbookingLeadCaptureLimits.business);
  const phone = clean(body.phone, dashbookingLeadCaptureLimits.phone);
  const email = clean(body.email, dashbookingLeadCaptureLimits.email).toLowerCase();
  const address = clean(body.address, dashbookingLeadCaptureLimits.address);
  const city = clean(body.city, dashbookingLeadCaptureLimits.city);
  const region = clean(body.region, dashbookingLeadCaptureLimits.region);
  const country = clean(body.country, dashbookingLeadCaptureLimits.country);
  const interest = allowedInterest(clean(body.interest, dashbookingLeadCaptureLimits.interest));
  const message = cleanMessage(body.message, dashbookingLeadCaptureLimits.message);
  const platform = cleanAttribution(body.platform || dashbookingLeadAttributionDefaults.platform, dashbookingLeadCaptureLimits.platform);
  const campaign = cleanAttribution(body.campaign || dashbookingLeadAttributionDefaults.campaign, dashbookingLeadCaptureLimits.campaign);

  if (!name) {
    return { ok: false, message: 'Missing required fields', field: 'name' };
  }

  if (!business) {
    return { ok: false, message: 'Missing required fields', field: 'business' };
  }

  if (!phone || !hasUsablePhone(phone)) {
    return { ok: false, message: 'Invalid phone', field: 'phone' };
  }

  if (!email) {
    return { ok: false, message: 'Missing required fields', field: 'email' };
  }

  if (!EMAIL_PATTERN.test(email)) {
    return { ok: false, message: 'Invalid email', field: 'email' };
  }

  return {
    ok: true,
    honeypotTriggered: false,
    lead: {
      name,
      business,
      phone,
      email,
      address,
      city,
      region,
      country,
      interest,
      message,
      platform,
      campaign,
    },
  };
}

export function isValidLeadEmail(email: string): boolean {
  return EMAIL_PATTERN.test(email);
}

export function isValidLeadPhone(phone: string): boolean {
  return hasUsablePhone(phone);
}