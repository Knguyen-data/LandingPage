'use client';

import { useEffect, useRef, type ReactNode } from 'react';

import { LazyMotion, domAnimation, useReducedMotion } from 'motion/react';
import type { HTMLMotionProps } from 'motion/react';
import * as m from 'motion/react-m';

const revealEase: [number, number, number, number] = [0.65, 0, 0.35, 1];


interface MotionScopeProps {
  readonly children: ReactNode;
}

interface SectionRevealProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  readonly children: ReactNode;
  readonly delay?: number;
  readonly distance?: number;
}

interface RevealGroupProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  readonly children: ReactNode;
  readonly delay?: number;
  readonly stagger?: number;
}

interface RevealItemProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  readonly children: ReactNode;
  readonly distance?: number;
}

interface InteractiveCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  readonly children: ReactNode;
}

// Progressive enhancement: server HTML remains readable before JS is available.
// Each target observes its own viewport entry, including cards in tall mobile sections.
export function MotionScope({ children }: MotionScopeProps) {
  const markerRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const root = markerRef.current?.closest('section, header, footer');
    if (!root) return;
    const targets = Array.from(root.querySelectorAll<HTMLElement>([
      '[data-reveal]',
      '.landing-hero__copy-col > *', '.landing-hero__toggle', '.landing-hero__stage',
      '.booking-journey__row > li', '.faq-item', '.canada-city-chip',
      '.google-reviews__benefits > li', '.ai-call__benefits > li',
    ].join(',')));
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const reveal = (node: HTMLElement) => {
      node.dataset.revealState = 'visible';
      observer.unobserve(node);
    };
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) reveal(entry.target as HTMLElement);
      }
    }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });
    for (const node of targets) {
      node.dataset.reveal = '';
      // Skip nested wrappers to avoid doubling a card's movement.
      if (node.parentElement?.closest('[data-reveal]')) continue;
      const group = node.closest<HTMLElement>('[data-reveal-group]');
      if (group && !node.style.getPropertyValue('--reveal-delay')) {
        const siblings = Array.from(group.querySelectorAll('[data-reveal]'));
        const step = Number(group.dataset.revealStagger ?? 0.06);
        node.style.setProperty('--reveal-delay', `${Math.min(Number(group.dataset.revealDelay ?? 0) + siblings.indexOf(node) * step, 0.18)}s`);
      }
      node.dataset.revealState = media.matches ? 'visible' : 'pending';
      if (!media.matches) observer.observe(node);
    }
    const showAll = () => { if (media.matches) targets.forEach(reveal); };
    const focusReveal = (event: Event) => {
      if (!(event.target instanceof HTMLElement)) return;
      let node = event.target.closest<HTMLElement>('[data-reveal]');
      while (node && root.contains(node)) {
        reveal(node);
        node = node.parentElement?.closest<HTMLElement>('[data-reveal]') ?? null;
      }
    };
    media.addEventListener('change', showAll);
    root.addEventListener('focusin', focusReveal);
    const sectionObserver = new IntersectionObserver(([entry]) => {
      root.setAttribute('data-in-view', String(Boolean(entry?.isIntersecting)));
    });
    sectionObserver.observe(root);
    return () => {
      observer.disconnect();
      sectionObserver.disconnect();
      media.removeEventListener('change', showAll);
      root.removeEventListener('focusin', focusReveal);
      targets.forEach(node => { delete node.dataset.revealState; });
    };
  }, []);
  return <LazyMotion features={domAnimation}><span hidden ref={markerRef} />{children}</LazyMotion>;
}

export function SectionReveal({ children, className, delay = 0, distance = 24, style, ...props }: SectionRevealProps) {
  return (
    <m.div className={className} data-reveal="" style={{
      '--reveal-distance': `${distance}px`,
      '--reveal-delay': `${Math.min(delay, 0.18)}s`,
      ...style,
    } as HTMLMotionProps<'div'>['style']} {...props}>{children}</m.div>
  );
}

export function RevealGroup({ children, className, delay = 0, stagger = 0.06, ...props }: RevealGroupProps) {
  return <m.div className={className} data-reveal-group="" data-reveal-stagger={stagger}
    data-reveal-delay={delay} {...props}>{children}</m.div>;
}

export function RevealItem({ children, className, distance = 18, style, ...props }: RevealItemProps) {
  return <m.div className={className} data-reveal="" style={{
    '--reveal-distance': `${distance}px`, ...style,
  } as HTMLMotionProps<'div'>['style']} {...props}>{children}</m.div>;
}

export function InteractiveCard({ children, className, ...props }: InteractiveCardProps) {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <m.div
      className={className}
      whileHover={reducedMotion ? undefined : { y: -6, scale: 1.012, filter: 'brightness(1.03)' }}
      whileTap={reducedMotion ? undefined : { scale: 0.985 }}
      transition={{ duration: 0.28, ease: revealEase }}
      {...props}
    >
      {children}
    </m.div>
  );
}
