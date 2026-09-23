import type { AppLocale } from '@/lib/i18n';
import { dashbookingLandingContentEn } from '@/content/en';
import { dashbookingLandingContentFr } from '@/content/fr';
import { dashbookingLandingContentVi } from '@/content/vi';
import type { LandingContent } from '@/content/types';

export const dashbookingLandingContentByLocale: Record<AppLocale, LandingContent> = {
  vi: dashbookingLandingContentVi,
  en: dashbookingLandingContentEn,
  fr: dashbookingLandingContentFr,
};

export function getDashbookingLandingContent(locale: AppLocale) {
  return dashbookingLandingContentByLocale[locale];
}
