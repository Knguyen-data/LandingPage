'use client';

import { SectionLeadCta } from '@/components/section-lead-cta';
import Image from '@/components/viewport-image';
import { useEffect, useRef, useState } from 'react';
import {
  BarChart3,
  Check,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Monitor,
  Target,
  Users,
} from 'lucide-react';

import { MotionScope, SectionReveal } from '@/components/motion-primitives';
import type { LandingContent, WebsiteDesignSectionContent } from '@/content/types';
import { googleReviewsLetterColors } from '@/content/demo/google-reviews';
import {
  googleLogo,
  websiteDesignAssets,
  websiteDesignGallerySalons,
  websiteDesignSearchDemo,
} from '@/content/shared';

type AdsStoryPhase = 'type' | 'result' | 'click' | 'connect' | 'book' | 'hold' | 'reset';

const adsStoryBeats: readonly { readonly phase: AdsStoryPhase; readonly ms: number }[] = [
  { phase: 'type', ms: 1200 },
  { phase: 'result', ms: 800 },
  { phase: 'click', ms: 800 },
  { phase: 'connect', ms: 1000 },
  { phase: 'book', ms: 800 },
  { phase: 'hold', ms: 1200 },
  { phase: 'reset', ms: 600 },
];

interface DashbookingLandingWebsiteDesignSectionProps {
  readonly content: LandingContent;
}

const supportCards = [
  { src: websiteDesignAssets.interiorCard, alt: 'Interior & Atmosphere' },
  { src: websiteDesignAssets.portfolioCard, alt: 'Nail Portfolio' },
  { src: websiteDesignAssets.menuCard, alt: 'Menu & Services' },
] as const;

const outcomeIcons = [Target, BarChart3, Users] as const;

function AdsStory({ copy }: { readonly copy: WebsiteDesignSectionContent }) {
  const [phase, setPhase] = useState<AdsStoryPhase>('type');
  const [typed, setTyped] = useState('');
  const query = copy.searchQuery;

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      const reducedFrame = requestAnimationFrame(() => {
        setPhase('hold');
        setTyped(query);
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
      elapsed += delta;
      const current = adsStoryBeats[beat];
      if (!current) {
        beat = 0;
        elapsed = 0;
        frame = requestAnimationFrame(tick);
        return;
      }

      if (current.phase === 'type') {
        const progress = Math.min(1, elapsed / current.ms);
        setTyped(query.slice(0, Math.round(query.length * progress)));
      }

      if (elapsed >= current.ms) {
        elapsed = 0;
        beat = (beat + 1) % adsStoryBeats.length;
        const next = adsStoryBeats[beat];
        if (next) {
          setPhase(next.phase);
          if (next.phase === 'type') {
            setTyped('');
          } else {
            setTyped(query);
          }
        }
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(() => {
      setPhase('type');
      frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }, [query]);

  const creditLines = copy.creditLabel.split(',');

  return (
    <>
      <div className="website-design__ads-head">
        <span className="website-design__kicker">
          <Image className="website-design__g-mark" src={googleLogo} alt="" width={16} height={16} />
          {copy.adsEyebrow}
        </span>
        <h3>{copy.adsTitle}</h3>
        <p className="website-design__lede">{copy.adsBody}</p>
        <div className="website-design__offers">
          <article className="website-design__chip website-design__chip--setup">
            <span>{copy.freeSetupLabel}</span>
            <b>{copy.freeSetupPrice}</b>
            <small>{copy.freeSetupNote}</small>
          </article>
          <article className="website-design__chip website-design__chip--credit">
            {creditLines.map((line) => (
              <strong key={line}>{line.trim()}</strong>
            ))}
            <small>{copy.creditNote}</small>
          </article>
        </div>
      </div>

      <div className="website-design__story" data-phase={phase}>
        <div className="website-design__search-stage">
          <div className="website-design__search-bar">
            <Image className="website-design__g-mark" src={googleLogo} alt="" width={18} height={18} />
            <span className="website-design__query">
              {typed}
              <i className="website-design__caret" />
            </span>
          </div>
          <article className="website-design__result">
            <span className="website-design__sponsored">{websiteDesignSearchDemo.sponsoredLabel}</span>
            <p className="website-design__result-name">{websiteDesignSearchDemo.name}</p>
            <p className="website-design__result-url">{websiteDesignSearchDemo.url}</p>
            <p className="website-design__result-headline">{websiteDesignSearchDemo.headline}</p>
            <p className="website-design__result-snippet">{websiteDesignSearchDemo.snippet}</p>
            <span className="website-design__ripple" aria-hidden="true" />
          </article>
        </div>

        <div className="website-design__connector" aria-hidden="true">
          <span className="website-design__connector-line">
            <i className="website-design__bead" />
          </span>
        </div>

        <div className="website-design__profile-stage">
          <Image
            className="website-design__profile-card"
            src={websiteDesignAssets.googleProfileCard}
            alt=""
            width={1086}
            height={1448}
          />
          <span className="website-design__booked">{copy.bookedLabel}</span>
        </div>
      </div>
    </>
  );
}

function GoogleColoredWord({ word }: { readonly word: string }) {
  return (
    <span className="website-design__google" aria-label={word}>
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

function WebsiteGallery({ copy }: { readonly copy: WebsiteDesignSectionContent }) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [hotIndex, setHotIndex] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      return;
    }

    let visible = false;
    const observer = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
    });
    if (scrollerRef.current) observer.observe(scrollerRef.current);
    const timer = window.setInterval(() => {
      if (!visible || document.hidden) return;
      setHotIndex((current) => (current + 1) % websiteDesignGallerySalons.length);
    }, 2600);

    return () => { window.clearInterval(timer); observer.disconnect(); };
  }, []);

  const scrollByCard = (direction: -1 | 1) => {
    const scroller = scrollerRef.current;
    if (!scroller) {
      return;
    }

    const card = scroller.querySelector('.website-design__gallery-card');
    const amount = card instanceof HTMLElement ? card.offsetWidth + 18 : 300;
    scroller.scrollBy({ left: amount * direction, behavior: 'smooth' });
  };

  return (
    <div className="website-design__gallery">
      <div className="website-design__gallery-stage">
        <button
          type="button"
          className="website-design__gallery-nav website-design__gallery-nav--prev"
          aria-label={copy.prevLabel}
          onClick={() => scrollByCard(-1)}
        >
          <ChevronLeft size={18} strokeWidth={2.4} />
        </button>
        <div className="website-design__gallery-track" id="website-gallery" ref={scrollerRef}>
          {websiteDesignGallerySalons.map((salon, index) => (
            <a
              key={salon.id}
              className={
                index === hotIndex
                  ? 'website-design__gallery-card is-hot'
                  : 'website-design__gallery-card'
              }
              href={salon.href}
              target="_blank"
              rel="noreferrer"
            >
              <span className="website-design__gallery-frame">
                <Image src={salon.imageSrc} alt="" width={1412} height={996} />
                <span className="website-design__gallery-invite">
                  <ExternalLink size={14} strokeWidth={2.4} aria-hidden="true" />
                  {copy.viewWebsiteLabel}
                </span>
              </span>
              <strong>{salon.name}</strong>
              <span className="website-design__gallery-city">
                {salon.city}
                <span className="visually-hidden">{copy.viewWebsiteLabel}</span>
              </span>
            </a>
          ))}
        </div>
        <button
          type="button"
          className="website-design__gallery-nav website-design__gallery-nav--next"
          aria-label={copy.nextLabel}
          onClick={() => scrollByCard(1)}
        >
          <ChevronRight size={18} strokeWidth={2.4} />
        </button>
      </div>
    </div>
  );
}

