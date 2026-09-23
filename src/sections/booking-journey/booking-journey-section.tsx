'use client';

import { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

import { DashbookingLandingBookingJourneyConnectors } from '@/sections/booking-journey/booking-journey-connectors';
import { DashbookingLandingBookingJourneyNode } from '@/sections/booking-journey/booking-journey-node';
import { MotionScope, SectionReveal } from '@/components/motion-primitives';
import { useDashbookingBookingJourney } from '@/sections/booking-journey/use-booking-journey';
import type { LandingContent } from '@/content/types';

interface DashbookingLandingBookingJourneySectionProps {
  readonly content: LandingContent;
}

export function DashbookingLandingBookingJourneySection({
  content,
}: DashbookingLandingBookingJourneySectionProps) {
  const {
    setRootEl,
    connectorIndex,
    settled,
    reducedMotion,
    muted,
    selectNode,
    nodeStatus,
    unlockAudio,
    toggleMuted,
  } = useDashbookingBookingJourney();
  const [boardEl, setBoardEl] = useState<HTMLElement | null>(null);
  const journey = content.bookingJourney;

  return (
    <section
      ref={setRootEl}
      id="booking-journey"
      className="booking-journey section-shell"
      aria-label={journey.ariaLabel}
      onPointerDown={unlockAudio}
    >
      <MotionScope>
        <div className="container booking-journey__inner">
          <SectionReveal className="booking-journey__header">
            <h2 className="booking-journey__title">
              <span>{journey.titleLead}</span>
              <span className="booking-journey__title-accent">{journey.titleAccent}</span>
            </h2>
            {reducedMotion ? null : (
              <button
                type="button"
                className="booking-journey__mute"
                onClick={toggleMuted}
                aria-pressed={muted}
              >
                {muted ? <VolumeX size={16} strokeWidth={2.2} /> : <Volume2 size={16} strokeWidth={2.2} />}
                {muted ? journey.unmuteLabel : journey.muteLabel}
              </button>
            )}
          </SectionReveal>

          <div ref={setBoardEl} className="booking-journey__board">
            <DashbookingLandingBookingJourneyConnectors
              boardElement={boardEl}
              connectorIndex={connectorIndex}
              settled={settled}
              reducedMotion={reducedMotion}
            />
            <ol className="booking-journey__row booking-journey__row--top">
              {journey.nodes.slice(0, 4).map((node, index) => (
                <li key={node.id}>
                  <DashbookingLandingBookingJourneyNode
                    index={index}
                    node={node}
                    content={journey}
                    status={nodeStatus(index)}
                    reducedMotion={reducedMotion}
                    onSelect={selectNode}
                  />
                </li>
              ))}
            </ol>
            <ol className="booking-journey__row booking-journey__row--bottom">
              {journey.nodes.slice(4).map((node, index) => (
                <li key={node.id}>
                  <DashbookingLandingBookingJourneyNode
                    index={index + 4}
                    node={node}
                    content={journey}
                    status={nodeStatus(index + 4)}
                    reducedMotion={reducedMotion}
                    onSelect={selectNode}
                  />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </MotionScope>
    </section>
  );
}
