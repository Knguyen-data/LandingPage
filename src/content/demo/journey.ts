import type { BookingJourneyNodeId } from '@/content/types';

export type JourneyAppointmentTone = 'mint' | 'aqua' | 'lavender';

export interface JourneyCalendarRow {
  readonly hour: string;
  readonly client: string;
  readonly service: string;
  readonly time: string;
  readonly tone: JourneyAppointmentTone;
  readonly entering?: boolean;
}

export const bookingJourneyNodeOrder: readonly BookingJourneyNodeId[] = [
  'discover',
  'book-online',
  'calendar',
  'reminder',
  'completed',
  'review',
  'growth',
];

export const journeyCalendarRows: readonly JourneyCalendarRow[] = [
  { hour: '9 AM', client: 'Sarah K.', service: 'Gel Nails', time: '9:45', tone: 'mint', entering: true },
  { hour: '10 AM', client: 'Emma T.', service: 'Manicure', time: '10:45', tone: 'aqua' },
  { hour: '11 AM', client: 'Olivia M.', service: 'Acrylic Full Set', time: '11:45', tone: 'lavender' },
  { hour: '12 PM', client: 'Noah T.', service: 'Pedicure', time: '12:45', tone: 'mint' },
];

export const journeyGrowthBars = [0.46, 0.68, 0.92] as const;
