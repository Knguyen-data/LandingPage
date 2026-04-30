import Image from 'next/image';
import { heroGraphic, partnerWithUsUrl } from '@/content/landing/dashbooking-landing-shared-data';
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
            <h1 className="title-xl">{content.hero.headline}</h1>
            <p className="landing-hero__support-line">{content.hero.supportLine}</p>
            <p className="landing-hero__subtitle">{content.hero.subtitle}</p>
          </div>
          <ul className="landing-bullets" aria-label={content.hero.bulletsAriaLabel}>
            {content.hero.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
          <div className="landing-hero__cta-row">
            <a href={partnerWithUsUrl} className="button-link">
              {content.hero.primaryCta}
            </a>
            <a href="#ai-demo" className="button-link button-link--secondary">
              {content.hero.secondaryCta}
            </a>
          </div>
          <p className="landing-inline-note">{content.hero.lowRiskNote}</p>
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
