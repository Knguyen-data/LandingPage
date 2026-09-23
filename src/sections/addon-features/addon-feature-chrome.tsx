import type { ReactNode } from 'react';

import type { AddonFeatureBenefit, AddonFeatureStepCopy } from '@/content/types';

interface AddonFeatureStepRailProps {
  readonly steps: readonly AddonFeatureStepCopy[];
  readonly activeIndex: number;
}

interface AddonFeatureBenefitsProps {
  readonly benefits: readonly AddonFeatureBenefit[];
  readonly activeIndex: number;
  readonly icons: readonly ReactNode[];
}

export function AddonFeatureStepRail({ steps, activeIndex }: AddonFeatureStepRailProps) {
  return (
    <ol className="addon-feature__steps">
      {steps.map((step, index) => {
        const state = index === activeIndex ? 'is-active' : index < activeIndex ? 'is-done' : 'is-upcoming';
        return (
          <li key={step.id} className={`addon-feature__step ${state}`}>
            {index > 0 ? <span className={index <= activeIndex ? 'addon-feature__connector is-filled' : 'addon-feature__connector'} /> : null}
            <span className="addon-feature__index">{index + 1}</span>
            <span className="addon-feature__step-copy">
              <strong>{step.label}</strong>
              <b>{step.shortLabel}</b>
              <small>{step.detail}</small>
            </span>
          </li>
        );
      })}
    </ol>
  );
}

export function AddonFeatureBenefits({ benefits, activeIndex, icons }: AddonFeatureBenefitsProps) {
  return (
    <ul className="addon-feature__benefits">
      {benefits.map((benefit, index) => (
        <li key={benefit.title} className={index === activeIndex ? 'is-active' : undefined}>
          <span>{icons[index]}</span>
          <div>
            <strong>{benefit.title}</strong>
            <small>{benefit.body}</small>
          </div>
        </li>
      ))}
    </ul>
  );
}
