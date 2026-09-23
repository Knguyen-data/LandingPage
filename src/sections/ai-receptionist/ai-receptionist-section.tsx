'use client';

import { SectionLeadCta } from '@/components/section-lead-cta';
import { useState } from 'react';
import { CalendarCheck, Clock, PhoneCall } from 'lucide-react';

import { DashbookingLandingAiReceptionistCallDemo } from '@/sections/ai-receptionist/ai-receptionist-call-demo';
import { DashbookingLandingAiReceptionistScenarioCards } from '@/sections/ai-receptionist/ai-receptionist-scenario-cards';
import { MotionScope, SectionReveal } from '@/components/motion-primitives';
import type { AiReceptionistScenarioId, LandingContent } from '@/content/types';

interface DashbookingLandingAiReceptionistSectionProps {
  readonly content: LandingContent;
}

const benefitIcons = [PhoneCall, CalendarCheck, Clock] as const;

export function DashbookingLandingAiReceptionistSection({
  content,
}: DashbookingLandingAiReceptionistSectionProps) {
  const copy = content.aiReceptionist;
  const [activeScenarioId, setActiveScenarioId] = useState<AiReceptionistScenarioId | null>(null);
  const [pauseSignal, setPauseSignal] = useState(0);

  return (
    <section id="ai-receptionist" className="ai-call section-shell" aria-label={copy.ariaLabel}>
      <MotionScope>
        <div className="container ai-call__inner">
          <SectionReveal className="ai-call__header">
            <span className="eyebrow">{copy.eyebrow}</span>
            <h2 className="ai-call__title">
              <span>{copy.headlineLead}</span>
              <span className="ai-call__title-accent">{copy.headlineAccent}</span>
            </h2>
            <p className="ai-call__subtitle">{copy.subtitle}</p>
          </SectionReveal>

          <SectionReveal className="ai-call__copy">
            <ul className="ai-call__benefits">
              {copy.benefits.map((benefit, index) => {
                const Icon = benefitIcons[index] ?? PhoneCall;
                return (
                  <li key={benefit.title}>
                    <span aria-hidden="true">
                      <Icon size={18} strokeWidth={2.2} />
                    </span>
                    <div>
                      <strong>{benefit.title}</strong>
                      <p>{benefit.body}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </SectionReveal>

          <SectionReveal className="ai-call__demo" delay={0.08}>
            <DashbookingLandingAiReceptionistCallDemo
              content={copy}
              pauseSignal={pauseSignal}
              onPlayStart={() => setActiveScenarioId(null)}
            />
          </SectionReveal>

          <SectionReveal className="ai-call__aside" delay={0.1}>
            <DashbookingLandingAiReceptionistScenarioCards
              content={copy}
              activeId={activeScenarioId}
              onPlay={(id) => {
                setPauseSignal((value) => value + 1);
                setActiveScenarioId(id);
              }}
              onStop={() => setActiveScenarioId(null)}
            />
          </SectionReveal>
        </div>
        <SectionLeadCta locale={content.locale} section="ai" />
      </MotionScope>
    </section>
  );
}