export function DashbookingLandingWebsiteDesignSection({
  content,
}: DashbookingLandingWebsiteDesignSectionProps) {
  const copy = content.websiteDesign;

  return (
    <section id="website-design" className="website-design section-shell" aria-label={copy.ariaLabel}>
      <MotionScope>
        <div className="container website-design__inner">
          <SectionReveal className="website-design__header">
            <span className="website-design__eyebrow">{copy.eyebrow}</span>
            <h2 className="website-design__title">
              {copy.titleLead}{' '}
              <GoogleColoredWord word={copy.titleGoogle} /> {copy.titleTail}
            </h2>
            <p className="website-design__subtitle">{copy.subtitle}</p>
          </SectionReveal>

          <div className="website-design__panels">
            <SectionReveal className="website-design__panel website-design__panel--site">
              <div className="website-design__panel-copy">
                <span className="website-design__kicker">
                  <Monitor size={16} strokeWidth={2.3} aria-hidden="true" />
                  {copy.websiteEyebrow}
                </span>
                <h3>{copy.websiteTitle}</h3>
                <p className="website-design__lede">{copy.websiteBody}</p>
                <p className="website-design__seo">
                  <Check size={15} strokeWidth={2.6} aria-hidden="true" />
                  <strong>{copy.freeSeoLabel}</strong>
                  <span>{copy.freeSeoExtra}</span>
                </p>
                <ul>
                  {copy.websiteBullets.map((bullet, index) => (
                    <li key={bullet} className={index === 2 ? 'is-supporting' : undefined}>
                      <Check size={15} strokeWidth={2.6} aria-hidden="true" />
                      {bullet}
                    </li>
                  ))}
                </ul>
                <a className="website-design__cta" href="#website-gallery">
                  {copy.viewMoreLabel}
                </a>
              </div>
              <div className="website-design__showcase">
                <div className="website-design__devices">
                  <Image
                    className="website-design__laptop"
                    src={websiteDesignAssets.laptopYourWay}
                    alt=""
                    width={1412}
                    height={991}
                  />
                  <Image
                    className="website-design__phone"
                    src={websiteDesignAssets.mobileYourWay}
                    alt=""
                    width={841}
                    height={1578}
                  />
                </div>
              </div>
              <div className="website-design__support-row">
                {supportCards.map((card) => (
                  <Image key={card.src} src={card.src} alt={card.alt} width={1254} height={1254} />
                ))}
              </div>
            </SectionReveal>

            <SectionReveal className="website-design__gallery-slot" delay={0.06}>
              <WebsiteGallery copy={copy} />
            </SectionReveal>

            <SectionReveal className="website-design__panel website-design__panel--ads" delay={0.08}>
              <AdsStory copy={copy} />
              <ul className="website-design__outcomes">
                {copy.outcomes.map((outcome, index) => {
                  const Icon = outcomeIcons[index] ?? Target;
                  return (
                    <li key={outcome.title}>
                      <span>
                        <Icon size={18} strokeWidth={2.2} aria-hidden="true" />
                      </span>
                      <div>
                        <strong>{outcome.title}</strong>
                        <p>{outcome.body}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </SectionReveal>
          </div>
        </div>
        <SectionLeadCta locale={content.locale} section="website" />
      </MotionScope>
    </section>
  );
}
