'use client';

import Image from '@/components/viewport-image';
import { useEffect, useRef, useState } from 'react';
import {
  Check,
  CreditCard,
  DollarSign,
  FileText,
  Gift,
  RefreshCw,
  Scissors,
  Users,
  Zap,
} from 'lucide-react';

import { MotionScope, SectionReveal } from '@/components/motion-primitives';
import type { LandingContent, PosIntegrationSectionContent } from '@/content/types';
import { posIntegrationAssets } from '@/content/shared';

type PosTerminalId = 'clover' | 'poynt';
type PosDemoPhase =
  | 'idle'
  | 'card'
  | 'send'
  | 'receive'
  | 'process'
  | 'approved'
  | 'sync'
  | 'hold';

const posDemoBeats: readonly { readonly phase: PosDemoPhase; readonly ms: number }[] = [
  { phase: 'idle', ms: 800 },
  { phase: 'card', ms: 650 },
  { phase: 'send', ms: 950 },
  { phase: 'receive', ms: 850 },
  { phase: 'process', ms: 700 },
  { phase: 'approved', ms: 1400 },
  { phase: 'sync', ms: 900 },
  { phase: 'hold', ms: 2100 },
];

const cloverTerminalSize = { width: 1109, height: 1109 } as const;

const benefitIcons = [Zap, FileText, DollarSign, RefreshCw, Users] as const;

interface DashbookingLandingPosIntegrationSectionProps {
  readonly content: LandingContent;
}

function DashCheckout({
  copy,
  phase,
}: {
  readonly copy: PosIntegrationSectionContent;
  readonly phase: PosDemoPhase;
}) {
  const cardOn = phase !== 'idle';

  return (
    <div className="pos-demo__checkout">
      <p className="pos-demo__checkout-title">{copy.addPaymentLabel}</p>
      <div className="pos-demo__amount-row">
        <span>{copy.amount}</span>
        <button type="button" tabIndex={-1} aria-hidden="true">
          <Scissors size={16} strokeWidth={2.2} />
        </button>
      </div>
      <div className="pos-demo__pay-grid">
        <span>
          <DollarSign size={15} strokeWidth={2.2} />
          {copy.cashLabel}
        </span>
        <span className={cardOn ? 'is-card' : undefined}>
          <CreditCard size={15} strokeWidth={2.2} />
          {copy.cardLabel}
        </span>
        <span>
          <Gift size={15} strokeWidth={2.2} />
          {copy.giftCardLabel}
        </span>
        <span>
          {copy.otherLabel}
          <small>▾</small>
        </span>
      </div>
      <span className="pos-demo__wide">
        <Gift size={15} strokeWidth={2.2} />
        {copy.loyaltyLabel}
      </span>
      <span className="pos-demo__wide">
        <FileText size={15} strokeWidth={2.2} />
        {copy.promotionsLabel}
      </span>
    </div>
  );
}

function PosDemo({
  copy,
  terminal,
}: {
  readonly copy: PosIntegrationSectionContent;
  readonly terminal: PosTerminalId;
}) {
  const [phase, setPhase] = useState<PosDemoPhase>('idle');
  const rootRef = useRef<HTMLDivElement | null>(null);
  const inViewRef = useRef(false);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = Boolean(entry?.isIntersecting);
      },
      { threshold: 0.25 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      const reducedFrame = requestAnimationFrame(() => {
        setPhase('hold');
      });
      return () => cancelAnimationFrame(reducedFrame);
    }

    let beat = 0;
    let elapsed = 0;
    let last = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const delta = now - last;
      last = now;
      if (inViewRef.current) {
        elapsed += delta;
        const current = posDemoBeats[beat];
        if (current && elapsed >= current.ms) {
          elapsed = 0;
          beat = (beat + 1) % posDemoBeats.length;
          const next = posDemoBeats[beat];
          if (next) {
            setPhase(next.phase);
          }
        }
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame((now) => {
      setPhase('idle');
      last = now;
      frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }, [terminal]);

  const cloverLive = terminal === 'clover' && (phase === 'approved' || phase === 'sync' || phase === 'hold');

  return (
    <div className="pos-demo" data-phase={phase} data-terminal={terminal} ref={rootRef}>
      <DashCheckout copy={copy} phase={phase} />

      <div className="pos-demo__transfer" aria-hidden="true">
        <span className="pos-demo__chip">
          <strong>${copy.amount}</strong>
          <small>{phase === 'idle' || phase === 'card' ? copy.sendingLabel : copy.processingLabel}</small>
        </span>
      </div>

      <div className="pos-demo__terminal">
        {terminal === 'poynt' ? (
          <Image src={posIntegrationAssets.poynt} alt="" width={1019} height={768} />
        ) : (
          <div className="pos-demo__terminal-stage">
            <Image
              className={cloverLive ? undefined : 'is-active'}
              src={posIntegrationAssets.cloverFront}
              alt=""
              fill
              sizes="(min-width: 768px) 22rem, 70vw"
              style={{ objectFit: 'contain' }}
            />
            <Image
              className={cloverLive ? 'is-active' : undefined}
              src={posIntegrationAssets.cloverPaid}
              alt=""
              fill
              sizes="(min-width: 768px) 22rem, 70vw"
              style={{ objectFit: 'contain' }}
            />
          </div>
        )}
      </div>

      <div className="pos-demo__status">
        <article className="pos-demo__status-card pos-demo__status-card--success">
          <span>
            <Check size={18} strokeWidth={2.6} />
          </span>
          <strong>{copy.successTitle}</strong>
        </article>
        <article className="pos-demo__status-card">
          <FileText size={16} strokeWidth={2.2} />
          <div>
            <strong>{copy.completeTitle}</strong>
            <b>${copy.amount}</b>
            <small>{copy.completeMeta}</small>
            <em>{copy.viewReceiptLabel}</em>
          </div>
        </article>
        <article className="pos-demo__status-card">
          <RefreshCw size={16} strokeWidth={2.2} />
          <div>
            <strong>{copy.syncedTitle}</strong>
            <small>{copy.syncedNote}</small>
          </div>
        </article>
      </div>
    </div>
  );
}

