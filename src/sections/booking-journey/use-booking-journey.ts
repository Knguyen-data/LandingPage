'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Howl } from 'howler';
import { useReducedMotion } from 'motion/react';

import { bookingJourneyNodeOrder } from '@/content/demo/journey';
import { normalizedPublicAssets } from '@/lib/assets';

export type BookingJourneyNodeStatus = 'upcoming' | 'active' | 'complete';

const NODE_COUNT = bookingJourneyNodeOrder.length;
const CONNECTOR_S = 0.48;
const NODE_HOLD_S = 1.85;
const NODE_5_EXTRA_S = 0.7;
const NODE_7_EXTRA_S = 0.85;
const LOOP_PAUSE_S = 3.2;
const COMPLETED_SOUND_DELAY_S = 0.78;
function holdFor(index: number): number {
  if (index === 4) {
    return NODE_HOLD_S + NODE_5_EXTRA_S;
  }

  if (index === 6) {
    return NODE_HOLD_S + NODE_7_EXTRA_S;
  }

  return NODE_HOLD_S;
}

export function useDashbookingBookingJourney() {
  const reducedMotion = useReducedMotion() ?? false;
  const userTookOverRef = useRef(false);
  const audioUnlockedRef = useRef(false);
  const mutedRef = useRef(false);
  const howlRef = useRef<Howl | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const runStoryRef = useRef<(fromIndex: number) => void>(() => undefined);

  const [rootEl, setRootEl] = useState<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [connectorIndex, setConnectorIndex] = useState(-1);
  const [settled, setSettled] = useState(false);
  const [muted, setMuted] = useState(false);

  const killTimeline = useCallback(() => {
    timelineRef.current?.kill();
    timelineRef.current = null;
  }, []);

  const unlockAudio = useCallback(() => {
    audioUnlockedRef.current = true;
  }, []);

  const playSuccessSound = useCallback(() => {
    if (reducedMotion || mutedRef.current || !audioUnlockedRef.current) {
      return;
    }

    const sound = howlRef.current;
    if (!sound) {
      return;
    }

    sound.stop();
    sound.volume(0.16);
    sound.play();
  }, [reducedMotion]);

  const runStory = useCallback(
    (fromIndex: number) => {
      killTimeline();
      setSettled(false);

      const timeline = gsap.timeline();
      timelineRef.current = timeline;

      for (let index = fromIndex; index < NODE_COUNT; index += 1) {
        if (index === 0) {
          timeline.call(() => {
            setConnectorIndex(-1);
            setActiveIndex(0);
          });
        } else {
          timeline.call(() => {
            setConnectorIndex(index - 1);
          });
          timeline.call(
            () => {
              setActiveIndex(index);
            },
            undefined,
            `+=${CONNECTOR_S}`,
          );
        }

        if (index === 4) {
          timeline.call(playSuccessSound, undefined, `+=${COMPLETED_SOUND_DELAY_S}`);
        }

        timeline.to({}, { duration: holdFor(index) });
      }

      timeline.call(() => {
        setSettled(true);
        setActiveIndex(NODE_COUNT - 1);
        setConnectorIndex(NODE_COUNT - 2);
      });

      timeline.call(
        () => {
          if (!userTookOverRef.current) {
            runStoryRef.current(0);
          }
        },
        undefined,
        `+=${LOOP_PAUSE_S}`,
      );
    },
    [killTimeline, playSuccessSound],
  );

  useEffect(() => {
    runStoryRef.current = runStory;
  }, [runStory]);

  const selectNode = useCallback(
    (index: number) => {
      userTookOverRef.current = true;
      unlockAudio();
      killTimeline();
      setSettled(false);
      setConnectorIndex(index === 0 ? -1 : index - 1);
      setActiveIndex(index);

      if (index === 4 && !reducedMotion) {
        window.setTimeout(playSuccessSound, COMPLETED_SOUND_DELAY_S * 1000);
      }
    },
    [killTimeline, playSuccessSound, reducedMotion, unlockAudio],
  );

  const toggleMuted = useCallback(() => {
    mutedRef.current = !mutedRef.current;
    setMuted(mutedRef.current);
    if (mutedRef.current) {
      howlRef.current?.stop();
    }
  }, []);

  useEffect(() => {
    const sound = new Howl({
      src: [normalizedPublicAssets.journey.successChime],
      volume: 0.16,
      preload: false,
    });
    howlRef.current = sound;

    return () => {
      sound.unload();
      howlRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!rootEl) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(Boolean(entry?.isIntersecting));
      },
      { threshold: 0 },
    );

    observer.observe(rootEl);
    return () => observer.disconnect();
  }, [rootEl]);

  useEffect(() => {
    if (!inView || reducedMotion || userTookOverRef.current) {
      return undefined;
    }

    runStory(0);
    return () => killTimeline();
  }, [inView, killTimeline, reducedMotion, runStory]);

  useEffect(() => () => killTimeline(), [killTimeline]);

  const nodeStatus = useCallback(
    (index: number): BookingJourneyNodeStatus => {
      if (reducedMotion) {
        return index === NODE_COUNT - 1 ? 'active' : 'complete';
      }

      if (index === activeIndex) {
        return 'active';
      }

      if (index < activeIndex) {
        return 'complete';
      }

      return 'upcoming';
    },
    [activeIndex, reducedMotion],
  );

  return {
    setRootEl,
    activeIndex,
    connectorIndex,
    settled,
    reducedMotion,
    muted,
    selectNode,
    nodeStatus,
    unlockAudio,
    toggleMuted,
  };
}
