'use client';

import type { CSSProperties } from 'react';
import Image from '@/components/viewport-image';
import { Check, Clock, MessageCircle, TrendingUp, UserRound } from 'lucide-react';

import type { LeadCaptureSectionContent } from '@/content/types';
import { leadCaptureAssets } from '@/content/shared';

interface DashbookingLandingLeadCaptureVisualProps {
  readonly copy: LeadCaptureSectionContent;
  readonly submitted: boolean;
}

const confettiPieces = [
  { dx: '-72px', dy: '-58px', rot: '-28deg', delay: '40ms' },
  { dx: '68px', dy: '-62px', rot: '24deg', delay: '70ms' },
  { dx: '-48px', dy: '-86px', rot: '12deg', delay: '20ms' },
  { dx: '86px', dy: '-28px', rot: '-16deg', delay: '110ms' },
  { dx: '-92px', dy: '-8px', rot: '32deg', delay: '90ms' },
  { dx: '42px', dy: '-94px', rot: '-8deg', delay: '50ms' },
  { dx: '-28px', dy: '-70px', rot: '18deg', delay: '60ms' },
  { dx: '96px', dy: '-48px', rot: '-22deg', delay: '130ms' },
  { dx: '-78px', dy: '-42px', rot: '8deg', delay: '80ms' },
  { dx: '18px', dy: '-98px', rot: '26deg', delay: '30ms' },
  { dx: '74px', dy: '-14px', rot: '-30deg', delay: '100ms' },
  { dx: '-54px', dy: '18px', rot: '14deg', delay: '150ms' },
  { dx: '58px', dy: '12px', rot: '-12deg', delay: '120ms' },
  { dx: '-16px', dy: '-108px', rot: '6deg', delay: '45ms' },
  { dx: '32px', dy: '-76px', rot: '-18deg', delay: '85ms' },
  { dx: '-88px', dy: '-64px', rot: '20deg', delay: '95ms' },
] as const;

const chipIcons = [Clock, UserRound, MessageCircle] as const;

export function DashbookingLandingLeadCaptureVisual({ copy, submitted }: DashbookingLandingLeadCaptureVisualProps) {
  return (
    <div className={submitted ? 'lead-capture__visual is-submitted' : 'lead-capture__visual'} data-state={submitted ? 'submitted' : 'idle'}>
      <div className="lead-capture__visual-before" aria-hidden={submitted}>
        <div className="lead-capture__copy">
          <h2 className="lead-capture__visual-title">
            <span>{copy.visualHeadlineLead} </span>
            <span className="lead-capture__visual-title-accent">{copy.visualHeadlineAccent}</span>
            <span> {copy.visualHeadlineTail}</span>
          </h2>
          <ul className="lead-capture__visual-bullets">
            {copy.visualBullets.map((bullet) => (
              <li key={bullet}>
                <span className="lead-capture__bullet-icon" aria-hidden="true">
                  <Check size={11} strokeWidth={3.2} />
                </span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          {copy.visualNote ? <p className="lead-capture__visual-note">{copy.visualNote}</p> : null}
        </div>
        <div className="lead-capture__devices">
          <div className="lead-capture__phone">
            <Image
              src={leadCaptureAssets.phoneStorefront}
              alt={copy.phoneAlt}
              width={653}
              height={1439}
              sizes="(max-width: 959px) 120px, 200px"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
          <div className="lead-capture__tablet">
            <div className="lead-capture__badge">
              <TrendingUp size={16} strokeWidth={2.4} aria-hidden="true" />
              <strong>{copy.visualBadgeLead}</strong>
              <span>{copy.visualBadgeTail}</span>
            </div>
            <Image
              src={leadCaptureAssets.tabletCalendar}
              alt={copy.tabletAlt}
              width={1109}
              height={1207}
              sizes="(max-width: 959px) 220px, 420px"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        </div>
      </div>

      <div className="lead-capture__visual-after" aria-hidden={!submitted} aria-live="polite">
        <div className="lead-capture__celebration">
          <span className="lead-capture__burst lead-capture__burst--left" aria-hidden="true" />
          <span className="lead-capture__burst lead-capture__burst--right" aria-hidden="true" />
          {confettiPieces.map((piece, index) => (
            <span
              key={`${piece.dx}-${piece.dy}`}
              className={`lead-capture__confetti lead-capture__confetti--${index % 6}`}
              style={{
                '--dx': piece.dx,
                '--dy': piece.dy,
                '--rot': piece.rot,
                animationDelay: piece.delay,
              } as CSSProperties}
              aria-hidden="true"
            />
          ))}
          <div className="lead-capture__envelope" aria-hidden="true">
            <svg viewBox="0 0 180 148" fill="none">
              <path d="M22 58h136v62c0 10-8 18-18 18H40c-10 0-18-8-18-18V58Z" fill="#D7EFF2" />
              <path d="M22 58h136v62c0 10-8 18-18 18H40c-10 0-18-8-18-18V58Z" stroke="#9ED4DC" strokeWidth="2" />
              <path d="M22 58 90 104 158 58" fill="#C7E7EC" stroke="#9ED4DC" strokeWidth="2" strokeLinejoin="round" />
              <rect x="48" y="18" width="84" height="78" rx="10" fill="#fff" stroke="#B7DCE3" strokeWidth="2" />
            </svg>
            <span className="lead-capture__check">
              <Check size={28} strokeWidth={2.8} />
            </span>
          </div>
        </div>
        <h3 className="lead-capture__success-title">
          <span>{copy.successKicker}</span>
          {copy.successTitle}
        </h3>
        <p className="lead-capture__success-body">{copy.successBody}</p>
        <ul className="lead-capture__chips">
          {copy.successChips.map((chip, index) => {
            const Icon = chipIcons[index] ?? Clock;
            return (
              <li key={chip.title}>
                <Icon size={18} strokeWidth={2.2} aria-hidden="true" />
                <span>
                  <strong>{chip.title}</strong>
                  {chip.body}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
