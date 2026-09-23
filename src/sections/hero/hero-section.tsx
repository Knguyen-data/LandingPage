'use client';

import { useRef } from 'react';
import type { KeyboardEvent } from 'react';
import Image from 'next/image';
import * as m from 'motion/react-m';
import { ArrowRight, Check } from 'lucide-react';

import { DashbookingLandingHeroAnnotations } from '@/sections/hero/hero-annotations';
import { DashbookingLandingHeroBusinessProfile } from '@/sections/hero/hero-business-profile';
import { DashbookingLandingHeroCalendar } from '@/sections/hero/hero-calendar';
import { DashbookingLandingHeroMobileCalendar } from '@/sections/hero/hero-mobile-calendar';
import { MotionScope } from '@/components/motion-primitives';
import { useDashbookingHeroStory, type HeroMode } from '@/sections/hero/use-hero-story';
import type { LandingContent } from '@/content/types';
import { googleLogo } from '@/content/shared';

interface DashbookingLandingHeroSectionProps {
  readonly content: LandingContent;
}

export function DashbookingLandingHeroSection({ content }: DashbookingLandingHeroSectionProps) {
  const story = useDashbookingHeroStory();
  const stageRef = useRef<HTMLDivElement>(null);
  const withoutButtonRef = useRef<HTMLButtonElement>(null);
  const withButtonRef = useRef<HTMLButtonElement>(null);
  const annotationItems = story.isWith ? content.hero.withDash.annotations : content.hero.withoutDash.annotations;
  const googleCaption = annotationItems[0];
  const calendarCaption = annotationItems[1];
  const demoKicker = story.isWith ? content.hero.googleIllustrationLabel : content.hero.withoutDashExampleLabel;

  const focusMode = (next: HeroMode) => {
    story.selectMode(next);
    const target = next === 'with' ? withButtonRef.current : withoutButtonRef.current;
    target?.focus();
  };

  const onToggleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown' || event.key === 'End') {
      event.preventDefault();
      focusMode('with');
      return;
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp' || event.key === 'Home') {
      event.preventDefault();
      focusMode('without');
    }
  };

  return (
    <section className="landing-hero section-shell" id="hero">
      <MotionScope>
        <div className="container landing-hero__grid">
          <div className="landing-hero__copy-col">
            <span className="landing-hero__pill">
              <Image src={googleLogo} alt="" width={18} height={18} className="landing-hero__pill-logo" />
              {content.hero.eyebrow}
            </span>
            <h1 className="title-xl landing-hero__title">
              <span>{content.hero.headlineLead}</span>
              <span className="landing-hero__title-accent">{content.hero.headlineAccent}</span>
            </h1>
            <p className="landing-hero__lede">{content.hero.subtitle}</p>
            <a href={content.hero.primaryCtaHref} className="button-link landing-hero__cta">
              <span className="landing-hero__cta-label">{content.hero.primaryCta}</span>
              <ArrowRight size={18} strokeWidth={2.4} />
            </a>
            <ul className="landing-hero__chips" aria-label={content.hero.chips.map((chip) => chip.label).join(', ')}>
              {content.hero.chips.map((chip) => (
                <li key={chip.label} className="is-positive">
                  <Check size={13} strokeWidth={2.6} />
                  {chip.label}
                </li>
              ))}
            </ul>
            <div className="landing-hero__proof">
              <div className="landing-hero__proof-line">
                <span className="landing-hero__proof-lead">{content.hero.partnerProofLead}</span>{' '}
                <span className="landing-hero__proof-cluster">
                  <span className="landing-hero__proof-mark">
                    <svg
                      className="landing-hero__proof-scribble"
                      viewBox="0 0 240 96"
                      preserveAspectRatio="none"
                      fill="none"
                      aria-hidden="true"
                    >
                      <m.path
                        d="M42 70 C 18 58, 16 24, 52 14 C 82 6, 138 8, 186 20 C 220 30, 228 52, 204 68 C 180 84, 118 88, 68 80 C 40 74, 30 62, 44 56 C 54 52, 70 56, 82 62"
                        stroke="#EF4444"
                        strokeWidth="2.35"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        vectorEffect="non-scaling-stroke"
                        pathLength={1}
                        initial={story.reducedMotion ? false : { pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.2, delay: 0.22, ease: [0.4, 0.02, 0.18, 1] }}
                      />
                    </svg>
                    <span className="landing-hero__proof-number">{content.hero.partnerProofHighlight}</span>
                  </span>{' '}
                  <span className="landing-hero__proof-noun">{content.hero.partnerProofNoun}</span>
                </span>
              </div>
              <div className="landing-hero__proof-line">
                <span className="landing-hero__proof-tail">{content.hero.partnerProofTail}</span>{' '}
                <span className="landing-hero__proof-place">
                  {content.hero.partnerProofPlace}
                  <svg
                    className="landing-hero__proof-underline"
                    viewBox="0 0 180 14"
                    preserveAspectRatio="none"
                    fill="none"
                    aria-hidden="true"
                  >
                    <m.path
                      d="M1 8.6 C 38 12.2, 78 5.2, 118 8.8 C 148 11.6, 168 7.2, 179 8.8"
                      stroke="#EF4444"
                      strokeWidth="2.3"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                      pathLength={1}
                      initial={story.reducedMotion ? false : { pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.7, delay: 1.12, ease: [0.4, 0.02, 0.2, 1] }}
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          <div className="landing-hero__visual">
            <div className="landing-hero__visual-bar">
              <div
                className={story.isWith ? 'hero-toggle is-with' : 'hero-toggle'}
                role="radiogroup"
                aria-label={content.hero.toggleAriaLabel}
              >
                <span className="hero-toggle__thumb" />
                <button
                  ref={withoutButtonRef}
                  type="button"
                  role="radio"
                  className={story.mode === 'without' ? 'is-active' : undefined}
                  aria-checked={story.mode === 'without'}
                  tabIndex={story.mode === 'without' ? 0 : -1}
                  onClick={() => story.selectMode('without')}
                  onKeyDown={onToggleKeyDown}
                >
                  {content.hero.toggleWithoutLabel}
                </button>
                <button
                  ref={withButtonRef}
                  type="button"
                  role="radio"
                  className={story.mode === 'with' ? 'is-active' : undefined}
                  aria-checked={story.mode === 'with'}
                  tabIndex={story.mode === 'with' ? 0 : -1}
                  onClick={() => story.selectMode('with')}
                  onKeyDown={onToggleKeyDown}
                >
                  {content.hero.toggleWithLabel}
                </button>
              </div>
            </div>

            <p className="hero-demo-kicker">{demoKicker}</p>

            <div
              className={story.isWith ? 'landing-hero__stage is-with' : 'landing-hero__stage'}
              ref={stageRef}
              aria-label={content.hero.previewAriaLabel}
            >
              <DashbookingLandingHeroBusinessProfile
                content={content.hero.businessProfile}
                bookOnlineActive={story.bookOnlineActive}
                emphasizeBookOnline={story.phase === 'book-online-emphasis'}
                showMorePhotos={!story.isWith}
              />
              {googleCaption ? (
                <p className="hero-inline-caption hero-inline-caption--google" aria-live="polite">
                  {googleCaption.title}
                </p>
              ) : null}
              <DashbookingLandingHeroCalendar
                staff={content.hero.staff}
                dateLabel={content.hero.calendarDateLabel}
                todayLabel={content.hero.calendarTodayLabel}
                mode={story.mode}
                phase={story.phase}
                fillIndex={story.fillIndex}
                reducedMotion={story.reducedMotion}
              />
              <DashbookingLandingHeroMobileCalendar
                heading={content.hero.calendarHeading}
                emptySlotLabel={content.hero.emptySlotLabel}
                mode={story.mode}
                phase={story.phase}
                fillIndex={story.fillIndex}
                reducedMotion={story.reducedMotion}
              />
              {calendarCaption ? (
                <p className="hero-inline-caption hero-inline-caption--calendar" aria-live="polite">
                  {calendarCaption.title}
                </p>
              ) : null}
              {story.annotationsActive ? (
                <DashbookingLandingHeroAnnotations
                  key={`desktop-${story.mode}-${story.playGeneration}`}
                  items={annotationItems}
                  active={story.annotationsActive}
                  playKey={`${story.mode}-${story.playGeneration}`}
                  reducedMotion={story.reducedMotion}
                  stageRef={stageRef}
                  tone={story.isWith ? 'benefit' : 'friction'}
                />
              ) : null}
            </div>
          </div>
        </div>
      </MotionScope>
    </section>
  );
}
