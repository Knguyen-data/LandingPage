'use client';

import Image from '@/components/viewport-image';
import { useEffect, useRef, useState } from 'react';
import { Check, ChevronLeft, ChevronRight, Copy, MapPin, Send, Sparkles, Star } from 'lucide-react';
import { useReducedMotion } from 'motion/react';

import { useDashbookingGoogleReviews } from '@/sections/google-reviews/use-google-reviews';
import type { GoogleReviewsSectionContent } from '@/content/types';
import {
  getGoogleReviewStarStates,
  googleReviewsDemoReviews,
  type GoogleReviewsDemoReview,
} from '@/content/demo/google-reviews';
import { googleLogo, googleReviewsSalonPhoto } from '@/content/shared';

interface DashbookingLandingGoogleReviewsDemoProps {
  readonly content: GoogleReviewsSectionContent;
}

function GoogleReviewStars({ stars, size = 13 }: { readonly stars: number; readonly size?: number }) {
  return (
    <span className="google-reviews-stars" aria-hidden="true">
      {getGoogleReviewStarStates(stars).map((filled, index) => (
        <Star
          key={`${stars}-${index}`}
          size={size}
          strokeWidth={filled ? 0 : 1.6}
          fill={filled ? 'currentColor' : 'none'}
          className={filled ? 'google-reviews-stars__star is-filled' : 'google-reviews-stars__star'}
        />
      ))}
    </span>
  );
}

function ReviewListCard({
  review,
  selected,
  onSelect,
}: {
  readonly review: GoogleReviewsDemoReview;
  readonly selected: boolean;
  readonly onSelect: () => void;
}) {
  return (
    <button
      type="button"
      className={selected ? 'google-reviews-demo__review is-selected' : 'google-reviews-demo__review'}
      aria-pressed={selected}
      onClick={onSelect}
    >
      <span className="google-reviews-demo__avatar" aria-hidden="true">
        {review.initial}
      </span>
      <span className="google-reviews-demo__review-body">
        <strong>{review.customerName}</strong>
        <span className="google-reviews-demo__review-meta">
          <GoogleReviewStars stars={review.stars} />
          <span>{review.timeAgo}</span>
        </span>
        <span className="google-reviews-demo__review-text">{review.review}</span>
      </span>
      <ChevronRight size={16} strokeWidth={2.2} className="google-reviews-demo__chevron" aria-hidden="true" />
    </button>
  );
}

