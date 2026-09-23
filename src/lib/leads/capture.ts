import { appendDashbookingLeadToSheet } from '@/lib/leads/sheets';
import { sendDashbookingLeadNotification } from '@/lib/leads/email';
import { parseDashbookingLeadPayload } from '@/lib/leads/payload';
import { allowDashbookingLeadRequest } from '@/lib/leads/rate-limit';

export interface DashbookingLeadCaptureResult {
  readonly ok: boolean;
  readonly status: number;
  readonly message: string;
}

const GENERIC_ERROR = 'Unable to submit lead';

export async function captureDashbookingLead(
  input: unknown,
  ip: string,
): Promise<DashbookingLeadCaptureResult> {
  if (!allowDashbookingLeadRequest(ip)) {
    return { ok: false, status: 429, message: GENERIC_ERROR };
  }

  const parsed = parseDashbookingLeadPayload(input);

  if (!parsed.ok) {
    return { ok: false, status: 400, message: parsed.message };
  }

  if (parsed.honeypotTriggered) {
    return { ok: true, status: 200, message: 'ok' };
  }

  try {
    const stored = await appendDashbookingLeadToSheet(parsed.lead);

    try {
      await sendDashbookingLeadNotification({
        ...parsed.lead,
        submittedAt: stored.submittedAt,
      });
    } catch (error) {
      const detail = error instanceof Error ? error.message : 'unknown';
      console.error('Lead email notification failed', detail);
    }

    return { ok: true, status: 200, message: 'ok' };
  } catch (error) {
    const detail = error instanceof Error ? error.message : 'unknown';
    console.error('Lead submission failed', detail);
    return { ok: false, status: 500, message: GENERIC_ERROR };
  }
}