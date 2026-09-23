'use client';

import { useEffect, useLayoutEffect, useState } from 'react';
import type { RefObject } from 'react';
import * as m from 'motion/react-m';

import type { HeroAnnotation } from '@/content/types';

interface DashbookingLandingHeroAnnotationsProps {
  readonly items: readonly HeroAnnotation[];
  readonly active: boolean;
  readonly playKey: string;
  readonly reducedMotion: boolean;
  readonly stageRef: RefObject<HTMLElement | null>;
  readonly tone?: 'benefit' | 'friction';
  readonly onAnnotationStart?: () => void;
}

interface Point {
  x: number;
  y: number;
}

interface ArrowGeometry {
  start: Point;
  end: Point;
  control: Point;
  headAngle: number;
}

type AnnotationStatus = 'upcoming' | 'playing' | 'done';

const ANNOTATION_MS = 880;
const ANNOTATION_GAP_MS = 340;

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function relativeRect(element: Element, stage: DOMRect): { x: number; y: number; width: number; height: number } {
  const rect = element.getBoundingClientRect();
  return {
    x: rect.left - stage.left,
    y: rect.top - stage.top,
    width: rect.width,
    height: rect.height,
  };
}

function edgePoint(box: { x: number; y: number; width: number; height: number }, toward: Point): Point {
  const cx = box.x + box.width / 2;
  const cy = box.y + box.height / 2;
  const dx = toward.x - cx;
  const dy = toward.y - cy;

  if (Math.abs(dx) < 0.001 && Math.abs(dy) < 0.001) {
    return { x: cx, y: cy };
  }

  const scale = Math.min(box.width / 2 / Math.max(Math.abs(dx), 0.001), box.height / 2 / Math.max(Math.abs(dy), 0.001));
  return {
    x: cx + dx * scale * 0.94,
    y: cy + dy * scale * 0.94,
  };
}

function buildArrow(
  box: { x: number; y: number; width: number; height: number },
  target: { x: number; y: number; width: number; height: number },
): ArrowGeometry {
  const targetCenter = { x: target.x + target.width / 2, y: target.y + target.height / 2 };
  const start = edgePoint(box, targetCenter);
  const end = edgePoint(target, start);
  const midX = (start.x + end.x) / 2;
  const midY = (start.y + end.y) / 2;
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const distance = Math.max(Math.hypot(dx, dy), 1);
  const bend = clamp(distance * 0.16, 10, 36);
  const control = {
    x: midX - (dy / distance) * bend,
    y: midY + (dx / distance) * bend,
  };
  const headAngle = Math.atan2(end.y - control.y, end.x - control.x);

  return { start, end, control, headAngle };
}

function useTypedText(text: string, enabled: boolean, delayMs: number): string {
  const [shown, setShown] = useState('');

  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    let index = 0;
    let intervalId = 0;
    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        index += 1;
        setShown(text.slice(0, index));
        if (index >= text.length) {
          window.clearInterval(intervalId);
        }
      }, 18);
    }, delayMs);

    return () => {
      window.clearTimeout(timeoutId);
      window.clearInterval(intervalId);
    };
  }, [delayMs, enabled, text]);

  return enabled ? shown : text;
}

function AnnotationArrow({
  arrow,
  playing,
}: {
  readonly arrow: ArrowGeometry;
  readonly playing: boolean;
}) {
  const path = `M ${arrow.start.x} ${arrow.start.y} Q ${arrow.control.x} ${arrow.control.y} ${arrow.end.x} ${arrow.end.y}`;
  const head = `${arrow.end.x},${arrow.end.y} ${arrow.end.x - 8 * Math.cos(arrow.headAngle) + 5 * Math.sin(arrow.headAngle)},${arrow.end.y - 8 * Math.sin(arrow.headAngle) - 5 * Math.cos(arrow.headAngle)} ${arrow.end.x - 8 * Math.cos(arrow.headAngle) - 5 * Math.sin(arrow.headAngle)},${arrow.end.y - 8 * Math.sin(arrow.headAngle) + 5 * Math.cos(arrow.headAngle)}`;

  return (
    <g>
      <m.path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={playing ? { pathLength: 0 } : false}
        animate={{ pathLength: 1 }}
        transition={{ duration: playing ? 0.28 : 0, ease: [0.22, 1, 0.36, 1] }}
      />
      <m.polygon
        points={head}
        fill="currentColor"
        initial={playing ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.16, delay: playing ? 0.26 : 0 }}
      />
    </g>
  );
}

