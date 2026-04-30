import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDashbookingLandingContent } from '@/content/landing/dashbooking-landing-content-by-locale';
import { DashbookingLandingPage } from '@/components/landing/dashbooking-landing-page';
import { isSupportedLocale, supportedLocales } from '@/lib/i18n/locales';

interface LocaleLandingPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: LocaleLandingPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    return {};
  }

  const content = getDashbookingLandingContent(locale);
  const languages = Object.fromEntries(supportedLocales.map((item) => [item, `/${item}`]));

  return {
    title: content.metadata.title,
    description: content.metadata.description,
    alternates: {
      canonical: `/${locale}`,
      languages,
    },
    openGraph: {
      title: content.metadata.title,
      description: content.metadata.description,
      locale,
      type: 'website',
    },
  };
}

export default async function LocaleLandingPage({ params }: LocaleLandingPageProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const content = getDashbookingLandingContent(locale);
  return <DashbookingLandingPage content={content} />;
}
