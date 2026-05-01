import Image from 'next/image';

import { heroGraphic } from '@/content/landing/dashbooking-landing-shared-data';
import type { LandingContent } from '@/content/landing/dashbooking-landing-content-types';

interface DashbookingLandingHeroSectionProps {
  readonly content: LandingContent;
}

export function DashbookingLandingHeroSection({ content }: DashbookingLandingHeroSectionProps) {
  return (
    <section className="landing-hero section-shell">
      <div className="container landing-hero__grid">
        <div className="stack-lg">
          <span className="eyebrow">{content.hero.eyebrow}</span>
          <div className="stack-md landing-hero__copy">
            <h1 className="title-xl landing-hero__title">{content.hero.headline}</h1>
            {content.hero.supportLine ? <p className="landing-hero__support-line">{content.hero.supportLine}</p> : null}
            <p className="landing-hero__subtitle">{content.hero.subtitle}</p>
          </div>
          <ul className="landing-bullets" aria-label={content.hero.bulletsAriaLabel}>
            {content.hero.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </div>
        <div className="hero-visual-card surface-card">
          <span className="hero-badge hero-badge--bottom">{content.hero.priceBadge}</span>
          <Image
            src={heroGraphic}
            alt={content.hero.graphicLabel}
            width={1448}
            height={1086}
            className="hero-visual-card__image"
            priority
          />
        </div>
      </div>
    </section>
  );
}
