'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Image from '@/components/viewport-image';
import { AnimatePresence } from 'motion/react';
import * as m from 'motion/react-m';
import { Headphones, Pause, Phone, Play, Volume2, VolumeX } from 'lucide-react';

import { DashbookingLandingAiReceptionistCalendar } from '@/sections/ai-receptionist/ai-receptionist-calendar';
import { useDashbookingAiReceptionistCall } from '@/sections/ai-receptionist/use-ai-receptionist-call';
import type { AiReceptionistSectionContent } from '@/content/types';
import { formatAiCallClock } from '@/content/demo/ai-receptionist';
import { aiReceptionistPortraits } from '@/content/shared';
import { normalizedPublicAssets } from '@/lib/assets';

interface DashbookingLandingAiReceptionistCallDemoProps {
  readonly content: AiReceptionistSectionContent;
  readonly pauseSignal: number;
  readonly onPlayStart: () => void;
}

function PortraitWaveform({ active, reducedMotion }: { readonly active: boolean; readonly reducedMotion: boolean }) {
  return (
    <span className={`ai-call-demo__wave${active ? ' is-active' : ''}${reducedMotion ? ' is-static' : ''}`} aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
      <span />
    </span>
  );
}

export function DashbookingLandingAiReceptionistCallDemo({
  content,
  pauseSignal,
  onPlayStart,
}: DashbookingLandingAiReceptionistCallDemoProps) {
  const invitationId = useId();
  const invitationRef = useRef<HTMLDivElement>(null);
  const [invitationInView, setInvitationInView] = useState(false);
  const [hasListened, setHasListened] = useState(false);
  useEffect(() => {
    const target = invitationRef.current;
    if (!target || !content.playInvitation) return;
    const observer = new IntersectionObserver(([entry]) => {
      setInvitationInView(Boolean(entry?.isIntersecting));
    }, { threshold: 0.25 });
    observer.observe(target);
    return () => observer.disconnect();
  }, [content.playInvitation]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const {
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
  } = useDashbookingAiReceptionistCall(audioRef);
  const customerSpeaking = speakingSpeaker === 'CUSTOMER';
  const aiSpeaking = speakingSpeaker === 'AI';
  const statusLabel = calendar.callComplete ? content.callCompleteLabel : content.liveCallLabel;

  useEffect(() => {
    if (pauseSignal > 0) {
      pause();
    }
  }, [pause, pauseSignal]);

  return (
    <article className={`ai-call-demo${calendar.callComplete ? ' is-complete' : ''}`}>
      <div className="ai-call-demo__toolbar">
        <span className="ai-call-demo__live">
          <Phone size={14} strokeWidth={2.4} />
          {statusLabel}
        </span>
        <div
          ref={invitationRef}
          className={content.playInvitation ? 'ai-call-demo__listen-prompt' : 'ai-call-demo__listen-prompt--plain'}
          data-in-view={invitationInView}
          data-listened={hasListened}
        >
        <div className="ai-call-demo__controls">
          <button
            type="button"
            className="ai-call-demo__play"
            onClick={() => {
              if (!playing) {
                onPlayStart();
              }
              void togglePlayback();
            }}
            aria-label={playing ? content.pauseLabel : content.playRealCallLabel}
            aria-describedby={content.playInvitation && !hasListened ? invitationId : undefined}
          >
            {playing ? <Pause size={16} strokeWidth={2.4} /> : <Play size={16} strokeWidth={2.4} />}
            <span>{playing ? content.pauseLabel : content.playRealCallLabel}</span>
          </button>
          <span className="ai-call-demo__time">
            {formatAiCallClock(currentTime)} / {formatAiCallClock(duration)}
          </span>
          <button
            type="button"
            className="ai-call-demo__sound"
            onClick={toggleMuted}
            aria-pressed={muted}
            aria-label={muted ? content.soundOnLabel : content.soundOffLabel}
          >
            {muted ? <VolumeX size={16} strokeWidth={2.3} /> : <Volume2 size={16} strokeWidth={2.3} />}
            <span>{muted ? content.soundOffLabel : content.soundOnLabel}</span>
          </button>
        </div>
        {content.playInvitation ? (
          <p className="ai-call-demo__invitation" id={invitationId} aria-hidden={hasListened}>
            <Headphones size={18} strokeWidth={1.8} aria-hidden="true" />
            <span>{content.playInvitation}</span>
          </p>
        ) : null}
        </div>
      </div>

      <div className="ai-call-demo__stage">
        <div className={`ai-call-demo__person${customerSpeaking ? ' is-speaking' : ''}`}>
          <div className="ai-call-demo__portrait">
            <Image
              src={aiReceptionistPortraits.customer}
              alt=""
              width={220}
              height={220}
              sizes="(max-width: 1023px) 88px, 180px"
            />
            <PortraitWaveform active={customerSpeaking && playing} reducedMotion={reducedMotion} />
          </div>
          <strong>{content.customerLabel}</strong>
          <span>{content.customerCaption}</span>
        </div>

        <span className="ai-call-demo__link" aria-hidden="true">
          <Phone size={16} strokeWidth={2.3} />
        </span>

        <div className="ai-call-demo__thread" aria-live="polite">
          <AnimatePresence initial={false} mode="popLayout">
            {visibleBubbles.map((bubble) => (
              <m.p
                layout="position"
                key={bubble.turn.id}
                className={`ai-call-demo__bubble ai-call-demo__bubble--${bubble.turn.speaker.toLowerCase()}${bubble.isActive ? ' is-active' : ''}`}
                initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: bubble.isActive ? 1 : 0.72, y: 0 }}
                exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
                transition={{ duration: reducedMotion ? 0.16 : 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                {bubble.text}
              </m.p>
            ))}
          </AnimatePresence>
        </div>

        <div className={`ai-call-demo__person${aiSpeaking ? ' is-speaking' : ''}`}>
          <div className="ai-call-demo__portrait">
            <Image
              src={aiReceptionistPortraits.receptionist}
              alt=""
              width={220}
              height={220}
              sizes="(max-width: 1023px) 88px, 180px"
            />
            <PortraitWaveform active={aiSpeaking && playing} reducedMotion={reducedMotion} />
          </div>
          <strong>{content.aiLabel}</strong>
          <span>{content.aiCaption}</span>
        </div>
      </div>

      <DashbookingLandingAiReceptionistCalendar
        content={content}
        calendar={calendar}
        reducedMotion={reducedMotion}
      />

      <audio
        ref={audioRef}
        preload="none"
        src={normalizedPublicAssets.aiReceptionist.newAppoinment}
        onLoadedMetadata={syncFromAudio}
        onDurationChange={syncFromAudio}
        onTimeUpdate={syncFromAudio}
        onSeeked={syncFromAudio}
        onPlay={() => { setHasListened(true); handlePlay(); }}
        onPause={handlePause}
        onEnded={handleEnded}
      />
    </article>
  );
}
