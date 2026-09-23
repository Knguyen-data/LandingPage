import type { HeroStaffId } from '@/content/types';

export type HeroAppointmentTone = 'mint' | 'aqua' | 'lavender' | 'blue' | 'teal';
export type HeroAppointmentPresence = 'without-dash' | 'with-dash';

export interface HeroAppointmentDemo {
  readonly id: string;
  readonly staffId: HeroStaffId;
  readonly hour: number;
  readonly clientName: string;
  readonly service: string;
  readonly timeLabel: string;
  readonly tone: HeroAppointmentTone;
  readonly presentIn: HeroAppointmentPresence;
}

export const heroCalendarHours = [9, 10, 11, 12, 13] as const;
export const heroMobileHours = [10, 11, 12] as const;

export const heroAppointmentDemo: readonly HeroAppointmentDemo[] = [
  {
    id: 'without-amy-10',
    staffId: 'amy',
    hour: 10,
    clientName: '',
    service: 'Hair Cut',
    timeLabel: '10:00 – 10:45 AM',
    tone: 'mint',
    presentIn: 'without-dash',
  },
  {
    id: 'with-amy-9',
    staffId: 'amy',
    hour: 9,
    clientName: 'Sarah K.',
    service: 'Gel Nails',
    timeLabel: '9:00 – 9:45',
    tone: 'mint',
    presentIn: 'with-dash',
  },
  {
    id: 'with-bella-9',
    staffId: 'bella',
    hour: 9,
    clientName: 'Lucas P.',
    service: 'Manicure',
    timeLabel: '9:00 – 9:45',
    tone: 'lavender',
    presentIn: 'with-dash',
  },
  {
    id: 'with-amy-10',
    staffId: 'amy',
    hour: 10,
    clientName: 'Emma T.',
    service: 'Manicure',
    timeLabel: '10:00 – 10:45',
    tone: 'aqua',
    presentIn: 'with-dash',
  },
  {
    id: 'with-chloe-10',
    staffId: 'chloe',
    hour: 10,
    clientName: 'Jacob L.',
    service: 'Acrylic Full Set',
    timeLabel: '10:00 – 10:45',
    tone: 'teal',
    presentIn: 'with-dash',
  },
  {
    id: 'with-bella-11',
    staffId: 'bella',
    hour: 11,
    clientName: 'Ava S.',
    service: 'Pedicure',
    timeLabel: '11:00 – 11:45',
    tone: 'mint',
    presentIn: 'with-dash',
  },
  {
    id: 'with-amy-12',
    staffId: 'amy',
    hour: 12,
    clientName: 'Sophia L.',
    service: 'Nail Art',
    timeLabel: '12:00 – 12:45',
    tone: 'lavender',
    presentIn: 'with-dash',
  },
  {
    id: 'with-chloe-13',
    staffId: 'chloe',
    hour: 13,
    clientName: 'Benjamin S.',
    service: 'Manicure',
    timeLabel: '1:00 – 1:45',
    tone: 'blue',
    presentIn: 'with-dash',
  },
];

export const heroStaffColumnOrder: readonly HeroStaffId[] = ['amy', 'bella', 'chloe'];

export const heroWithDashAppointments = heroAppointmentDemo.filter((item) => item.presentIn === 'with-dash');
export const heroFilledAppointmentCount = heroWithDashAppointments.length;

export function getHeroAppointmentFillOrder(appointment: HeroAppointmentDemo): number {
  if (appointment.presentIn !== 'with-dash') {
    return -1;
  }

  return heroWithDashAppointments.findIndex((item) => item.id === appointment.id);
}

export function formatHeroHourLabel(hour: number): string {
  if (hour === 12) {
    return '12 PM';
  }

  if (hour > 12) {
    return `${hour - 12} PM`;
  }

  return `${hour} AM`;
}
