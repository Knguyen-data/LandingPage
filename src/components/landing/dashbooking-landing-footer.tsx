import Link from 'next/link';
import { supportedLocales } from '@/lib/i18n/locales';
import type { LandingContent } from '@/content/landing/dashbooking-landing-content-types';

interface DashbookingLandingFooterProps {
  readonly content: LandingContent;
}

export function DashbookingLandingFooter({ content }: DashbookingLandingFooterProps) {
  return (
    <footer className="landing-footer">
      <div className="container landing-footer__inner">
        <div className="stack-sm">
          <strong className="title-sm">Dash Booking</strong>
          <p className="copy-sm text-muted">{content.footer.summary}</p>
        </div>
        <div className="landing-footer__meta">
          <div className="stack-sm">
            <span className="kicker">{content.footer.languageLabel}</span>
            <div className="footer-locale-links">
              {supportedLocales.map((locale) => (
                <Link key={locale} href={`/${locale}`}>
                  {locale.toUpperCase()}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <p className="copy-sm text-muted">{content.footer.rights}</p>
      </div>
    </footer>
  );
}
