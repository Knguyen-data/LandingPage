import { google } from 'googleapis';
import type { DashbookingLeadRecord } from '@/lib/leads/payload';

const SPREADSHEET_ID =
  process.env.GOOGLE_SHEET_ID || '1jDd8Wvy6MhBatM5hTGVd90qcn74mOuUv0ErD9If5DAM';

const APPEND_RANGE = 'Leads!A:M';

type SheetsClient = ReturnType<typeof google.sheets>;

let sheetsClient: SheetsClient | null = null;

function getGoogleAuth() {
  const scopes = ['https://www.googleapis.com/auth/spreadsheets'];
  const keyFile = process.env.GOOGLE_APPLICATION_CREDENTIALS || process.env.GOOGLE_SERVICE_ACCOUNT_FILE;

  if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    return new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON) as {
        client_email?: string;
        private_key?: string;
      },
      scopes,
    });
  }

  if (keyFile) {
    return new google.auth.GoogleAuth({
      keyFile,
      scopes,
    });
  }

  if (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
    return new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes,
    });
  }

  throw new Error('Google Service Account credentials are not configured');
}

function getSheetsClient(): SheetsClient {
  if (sheetsClient) {
    return sheetsClient;
  }

  sheetsClient = google.sheets({ version: 'v4', auth: getGoogleAuth() });
  return sheetsClient;
}

export async function appendDashbookingLeadToSheet(lead: DashbookingLeadRecord) {
  const submittedAt = new Date().toISOString();
  const sheets = getSheetsClient();

  const response = await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: APPEND_RANGE,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      values: [[
        submittedAt,
        lead.name,
        lead.business,
        lead.phone,
        lead.email,
        lead.city,
        lead.interest,
        lead.platform,
        lead.campaign,
        lead.address,
        lead.region,
        lead.country,
        lead.message,
      ]],
    },
  });

  return {
    submittedAt,
    updatedRange: response.data.updates?.updatedRange,
  };
}