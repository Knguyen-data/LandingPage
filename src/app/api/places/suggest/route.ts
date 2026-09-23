import { NextResponse } from 'next/server';

import { allowDashbookingPlacesRequest, readDashbookingLeadClientIp } from '@/lib/leads/rate-limit';
import { isPlacesApiConfigured, suggestDashbookingAddresses } from '@/lib/leads/address-suggest';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  if (!allowDashbookingPlacesRequest(readDashbookingLeadClientIp(request.headers))) {
    return NextResponse.json({ suggestions: [] }, { status: 429 });
  }

  if (!isPlacesApiConfigured()) {
    return NextResponse.json({ suggestions: [], configured: false });
  }

  let body: { query?: unknown };

  try {
    body = (await request.json()) as { query?: unknown };
  } catch {
    return NextResponse.json({ suggestions: [] }, { status: 400 });
  }

  const query = String(body.query ?? '').trim();

  if (query.length < 3) {
    return NextResponse.json({ suggestions: [] });
  }

  try {
    const suggestions = await suggestDashbookingAddresses(query);
    return NextResponse.json({ suggestions, configured: true });
  } catch (error) {
    const detail = error instanceof Error ? error.message : 'unknown';
    console.error('Place suggest failed', detail);
    return NextResponse.json({ suggestions: [], configured: true }, { status: 502 });
  }
}
