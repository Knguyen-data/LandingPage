'use client';

import { useState } from 'react';

import { partnerWithUsUrl } from '@/content/landing/dashbooking-landing-shared-data';
import type { LandingContent } from '@/content/landing/dashbooking-landing-content-types';

interface DashbookingLandingPricingSectionProps {
  readonly content: LandingContent;
}

function getPriceParts(price: string) {
  const slashIndex = price.indexOf('/');

  if (slashIndex === -1) {
    return { amount: price, suffix: '' };
  }

  return {
    amount: price.slice(0, slashIndex).trim(),
    suffix: price.slice(slashIndex).trim(),
  };
}

export function DashbookingLandingPricingSection({
  content,
}: DashbookingLandingPricingSectionProps) {
  const [selectedTierIndex, setSelectedTierIndex] = useState(0);
  const selectedTier = content.pricing.tiers[selectedTierIndex] ?? content.pricing.tiers[0];

  if (!selectedTier) {
    return null;
  }

  const selectedPrice = getPriceParts(selectedTier.price);

  return (
    <section id="pricing" className="section-shell">
      <div className="container pricing-shell stack-lg">
        <span className="eyebrow">{content.pricing.eyebrow}</span>
        <div className="stack-sm pricing-shell__header">
          <h2 className="title-lg">{content.pricing.title}</h2>
          <p className="pricing-shell__support-line">{content.pricing.supportLine}</p>
        </div>
        <div className="pricing-selector" role="group" aria-label={content.pricing.selectorAriaLabel}>
          {content.pricing.tiers.map((tier, index) => {
            const active = selectedTierIndex === index;

            return (
              <button
                key={tier.range}
                type="button"
                className={active ? 'pricing-tier-button active' : 'pricing-tier-button'}
                aria-pressed={active}
                onClick={() => setSelectedTierIndex(index)}
              >
                {tier.selectorLabel}
              </button>
            );
          })}
        </div>
        <div className="pricing-selection stack-sm" aria-live="polite">
          <p className="pricing-selection__range">{selectedTier.range}</p>
          <p className="pricing-selection__price">
            <span>{selectedPrice.amount}</span>
            {selectedPrice.suffix ? <small>{selectedPrice.suffix}</small> : null}
          </p>
          <p className="pricing-shell__sms-note">{content.pricing.smsNote}</p>
          <a href={partnerWithUsUrl} className="button-link pricing-selection__cta">
            {content.pricing.ctaLabel}
          </a>
        </div>
        <div className="pricing-support-grid" role="list">
          <article className="surface-card pricing-support-card stack-sm" role="listitem">
            <span className="kicker">{content.pricing.chargedCard.title}</span>
            <ul className="landing-bullets landing-bullets--compact">
              {content.pricing.chargedCard.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="surface-card pricing-support-card stack-sm" role="listitem">
            <span className="kicker">{content.pricing.notChargedCard.title}</span>
            <ul className="landing-bullets landing-bullets--compact">
              {content.pricing.notChargedCard.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
        <p className="copy-sm text-muted pricing-footnote">{content.pricing.aiAddOnNote}</p>
      </div>
    </section>
  );
}
