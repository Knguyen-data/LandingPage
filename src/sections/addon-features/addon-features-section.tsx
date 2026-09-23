'use client';

import { SectionLeadCta } from '@/components/section-lead-cta';
import { DashbookingLandingAddonDepositDemo } from '@/sections/addon-features/addon-deposit-demo';
import { DashbookingLandingAddonGiftCardDemo } from '@/sections/addon-features/addon-gift-card-demo';
import { MotionScope, SectionReveal } from '@/components/motion-primitives';
import { useDashbookingAddonFeatureSequence } from '@/sections/addon-features/use-addon-features';
import type { LandingContent } from '@/content/types';

interface DashbookingLandingAddonFeaturesSectionProps {
  readonly content: LandingContent;
}

export function DashbookingLandingAddonFeaturesSection({ content }: DashbookingLandingAddonFeaturesSectionProps) {
  const copy = content.addonFeatures;
  const { activePanel, giftPhase, depositPhase, rootRef } = useDashbookingAddonFeatureSequence();

  return (
    <section
      id="addon-features"
      className="addon-features section-shell"
      aria-label={copy.ariaLabel}
      ref={rootRef}
      data-active={activePanel}
    >
      <MotionScope>
        <div className="container addon-features__inner">
          <SectionReveal className="addon-features__header">
            <span className="addon-features__eyebrow">{copy.eyebrow}</span>
            <h2 className="addon-features__title">
              <span>{copy.titleLead}</span>
              {' '}
              <span>{copy.titleAccent}</span>
            </h2>
            <div className="addon-features__notes">
              <p className="addon-features__note">{copy.handwrittenLeft}</p>
              <p className="addon-features__note addon-features__note--right">{copy.handwrittenRight}</p>
            </div>
          </SectionReveal>

          <div className="addon-features__panels">
            <SectionReveal>
              <DashbookingLandingAddonGiftCardDemo
                copy={copy.giftCard}
                phase={giftPhase}
                playing={activePanel === 'gift'}
              />
            </SectionReveal>
            <SectionReveal delay={0.08}>
              <DashbookingLandingAddonDepositDemo
                copy={copy.deposit}
                phase={depositPhase}
                playing={activePanel === 'deposit'}
              />
            </SectionReveal>
          </div>
        </div>
        <SectionLeadCta locale={content.locale} section="addons" />
      </MotionScope>
    </section>
  );
}
