'use client';

import { useState } from 'react';

import type { LandingContent } from '@/content/landing/dashbooking-landing-content-types';
import { trustMarketFlags } from '@/content/landing/dashbooking-landing-shared-data';

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
        <div className="stack-sm pricing-shell__header">
          <h2 className="title-lg">{content.pricing.title}</h2>
          {content.pricing.supportLine ? <p className="pricing-shell__support-line">{content.pricing.supportLine}</p> : null}
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
          <p className="pricing-shell__processing-fee">{content.pricing.processingFeeNote}</p>
        </div>
        <div className="pricing-stats" role="list" aria-label={content.trust.statsAriaLabel}>
          {content.trust.stats.map((stat) => (
            <article key={stat.label} className="pricing-stat surface-card" role="listitem">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </article>
          ))}
        </div>
        <div className="pricing-market-flags" aria-hidden="true">
          {trustMarketFlags.map((market) => (
            <span key={market.country} className="pricing-market-flag" title={market.country}>
              {market.flag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
