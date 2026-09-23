import { readFileSync } from 'node:fs';
import { google } from 'googleapis';

for (const line of readFileSync('.env.local', 'utf8').split('\n')) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) {
    continue;
  }
  const separator = trimmed.indexOf('=');
  if (separator === -1) {
    continue;
  }
  const key = trimmed.slice(0, separator);
  const value = trimmed.slice(separator + 1);
  if (!process.env[key]) {
    process.env[key] = value;
  }
}

const spreadsheetId = process.env.GOOGLE_SHEET_ID;
const keyFile = process.env.GOOGLE_APPLICATION_CREDENTIALS || process.env.GOOGLE_SERVICE_ACCOUNT_FILE;

if (!spreadsheetId || !keyFile) {
  throw new Error('Missing GOOGLE_SHEET_ID or credential path');
}

const expected = [
  'Submitted At',
  'Full Name',
  'Salon / Business',
  'Phone',
  'Email',
  'City',
  'Interest',
  'Platform',
  'Campaign',
  'Address',
  'Province / State',
  'Country',
  'Message',
];

const auth = new google.auth.GoogleAuth({
  keyFile,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });
const current = await sheets.spreadsheets.values.get({
  spreadsheetId,
  range: 'Leads!A1:M1',
});

const existing = (current.data.values?.[0] ?? []).map((cell) => String(cell ?? '').trim());
const next = expected.map((label, index) => existing[index] || label);

await sheets.spreadsheets.values.update({
  spreadsheetId,
  range: 'Leads!A1:M1',
  valueInputOption: 'RAW',
  requestBody: { values: [next] },
});

process.stdout.write(`headers_ok ${next.join(' | ')}\n`);