export function DashbookingLandingGoogleReviewsDemo({ content }: DashbookingLandingGoogleReviewsDemoProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const demoRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const {
    visibleReviews,
    selectedReview,
    hasReplied,
    hasCopied,
    replyPhase,
    selectReview,
    reply,
    copyReply,
  } = useDashbookingGoogleReviews(googleReviewsDemoReviews, { inView, reducedMotion });

  useEffect(() => {
    const element = demoRef.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(Boolean(entry?.isIntersecting));
      },
      { threshold: 0, rootMargin: '0px 0px -32px 0px' },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const replyReady = replyPhase === 'done';
  const replyThinking = replyPhase !== 'done';
  const selectedIndex = selectedReview
    ? visibleReviews.findIndex((review) => review.id === selectedReview.id)
    : -1;

  const cycleReview = (direction: -1 | 1) => {
    if (visibleReviews.length === 0) {
      return;
    }

    const current = selectedIndex < 0 ? 0 : selectedIndex;
    const nextIndex = (current + direction + visibleReviews.length) % visibleReviews.length;
    const nextReview = visibleReviews[nextIndex];
    if (nextReview) {
      selectReview(nextReview.id);
    }
  };

  return (
    <div className="google-reviews-demo" ref={demoRef}>
      <article className="google-reviews-demo__profile">
        <div className="google-reviews-demo__profile-photo">
          <Image src={googleReviewsSalonPhoto} alt="" width={220} height={160} />
        </div>
        <div className="google-reviews-demo__profile-copy">
          <h3>{content.salonName}</h3>
          <p className="google-reviews-demo__rating-row">
            <strong>{content.ratingValue}</strong>
            <GoogleReviewStars stars={5} size={14} />
            <span>{content.reviewCount}</span>
          </p>
          <p className="google-reviews-demo__location">
            <MapPin size={13} strokeWidth={2.3} aria-hidden="true" />
            <span>{content.categoryLocation}</span>
          </p>
        </div>
        <div className="google-reviews-demo__connected">
          <span className="google-reviews-demo__connected-badge">
            <Image src={googleLogo} alt="" width={16} height={16} />
            <span>{content.connectedLabel}</span>
            <Check size={14} strokeWidth={2.6} aria-hidden="true" />
          </span>
          <span className="google-reviews-demo__sync">{content.syncLabel}</span>
        </div>
      </article>

      <div className="google-reviews-demo__workspace">
        <section className="google-reviews-demo__list-panel" aria-label={content.reviewsAriaLabel}>
          <div className="google-reviews-demo__list-head">
            <h4>{content.reviewsHeading}</h4>
          </div>
          <div className="google-reviews-demo__list" role="list">
            {visibleReviews.length === 0 ? (
              <p className="google-reviews-demo__empty">{content.emptyFilterLabel}</p>
            ) : (
              visibleReviews.map((review) => (
                <ReviewListCard
                  key={review.id}
                  review={review}
                  selected={review.id === selectedReview?.id}
                  onSelect={() => selectReview(review.id)}
                />
              ))
            )}
          </div>
        </section>

        {selectedReview ? (
          <>
            <article className="google-reviews-demo__selected">
              <div className="google-reviews-demo__selected-head">
                <h4>{content.selectedReviewHeading}</h4>
                <span data-stars={selectedReview.stars}>{selectedReview.tag}</span>
                {visibleReviews.length > 1 ? (
                  <div className="google-reviews-demo__switcher">
                    <button
                      type="button"
                      aria-label={content.previousReviewLabel}
                      onClick={() => cycleReview(-1)}
                    >
                      <ChevronLeft size={15} strokeWidth={2.4} />
                    </button>
                    <button
                      type="button"
                      aria-label={content.nextReviewLabel}
                      onClick={() => cycleReview(1)}
                    >
                      <ChevronRight size={15} strokeWidth={2.4} />
                    </button>
                  </div>
                ) : null}
              </div>
              <div className="google-reviews-demo__selected-body">
                <span className="google-reviews-demo__avatar" aria-hidden="true">
                  {selectedReview.initial}
                </span>
                <div>
                  <strong>{selectedReview.customerName}</strong>
                  <p className="google-reviews-demo__review-meta">
                    <GoogleReviewStars stars={selectedReview.stars} />
                    <span>{selectedReview.timeAgo}</span>
                  </p>
                  <p className="google-reviews-demo__selected-text">{selectedReview.review}</p>
                </div>
              </div>
            </article>

            <article className="google-reviews-demo__reply" aria-live="polite" aria-busy={replyThinking}>
              <div className="google-reviews-demo__reply-head">
                <h4>
                  <Sparkles size={15} strokeWidth={2.2} aria-hidden="true" />
                  {content.suggestedReplyHeading}
                </h4>
                <button
                  type="button"
                  className="google-reviews-demo__copy"
                  onClick={() => {
                    void copyReply(selectedReview.reply);
                  }}
                  disabled={!replyReady}
                  aria-label={hasCopied ? content.copiedLabel : content.copyLabel}
                >
                  <Copy size={15} strokeWidth={2.2} />
                </button>
              </div>
              <div className={replyReady ? 'google-reviews-demo__reply-stage is-ready' : 'google-reviews-demo__reply-stage'}>
                {replyThinking ? (
                  <span className="visually-hidden">{content.thinkingLabel}</span>
                ) : null}
                <p key={selectedReview.id} className="google-reviews-demo__reply-body">
                  {selectedReview.reply}
                </p>
              </div>
              <div className="google-reviews-demo__reply-actions">
                <button
                  type="button"
                  className={hasReplied ? 'google-reviews-demo__send is-sent' : 'google-reviews-demo__send'}
                  onClick={reply}
                  disabled={!replyReady}
                >
                  {hasReplied ? <Check size={16} strokeWidth={2.4} /> : <Send size={15} strokeWidth={2.3} />}
                  <span>{hasReplied ? content.repliedLabel : content.replyLabel}</span>
                </button>
              </div>
            </article>
          </>
        ) : (
          <p className="google-reviews-demo__empty google-reviews-demo__empty--detail">{content.emptyFilterLabel}</p>
        )}
      </div>
    </div>
  );
}
