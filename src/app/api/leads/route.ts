import { NextResponse } from 'next/server';

import { captureDashbookingLead } from '@/lib/leads/capture';
import { readDashbookingLeadClientIp } from '@/lib/leads/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: 'Unable to submit lead' },
      { status: 400 },
    );
  }

  const result = await captureDashbookingLead(body, readDashbookingLeadClientIp(request.headers));

  return NextResponse.json(
    { success: result.ok, message: result.ok ? undefined : result.message },
    { status: result.status },
  );
}