'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { googleLogo } from '@/content/landing/dashbooking-landing-shared-data';
import type { LandingContent } from '@/content/landing/dashbooking-landing-content-types';
import { DashbookingLandingLocaleSwitcher } from '@/components/landing/dashbooking-landing-locale-switcher';
import { MotionScope, SectionReveal } from '@/components/landing/dashbooking-landing-motion-primitives';

interface DashbookingLandingHeaderProps {
  readonly content: LandingContent;
}

export function DashbookingLandingHeader({ content }: DashbookingLandingHeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const syncScrollState = () => {
      setScrolled(window.scrollY > 10);
    };

    syncScrollState();
    window.addEventListener('scroll', syncScrollState, { passive: true });

    return () => {
      window.removeEventListener('scroll', syncScrollState);
    };
  }, []);

  return (
    <header className={scrolled ? 'landing-header landing-header--scrolled' : 'landing-header'}>
      <MotionScope>
        <SectionReveal className="container landing-header__inner" distance={8}>
          <Link href={`/${content.locale}`} className="landing-brand landing-header__brand" aria-label={content.header.homeAriaLabel}>
            <span className="landing-brand__wordmark" aria-hidden="true">
              <span className="landing-brand__word">Dash</span>
              <span className="landing-brand__word landing-brand__word--accent">Booking</span>
            </span>
          </Link>
          <div className="landing-header__partner-pills" role="list" aria-label={content.trust.statsAriaLabel}>
            <a
              href={content.trust.partnerCtaHref}
              className="landing-header__partner-pill"
              role="listitem"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src={googleLogo}
                alt={content.trust.logoAlt}
                width={30}
                height={30}
                className="landing-header__partner-logo"
              />
              <span className="landing-header__partner-pill-label">{content.header.partnerPillLabel}</span>
            </a>
          </div>
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
          </div>
        </SectionReveal>
      </MotionScope>
    </header>
  );
}