function AnnotationBox({
  item,
  status,
  reducedMotion,
}: {
  readonly item: HeroAnnotation;
  readonly status: AnnotationStatus;
  readonly reducedMotion: boolean;
}) {
  const playing = status === 'playing' && !reducedMotion;
  const visible = status !== 'upcoming';
  const title = useTypedText(item.title, playing, 420);
  const body = useTypedText(item.body ?? '', playing && Boolean(item.body), 640);

  return (
    <m.aside
      className={`hero-annotation hero-annotation--${item.id}`}
      data-annotation-id={item.id}
      initial={playing ? { opacity: 0, scale: 0.92, y: 6 } : false}
      animate={visible ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.96, y: 6 }}
      transition={{ duration: playing ? 0.28 : 0.18, delay: playing ? 0.22 : 0, ease: [0.65, 0, 0.35, 1] }}
    >
      <div className="hero-annotation__box">
        <strong>{playing ? title : item.title}</strong>
        {item.body ? <span>{playing ? body : item.body}</span> : null}
      </div>
    </m.aside>
  );
}

function getStatus(index: number, step: number, reducedMotion: boolean, count: number): AnnotationStatus {
  if (reducedMotion || step >= count) {
    return 'done';
  }

  if (index < step) {
    return 'done';
  }

  if (index === step) {
    return 'playing';
  }

  return 'upcoming';
}

export function DashbookingLandingHeroAnnotations({
  items,
  active,
  playKey,
  reducedMotion,
  stageRef,
  tone = 'friction',
  onAnnotationStart,
}: DashbookingLandingHeroAnnotationsProps) {
  const [step, setStep] = useState(reducedMotion ? items.length : 0);
  const [arrows, setArrows] = useState<Record<string, ArrowGeometry>>({});

  useEffect(() => {
    if (!active || reducedMotion) {
      return undefined;
    }

    const timers = items.map((_, index) =>
      window.setTimeout(() => {
        onAnnotationStart?.();
        if (index > 0) {
          setStep(index);
        }
      }, index * (ANNOTATION_MS + ANNOTATION_GAP_MS)),
    );

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [active, items, onAnnotationStart, playKey, reducedMotion]);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage || !active) {
      return undefined;
    }

    const measure = () => {
      const stageRect = stage.getBoundingClientRect();
      const next: Record<string, ArrowGeometry> = {};

      for (const item of items) {
        const box = stage.querySelector(`[data-annotation-id="${item.id}"]`);
        const target = stage.querySelector(`[data-hero-target="${item.anchor}"]`);
        if (!box || !target) {
          continue;
        }

        next[item.id] = buildArrow(relativeRect(box, stageRect), relativeRect(target, stageRect));
      }

      setArrows(next);
    };

    measure();
    const frame = window.requestAnimationFrame(measure);
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    window.addEventListener('resize', measure);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [active, items, playKey, stageRef, step]);

  if (!active) {
    return null;
  }

  return (
    <div className={`hero-annotation-layer hero-annotation-layer--${tone}`}>
      <svg className="hero-annotation-layer__svg" aria-hidden="true">
        {items.map((item, index) => {
          const status = getStatus(index, step, reducedMotion, items.length);
          const arrow = arrows[item.id];
          if (status === 'upcoming' || !arrow) {
            return null;
          }

          return <AnnotationArrow key={`${playKey}-${item.id}`} arrow={arrow} playing={status === 'playing' && !reducedMotion} />;
        })}
      </svg>
      {items.map((item, index) => (
        <AnnotationBox
          key={`${playKey}-${item.id}`}
          item={item}
          status={getStatus(index, step, reducedMotion, items.length)}
          reducedMotion={reducedMotion}
        />
      ))}
    </div>
  );
}
