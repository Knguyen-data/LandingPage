'use client';

import Image from '@/components/viewport-image';

import {
  AddonFeatureBenefits,
  AddonFeatureStepRail,
} from '@/sections/addon-features/addon-feature-chrome';
import {
  AddonGearBenefitIcon,
  AddonOnlineDepositIcon,
  AddonPeopleBenefitIcon,
  AddonShieldBenefitIcon,
} from '@/sections/addon-features/addon-feature-icons';
import type { AddonDepositPhase } from '@/content/demo/addon-features';
import type { AddonDepositPanelContent } from '@/content/types';
import { heroBusinessProfilePhotos } from '@/content/shared';

const depositStepOrder: readonly AddonDepositPhase[] = ['setup', 'booking', 'payment', 'confirmed'];

const depositBenefitIcons = [
  <AddonPeopleBenefitIcon key="people" />,
  <AddonGearBenefitIcon key="gear" />,
  <AddonShieldBenefitIcon key="shield" />,
];

interface DashbookingLandingAddonDepositDemoProps {
  readonly copy: AddonDepositPanelContent;
  readonly phase: AddonDepositPhase;
  readonly playing: boolean;
}

export function DashbookingLandingAddonDepositDemo({
  copy,
  phase,
  playing,
}: DashbookingLandingAddonDepositDemoProps) {
  const stepIndex = Math.max(0, depositStepOrder.indexOf(phase === 'hold' ? 'confirmed' : phase));
  const benefitActive = phase === 'confirmed' || phase === 'hold' ? 0 : phase === 'setup' ? 1 : 2;
  const toggleClassName =
    playing && phase === 'setup' ? 'addon-deposit__toggle is-turning-on' : 'addon-deposit__toggle is-on';
  const servicePhoto = heroBusinessProfilePhotos[0];

  return (
    <article
      className={playing ? 'addon-feature-panel is-playing' : 'addon-feature-panel is-resting'}
      data-step={phase}
    >
      <header className="addon-feature-panel__head">
        <span className="addon-feature-panel__icon">
          <AddonOnlineDepositIcon size={56} />
        </span>
        <div>
          <h3>{copy.title}</h3>
          <p>{copy.tagline}</p>
        </div>
      </header>

      <AddonFeatureStepRail steps={copy.steps} activeIndex={stepIndex} />

      <div className="addon-deposit__stage" aria-hidden="true">
        <article className="addon-deposit__scene addon-deposit__scene--setup">
          <div className="addon-deposit__toggle-row">
            <strong>{copy.enableLabel}</strong>
            <span className={toggleClassName}>
              <i />
            </span>
          </div>
          <p className="addon-deposit__hint">{copy.requiredLabel}</p>
          <label className="addon-deposit__check is-on">
            <i />
            {copy.individualLabel}
          </label>
          <label className="addon-deposit__check">
            <i />
            {copy.groupLabel}
          </label>
          <div className="addon-deposit__field">
            <span>{copy.depositAmountLabel}</span>
            <b>
              <em>$</em>
              {copy.depositAmountValue}
            </b>
          </div>
          <div className="addon-deposit__field">
            <span>{copy.depositRateLabel}</span>
            <b>{copy.depositRateValue}</b>
          </div>
          <div className="addon-deposit__field">
            <span>{copy.applyForLabel}</span>
            <b>{copy.applyForValue}</b>
          </div>
        </article>

        <article className="addon-deposit__scene addon-deposit__scene--booking">
          <div className="addon-deposit__booking-top">
            <strong>{copy.bookingTitle}</strong>
            <small>{copy.bookingEditLabel}</small>
          </div>
          <div className="addon-deposit__service">
            {servicePhoto ? (
              <Image src={servicePhoto} alt="" width={72} height={72} />
            ) : null}
            <div>
              <b>{copy.serviceName}</b>
              <small>{copy.serviceMeta}</small>
            </div>
          </div>
          <p className="addon-deposit__required">
            <span />
            {copy.depositRequiredLabel}
            <strong>{copy.depositRequiredAmount}</strong>
          </p>
          <span className="addon-deposit__cta">{copy.proceedLabel}</span>
        </article>

        <article className="addon-deposit__scene addon-deposit__scene--payment">
          <div className="addon-deposit__booking-top">
            <strong>{copy.paymentTitle}</strong>
            <small>{copy.secureLabel}</small>
          </div>
          <p className="addon-deposit__card-mask">{copy.cardMask}</p>
          <b className="addon-deposit__pay-amount">{copy.payDepositAmount}</b>
          <span className="addon-deposit__cta addon-deposit__cta--pulse">{copy.payDepositLabel}</span>
          <small className="addon-deposit__secure-note">{copy.paymentNote}</small>
        </article>

        <article className="addon-deposit__scene addon-deposit__scene--confirmed">
          <span className="addon-deposit__check-badge">
            <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
              <circle cx="24" cy="24" r="20" />
              <path className="addon-deposit__check-path" d="M15 24.5 21.2 30.5 33 17.5" />
            </svg>
          </span>
          <strong>{copy.confirmedTitle}</strong>
          <p>{copy.confirmedBody}</p>
          <span className="addon-deposit__cta">{copy.viewBookingLabel}</span>
          <em>{copy.addToCalendarLabel}</em>
        </article>
      </div>

      <AddonFeatureBenefits benefits={copy.benefits} activeIndex={benefitActive} icons={depositBenefitIcons} />
    </article>
  );
}
