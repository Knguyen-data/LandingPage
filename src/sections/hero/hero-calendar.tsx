'use client';

import Image from 'next/image';
import { AnimatePresence } from 'motion/react';
import * as m from 'motion/react-m';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';

import type { HeroStaffCopy } from '@/content/types';
import {
  formatHeroHourLabel,
  getHeroAppointmentFillOrder,
  heroAppointmentDemo,
  heroCalendarHours,
  heroStaffColumnOrder,
  type HeroAppointmentDemo,
} from '@/content/demo/hero';
import { heroStaffPortraits } from '@/content/shared';
import type { HeroMode, HeroStoryPhase } from '@/sections/hero/use-hero-story';

interface DashbookingLandingHeroCalendarProps {
  readonly staff: readonly HeroStaffCopy[];
  readonly dateLabel: string;
  readonly todayLabel: string;
  readonly mode: HeroMode;
  readonly phase: HeroStoryPhase;
  readonly fillIndex: number;
  readonly reducedMotion: boolean;
}

const particleOffsets = [
  { x: -26, y: -12 },
  { x: 22, y: -18 },
  { x: -16, y: 20 },
  { x: 24, y: 14 },
  { x: 4, y: -24 },
  { x: -28, y: 6 },
  { x: 18, y: 22 },
  { x: -8, y: 16 },
] as const;

type CardVisual = 'hidden' | 'forming' | 'resolved' | 'dissolving' | 'sparse';

function getCardVisual(
  appointment: HeroAppointmentDemo,
  mode: HeroMode,
  phase: HeroStoryPhase,
  fillIndex: number,
  reducedMotion: boolean,
): CardVisual {
  if (appointment.presentIn === 'without-dash') {
    const keepSparse = mode === 'without' || phase === 'toggle-to-with' || phase === 'book-online-emphasis';
    if (keepSparse) {
      return 'sparse';
    }

    if (phase === 'appointments-filling' && fillIndex <= 1) {
      return 'dissolving';
    }

    return 'hidden';
  }

  const order = getHeroAppointmentFillOrder(appointment);

  if (reducedMotion) {
    return mode === 'with' ? 'resolved' : 'hidden';
  }

  if (phase === 'appointments-dissolving') {
    if (fillIndex === order) {
      return 'dissolving';
    }

    return fillIndex > order ? 'resolved' : 'hidden';
  }

  if (mode !== 'with') {
    return 'hidden';
  }

  if (fillIndex === order) {
    return 'forming';
  }

  return fillIndex > order ? 'resolved' : 'hidden';
}

function AppointmentCard({
  appointment,
  visual,
  reducedMotion,
}: {
  readonly appointment: HeroAppointmentDemo;
  readonly visual: Exclude<CardVisual, 'hidden'>;
  readonly reducedMotion: boolean;
}) {
  const showParticles = visual === 'forming' || visual === 'dissolving';
  const showBody = visual === 'resolved' || visual === 'sparse' || visual === 'forming';
  const forming = visual === 'forming';

  return (
    <m.article
      className={`hero-appt hero-appt--${appointment.tone}${forming ? ' is-forming' : ''}`}
      style={{
        gridColumn: heroStaffColumnOrder.indexOf(appointment.staffId) + 2,
        gridRow: appointment.hour - 7,
      }}
      data-hero-target={appointment.id === 'with-amy-10' ? 'calendar-fill' : undefined}
      initial={reducedMotion || visual === 'sparse' ? false : { opacity: 0, scale: 0.72 }}
      animate={
        visual === 'dissolving'
          ? { opacity: 0, scale: 0.82 }
          : { opacity: 1, scale: 1 }
      }
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.86 }}
      transition={{ duration: visual === 'forming' ? 0.42 : 0.36, ease: [0.22, 1, 0.36, 1] }}
    >
      {showParticles && !reducedMotion
        ? particleOffsets.map((offset, index) => (
            <m.span
              key={`${appointment.id}-particle-${index}`}
              className="hero-particle"
              initial={
                visual === 'dissolving'
                  ? { opacity: 0.9, x: 0, y: 0, scale: 1 }
                  : { opacity: 0, x: offset.x, y: offset.y, scale: 0.3 }
              }
              animate={
                visual === 'dissolving'
                  ? { opacity: 0, x: offset.x * 1.2, y: offset.y * 1.2, scale: 0.2 }
                  : { opacity: [0, 1, 0.2], x: 0, y: 0, scale: [0.3, 1, 0.15] }
              }
              transition={{ duration: 0.52, delay: index * 0.018, ease: [0.22, 1, 0.36, 1] }}
            />
          ))
        : null}
      <m.div
        className="hero-appt__body"
        initial={forming && !reducedMotion ? { opacity: 0 } : false}
        animate={{ opacity: showBody ? 1 : 0 }}
        transition={{ duration: 0.22, delay: forming ? 0.28 : 0 }}
      >
        {appointment.clientName ? <strong className="hero-appt__client">{appointment.clientName}</strong> : null}
        <span className="hero-appt__service">{appointment.service}</span>
        <span className="hero-appt__time">{appointment.timeLabel}</span>
      </m.div>
    </m.article>
  );
}

export function DashbookingLandingHeroCalendar({
  staff,
  dateLabel,
  todayLabel,
  mode,
  phase,
  fillIndex,
  reducedMotion,
}: DashbookingLandingHeroCalendarProps) {
  const staffById = new Map(staff.map((item) => [item.id, item]));

  return (
    <div className="hero-calendar" aria-hidden="true">
      <div className="hero-calendar__toolbar">
        <button type="button" className="hero-calendar__nav" aria-hidden="true" tabIndex={-1}>
          <ChevronLeft size={16} strokeWidth={2.2} />
        </button>
        <p className="hero-calendar__date">
          <CalendarDays size={14} strokeWidth={2.2} />
          {dateLabel}
        </p>
        <button type="button" className="hero-calendar__nav" aria-hidden="true" tabIndex={-1}>
          <ChevronRight size={16} strokeWidth={2.2} />
        </button>
        <span className="hero-calendar__today">{todayLabel}</span>
      </div>

      <div className="hero-calendar__grid">
        <div className="hero-calendar__corner" />
        {heroStaffColumnOrder.map((staffId) => {
          const person = staffById.get(staffId);
          if (!person) {
            return null;
          }

          return (
            <div key={staffId} className="hero-calendar__staff">
              <Image
                src={heroStaffPortraits[staffId]}
                alt=""
                width={64}
                height={64}
                className="hero-calendar__avatar"
              />
              <div className="hero-calendar__staff-copy">
                <strong>{person.name}</strong>
                <span className="hero-calendar__role">{person.role}</span>
              </div>
            </div>
          );
        })}

        {heroCalendarHours.map((hour) => (
          <div key={hour} className="hero-calendar__hour" style={{ gridRow: hour - 7 }}>
            {formatHeroHourLabel(hour)}
          </div>
        ))}

        {heroStaffColumnOrder.map((staffId, staffIndex) =>
          heroCalendarHours.map((hour) => (
            <div
              key={`${staffId}-${hour}-slot`}
              className="hero-calendar__slot"
              style={{ gridColumn: staffIndex + 2, gridRow: hour - 7 }}
            />
          )),
        )}

        <div className="hero-calendar__target hero-calendar__target--empty" data-hero-target="calendar-empty" />

        <AnimatePresence>
          {heroAppointmentDemo.map((appointment) => {
            const visual = getCardVisual(appointment, mode, phase, fillIndex, reducedMotion);
            if (visual === 'hidden') {
              return null;
            }

            return (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                visual={visual}
                reducedMotion={reducedMotion}
              />
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
