'use client';

import type { CSSProperties } from 'react';
import Image from '@/components/viewport-image';
import {
  CalendarDays,
  Check,
  ChevronRight,
  Clock,
  Search,
  Sparkles,
  Star,
  UserRound,
} from 'lucide-react';

import type { BookingJourneyNodeStatus } from '@/sections/booking-journey/use-booking-journey';
import type { BookingJourneyContent, BookingJourneyNodeCopy } from '@/content/types';
import { journeyCalendarRows, journeyGrowthBars } from '@/content/demo/journey';
import { googleLogo, heroBusinessProfilePhotos } from '@/content/shared';

interface DashbookingLandingBookingJourneyNodeProps {
  readonly index: number;
  readonly node: BookingJourneyNodeCopy;
  readonly content: BookingJourneyContent;
  readonly status: BookingJourneyNodeStatus;
  readonly reducedMotion: boolean;
  readonly onSelect: (index: number) => void;
}

const enteringAppointment = journeyCalendarRows.find((row) => row.entering) ?? journeyCalendarRows[0];

function DiscoverVisual({ content, status }: { content: BookingJourneyContent; status: BookingJourneyNodeStatus }) {
  const photo = heroBusinessProfilePhotos[1] ?? heroBusinessProfilePhotos[0];

  return (
    <div className={`journey-discover is-${status}`}>
      <div className="journey-discover__search">
        <Image src={googleLogo} alt="" width={16} height={16} />
        <span className="journey-discover__query">{content.discover.searchQuery}</span>
        <Search size={14} strokeWidth={2.3} />
      </div>
      <div className="journey-discover__result">
        {photo ? (
          <Image src={photo} alt="" width={220} height={96} className="journey-discover__photo" />
        ) : null}
        <strong>{content.discover.salonName}</strong>
        <p>
          <span>{content.discover.ratingValue}</span>
          <span className="journey-stars" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} size={11} strokeWidth={0} fill="currentColor" />
            ))}
          </span>
          <span>{content.discover.reviewCount}</span>
        </p>
        <p>
          {content.discover.category}
          <span aria-hidden="true"> · </span>
          <em>{content.discover.hours}</em>
        </p>
      </div>
    </div>
  );
}

function BookingVisual({ content, status }: { content: BookingJourneyContent; status: BookingJourneyNodeStatus }) {
  const rows = [
    { icon: Sparkles, label: content.booking.service },
    { icon: UserRound, label: content.booking.staff },
    { icon: CalendarDays, label: content.booking.date },
    { icon: Clock, label: content.booking.time },
  ];

  return (
    <div className={`journey-book is-${status}`}>
      <p className="journey-book__heading">{content.booking.heading}</p>
      <ul>
        {rows.map((row, index) => (
          <li key={row.label} style={{ '--journey-stagger': `${index * 90}ms` } as CSSProperties}>
            <row.icon size={14} strokeWidth={2.2} />
            <span>{row.label}</span>
            <ChevronRight size={13} strokeWidth={2.2} />
          </li>
        ))}
      </ul>
      <span className="journey-book__cta">{content.booking.cta}</span>
    </div>
  );
}

