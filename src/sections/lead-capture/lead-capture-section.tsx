'use client';

import { useState } from 'react';

import { DashbookingLandingLeadCaptureForm } from '@/sections/lead-capture/lead-capture-form';
import { DashbookingLandingLeadCaptureVisual } from '@/sections/lead-capture/lead-capture-visual';
import { MotionScope, SectionReveal } from '@/components/motion-primitives';
import type { LandingContent } from '@/content/types';

interface DashbookingLandingLeadCaptureSectionProps {
  readonly content: LandingContent;
}

export function DashbookingLandingLeadCaptureSection({ content }: DashbookingLandingLeadCaptureSectionProps) {
  const copy = content.leadCapture;
  const [submitted, setSubmitted] = useState(false);

  return (
    <section
      id="lead-capture"
      className={submitted ? 'lead-capture section-shell is-submitted' : 'lead-capture section-shell'}
      aria-label={copy.ariaLabel}
    >
      <MotionScope>
        <div className="container lead-capture__inner">
          <SectionReveal className="lead-capture__visual-wrap">
            <DashbookingLandingLeadCaptureVisual copy={copy} submitted={submitted} />
          </SectionReveal>
          <SectionReveal className="lead-capture__card surface-card" delay={0.06}>
            <DashbookingLandingLeadCaptureForm
              copy={copy}
              submitted={submitted}
              onSubmitted={() => setSubmitted(true)}
            />
          </SectionReveal>
        </div>
      </MotionScope>
    </section>
  );
}
