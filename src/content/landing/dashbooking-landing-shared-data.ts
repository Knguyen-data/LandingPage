import { normalizedPublicAssets } from '@/lib/assets/normalized-public-assets';

export const partnerWithUsUrl = 'https://www.dashbooking.com/business/partner-with-us';
export const googlePartnersUrl = 'https://www.google.com/maps/reserve/partners';

export const trustMarketFlags = [
  { country: 'United States', flag: '🇺🇸' },
  { country: 'Canada', flag: '🇨🇦' },
  { country: 'United Kingdom', flag: '🇬🇧' },
  { country: 'Germany', flag: '🇩🇪' },
  { country: 'France', flag: '🇫🇷' },
  { country: 'Spain', flag: '🇪🇸' },
] as const;

export const terminalAssets = [
  { name: 'Clover', imageSrc: normalizedPublicAssets.cloverTerminal },
  { name: 'Poynt', imageSrc: normalizedPublicAssets.poyntTerminal },
] as const;

export const calendarScreenshot = normalizedPublicAssets.appointmentCalendar;
export const heroGraphic = normalizedPublicAssets.heroGraphic;
export const googleLogo = normalizedPublicAssets.googleLogo;
