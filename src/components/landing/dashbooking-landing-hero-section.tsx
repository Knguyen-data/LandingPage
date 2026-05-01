import Image from 'next/image';

import { heroGraphic } from '@/content/landing/dashbooking-landing-shared-data';
import type { LandingContent } from '@/content/landing/dashbooking-landing-content-types';
import {
  InteractiveCard,
  MotionScope,
  RevealGroup,
  RevealItem,
  SectionReveal,
} from '@/components/landing/dashbooking-landing-motion-primitives';

interface DashbookingLandingHeroSectionProps {
  readonly content: LandingContent;
}

export function DashbookingLandingHeroSection({ content }: DashbookingLandingHeroSectionProps) {
  return (
    <section className="landing-hero section-shell">
      <MotionScope>
        <div className="container landing-hero__grid">
          <RevealGroup className="stack-lg">
            <RevealItem>
              <span className="eyebrow">{content.hero.eyebrow}</span>
            </RevealItem>
            <RevealItem>
              <div className="stack-md landing-hero__copy">
                <h1 className="title-xl landing-hero__title">{content.hero.headline}</h1>
                {content.hero.supportLine ? <p className="landing-hero__support-line">{content.hero.supportLine}</p> : null}
                <p className="landing-hero__subtitle">{content.hero.subtitle}</p>
              </div>
            </RevealItem>
            <RevealItem>
              <ul className="landing-bullets" aria-label={content.hero.bulletsAriaLabel}>
                {content.hero.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </RevealItem>
          </RevealGroup>
          <SectionReveal distance={18} delay={0.08}>
            <InteractiveCard>
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
            </InteractiveCard>
          </SectionReveal>
        </div>
      </MotionScope>
    </section>
  );
}