export function DashbookingLandingPosIntegrationSection({
  content,
}: DashbookingLandingPosIntegrationSectionProps) {
  const copy = content.posIntegration;
  const [terminal, setTerminal] = useState<PosTerminalId>('clover');

  return (
    <section id="pos-integration" className="pos-integration section-shell" aria-label={copy.ariaLabel}>
      <MotionScope>
        <div className="container pos-integration__inner">
          <div className="pos-integration__hero">
            <SectionReveal className="pos-integration__intro">
              <span className="pos-integration__eyebrow">
                <CreditCard size={15} strokeWidth={2.3} aria-hidden="true" />
                {copy.eyebrow}
              </span>
              <h2 className="pos-integration__title">
                <span>{copy.titleLead}</span>
                <span>{copy.titleAccent}</span>
              </h2>
              <p className="pos-integration__subtitle">{copy.subtitle}</p>
            </SectionReveal>
            <SectionReveal className="pos-integration__stage" delay={0.08}>
              <PosDemo copy={copy} terminal={terminal} />
            </SectionReveal>
            <ul className="pos-integration__benefits">
              {copy.benefits.map((benefit, index) => {
                const Icon = benefitIcons[index] ?? Check;
                return (
                  <li key={benefit} className={index > 3 ? 'is-supporting' : undefined}>
                    <span>
                      <Icon size={18} strokeWidth={2.2} aria-hidden="true" />
                    </span>
                    {benefit}
                  </li>
                );
              })}
            </ul>
          </div>

          <SectionReveal className="pos-integration__chooser" delay={0.1}>
            <div className="pos-integration__chooser-head">
              <div>
                <h3>{copy.chooseTitle}</h3>
                <p>{copy.chooseSubtitle}</p>
              </div>
              <p className="pos-integration__note">{copy.handwrittenNote}</p>
            </div>
            <div className="pos-integration__cards">
              <article
                className={
                  terminal === 'clover'
                    ? 'pos-terminal-card pos-terminal-card--clover is-selected'
                    : 'pos-terminal-card pos-terminal-card--clover'
                }
              >
                <div className="pos-terminal-card__main">
                  <button
                    type="button"
                    className="pos-terminal-card__photo"
                    onClick={() => setTerminal('clover')}
                  >
                    <Image
                      src={posIntegrationAssets.cloverFront}
                      alt=""
                      width={cloverTerminalSize.width}
                      height={cloverTerminalSize.height}
                    />
                  </button>
                  <div className="pos-terminal-card__copy">
                    <h4>{copy.clover.name}</h4>
                    <p>{copy.clover.blurb}</p>
                    <ul>
                      {copy.clover.benefits.map((item, index) => (
                        <li key={item} className={index === 0 || index === 3 ? 'is-supporting' : undefined}>
                          <Check size={15} strokeWidth={2.6} aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="pos-terminal-card__price">
                  <span>{copy.cloverRentalLabel}</span>
                  <strong>{copy.cloverRentalPrice}</strong>
                  {copy.cloverRates.map((rate) => (
                    <p key={rate}>{rate}</p>
                  ))}
                  <div className="pos-terminal-card__perks">
                    <p>
                      <Check size={14} strokeWidth={2.8} />
                      {copy.noContractLabel}
                    </p>
                    <p>
                      <Check size={14} strokeWidth={2.8} />
                      {copy.cancelAnytimeLabel}
                    </p>
                  </div>
                  <a href={copy.clover.ctaHref} target="_blank" rel="noreferrer">
                    {copy.clover.ctaLabel}
                  </a>
                </div>
              </article>

              <article
                className={
                  terminal === 'poynt'
                    ? 'pos-terminal-card pos-terminal-card--poynt is-selected'
                    : 'pos-terminal-card pos-terminal-card--poynt'
                }
              >
                <div className="pos-terminal-card__main">
                  <button
                    type="button"
                    className="pos-terminal-card__photo"
                    onClick={() => setTerminal('poynt')}
                  >
                    <Image src={posIntegrationAssets.poynt} alt="" width={1019} height={768} />
                  </button>
                  <div className="pos-terminal-card__copy">
                    <h4>{copy.poynt.name}</h4>
                    <p>{copy.poynt.blurb}</p>
                    <ul>
                      {copy.poynt.benefits.map((item, index) => (
                        <li
                          key={item}
                          className={index === 0 || index === 3 || index === 4 ? 'is-supporting' : undefined}
                        >
                          <Check size={15} strokeWidth={2.6} aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="pos-terminal-card__perks pos-terminal-card__perks--compact">
                      <p>
                        <Check size={14} strokeWidth={2.8} />
                        {copy.noContractLabel}
                      </p>
                      <p>
                        <Check size={14} strokeWidth={2.8} />
                        {copy.cancelAnytimeLabel}
                      </p>
                    </div>
                    <a href={copy.poynt.ctaHref} target="_blank" rel="noreferrer">
                      {copy.poynt.ctaLabel}
                    </a>
                  </div>
                </div>
              </article>
            </div>
          </SectionReveal>
        </div>
      </MotionScope>
    </section>
  );
}
