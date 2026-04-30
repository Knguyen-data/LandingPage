export const supportedLocales = ['vi', 'en', 'fr'] as const;

export type AppLocale = (typeof supportedLocales)[number];

export function isSupportedLocale(value: string): value is AppLocale {
  return supportedLocales.includes(value as AppLocale);
}

export function assertValidLocale(value: string): AppLocale {
  if (!isSupportedLocale(value)) {
    throw new Error(`Unsupported locale: ${value}`);
  }

  return value;
}
