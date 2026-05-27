'use client';

import Image from 'next/image';
import { useState } from 'react';

import type { ReviewResponseDemoContent } from '@/content/landing/dashbooking-landing-content-types';
import { normalizedPublicAssets } from '@/lib/assets/normalized-public-assets';

interface DashbookingLandingReviewResponseDemoProps {
  readonly content: ReviewResponseDemoContent;
}

export function DashbookingLandingReviewResponseDemo({ content }: DashbookingLandingReviewResponseDemoProps) {
  const [selectedReviewIndex, setSelectedReviewIndex] = useState(0);
  const [generatedReviewIndex, setGeneratedReviewIndex] = useState<number | null>(null);
  const selectedReview = content.reviews[selectedReviewIndex];
  const generatedReview = generatedReviewIndex === null ? null : content.reviews[generatedReviewIndex];

  return (
    <article className="review-response-demo surface-card stack-lg">
      <div className="review-response-demo__free-tag" aria-hidden="true">
        <Image
          src={normalizedPublicAssets.freeTag}
          alt=""
          width={120}
          height={120}
          className="review-response-demo__free-tag-image"
        />
      </div>
      <div className="review-response-demo__header stack-sm">
        <span className="eyebrow">{content.eyebrow}</span>
        <h3 className="title-sm">{content.title}</h3>
        <p className="copy-sm text-muted">{content.supportLine}</p>
      </div>
      <div className="review-response-demo__layout">
        <div className="review-response-demo__reviews stack-sm" role="list" aria-label={content.reviewsAriaLabel}>
          {content.reviews.map((review, index) => {
            const isSelected = selectedReviewIndex === index;

            return (
              <button
                type="button"
                key={`${review.customerName}-${review.ratingLabel}`}
                className={isSelected ? 'review-response-demo__review-button is-selected' : 'review-response-demo__review-button'}
                aria-pressed={isSelected}
                onClick={() => {
                  setSelectedReviewIndex(index);
                  setGeneratedReviewIndex(null);
                }}
              >
                <span className="review-response-demo__review-meta">
                  <strong>{review.customerName}</strong>
                  <span>{review.ratingLabel}</span>
                </span>
                <span className="review-response-demo__review-copy">{review.review}</span>
              </button>
            );
          })}
        </div>
        <div className="review-response-demo__response-panel stack-md" aria-live="polite">
          <div className="stack-sm">
            <span className="kicker">{content.responseLabel}</span>
            <p className="review-response-demo__response-copy copy-sm">
              {generatedReview ? generatedReview.response : content.emptyResponse}
            </p>
          </div>
          <button
            type="button"
            className="button-link review-response-demo__generate-button"
            onClick={() => {
              setGeneratedReviewIndex(selectedReviewIndex);
            }}
          >
            {content.generateLabel}
          </button>
          <div className="review-response-demo__selected-review copy-sm text-muted">
            <strong>{selectedReview.customerName}</strong>
            <span>{selectedReview.ratingLabel}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
