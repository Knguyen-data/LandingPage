import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { google } from 'googleapis';

import type { DashbookingLeadRecord } from '@/lib/leads/payload';

interface LeadNotificationInput extends DashbookingLeadRecord {
  readonly submittedAt: string;
}

export interface DashbookingLeadEmailMessage {
  readonly from: string;
  readonly to: readonly string[];
  readonly subject: string;
  readonly text: string;
  readonly html: string;
  readonly logo?: {
    readonly cid: string;
    readonly mimeType: string;
    readonly data: Buffer;
  };
}

const LOGO_CID = 'dashbooking-wordmark';
const LOGO_PATH = resolve(process.cwd(), 'public/assets/dashbooking-wordmark.png');

function splitRecipients(value: string): string[] {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function encodeHeader(value: string) {
  if (/^[\x20-\x7e]*$/.test(value)) {
    return value;
  }

  return `=?UTF-8?B?${Buffer.from(value).toString('base64')}?=`;
}

function toBase64Url(value: string) {
  return Buffer.from(value)
    .toString('base64')
    .replaceAll('+', '-')
    .replaceAll('/', '_')
    .replace(/=+$/g, '');
}

function wrapBase64(value: string) {
  return value.match(/.{1,76}/g)?.join('\r\n') ?? value;
}

function formatLeadDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

function phoneHref(phone: string) {
  const digits = phone.replace(/[^\d+]/g, '');
  return digits ? `tel:${digits}` : '';
}

function mapsHref(lead: LeadNotificationInput) {
  const query = [lead.address, lead.city, lead.region, lead.country].filter(Boolean).join(', ');
  return query ? `https://maps.google.com/?q=${encodeURIComponent(query)}` : '';
}

function fieldRow(label: string, value: string, href?: string) {
  const display = value.trim() ? value : '—';
  const content = href && value.trim()
    ? `<a href="${escapeHtml(href)}" style="color:#078FA8;font-weight:800;text-decoration:none">${escapeHtml(display)}</a>`
    : `<span style="color:#16313A;font-weight:800">${escapeHtml(display)}</span>`;

  return `
    <tr>
      <td style="padding:11px 0;border-bottom:1px solid #E6F1F3;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.45;color:#16313A">
        <span style="color:#16313A">${escapeHtml(label)}:</span>
        ${content}
      </td>
    </tr>
  `;
}

function readWordmarkLogo(): DashbookingLeadEmailMessage['logo'] {
  try {
    return {
      cid: LOGO_CID,
      mimeType: 'image/png',
      data: readFileSync(LOGO_PATH),
    };
  } catch {
    return undefined;
  }
}

function buildEmailBodies(lead: LeadNotificationInput, hasLogo: boolean) {
  const dateLabel = formatLeadDate(lead.submittedAt);
  const phoneLink = phoneHref(lead.phone);
  const mapsLink = mapsHref(lead);
  const logoHtml = hasLogo
    ? `<img src="cid:${LOGO_CID}" alt="Dash Booking" width="220" style="display:block;border:0;outline:none;text-decoration:none;width:220px;height:auto" />`
    : `<span style="font-family:Arial,Helvetica,sans-serif;font-size:28px;font-weight:800;letter-spacing:-0.04em;color:#078FA8">Dash Booking</span>`;

  const text = [
    'Dash Booking',
    dateLabel,
    '',
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
    `Email: ${lead.email}`,
    `Business name: ${lead.business}`,
    `Business address: ${lead.address || '—'}`,
    `City: ${lead.city || '—'}`,
    `Province: ${lead.region || '—'}`,
    `Country: ${lead.country || '—'}`,
    `Interest: ${lead.interest || '—'}`,
    `Message: ${lead.message || '—'}`,
    `Platform: ${lead.platform}`,
    `Campaign: ${lead.campaign}`,
  ].join('\n');

  const html = `
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:0;padding:0;background:#F4FBFC">
      <tr>
        <td align="center" style="padding:28px 16px">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:560px;background:#ffffff;border-radius:24px;overflow:hidden;border:1px solid #D8E9ED">
            <tr>
              <td align="center" style="padding:28px 32px 8px">${logoHtml}</td>
            </tr>
            <tr>
              <td align="center" style="padding:8px 32px 12px;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#078FA8;font-weight:700">
                New salon lead
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:0 32px 8px;font-family:Arial,Helvetica,sans-serif;font-size:36px;line-height:1.1;font-weight:800;color:#078FA8">
                ${escapeHtml(dateLabel)}
              </td>
            </tr>
            <tr>
              <td style="padding:12px 40px 8px">
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                  ${fieldRow('Name', lead.name)}
                  ${fieldRow('Phone', lead.phone, phoneLink)}
                  ${fieldRow('Email', lead.email, `mailto:${lead.email}`)}
                  ${fieldRow('Business name', lead.business)}
                  ${fieldRow('Business address', lead.address, mapsLink)}
                  ${fieldRow('City', lead.city)}
                  ${fieldRow('Province', lead.region)}
                  ${fieldRow('Country', lead.country)}
                  ${fieldRow('Interest', lead.interest)}
                  ${fieldRow('Message', lead.message)}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:0">
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#EDF7F8;border-top:1px solid #D8E9ED">
                  <tr>
                    <td style="padding:18px 20px 20px 32px;width:50%;font-family:Arial,Helvetica,sans-serif;vertical-align:top">
                      <div style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#078FA8;font-weight:700;padding-bottom:6px">Platform</div>
                      <div style="font-size:16px;line-height:1.3;color:#16313A;font-weight:800">${escapeHtml(lead.platform)}</div>
                    </td>
                    <td style="padding:18px 32px 20px 12px;width:50%;font-family:Arial,Helvetica,sans-serif;vertical-align:top">
                      <div style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#078FA8;font-weight:700;padding-bottom:6px">Campaign</div>
                      <div style="font-size:16px;line-height:1.3;color:#16313A;font-weight:800">${escapeHtml(lead.campaign)}</div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;

  return { text, html };
}

export function buildDashbookingLeadGmailRaw(message: DashbookingLeadEmailMessage) {
  const relatedBoundary = 'dash-lead-related';
  const altBoundary = 'dash-lead-alt';
  const headers = [
    `From: ${message.from}`,
    `To: ${message.to.join(', ')}`,
    `Subject: ${encodeHeader(message.subject)}`,
    'MIME-Version: 1.0',
  ];

  if (!message.logo) {
    const rfc822 = [
      ...headers,
      `Content-Type: multipart/alternative; boundary="${altBoundary}"`,
      '',
      `--${altBoundary}`,
      'Content-Type: text/plain; charset="UTF-8"',
      'Content-Transfer-Encoding: 8bit',
      '',
      message.text,
      `--${altBoundary}`,
      'Content-Type: text/html; charset="UTF-8"',
      'Content-Transfer-Encoding: 8bit',
      '',
      message.html.trim(),
      `--${altBoundary}--`,
      '',
    ].join('\r\n');

    return toBase64Url(rfc822);
  }

  const rfc822 = [
    ...headers,
    `Content-Type: multipart/related; boundary="${relatedBoundary}"`,
    '',
    `--${relatedBoundary}`,
    `Content-Type: multipart/alternative; boundary="${altBoundary}"`,
    '',
    `--${altBoundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    'Content-Transfer-Encoding: 8bit',
    '',
    message.text,
    `--${altBoundary}`,
    'Content-Type: text/html; charset="UTF-8"',
    'Content-Transfer-Encoding: 8bit',
    '',
    message.html.trim(),
    `--${altBoundary}--`,
    `--${relatedBoundary}`,
    `Content-Type: ${message.logo.mimeType}; name="dashbooking-wordmark.png"`,
    `Content-ID: <${message.logo.cid}>`,
    'Content-Disposition: inline; filename="dashbooking-wordmark.png"',
    'Content-Transfer-Encoding: base64',
    '',
    wrapBase64(message.logo.data.toString('base64')),
    `--${relatedBoundary}--`,
    '',
  ].join('\r\n');

  return toBase64Url(rfc822);
}

function getGmailAuth(from: string) {
  const refreshToken = process.env.GOOGLE_GMAIL_REFRESH_TOKEN?.trim();
  const clientId = process.env.GOOGLE_GMAIL_CLIENT_ID?.trim();
  const clientSecret = process.env.GOOGLE_GMAIL_CLIENT_SECRET?.trim();

  if (refreshToken && clientId && clientSecret) {
    const oauth2 = new google.auth.OAuth2(clientId, clientSecret);
    oauth2.setCredentials({ refresh_token: refreshToken });
    return oauth2;
  }

  const scopes = ['https://www.googleapis.com/auth/gmail.send'];
  const keyFile = process.env.GOOGLE_APPLICATION_CREDENTIALS || process.env.GOOGLE_SERVICE_ACCOUNT_FILE;

  if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    const parsed = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON) as {
      client_email?: string;
      private_key?: string;
    };
    return new google.auth.JWT({
      email: parsed.client_email,
      key: parsed.private_key,
      scopes,
      subject: from,
    });
  }

  if (keyFile) {
    return new google.auth.JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      keyFile,
      scopes,
      subject: from,
    });
  }

  if (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
    return new google.auth.JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes,
      subject: from,
    });
  }

  throw new Error('Google Service Account credentials are not configured');
}

async function sendWithGmail(message: DashbookingLeadEmailMessage) {
  const auth = getGmailAuth(message.from);
  const gmail = google.gmail({ version: 'v1', auth });

  await gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      raw: buildDashbookingLeadGmailRaw(message),
    },
  });
}

export async function sendDashbookingLeadNotification(
  lead: LeadNotificationInput,
  recipients?: readonly string[],
): Promise<void> {
  const to = recipients?.length ? [...recipients] : splitRecipients(process.env.LEAD_NOTIFICATION_TO ?? '');
  const from = (process.env.LEAD_NOTIFICATION_FROM ?? '').trim();

  if (to.length === 0 || !from) {
    console.warn('Lead notification skipped: LEAD_NOTIFICATION_TO or LEAD_NOTIFICATION_FROM is not set');
    return;
  }

  const logo = readWordmarkLogo();
  const { text, html } = buildEmailBodies(lead, Boolean(logo));
  await sendWithGmail({
    from,
    to,
    subject: `New Dash Lead — ${lead.business}`,
    text,
    html,
    logo,
  });
}
