'use client';

import { useRef, useState } from 'react';

import { aiReceptionistDemos } from '@/content/ai-receptionist-demos';
import type { LandingContent } from '@/content/landing/dashbooking-landing-content-types';

interface DashbookingLandingAiDemoSectionProps {
  readonly content: LandingContent;
}

function formatDuration(value: number) {
  if (!Number.isFinite(value) || value < 0) {
    return '0:00';
  }

  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export function DashbookingLandingAiDemoSection({
  content,
}: DashbookingLandingAiDemoSectionProps) {
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
    <section id="ai-demo" className="section-shell">
      <div className="container stack-lg">
        <div className="stack-md section-heading">
          <span className="eyebrow">{content.ai.eyebrow}</span>
          <h2 className="title-lg">{content.ai.title}</h2>
        </div>
        <div className="landing-audio-list" role="list">
          {aiReceptionistDemos.map((demo) => {
            const duration = durations[demo.id] ?? 0;
            const currentTime = currentTimes[demo.id] ?? 0;
            const progress = duration > 0 ? currentTime / duration : 0;
            const activeBars = Math.round(progress * demo.waveformBars.length);
            const isPlaying = activeDemoId === demo.id;

            return (
              <article key={demo.id} className="surface-card audio-card stack-md" role="listitem">
                <div className="stack-sm">
                  <h3 className="title-sm">{demo.title}</h3>
                  <p className="copy-sm text-muted">{demo.subtitle}</p>
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
                    const currentTime = event.currentTarget?.currentTime ?? 0;
                    const duration = event.currentTarget?.duration ?? 0;
                    setDurations((previous) => ({
                      ...previous,
                      [demo.id]: duration,
                    }));
                    setCurrentTimes((previous) => ({
                      ...previous,
                      [demo.id]: currentTime,
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
                  <source src={demo.audioSrc} type="audio/wav" />
                  {demo.fallbackLabel}
                </audio>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
