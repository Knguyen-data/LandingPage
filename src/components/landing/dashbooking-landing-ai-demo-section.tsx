'use client';

import { useMemo, useRef, useState } from 'react';

import { aiReceptionistDemos } from '@/content/ai-receptionist-demos';
import {
  InteractiveCard,
  MotionScope,
  RevealGroup,
  RevealItem,
} from '@/components/landing/dashbooking-landing-motion-primitives';

interface DashbookingLandingAiDemoListProps {
  readonly demoIds?: readonly string[];
}

function formatDuration(value: number) {
  if (!Number.isFinite(value) || value < 0) {
    return '0:00';
  }

  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export function DashbookingLandingAiDemoList({ demoIds }: DashbookingLandingAiDemoListProps) {
  const demos = useMemo(() => {
    if (!demoIds?.length) {
      return aiReceptionistDemos;
    }

    return aiReceptionistDemos.filter((demo) => demoIds.includes(demo.id));
  }, [demoIds]);
  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({});
  const [activeDemoId, setActiveDemoId] = useState<string | null>(null);
  const [durations, setDurations] = useState<Record<string, number>>({});
  const [currentTimes, setCurrentTimes] = useState<Record<string, number>>({});

  const stopOtherDemos = (currentDemoId: string) => {
    const resetTimes: Record<string, number> = {};

    Object.entries(audioRefs.current).forEach(([demoId, audio]) => {
      if (!audio || demoId === currentDemoId) {
        return;
      }

      audio.pause();
      audio.currentTime = 0;
      resetTimes[demoId] = 0;
    });

    if (Object.keys(resetTimes).length > 0) {
      setCurrentTimes((previous) => ({ ...previous, ...resetTimes }));
    }
  };

  const togglePlayback = async (demoId: string) => {
    const audio = audioRefs.current[demoId];

    if (!audio) {
      return;
    }

    if (activeDemoId === demoId && !audio.paused) {
      audio.pause();
      setActiveDemoId(null);
      return;
    }

    stopOtherDemos(demoId);

    try {
      await audio.play();
      setActiveDemoId(demoId);
    } catch {
      setActiveDemoId(null);
    }
  };

  return (
    <MotionScope>
      <RevealGroup className="landing-audio-list" role="list" stagger={0.05}>
        {demos.map((demo) => {
          const duration = durations[demo.id] ?? 0;
          const currentTime = currentTimes[demo.id] ?? 0;
          const progress = duration > 0 ? currentTime / duration : 0;
          const activeBars = Math.round(progress * demo.waveformBars.length);
          const isPlaying = activeDemoId === demo.id;

          return (
            <RevealItem key={demo.id} role="listitem" distance={8}>
              <InteractiveCard>
                <article className="surface-card audio-card stack-md">
                  <div className="stack-sm">
                    <h3 className="title-sm audio-card__title">{demo.title}</h3>
                  </div>
                  <div className="audio-card__player-shell stack-sm">
                    <div className="audio-card__player-row">
                      <button
                        type="button"
                        className="audio-card__play-button"
                        aria-label={isPlaying ? `Pause ${demo.title}` : `Play ${demo.title}`}
                        onClick={() => {
                          void togglePlayback(demo.id);
                        }}
                      >
                        <span aria-hidden="true">{isPlaying ? '❚❚' : '▶'}</span>
                      </button>
                      <div className="audio-card__waveform" aria-hidden="true">
                        {demo.waveformBars.map((barHeight, index) => (
                          <span
                            key={`${demo.id}-${barHeight}-${index}`}
                            className={index < activeBars ? 'audio-card__waveform-bar is-active' : 'audio-card__waveform-bar'}
                            style={{ height: `${barHeight}%` }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="audio-card__player-meta">
                      <span className="audio-card__time">
                        {formatDuration(currentTime)} / {formatDuration(duration)}
                      </span>
                    </div>
                  </div>
                  <audio
                    ref={(element) => {
                      audioRefs.current[demo.id] = element;
                    }}
                    preload="metadata"
                    className="audio-card__native-player"
                    aria-hidden="true"
                    tabIndex={-1}
                    onLoadedMetadata={(event) => {
                      const duration = event.currentTarget?.duration ?? 0;
                      setDurations((previous) => ({
                        ...previous,
                        [demo.id]: duration,
                      }));
                    }}
                    onDurationChange={(event) => {
                      const duration = event.currentTarget?.duration ?? 0;
                      setDurations((previous) => ({
                        ...previous,
                        [demo.id]: duration,
                      }));
                    }}
                    onTimeUpdate={(event) => {
                      const nextCurrentTime = event.currentTarget?.currentTime ?? 0;
                      const duration = event.currentTarget?.duration ?? 0;
                      setDurations((previous) => ({
                        ...previous,
                        [demo.id]: duration,
                      }));
                      setCurrentTimes((previous) => ({
                        ...previous,
                        [demo.id]: nextCurrentTime,
                      }));
                    }}
                    onEnded={() => {
                      setActiveDemoId((current) => (current === demo.id ? null : current));
                      setCurrentTimes((previous) => ({ ...previous, [demo.id]: 0 }));
                    }}
                    onPause={() => {
                      setActiveDemoId((current) => (current === demo.id ? null : current));
                    }}
                  >
                    <source src={demo.audioSrc} type="audio/mpeg" />
                    {demo.fallbackLabel}
                  </audio>
                </article>
              </InteractiveCard>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </MotionScope>
  );
}
