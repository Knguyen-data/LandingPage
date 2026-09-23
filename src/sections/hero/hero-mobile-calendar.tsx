'use client';

import { AnimatePresence } from 'motion/react';
import * as m from 'motion/react-m';
import { CalendarDays, Check, UserRound } from 'lucide-react';

import {
  formatHeroHourLabel,
  getHeroAppointmentFillOrder,
  heroAppointmentDemo,
  heroMobileHours,
  type HeroAppointmentDemo,
} from '@/content/demo/hero';
import type { HeroMode, HeroStoryPhase } from '@/sections/hero/use-hero-story';
import type { HeroStaffCopy } from '@/content/types';

interface DashbookingLandingHeroMobileCalendarProps {
  readonly staff?: readonly HeroStaffCopy[];
  readonly dateLabel?: string;
  readonly heading: string;
  readonly emptySlotLabel: string;
  readonly mode: HeroMode;
  readonly phase: HeroStoryPhase;
  readonly fillIndex: number;
  readonly reducedMotion: boolean;
}

const particleOffsets = [
  { x: -18, y: -8 },
  { x: 16, y: -12 },
  { x: -12, y: 14 },
  { x: 14, y: 10 },
  { x: 2, y: -16 },
  { x: -20, y: 4 },
] as const;

function slotAppointment(hour: number, mode: HeroMode): HeroAppointmentDemo | undefined {
  return heroAppointmentDemo.find(
    (item) => item.hour === hour && item.presentIn === (mode === 'with' ? 'with-dash' : 'without-dash'),
  );
}

export function DashbookingLandingHeroMobileCalendar({
  heading,
  emptySlotLabel,
  mode,
  phase,
  fillIndex,
  reducedMotion,
}: DashbookingLandingHeroMobileCalendarProps) {
  return (
    <div className="hero-calendar-mobile" aria-hidden="true">
      <div className="hero-calendar-mobile__toolbar">
        <p className="hero-calendar-mobile__heading">
          <CalendarDays size={16} strokeWidth={2.2} />
          {heading}
        </p>
      </div>

      <ul className="hero-calendar-mobile__slots">
        {heroMobileHours.map((hour) => {
          const appointment = slotAppointment(hour, mode);
          const order = appointment ? getHeroAppointmentFillOrder(appointment) : -1;
          const filled = mode === 'with' && appointment && (reducedMotion || fillIndex >= order);
          const forming =
            mode === 'with' && appointment && !reducedMotion && fillIndex === order && phase === 'appointments-filling';
          const sparse = mode !== 'with' && Boolean(appointment);

          return (
            <li key={hour} className="hero-calendar-mobile__slot">
              <span className="hero-calendar-mobile__time">{formatHeroHourLabel(hour)}</span>
              <AnimatePresence mode="wait">
                {filled || forming ? (
                  <m.div
                    key={`${appointment?.id ?? hour}-filled`}
                    className={`hero-calendar-mobile__card hero-appt--${appointment?.tone ?? 'mint'}`}
                    initial={reducedMotion ? false : { opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    data-hero-target={hour === 10 ? 'calendar-fill' : undefined}
                  >
                    {forming
                      ? particleOffsets.map((offset, index) => (
                          <m.span
                            key={`${hour}-p-${index}`}
                            className="hero-particle"
                            initial={{ opacity: 0, x: offset.x, y: offset.y, scale: 0.3 }}
                            animate={{ opacity: [0, 1, 0], x: 0, y: 0, scale: [0.3, 1, 0.2] }}
                            transition={{ duration: 0.5, delay: index * 0.02 }}
                          />
                        ))
                      : null}
                    <span className="hero-calendar-mobile__person">
                      <UserRound size={14} strokeWidth={2.2} />
                      {appointment?.clientName}
                    </span>
                    <span className="hero-calendar-mobile__service">{appointment?.service}</span>
                    <Check className="hero-calendar-mobile__check" size={16} strokeWidth={2.6} />
                  </m.div>
                ) : sparse ? (
                  <m.div
                    key={`${appointment?.id ?? hour}-sparse`}
                    className={`hero-calendar-mobile__card hero-appt--${appointment?.tone ?? 'lavender'}`}
                    initial={false}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <span className="hero-calendar-mobile__person">
                      <UserRound size={14} strokeWidth={2.2} />
                      {appointment?.clientName || appointment?.service}
                    </span>
                    <span className="hero-calendar-mobile__service">{appointment?.clientName ? appointment.service : ''}</span>
                  </m.div>
                ) : (
                  <m.div
                    key={`${hour}-empty`}
                    className="hero-calendar-mobile__empty"
                    data-hero-target={hour === 12 ? 'calendar-empty' : undefined}
                    initial={false}
                    exit={{ opacity: 0 }}
                  >
                    {emptySlotLabel}
                  </m.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
