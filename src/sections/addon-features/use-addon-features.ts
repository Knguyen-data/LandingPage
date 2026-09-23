'use client';

import { useEffect, useRef, useState } from 'react';

import {
  addonDepositBeats,
  addonGiftCardBeats,
  addonSequenceHoldMs,
  type AddonDepositPhase,
  type AddonGiftCardPhase,
} from '@/content/demo/addon-features';

export type AddonActivePanel = 'gift' | 'deposit';

export function useDashbookingAddonFeatureSequence() {
  const rootRef = useRef<HTMLElement | null>(null);
  const inViewRef = useRef(false);
  const [activePanel, setActivePanel] = useState<AddonActivePanel>('gift');
  const [giftPhase, setGiftPhase] = useState<AddonGiftCardPhase>('purchase');
  const [depositPhase, setDepositPhase] = useState<AddonDepositPhase>('setup');

  useEffect(() => {
    const node = rootRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = Boolean(entry?.isIntersecting);
      },
      { threshold: 0 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;

    if (reduced) {
      frame = requestAnimationFrame(() => {
        setActivePanel('gift');
        setGiftPhase('hold');
        setDepositPhase('hold');
      });
      return () => cancelAnimationFrame(frame);
    }

    let panel: AddonActivePanel = 'gift';
    let beat = 0;
    let elapsed = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const delta = now - last;
      last = now;
      if (inViewRef.current) {
        elapsed += delta;
        const beats = panel === 'gift' ? addonGiftCardBeats : addonDepositBeats;
        const current = beats[beat];
        const duration = current ? current.ms : addonSequenceHoldMs;
        if (elapsed >= duration) {
          elapsed = 0;
          if (beat >= beats.length - 1) {
            panel = panel === 'gift' ? 'deposit' : 'gift';
            beat = 0;
            setActivePanel(panel);
            if (panel === 'gift') {
              const next = addonGiftCardBeats[0];
              if (next) {
                setGiftPhase(next.phase);
              }
            } else {
              const next = addonDepositBeats[0];
              if (next) {
                setDepositPhase(next.phase);
              }
            }
          } else {
            beat += 1;
            if (panel === 'gift') {
              const next = addonGiftCardBeats[beat];
              if (next) {
                setGiftPhase(next.phase);
              }
            } else {
              const next = addonDepositBeats[beat];
              if (next) {
                setDepositPhase(next.phase);
              }
            }
          }
        }
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return { activePanel, giftPhase, depositPhase, rootRef };
}
