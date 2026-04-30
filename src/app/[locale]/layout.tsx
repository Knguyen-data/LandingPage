import { notFound } from 'next/navigation';
import Script from 'next/script';
import type { ReactNode } from 'react';
import { isSupportedLocale, supportedLocales } from '@/lib/i18n/locales';

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return (
    <>
      <Script id="dashbooking-set-document-lang" strategy="beforeInteractive">
        {`document.documentElement.lang = ${JSON.stringify(locale)};`}
      </Script>
      <div data-locale={locale}>{children}</div>
    </>
  );
}

export function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }));
}
