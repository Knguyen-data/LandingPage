'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import type { GoogleReviewsFilterId } from '@/content/types';
import {
  GOOGLE_REVIEWS_THINKING_MS,
  getVisibleGoogleReviews,
  type GoogleReviewsDemoReview,
  type GoogleReviewsDemoReviewId,
} from '@/content/demo/google-reviews';

export type GoogleReviewsReplyPhase = 'idle' | 'thinking' | 'done';

interface UseDashbookingGoogleReviewsOptions {
  readonly inView: boolean;
  readonly reducedMotion: boolean;
}

function getGoogleReviewsReplyPhase(
  inView: boolean,
  reducedMotion: boolean,
  selectedReview: GoogleReviewsDemoReview | null,
  activeGenerationId: GoogleReviewsDemoReviewId | null,
): GoogleReviewsReplyPhase {
  if (!selectedReview || !inView) {
    return 'idle';
  }

  if (reducedMotion || activeGenerationId === selectedReview.id) {
    return 'done';
  }

  return 'thinking';
}

export function useDashbookingGoogleReviews(
  reviews: readonly GoogleReviewsDemoReview[],
  { inView, reducedMotion }: UseDashbookingGoogleReviewsOptions,
) {
  const [filterId, setFilterId] = useState<GoogleReviewsFilterId>('all');
  const [selectedId, setSelectedId] = useState<GoogleReviewsDemoReviewId>(reviews[0]?.id ?? 'emma');
  const [hasReplied, setHasReplied] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const [activeGenerationId, setActiveGenerationId] = useState<GoogleReviewsDemoReviewId | null>(null);

  const visibleReviews = useMemo(
    () => getVisibleGoogleReviews(reviews, filterId),
    [reviews, filterId],
  );

  const selectedReview =
    visibleReviews.find((review) => review.id === selectedId) ?? visibleReviews[0] ?? null;

  const replyPhase = getGoogleReviewsReplyPhase(
    inView,
    reducedMotion,
    selectedReview,
    activeGenerationId,
  );

  const selectFilter = useCallback((id: GoogleReviewsFilterId) => {
    setFilterId(id);
    setHasReplied(false);
    setHasCopied(false);
  }, []);

  const selectReview = useCallback((id: GoogleReviewsDemoReviewId) => {
    setSelectedId(id);
    setHasReplied(false);
    setHasCopied(false);
  }, []);

  const reply = useCallback(() => {
    setHasReplied(true);
  }, []);

  const copyReply = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setHasCopied(true);
    } catch {
      setHasCopied(false);
    }
  }, []);

  useEffect(() => {
    if (!inView || !selectedReview || reducedMotion) {
      return;
    }

    const generationId = selectedReview.id;
    let cancelled = false;

    const thinkTimer = window.setTimeout(() => {
      if (!cancelled) {
        setActiveGenerationId(generationId);
      }
    }, GOOGLE_REVIEWS_THINKING_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(thinkTimer);
    };
  }, [inView, reducedMotion, selectedReview]);

  return {
    filterId,
    visibleReviews,
    selectedReview,
    hasReplied,
    hasCopied,
    replyPhase,
    selectFilter,
    selectReview,
    reply,
    copyReply,
  };
}
