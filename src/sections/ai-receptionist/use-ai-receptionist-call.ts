'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { RefObject } from 'react';
import { Howl } from 'howler';
import { useReducedMotion } from 'motion/react';

import {
  getActiveAiCallTurn,
  getAiCallCalendarState,
  getAiCallTurnDisplayText,
  getSpeakingAiCallSpeaker,
  getVisibleAiCallTurns,
  type AiCallCalendarState,
  type AiCallSpeaker,
  type AiCallTurn,
} from '@/content/demo/ai-receptionist';
import { normalizedPublicAssets } from '@/lib/assets';

export interface AiCallVisibleBubble {
  readonly turn: AiCallTurn;
  readonly text: string;
  readonly isActive: boolean;
}

export interface UseDashbookingAiReceptionistCallResult {
  readonly currentTime: number;
  readonly duration: number;
  readonly playing: boolean;
  readonly muted: boolean;
  readonly reducedMotion: boolean;
  readonly calendar: AiCallCalendarState;
  readonly visibleBubbles: readonly AiCallVisibleBubble[];
  readonly speakingSpeaker: AiCallSpeaker | null;
  readonly togglePlayback: () => Promise<void>;
  readonly toggleMuted: () => void;
  readonly pause: () => void;
  readonly syncFromAudio: () => void;
  readonly handlePlay: () => void;
  readonly handlePause: () => void;
  readonly handleEnded: () => void;
}

export function useDashbookingAiReceptionistCall(
  audioRef: RefObject<HTMLAudioElement | null>,
): UseDashbookingAiReceptionistCallResult {
  const reducedMotion = useReducedMotion() ?? false;
  const rafRef = useRef(0);
  const mutedRef = useRef(false);
  const previousSlotRef = useRef(getAiCallCalendarState(0).slot1300);
  const howlRef = useRef<Howl | null>(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  const stopTick = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
  }, []);

  const syncFromAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    setCurrentTime(audio.currentTime);
    if (Number.isFinite(audio.duration) && audio.duration > 0) {
      setDuration(audio.duration);
    }
  }, [audioRef]);

  const startTick = useCallback(() => {
    stopTick();
    const loop = () => {
      syncFromAudio();
      const audio = audioRef.current;
      if (audio && !audio.paused && !audio.ended) {
        rafRef.current = requestAnimationFrame(loop);
      }
    };
    rafRef.current = requestAnimationFrame(loop);
  }, [audioRef, stopTick, syncFromAudio]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, [audioRef]);

  // Fetch audio metadata only when the demo is reached; never autoplay sound.
  useEffect(() => {
    const audio = audioRef.current;
    const demo = audio?.closest('article');
    if (!audio || !demo) return;
    let loaded = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        if (!loaded) {
          loaded = true;
          audio.preload = 'metadata';
          audio.load();
        }
      } else {
        audio.pause();
      }
    });
    observer.observe(demo);
    return () => observer.disconnect();
  }, [audioRef]);

  const togglePlayback = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (!audio.paused && !audio.ended) {
      audio.pause();
      return;
    }

    if (audio.ended || (Number.isFinite(audio.duration) && audio.currentTime >= audio.duration)) {
      audio.currentTime = 0;
      previousSlotRef.current = 'idle';
    }

    try {
      await audio.play();
    } catch {
      setPlaying(false);
      stopTick();
    }
  }, [audioRef, stopTick]);

  const toggleMuted = useCallback(() => {
    mutedRef.current = !mutedRef.current;
    setMuted(mutedRef.current);
    if (audioRef.current) {
      audioRef.current.muted = mutedRef.current;
    }
  }, [audioRef]);

  const handlePlay = useCallback(() => {
    setPlaying(true);
    startTick();
  }, [startTick]);

  const handlePause = useCallback(() => {
    setPlaying(false);
    stopTick();
    syncFromAudio();
  }, [stopTick, syncFromAudio]);

  const handleEnded = useCallback(() => {
    setPlaying(false);
    stopTick();
    syncFromAudio();
  }, [stopTick, syncFromAudio]);

  useEffect(() => {
    const sound = new Howl({
      src: [normalizedPublicAssets.journey.successChime],
      volume: 0.18,
      preload: false,
    });
    howlRef.current = sound;

    return () => {
      sound.unload();
      howlRef.current = null;
    };
  }, []);

  useEffect(() => {
    const calendar = getAiCallCalendarState(currentTime);
    const becameBooked = previousSlotRef.current !== 'booked' && calendar.slot1300 === 'booked';
    previousSlotRef.current = calendar.slot1300;

    if (!becameBooked || !playing || muted || reducedMotion) {
      return;
    }

    howlRef.current?.stop();
    howlRef.current?.volume(0.18);
    howlRef.current?.play();
  }, [currentTime, muted, playing, reducedMotion]);

  useEffect(() => {
    const onVisibility = () => {
      syncFromAudio();
      const audio = audioRef.current;
      if (audio && !audio.paused && !audio.ended) {
        startTick();
      }
    };

    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [audioRef, startTick, syncFromAudio]);

  useEffect(() => () => stopTick(), [stopTick]);

  const calendar = useMemo(() => getAiCallCalendarState(currentTime), [currentTime]);
  const speakingSpeaker = useMemo(() => getSpeakingAiCallSpeaker(currentTime), [currentTime]);
  const visibleBubbles = useMemo(() => {
    const turns = getVisibleAiCallTurns(currentTime);
    const active = getActiveAiCallTurn(currentTime);

    return turns.map((turn) => ({
      turn,
      text: getAiCallTurnDisplayText(turn.id, currentTime),
      isActive: active?.id === turn.id,
    }));
  }, [currentTime]);

  return {
    currentTime,
    duration,
    playing,
    muted,
    reducedMotion,
    calendar,
    visibleBubbles,
    speakingSpeaker,
    togglePlayback,
    toggleMuted,
    pause,
    syncFromAudio,
    handlePlay,
    handlePause,
    handleEnded,
  };
}
