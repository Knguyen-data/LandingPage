export interface DashbookingPlaceSuggestion {
  readonly placeId: string;
  readonly label: string;
  readonly address: string;
  readonly city: string;
  readonly region: string;
  readonly country: string;
}

export interface DashbookingPlaceDetails {
  readonly address: string;
  readonly city: string;
  readonly region: string;
  readonly country: string;
}

interface TomTomAddress {
  readonly streetNumber?: string;
  readonly streetName?: string;
  readonly municipality?: string;
  readonly municipalitySubdivision?: string;
  readonly countrySubdivision?: string;
  readonly countrySubdivisionCode?: string;
  readonly country?: string;
  readonly countryCode?: string;
  readonly countryCodeISO3?: string;
  readonly freeformAddress?: string;
}

export interface TomTomSearchResult {
  readonly id?: string;
  readonly type?: string;
  readonly address?: TomTomAddress;
}

interface TomTomSearchResponse {
  readonly results?: TomTomSearchResult[];
}

const TOMTOM_GEOCODE_URL = 'https://api.tomtom.com/search/2/geocode';
const TOMTOM_PLACE_URL = 'https://api.tomtom.com/search/2/place.json';

function getTomTomApiKey() {
  const key = process.env.TOMTOM_API_KEY?.trim();
  if (!key) {
    throw new Error('not_configured');
  }
  return key;
}

export function normalizeDashbookingPlaceId(placeId: string) {
  return placeId.trim();
}

export function isUsableTomTomPlaceId(placeId: string) {
  return /^[A-Za-z0-9_/=+.-]{8,256}$/.test(placeId);
}

function readCountryName(address?: TomTomAddress) {
  return address?.country?.trim() || address?.countryCode?.trim() || address?.countryCodeISO3?.trim() || '';
}

export function parseDashbookingPlaceDetails(result: TomTomSearchResult): DashbookingPlaceDetails | null {
  const streetNumber = result.address?.streetNumber?.trim() || '';
  const streetName = result.address?.streetName?.trim() || '';
  const address = [streetNumber, streetName].filter(Boolean).join(' ');
  const city =
    result.address?.municipality?.trim() || result.address?.municipalitySubdivision?.trim() || '';
  const region =
    result.address?.countrySubdivisionCode?.trim() || result.address?.countrySubdivision?.trim() || '';
  const country = readCountryName(result.address);

  if (!address && !city && !region && !country) {
    return null;
  }

  return {
    address,
    city,
    region,
    country,
  };
}

export function isPlacesApiConfigured() {
  return Boolean(process.env.TOMTOM_API_KEY?.trim());
}

export async function suggestDashbookingAddresses(input: string): Promise<DashbookingPlaceSuggestion[]> {
  const query = input.trim().slice(0, 80);
  if (query.length < 3) {
    return [];
  }

  const url = new URL(`${TOMTOM_GEOCODE_URL}/${encodeURIComponent(query)}.json`);
  url.searchParams.set('key', getTomTomApiKey());
  url.searchParams.set('typeahead', 'true');
  url.searchParams.set('limit', '7');
  url.searchParams.set('language', 'en-US');

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`places_suggest_${response.status}`);
  }

  const payload = (await response.json()) as TomTomSearchResponse;
  const seen = new Set<string>();

  return (payload.results ?? [])
    .map((result) => {
      if (!result.id || !isUsableTomTomPlaceId(result.id) || seen.has(result.id)) {
        return null;
      }

      const parsed = parseDashbookingPlaceDetails(result);
      if (!parsed) {
        return null;
      }

      seen.add(result.id);
      const label =
        result.address?.freeformAddress?.trim() ||
        [parsed.address, parsed.city, parsed.region, parsed.country].filter(Boolean).join(', ');

      return {
        placeId: result.id,
        label,
        address: parsed.address,
        city: parsed.city,
        region: parsed.region,
        country: parsed.country,
      };
    })
    .filter((item): item is DashbookingPlaceSuggestion => Boolean(item));
}

export async function readDashbookingPlaceDetails(placeId: string): Promise<DashbookingPlaceDetails | null> {
  const id = normalizeDashbookingPlaceId(placeId);
  if (!isUsableTomTomPlaceId(id)) {
    return null;
  }

  const url = new URL(TOMTOM_PLACE_URL);
  url.searchParams.set('key', getTomTomApiKey());
  url.searchParams.set('entityId', id);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`places_details_${response.status}`);
  }

  const payload = (await response.json()) as TomTomSearchResponse;
  const result = payload.results?.[0];
  if (!result) {
    return null;
  }

  return parseDashbookingPlaceDetails(result);
}
