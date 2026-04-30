import type { AppLocale } from '@/lib/i18n/locales';
import { dashbookingLandingContentEn } from '@/content/landing/dashbooking-landing-content-en';
import { dashbookingLandingContentFr } from '@/content/landing/dashbooking-landing-content-fr';
import { dashbookingLandingContentVi } from '@/content/landing/dashbooking-landing-content-vi';
import type { LandingContent } from '@/content/landing/dashbooking-landing-content-types';

export const dashbookingLandingContentByLocale: Record<AppLocale, LandingContent> = {
  vi: dashbookingLandingContentVi,
  en: dashbookingLandingContentEn,
  fr: dashbookingLandingContentFr,
};

export function getDashbookingLandingContent(locale: AppLocale) {
  return dashbookingLandingContentByLocale[locale];
}
