'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { googleLogo } from '@/content/shared';
import type { LandingContent } from '@/content/types';
import { DashbookingLandingLocaleSwitcher } from '@/components/locale-switcher';
import { MotionScope, SectionReveal } from '@/components/motion-primitives';

interface DashbookingLandingHeaderProps {
  readonly content: LandingContent;
}

export function DashbookingLandingHeader({ content }: DashbookingLandingHeaderProps) {
  const headerRef = useRef<HTMLElement>(null);
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

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const syncHeight = () => document.documentElement.style.setProperty(
      '--landing-header-offset', `${header.offsetHeight}px`,
    );
    syncHeight();
    const observer = new ResizeObserver(syncHeight);
    observer.observe(header);
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty('--landing-header-offset');
    };
  }, []);

  return (
    <header ref={headerRef} className={scrolled ? 'landing-header landing-header--scrolled' : 'landing-header'}>
      <MotionScope>
        <SectionReveal className="container landing-header__inner" distance={8}>
          <div className="landing-header__start">
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
          </div>
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
