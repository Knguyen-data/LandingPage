'use client';

import type { ReactNode } from 'react';

import { LazyMotion, domAnimation, useReducedMotion } from 'motion/react';
import type { HTMLMotionProps } from 'motion/react';
import * as m from 'motion/react-m';

const revealEase: [number, number, number, number] = [0.65, 0, 0.35, 1];
const viewport = { once: true, amount: 0.12 };

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

function getHiddenState(reducedMotion: boolean, distance: number) {
  if (reducedMotion) {
    return { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' };
  }

  return { opacity: 0, y: distance, scale: 0.985, filter: 'blur(14px)' };
}

function getVisibleState(delay: number) {
  return {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.62,
      delay,
      ease: revealEase,
    },
  };
}

export function MotionScope({ children }: MotionScopeProps) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}

export function SectionReveal({
  children,
  className,
  delay = 0,
  distance = 24,
  ...props
}: SectionRevealProps) {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <m.div
      className={className}
      initial={getHiddenState(reducedMotion, distance)}
      whileInView={getVisibleState(delay)}
      viewport={viewport}
      {...props}
    >
      {children}
    </m.div>
  );
}

export function RevealGroup({
  children,
  className,
  delay = 0,
  stagger = 0.1,
  ...props
}: RevealGroupProps) {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      {...props}
      variants={{
        hidden: { opacity: 1 },
        visible: {
          opacity: 1,
          transition: {
            delayChildren: delay,
            staggerChildren: reducedMotion ? 0 : stagger,
          },
        },
      }}
    >
      {children}
    </m.div>
  );
}

export function RevealItem({
  children,
  className,
  distance = 18,
  ...props
}: RevealItemProps) {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <m.div
      className={className}
      variants={{
        hidden: getHiddenState(reducedMotion, distance),
        visible: getVisibleState(0),
      }}
      {...props}
    >
      {children}
    </m.div>
  );
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