function CalendarVisual({ content, status }: { content: BookingJourneyContent; status: BookingJourneyNodeStatus }) {
  return (
    <div className={`journey-cal is-${status}`}>
      <div className="journey-cal__toolbar">
        <span aria-hidden="true">‹</span>
        <strong>{content.calendar.dateLabel}</strong>
        <span aria-hidden="true">›</span>
      </div>
      <div className="journey-cal__stage">
        <span className="journey-cal__particle" />
        <span className="journey-cal__particle" />
        <span className="journey-cal__particle" />
        <span className="journey-cal__particle" />
        <span className="journey-cal__particle" />
        <ul>
          {journeyCalendarRows.map((row) => (
            <li key={row.hour} className={row.entering ? `is-${row.tone} is-entering` : `is-${row.tone}`}>
              <span>{row.hour}</span>
              <div>
                <strong>
                  {row.client} · {row.time}
                </strong>
                <small>{row.service}</small>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ReminderVisual({ content, status }: { content: BookingJourneyContent; status: BookingJourneyNodeStatus }) {
  return (
    <div className={`journey-note is-${status}`}>
      <p className="journey-note__time">{content.reminder.timeLabel}</p>
      <div className="journey-note__bubble">
        <p>
          <strong>{content.reminder.greeting}</strong> {content.reminder.body}
        </p>
        <p>{content.reminder.closing}</p>
      </div>
      <p className="journey-note__sent">
        <Check size={13} strokeWidth={2.6} />
        {content.reminder.sentLabel}
      </p>
    </div>
  );
}

function CompletedVisual({ content, status }: { content: BookingJourneyContent; status: BookingJourneyNodeStatus }) {
  return (
    <div className={`journey-done is-${status}`}>
      <div className="journey-done__ticket">
        <span>
          {enteringAppointment?.client} · {enteringAppointment?.service}
        </span>
        <em>{content.completed.statusLabel}</em>
      </div>
      <div className="journey-done__mark">
        {Array.from({ length: 8 }).map((_, index) => (
          <span key={index} className="journey-done__spark" />
        ))}
        <Check size={26} strokeWidth={2.8} />
      </div>
    </div>
  );
}

function ReviewVisual({ content, status }: { content: BookingJourneyContent; status: BookingJourneyNodeStatus }) {
  return (
    <div className={`journey-review is-${status}`}>
      <p className="journey-note__time">{content.review.timeLabel}</p>
      <div className="journey-note__bubble">
        <p>{content.review.message}</p>
        <span className="journey-stars journey-stars--row" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              size={16}
              strokeWidth={0}
              fill="currentColor"
              style={{ '--journey-stagger': `${index * 80}ms` } as CSSProperties}
            />
          ))}
        </span>
      </div>
      <span className="journey-review__cta">{content.review.cta}</span>
    </div>
  );
}

function GrowthVisual({ content, status }: { content: BookingJourneyContent; status: BookingJourneyNodeStatus }) {
  return (
    <div className={`journey-growth is-${status}`}>
      <div className="journey-growth__graphic">
        <svg className="journey-growth__loop" viewBox="0 0 200 200" aria-hidden="true">
          <circle className="journey-growth__ring" cx="100" cy="100" r="76" />
        </svg>
        <svg className="journey-growth__arrow" viewBox="0 0 200 200" aria-hidden="true">
          <path className="journey-growth__trail" d="M 28.6 74 A 76 76 0 0 1 100 24" />
          <path className="journey-growth__head" d="M 114 24 L 98 15 L 98 33 Z" />
        </svg>
        <div className="journey-growth__bars" aria-hidden="true">
          {journeyGrowthBars.map((value, index) => (
            <span
              key={value}
              style={
                {
                  '--journey-bar': String(value),
                  '--journey-stagger': `${index * 180}ms`,
                } as CSSProperties
              }
            />
          ))}
        </div>
      </div>
      <ul className="journey-growth__legend">
        <li>{content.growth.line1}</li>
        <li>{content.growth.line2}</li>
        <li>{content.growth.line3}</li>
      </ul>
    </div>
  );
}

function NodeVisual({
  node,
  content,
  status,
}: {
  node: BookingJourneyNodeCopy;
  content: BookingJourneyContent;
  status: BookingJourneyNodeStatus;
}) {
  switch (node.id) {
    case 'discover':
      return <DiscoverVisual content={content} status={status} />;
    case 'book-online':
      return <BookingVisual content={content} status={status} />;
    case 'calendar':
      return <CalendarVisual content={content} status={status} />;
    case 'reminder':
      return <ReminderVisual content={content} status={status} />;
    case 'completed':
      return <CompletedVisual content={content} status={status} />;
    case 'review':
      return <ReviewVisual content={content} status={status} />;
    case 'growth':
      return <GrowthVisual content={content} status={status} />;
    default:
      return null;
  }
}

export function DashbookingLandingBookingJourneyNode({
  index,
  node,
  content,
  status,
  reducedMotion,
  onSelect,
}: DashbookingLandingBookingJourneyNodeProps) {
  return (
    <article
      data-journey-node
      data-node-id={node.id}
      className={`booking-journey__node is-${status}${reducedMotion ? ' is-static' : ''}${node.id === 'growth' ? ' is-growth' : ''}`}
      aria-current={status === 'active' ? 'step' : undefined}
    >
      <span className="booking-journey__index" data-journey-badge>
        {index + 1}
      </span>
      <button type="button" className="booking-journey__hit" onClick={() => onSelect(index)}>
        <span className="visually-hidden">{node.title}</span>
      </button>
      {node.id === 'growth' ? null : <h3>{node.title}</h3>}
      <div className="booking-journey__visual" data-journey-anchor>
        <NodeVisual node={node} content={content} status={status} />
      </div>
      <div className="booking-journey__annotation">
        <span className="booking-journey__annotation-line" aria-hidden="true" />
        <p className="booking-journey__benefit">{node.benefit}</p>
      </div>
    </article>
  );
}
