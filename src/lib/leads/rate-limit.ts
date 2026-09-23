const LEAD_WINDOW_MS = 15 * 60 * 1000;
const LEAD_MAX_REQUESTS = 8;
const PLACES_WINDOW_MS = 5 * 60 * 1000;
const PLACES_MAX_REQUESTS = 40;

const requestLog = new Map<string, number[]>();

function prune(now: number) {
  for (const [key, stamps] of requestLog) {
    const windowMs = key.startsWith('places:') ? PLACES_WINDOW_MS : LEAD_WINDOW_MS;
    const fresh = stamps.filter((stamp) => now - stamp < windowMs);
    if (fresh.length === 0) {
      requestLog.delete(key);
    } else {
      requestLog.set(key, fresh);
    }
  }
}

function allowRequest(bucket: string, ip: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const key = `${bucket}:${ip.trim() || 'unknown'}`;

  if (requestLog.size > 2000) {
    prune(now);
  }

  const stamps = (requestLog.get(key) ?? []).filter((stamp) => now - stamp < windowMs);

  if (stamps.length >= max) {
    requestLog.set(key, stamps);
    return false;
  }

  stamps.push(now);
  requestLog.set(key, stamps);
  return true;
}

export function allowDashbookingLeadRequest(ip: string): boolean {
  return allowRequest('lead', ip, LEAD_MAX_REQUESTS, LEAD_WINDOW_MS);
}

export function allowDashbookingPlacesRequest(ip: string): boolean {
  return allowRequest('places', ip, PLACES_MAX_REQUESTS, PLACES_WINDOW_MS);
}

export function readDashbookingLeadClientIp(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0]?.trim() || 'unknown';
  }

  return headers.get('x-real-ip')?.trim() || 'unknown';
}