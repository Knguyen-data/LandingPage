import type { AppLocale } from '@/lib/i18n/locales';

export interface LocaleBootContent {
  readonly localeName: string;
  readonly title: string;
  readonly description: string;
}

export const localeBootContent: Record<AppLocale, LocaleBootContent> = {
  vi: {
    localeName: 'Tiếng Việt',
    title: 'Trang Dash Booking đã sẵn sàng',
    description: 'Landing page đa ngôn ngữ của Dash Booking đã sẵn sàng dưới dạng static site.',
  },
  en: {
    localeName: 'English',
    title: 'Dash Booking is ready',
    description: 'The multilingual Dash Booking landing page is ready as a static site.',
  },
  fr: {
    localeName: 'Français',
    title: 'Dash Booking est prêt',
    description: 'La landing page multilingue de Dash Booking est prête en site statique.',
  },
};
