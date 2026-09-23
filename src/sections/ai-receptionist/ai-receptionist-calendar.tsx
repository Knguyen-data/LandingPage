'use client';

import { Fragment } from 'react';
import Image from '@/components/viewport-image';
import { CalendarDays, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import * as m from 'motion/react-m';

import type { AiReceptionistSectionContent } from '@/content/types';
import {
  AI_CALL_BOOKING_STAFF_ID,
  aiCallCalendarSlots,
  aiCallStaffColumnOrder,
  type AiCallCalendarState,
} from '@/content/demo/ai-receptionist';
import { aiReceptionistPortraits } from '@/content/shared';

interface DashbookingLandingAiReceptionistCalendarProps {
  readonly content: AiReceptionistSectionContent;
  readonly calendar: AiCallCalendarState;
  readonly reducedMotion: boolean;
}

function slotClassName(state: AiCallCalendarState, slotId: string, staffId: string): string {
  const classes = ['ai-call-cal__cell'];

  if (slotId === '12:00' && staffId === AI_CALL_BOOKING_STAFF_ID) {
    classes.push(`ai-call-cal__cell--${state.slot1300}`);
  } else if (state.morningHighlight && (slotId === '09:30' || slotId === '09:45' || slotId === '10:00')) {
    classes.push('ai-call-cal__cell--open');
  } else if (state.morningDim && (slotId === '09:30' || slotId === '09:45' || slotId === '10:00')) {
    classes.push('ai-call-cal__cell--dim');
  }

  return classes.join(' ');
}

export function DashbookingLandingAiReceptionistCalendar({
  content,
  calendar,
  reducedMotion,
}: DashbookingLandingAiReceptionistCalendarProps) {
  const staff = content.staff;
  const columns = aiCallStaffColumnOrder;
  const clientLabel = calendar.clientName || content.namePendingLabel;

  return (
    <div className={`ai-call-cal${calendar.open ? ' is-open' : ' is-idle'}`}>
      <div className="ai-call-cal__toolbar">
        <div className="ai-call-cal__date">
          <CalendarDays size={14} strokeWidth={2.3} />
          <span>Wed, Apr 29, 2026</span>
        </div>
        <div className="ai-call-cal__nav" aria-hidden="true">
          <span className="ai-call-cal__nav-btn">
            <ChevronLeft size={14} strokeWidth={2.4} />
          </span>
          <span className="ai-call-cal__nav-btn">
            <ChevronRight size={14} strokeWidth={2.4} />
          </span>
        </div>
        <div className="ai-call-cal__views">
          <span className="is-active">{content.calendarDayLabel}</span>
          <span>{content.calendarWeekLabel}</span>
        </div>
      </div>

      <div className="ai-call-cal__board">
        <div className="ai-call-cal__grid">
          <span className="ai-call-cal__corner" />
          {staff.map((person) => (
            <div key={person.id} className="ai-call-cal__staff" data-staff={person.id}>
              <Image
                src={aiReceptionistPortraits[person.id]}
                alt=""
                width={40}
                height={40}
                className="ai-call-cal__avatar"
              />
              <strong>{person.name}</strong>
            </div>
          ))}

          {aiCallCalendarSlots.map((slot) => (
            <Fragment key={slot.id}>
              <span className="ai-call-cal__hour">
                {slot.label}
              </span>
              {columns.map((staffId) => {
                const isBookingCell = slot.bookable && staffId === AI_CALL_BOOKING_STAFF_ID;
                return (
                  <div key={`${slot.id}-${staffId}`} className={slotClassName(calendar, slot.id, staffId)} data-staff={staffId}>
                    {isBookingCell && calendar.slot1300 === 'available' ? (
                      <span className="ai-call-cal__hint">{content.availableLabel}</span>
                    ) : null}
                    {isBookingCell && calendar.slot1300 === 'selected' ? (
                      <span className="ai-call-cal__hint">{content.selectedLabel}</span>
                    ) : null}
                    {isBookingCell && (calendar.slot1300 === 'draft' || calendar.slot1300 === 'booked') ? (
                      <m.article
                        className={`ai-call-cal__card${calendar.slot1300 === 'booked' ? ' is-booked' : ''}`}
                        initial={reducedMotion ? false : { opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div>
                          <strong>{clientLabel}</strong>
                          <span>{content.serviceValue}</span>
                        </div>
                        {calendar.slot1300 === 'booked' ? (
                          <span className="ai-call-cal__booked">
                            <Check size={12} strokeWidth={2.8} />
                            {content.bookedLabel}
                          </span>
                        ) : null}
                      </m.article>
                    ) : null}
                  </div>
                );
              })}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
