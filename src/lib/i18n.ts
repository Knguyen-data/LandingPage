export const supportedLocales = ['vi', 'en', 'fr'] as const;

export type AppLocale = (typeof supportedLocales)[number];

export function isSupportedLocale(value: string): value is AppLocale {
  return supportedLocales.includes(value as AppLocale);
}

