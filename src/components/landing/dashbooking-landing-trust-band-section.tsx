import Image from 'next/image';

import { googleLogo, trustMarketFlags } from '@/content/landing/dashbooking-landing-shared-data';
import type { LandingContent } from '@/content/landing/dashbooking-landing-content-types';

interface DashbookingLandingTrustBandSectionProps {
  readonly content: LandingContent;
}

export function DashbookingLandingTrustBandSection({
  content,
}: DashbookingLandingTrustBandSectionProps) {
  return (
    <section className="section-shell">
      <div className="container surface-card trust-band">
        <div className="stack-lg trust-band__intro">
          <div className="trust-band__partner-label">
            <Image src={googleLogo} alt={content.trust.logoAlt} width={172} height={58} className="trust-band__logo" />
            <span className="eyebrow">{content.trust.eyebrow}</span>
          </div>
          <h2 className="title-lg">{content.trust.title}</h2>
          <div className="trust-band__summary stack-md">
            <div className="trust-band__flags">
              {trustMarketFlags.map((market) => (
                <span
                  key={market.country}
                  className="trust-band__flag"
                  role="img"
                  aria-label={market.country}
                  title={market.country}
                >
                  {market.flag}
                </span>
              ))}
            </div>
            <div className="trust-band__stats" role="list" aria-label={content.trust.statsAriaLabel}>
              {content.trust.stats.map((stat) => (
                <article key={stat.label} className="trust-stat" role="listitem">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </article>
              ))}
            </div>
          </div>
          <a
            href={content.trust.partnerCtaHref}
            className="button-link button-link--secondary trust-band__cta"
            target="_blank"
            rel="noreferrer"
          >
            {content.trust.partnerCtaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
