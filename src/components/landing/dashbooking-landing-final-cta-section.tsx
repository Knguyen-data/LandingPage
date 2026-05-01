import { partnerWithUsUrl } from '@/content/landing/dashbooking-landing-shared-data';
import type { LandingContent } from '@/content/landing/dashbooking-landing-content-types';

interface DashbookingLandingFinalCtaSectionProps {
  readonly content: LandingContent;
}

export function DashbookingLandingFinalCtaSection({
  content,
}: DashbookingLandingFinalCtaSectionProps) {
  return (
    <section className="section-shell">
      <div className="container surface-card final-cta-card stack-lg">
        <div className="stack-md final-cta-card__copy">
          <h2 className="title-lg">{content.finalCta.title}</h2>
        </div>
        <div className="landing-hero__cta-row">
          <a href={partnerWithUsUrl} className="button-link">
            {content.finalCta.primaryCta}
          </a>
          <a href="#ai-receptionist" className="button-link button-link--secondary">
            {content.finalCta.secondaryCta}
          </a>
        </div>
      </div>
    </section>
  );
}
