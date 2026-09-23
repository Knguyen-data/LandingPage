import { NextResponse } from 'next/server';

import { allowDashbookingPlacesRequest, readDashbookingLeadClientIp } from '@/lib/leads/rate-limit';
import { isPlacesApiConfigured, readDashbookingPlaceDetails } from '@/lib/leads/address-suggest';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  if (!allowDashbookingPlacesRequest(readDashbookingLeadClientIp(request.headers))) {
    return NextResponse.json({ place: null }, { status: 429 });
  }

  if (!isPlacesApiConfigured()) {
    return NextResponse.json({ place: null, configured: false });
  }

  let body: { placeId?: unknown; sessionToken?: unknown };

  try {
    body = (await request.json()) as { placeId?: unknown; sessionToken?: unknown };
  } catch {
    return NextResponse.json({ place: null }, { status: 400 });
  }

  const placeId = String(body.placeId ?? '').trim();
  const sessionToken = String(body.sessionToken ?? '').trim();

  if (!placeId || sessionToken.length < 8) {
    return NextResponse.json({ place: null }, { status: 400 });
  }

  try {
    const place = await readDashbookingPlaceDetails(placeId);
    return NextResponse.json({ place, configured: true });
  } catch (error) {
    const detail = error instanceof Error ? error.message : 'unknown';
    console.error('Place details failed', detail);
    return NextResponse.json({ place: null, configured: true }, { status: 502 });
  }
}
