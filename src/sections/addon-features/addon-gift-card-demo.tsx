'use client';

import { useEffect, useState } from 'react';

import {
  AddonFeatureBenefits,
  AddonFeatureStepRail,
} from '@/sections/addon-features/addon-feature-chrome';
import {
  AddonCoinsBenefitIcon,
  AddonGiftCardIcon,
  AddonGiftMark,
  AddonMailBenefitIcon,
  AddonNoCardBenefitIcon,
} from '@/sections/addon-features/addon-feature-icons';
import type { AddonGiftCardPhase } from '@/content/demo/addon-features';
import type { AddonGiftCardPanelContent } from '@/content/types';

const giftCardStepOrder: readonly AddonGiftCardPhase[] = ['purchase', 'generate', 'email', 'balance'];

const giftBenefitIcons = [
  <AddonMailBenefitIcon key="mail" />,
  <AddonNoCardBenefitIcon key="none" />,
  <AddonCoinsBenefitIcon key="coins" />,
];

function formatBalance(value: number) {
  return `$${value.toFixed(2)}`;
}

function useGiftCardCountUp(phase: AddonGiftCardPhase, target: number) {
  const active = phase === 'balance' || phase === 'hold';
  const [value, setValue] = useState(active ? target : 0);

  useEffect(() => {
    let frame = 0;
    if (!active) {
      frame = requestAnimationFrame(() => {
        setValue(0);
      });
      return () => cancelAnimationFrame(frame);
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      frame = requestAnimationFrame(() => {
        setValue(target);
      });
      return () => cancelAnimationFrame(frame);
    }

    let start: number | null = null;
    const tick = (now: number) => {
      if (start === null) {
        start = now;
      }
      const progress = Math.min(1, (now - start) / 500);
      setValue(target * progress);
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target]);

  return formatBalance(value);
}

interface DashbookingLandingAddonGiftCardDemoProps {
  readonly copy: AddonGiftCardPanelContent;
  readonly phase: AddonGiftCardPhase;
  readonly playing: boolean;
}

export function DashbookingLandingAddonGiftCardDemo({
  copy,
  phase,
  playing,
}: DashbookingLandingAddonGiftCardDemoProps) {
  const stepIndex = Math.max(0, giftCardStepOrder.indexOf(phase === 'hold' ? 'balance' : phase));
  const countedBalance = useGiftCardCountUp(playing ? phase : 'hold', 50);
  const benefitActive = phase === 'balance' || phase === 'hold' ? 2 : phase === 'email' ? 0 : -1;

  return (
    <article
      className={playing ? 'addon-feature-panel is-playing' : 'addon-feature-panel is-resting'}
      data-step={phase}
    >
      <header className="addon-feature-panel__head">
        <span className="addon-feature-panel__icon" data-pulse={playing && phase === 'generate' ? 'true' : undefined}>
          <AddonGiftCardIcon size={56} />
        </span>
        <div>
          <h3>{copy.title}</h3>
          <p>{copy.tagline}</p>
        </div>
      </header>

      <AddonFeatureStepRail steps={copy.steps} activeIndex={stepIndex} />

      <div className="addon-gift__stage" aria-hidden="true">
        <article className="addon-gift__scene addon-gift__scene--purchase">
          <p className="addon-gift__scene-title">{copy.purchaseTitle}</p>
          <span className="addon-gift__label">{copy.amountLabel}</span>
          <div className="addon-gift__amounts">
            {copy.amounts.map((amount) => (
              <em key={amount} className={amount === copy.selectedAmount ? 'is-selected' : undefined}>
                {amount}
              </em>
            ))}
          </div>
          <label>
            <span>{copy.recipientNameLabel}</span>
            <b>{copy.recipientNamePlaceholder}</b>
          </label>
          <label>
            <span>{copy.recipientEmailLabel}</span>
            <b>{copy.recipientEmailPlaceholder}</b>
          </label>
          <label>
            <span>{copy.messageLabel}</span>
            <b>{copy.messagePlaceholder}</b>
          </label>
          <span className="addon-gift__cta">{copy.continueLabel}</span>
        </article>

        <article className="addon-gift__scene addon-gift__scene--card">
          <div className="addon-gift__card-face">
            <AddonGiftMark size={34} />
            <small>{copy.giftCardCaption}</small>
            <strong>{copy.giftCardAmount}</strong>
          </div>
          <p className="addon-gift__note">{copy.giftCardNote}</p>
        </article>

        <div className="addon-gift__flight" aria-hidden="true">
          <svg className="addon-gift__path" viewBox="0 0 160 72" fill="none">
            <path d="M8 36C48 8 112 64 152 36" stroke="currentColor" strokeWidth="2" strokeDasharray="5 6" />
          </svg>
          <span className="addon-gift__traveler" />
        </div>

        <article className="addon-gift__scene addon-gift__scene--inbox">
          <div className="addon-gift__inbox-top">
            <span>{copy.inboxLabel}</span>
            <small>{copy.inboxTime}</small>
          </div>
          <strong>{copy.inboxTitle}</strong>
          <div className="addon-gift__inbox-gift">
            <AddonGiftMark size={22} />
            <span>{copy.inboxAmountLabel}</span>
          </div>
          <em>{phase === 'email' || phase === 'balance' || phase === 'hold' ? copy.deliveredLabel : copy.viewGiftCardLabel}</em>
        </article>

        <article className="addon-gift__scene addon-gift__scene--balance">
          <p className="addon-gift__scene-title">{copy.balanceTitle}</p>
          <strong className="addon-gift__balance">{phase === 'balance' ? countedBalance : copy.balanceAmount}</strong>
          <p>
            <span />
            {copy.shopServicesLabel}
          </p>
          <p>
            <span />
            {copy.applyCheckoutLabel}
          </p>
          <small>
            {copy.remainingLabel} {copy.remainingAmount}
          </small>
        </article>
      </div>

      <AddonFeatureBenefits benefits={copy.benefits} activeIndex={benefitActive} icons={giftBenefitIcons} />
    </article>
  );
}
