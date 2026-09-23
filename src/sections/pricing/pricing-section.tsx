'use client';

import { SectionLeadCta } from '@/components/section-lead-cta';
import { AnimatePresence, useReducedMotion } from 'motion/react';
import * as m from 'motion/react-m';
import { Check } from 'lucide-react';
import { useState } from 'react';

import type { LandingContent } from '@/content/types';
import { trustMarketFlags } from '@/content/shared';
import { MotionScope, RevealGroup, RevealItem } from '@/components/motion-primitives';

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
    <section id="pricing" className="section-shell pricing">
      <MotionScope>
        <RevealGroup className="container pricing-shell" stagger={0.05}>
          <RevealItem>
            <div className="pricing-shell__header">
              <h2 className="pricing-shell__title">{content.pricing.title}</h2>
              {content.pricing.supportLine ? (
                <p className="pricing-shell__support-line">{content.pricing.supportLine}</p>
              ) : null}
            </div>
          </RevealItem>
          <RevealItem>
            <div className="pricing-volume">
              <p className="pricing-volume__label" id="pricing-volume-label">
                {content.pricing.volumeLabel}
              </p>
              <div
                className="pricing-selector"
                role="group"
                aria-labelledby="pricing-volume-label"
                aria-label={content.pricing.selectorAriaLabel}
              >
                {content.pricing.tiers.map((tier, index) => {
                  const active = index === selectedTierIndex;

                  return (
                    <button
                      key={tier.selectorLabel}
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
            </div>
          </RevealItem>
          <RevealItem>
            <AnimatePresence mode="wait">
              <m.div
                key={selectedTier.selectorLabel}
                className="pricing-selection"
                initial={selectionState}
                animate={{ opacity: 1, y: 0 }}
                exit={selectionState}
                transition={{ duration: reducedMotion ? 0 : 0.28, ease: priceTransitionEase }}
              >
                <p className="pricing-selection__range">{selectedTier.range}</p>
                <p className="pricing-selection__price">
                  <span>{selectedPrice.amount}</span>
                  {selectedPrice.suffix ? <small>{selectedPrice.suffix}</small> : null}
                </p>
                <p className="pricing-selection__detail">{selectedTier.detail}</p>
                {content.pricing.trustChips.length > 0 ? (
                  <ul className="pricing-trust-chips">
                    {content.pricing.trustChips.map((chip) => (
                      <li key={chip}>
                        <Check size={15} strokeWidth={2.6} aria-hidden="true" />
                        <span>{chip}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                <p className="pricing-shell__sms-note">{content.pricing.smsNote}</p>
                <p className="pricing-shell__processing-fee">{content.pricing.processingFeeNote}</p>
              </m.div>
            </AnimatePresence>
          </RevealItem>
          <RevealItem>
            <RevealGroup className="pricing-stats" role="list" aria-label={content.trust.statsAriaLabel} stagger={0.04}>
              {content.trust.stats.map((stat) => (
                <RevealItem key={stat.label} role="listitem">
                  <article className="pricing-stat">
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
        <SectionLeadCta locale={content.locale} section="pricing" />
      </MotionScope>
    </section>
  );
}
