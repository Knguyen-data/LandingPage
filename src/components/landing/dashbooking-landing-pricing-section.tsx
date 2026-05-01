'use client';

import { AnimatePresence, useReducedMotion } from 'motion/react';
import * as m from 'motion/react-m';
import { useState } from 'react';

import type { LandingContent } from '@/content/landing/dashbooking-landing-content-types';
import { trustMarketFlags } from '@/content/landing/dashbooking-landing-shared-data';
import { MotionScope, RevealGroup, RevealItem } from '@/components/landing/dashbooking-landing-motion-primitives';

const priceTransitionEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

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
  const reducedMotion = useReducedMotion();
  const selectedTier = content.pricing.tiers[selectedTierIndex] ?? content.pricing.tiers[0];

  if (!selectedTier) {
    return null;
  }

  const selectedPrice = getPriceParts(selectedTier.price);
  const selectionState = reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0.94, y: 8 };

  return (
    <section id="pricing" className="section-shell">
      <MotionScope>
        <RevealGroup className="container pricing-shell stack-lg" stagger={0.05}>
          <RevealItem>
            <div className="stack-sm pricing-shell__header">
              <h2 className="title-lg">{content.pricing.title}</h2>
              {content.pricing.supportLine ? <p className="pricing-shell__support-line">{content.pricing.supportLine}</p> : null}
            </div>
          </RevealItem>
          <RevealItem>
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
          </RevealItem>
          <RevealItem>
            <AnimatePresence initial={false} mode="wait">
              <m.div
                key={selectedTier.range}
                className="pricing-selection stack-sm"
                aria-live="polite"
                initial={selectionState}
                animate={{ opacity: 1, y: 0 }}
                exit={selectionState}
                transition={{ duration: reducedMotion ? 0.01 : 0.2, ease: priceTransitionEase }}
              >
                <p className="pricing-selection__range">{selectedTier.range}</p>
                <p className="pricing-selection__price">
                  <span>{selectedPrice.amount}</span>
                  {selectedPrice.suffix ? <small>{selectedPrice.suffix}</small> : null}
                </p>
                <p className="pricing-shell__sms-note">{content.pricing.smsNote}</p>
                <p className="pricing-shell__processing-fee">{content.pricing.processingFeeNote}</p>
              </m.div>
            </AnimatePresence>
          </RevealItem>
          <RevealItem>
            <RevealGroup className="pricing-stats" role="list" aria-label={content.trust.statsAriaLabel} stagger={0.04}>
              {content.trust.stats.map((stat) => (
                <RevealItem key={stat.label} role="listitem">
                  <article className="pricing-stat surface-card">
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </article>
                </RevealItem>
              ))}
            </RevealGroup>
          </RevealItem>
          <RevealItem>
            <div className="pricing-market-flags" aria-hidden="true">
              {trustMarketFlags.map((market) => (
                <span key={market.country} className="pricing-market-flag" title={market.country}>
                  {market.flag}
                </span>
              ))}
            </div>
          </RevealItem>
        </RevealGroup>
      </MotionScope>
    </section>
  );
}
