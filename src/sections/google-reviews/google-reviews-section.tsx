'use client';

import Image from '@/components/viewport-image';
import { BarChart3, Gift, UserRound, Zap } from 'lucide-react';

import { DashbookingLandingGoogleReviewsDemo } from '@/sections/google-reviews/google-reviews-demo';
import { MotionScope, SectionReveal } from '@/components/motion-primitives';
import type { GoogleReviewsBenefitId, LandingContent } from '@/content/types';
import { googleReviewsLetterColors } from '@/content/demo/google-reviews';
import { googleLogo } from '@/content/shared';

interface DashbookingLandingGoogleReviewsSectionProps {
  readonly content: LandingContent;
}

const benefitIcons: Record<GoogleReviewsBenefitId, typeof Zap> = {
  'auto-reply': Zap,
  'maps-seo': BarChart3,
  'google-connect': UserRound,
  included: Gift,
};

function GoogleColoredWord({ word }: { readonly word: string }) {
  return (
    <span className="google-reviews__google" aria-label={word}>
      {Array.from(word).map((letter, index) => (
        <span
          key={`${letter}-${index}`}
          style={{ color: googleReviewsLetterColors[index % googleReviewsLetterColors.length] }}
        >
          {letter}
        </span>
      ))}
    </span>
  );
}

export function DashbookingLandingGoogleReviewsSection({
  content,
}: DashbookingLandingGoogleReviewsSectionProps) {
  const copy = content.googleReviews;

  return (
    <section id="google-reviews" className="google-reviews section-shell" aria-label={copy.ariaLabel}>
      <MotionScope>
        <div className="container google-reviews__inner">
          <SectionReveal className="google-reviews__copy">
            <span className="google-reviews__eyebrow">
              <Image src={googleLogo} alt="" width={16} height={16} />
              {copy.eyebrow}
            </span>
            <h2 className="google-reviews__title">
              <span className="google-reviews__title-lead">{copy.headlineLead}</span>
              <span className="google-reviews__title-accent">
                <GoogleColoredWord word={copy.headlineGoogle} />
                {copy.headlineTail ? ` ${copy.headlineTail}` : null}
              </span>
            </h2>
            <p className="google-reviews__subtitle">{copy.subtitle}</p>
          </SectionReveal>

          <SectionReveal className="google-reviews__demo" delay={0.08}>
            <DashbookingLandingGoogleReviewsDemo content={copy} />
          </SectionReveal>

          <SectionReveal className="google-reviews__benefits-wrap" delay={0.1}>
            <ul className="google-reviews__benefits">
              {copy.benefits.map((benefit) => {
                const Icon = benefitIcons[benefit.id];
                const included = benefit.id === 'included';
                return (
                  <li
                    key={benefit.id}
                    className={included ? 'google-reviews__benefit is-included' : 'google-reviews__benefit'}
                  >
                    <span aria-hidden="true">
                      <Icon size={18} strokeWidth={2.2} />
                    </span>
                    <div>
                      <strong>{benefit.title}</strong>
                      {benefit.body ? <p>{benefit.body}</p> : null}
                    </div>
                  </li>
                );
              })}
            </ul>
          </SectionReveal>
        </div>
      </MotionScope>
    </section>
  );
}
