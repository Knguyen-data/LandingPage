import Link from 'next/link';
import { partnerWithUsUrl } from '@/content/landing/dashbooking-landing-shared-data';
import type { LandingContent } from '@/content/landing/dashbooking-landing-content-types';
import { DashbookingLandingLocaleSwitcher } from '@/components/landing/dashbooking-landing-locale-switcher';

interface DashbookingLandingHeaderProps {
  readonly content: LandingContent;
}

export function DashbookingLandingHeader({ content }: DashbookingLandingHeaderProps) {
  return (
    <header className="landing-header">
      <div className="container landing-header__inner">
        <Link href={`/${content.locale}`} className="landing-brand" aria-label={content.header.homeAriaLabel}>
          <span className="landing-brand__wordmark" aria-hidden="true">
            <span className="landing-brand__word">Dash</span>
            <span className="landing-brand__word landing-brand__word--accent">Booking</span>
          </span>
        </Link>
        <nav className="landing-header__nav" aria-label={content.header.navAriaLabel}>
          {content.header.nav.map((item) => (
            <a key={item.href} href={item.href} className="landing-header__link">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="landing-header__actions">
          <DashbookingLandingLocaleSwitcher
            locale={content.locale}
            ariaLabel={content.header.localeSwitcherAriaLabel}
          />
          <a href={partnerWithUsUrl} className="button-link button-link--compact landing-header__cta">
            {content.header.cta}
          </a>
        </div>
      </div>
    </header>
  );
}
