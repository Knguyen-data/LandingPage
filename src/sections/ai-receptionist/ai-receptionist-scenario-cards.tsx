'use client';

import { useEffect, useRef, useState } from 'react';
import { CalendarCheck, Clock, MapPin, Pause, Play, RefreshCw } from 'lucide-react';

import type {
  AiReceptionistScenarioCopy,
  AiReceptionistScenarioId,
  AiReceptionistSectionContent,
} from '@/content/types';
import {
  aiCallScenarioDemos,
  formatAiCallClock,
  type AiCallScenarioDemo,
} from '@/content/demo/ai-receptionist';

interface DashbookingLandingAiReceptionistScenarioCardsProps {
  readonly content: AiReceptionistSectionContent;
  readonly activeId: AiReceptionistScenarioId | null;
  readonly onPlay: (id: AiReceptionistScenarioId) => void;
  readonly onStop: () => void;
}

const scenarioIcons = {
  'check-current-appoinment': CalendarCheck,
  'confirm-address': MapPin,
  'late-appointment': Clock,
  'rescheduling-appoinment': RefreshCw,
} as const;

function ScenarioCard({
  copy,
  demo,
  playLabel,
  pauseLabel,
  isActive,
  onPlay,
  onStop,
}: {
  readonly copy: AiReceptionistScenarioCopy;
  readonly demo: AiCallScenarioDemo;
  readonly playLabel: string;
  readonly pauseLabel: string;
  readonly isActive: boolean;
  readonly onPlay: (id: AiReceptionistScenarioId) => void;
  readonly onStop: () => void;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const Icon = scenarioIcons[copy.id];
  const progress = duration > 0 ? currentTime / duration : 0;
  const activeBars = Math.round(progress * demo.waveformBars.length);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (!isActive) {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [isActive]);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (isActive && !audio.paused) {
      audio.pause();
      onStop();
      return;
    }

    onPlay(copy.id);

    try {
      await audio.play();
    } catch {
      onStop();
    }
  };

  return (
    <article className={`ai-call-scenario${playing ? ' is-playing' : ''}`}>
      <div className="ai-call-scenario__copy">
        <span className="ai-call-scenario__icon" aria-hidden="true">
          <Icon size={16} strokeWidth={2.2} />
        </span>
        <div>
          <h4>{copy.title}</h4>
          <p>{copy.description}</p>
        </div>
      </div>
      <div className="ai-call-scenario__player">
        <button
          type="button"
          className="ai-call-scenario__play"
          onClick={() => {
            void toggle();
          }}
          aria-label={playing ? `${pauseLabel} ${copy.title}` : `${playLabel} ${copy.title}`}
        >
          {playing ? <Pause size={14} strokeWidth={2.4} /> : <Play size={14} strokeWidth={2.4} />}
        </button>
        <div className="ai-call-scenario__wave" aria-hidden="true">
          {demo.waveformBars.map((height, index) => (
            <span
              key={`${copy.id}-${index}`}
              className={index < activeBars ? 'is-active' : undefined}
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
        <span className="ai-call-scenario__time">{formatAiCallClock(duration)}</span>
      </div>
      <audio
        ref={audioRef}
        preload="none"
        src={demo.audioSrc}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration || 0)}
        onDurationChange={(event) => setDuration(event.currentTarget.duration || 0)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime || 0)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          setCurrentTime(0);
          setPlaying(false);
          onStop();
        }}
      />
    </article>
  );
}

export function DashbookingLandingAiReceptionistScenarioCards({
  content,
  activeId,
  onPlay,
  onStop,
}: DashbookingLandingAiReceptionistScenarioCardsProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="ai-call-scenarios">
      <div className="ai-call-scenarios__header">
        <div>
          <h3>{content.scenariosHeading}</h3>
          <p>{content.scenariosSupport}</p>
        </div>
        <button
          type="button"
          className="ai-call-scenarios__toggle"
          aria-expanded={expanded}
          onClick={() => setExpanded((current) => !current)}
        >
          {expanded ? content.scenariosCollapseLabel : content.scenariosToggleLabel}
        </button>
      </div>
      <div className={`ai-call-scenarios__grid${expanded ? ' is-expanded' : ''}`}>
        {content.scenarios.map((copy) => {
          const demo = aiCallScenarioDemos.find((item) => item.id === copy.id);
          if (!demo) {
            return null;
          }

          return (
            <ScenarioCard
              key={copy.id}
              copy={copy}
              demo={demo}
              playLabel={content.playRealCallLabel}
              pauseLabel={content.pauseLabel}
              isActive={activeId === copy.id}
              onPlay={onPlay}
              onStop={onStop}
            />
          );
        })}
      </div>
    </div>
  );
}
