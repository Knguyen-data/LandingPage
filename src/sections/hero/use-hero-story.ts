'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';

import { heroFilledAppointmentCount } from '@/content/demo/hero';

export type HeroMode = 'without' | 'with';

export type HeroStoryPhase =
  | 'without-annotations'
  | 'without-idle'
  | 'toggle-to-with'
  | 'book-online-emphasis'
  | 'appointments-filling'
  | 'with-annotations'
  | 'with-idle'
  | 'toggle-to-without'
  | 'appointments-dissolving';

const TOGGLE_MS = 650;
const BOOK_MS = 520;
const CARD_STAGGER_MS = 110;
const CARD_COUNT = heroFilledAppointmentCount;
const ANNOTATION_MS = 880;
const ANNOTATION_GAP_MS = 340;
const ANNOTATION_SEQUENCE_MS = 2 * ANNOTATION_MS + ANNOTATION_GAP_MS;
const DISSOLVE_STAGGER_MS = 70;

export function useDashbookingHeroStory() {
  const reducedMotion = useReducedMotion() ?? false;
  const [mode, setMode] = useState<HeroMode>('with');
  const [phase, setPhase] = useState<HeroStoryPhase>('with-annotations');
  const [fillIndex, setFillIndex] = useState(CARD_COUNT - 1);
  const [playGeneration, setPlayGeneration] = useState(0);
  const timersRef = useRef<number[]>([]);
  const userTookOverRef = useRef(false);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  const later = useCallback((ms: number, fn: () => void) => {
    const id = window.setTimeout(fn, ms);
    timersRef.current.push(id);
  }, []);

  const bumpPlay = useCallback(() => {
    setPlayGeneration((value) => value + 1);
  }, []);

  const playToWith = useCallback(
    (instant: boolean) => {
      clearTimers();
      setMode('with');
      bumpPlay();

      if (reducedMotion || instant) {
        setFillIndex(CARD_COUNT - 1);
        setPhase('with-idle');
        return;
      }

      setFillIndex(-1);
      setPhase('toggle-to-with');
      later(TOGGLE_MS, () => setPhase('book-online-emphasis'));
      later(TOGGLE_MS + BOOK_MS, () => {
        setPhase('appointments-filling');
        for (let index = 0; index < CARD_COUNT; index += 1) {
          later(TOGGLE_MS + BOOK_MS + index * CARD_STAGGER_MS, () => setFillIndex(index));
        }
      });

      const fillDone = TOGGLE_MS + BOOK_MS + CARD_COUNT * CARD_STAGGER_MS + 280;
      later(fillDone, () => setPhase('with-annotations'));
      later(fillDone + ANNOTATION_SEQUENCE_MS, () => setPhase('with-idle'));
    },
    [bumpPlay, clearTimers, later, reducedMotion],
  );

  const playToWithout = useCallback(() => {
    clearTimers();
    setMode('without');
    bumpPlay();

    if (reducedMotion) {
      setFillIndex(-1);
      setPhase('without-idle');
      return;
    }

    setPhase('toggle-to-without');
    later(TOGGLE_MS, () => {
      setPhase('appointments-dissolving');
      for (let index = CARD_COUNT - 1; index >= -1; index -= 1) {
        later(TOGGLE_MS + (CARD_COUNT - 1 - index) * DISSOLVE_STAGGER_MS, () => setFillIndex(index));
      }
    });

    const dissolveDone = TOGGLE_MS + CARD_COUNT * DISSOLVE_STAGGER_MS + 220;
    later(dissolveDone, () => setPhase('without-annotations'));
    later(dissolveDone + ANNOTATION_SEQUENCE_MS, () => setPhase('without-idle'));
  }, [bumpPlay, clearTimers, later, reducedMotion]);

  const selectMode = useCallback(
    (next: HeroMode) => {
      if (next === mode) {
        return;
      }

      userTookOverRef.current = true;
      if (next === 'with') {
        playToWith(false);
        return;
      }

      playToWithout();
    },
    [mode, playToWith, playToWithout],
  );

  useEffect(() => {
    if (reducedMotion) {
      return undefined;
    }

    later(ANNOTATION_SEQUENCE_MS, () => {
      if (!userTookOverRef.current) {
        setPhase('with-idle');
      }
    });

    return undefined;
  }, [later, reducedMotion]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const isWith = mode === 'with';
  const bookOnlineActive =
    isWith &&
    (phase === 'book-online-emphasis' ||
      phase === 'appointments-filling' ||
      phase === 'with-annotations' ||
      phase === 'with-idle');
  const annotationsActive =
    phase === 'without-annotations' ||
    phase === 'without-idle' ||
    phase === 'with-annotations' ||
    phase === 'with-idle';
  const filling = phase === 'appointments-filling';
  const dissolving = phase === 'appointments-dissolving';

  return {
    mode,
    phase,
    fillIndex,
    playGeneration,
    reducedMotion,
    selectMode,
    isWith,
    bookOnlineActive,
    annotationsActive,
    filling,
    dissolving,
  };
}
