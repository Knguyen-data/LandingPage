import { aiReceptionistDemos } from '@/content/ai-receptionist-demos';
import type { LandingContent } from '@/content/landing/dashbooking-landing-content-types';
import { googlePartnersUrl } from '@/content/landing/dashbooking-landing-shared-data';

export const dashbookingLandingContentEn: LandingContent = {
  locale: 'en',
  localeLabel: 'English',
  metadata: {
    title: 'Dash Booking for nail and beauty salons',
    description:
      'Dash Booking brings in Google bookings, keeps the calendar in one place, and charges only when the platform brings bookings in.',
  },
  header: {
    nav: [
      { label: 'AI Receptionist', href: '#ai-demo' },
      { label: 'Pricing', href: '#pricing' },
    ],
    cta: 'Sign up free',
    homeAriaLabel: 'Go to Dash Booking home',
    navAriaLabel: 'Page sections',
    localeSwitcherAriaLabel: 'Switch language',
  },
  hero: {
    eyebrow: 'Pay for bookings',
    headline: 'No clients, no charge',
    supportLine: 'No results, no fee',
    subtitle: 'No Contract - Cancel Anytime',
    bullets: ['Google Booking + booking link', 'Clear staff calendar', 'AI Receptionist available as an add-on'],
    bulletsAriaLabel: 'Main Dash Booking highlights',
    primaryCta: 'Sign up free',
    secondaryCta: 'Listen to AI Receptionist',
    lowRiskNote: 'Walk-ins and manual bookings are not charged.',
    graphicLabel: 'Phone mockup showing the Dash Booking salon page and booking flow',
    priceBadge: '$0/month to start',
  },
  trust: {
    eyebrow: 'Google Partner',
    title: 'Dash Booking is a direct Google booking partner.',
    logoAlt: 'Google logo',
    partnerCtaLabel: 'See all Google booking partners',
    partnerCtaHref: googlePartnersUrl,
    stats: [
      { value: '160M+', label: 'appointments' },
      { value: '150+', label: 'cities' },
      { value: '16', label: 'countries' },
      { value: '7+', label: 'languages' },
    ],
    statsAriaLabel: 'Dash Booking stats',
  },
  customerCities: {
    eyebrow: 'Canada',
    title: 'See Dash Booking salons across Canada.',
    cityCta: 'View salons in {city}',
    moreLabel: 'View more cities',
    lessLabel: 'Show fewer cities',
  },
  ai: {
    eyebrow: 'AI Receptionist',
    title: 'Listen to AI Receptionist answer real calls.',
    cards: [
      {
        id: aiReceptionistDemos[0].id,
        title: 'A client wants a new appointment',
        description: 'The AI checks the service and time, then books it.',
      },
      {
        id: aiReceptionistDemos[1].id,
        title: 'A client needs to reschedule or cancel',
        description: 'The AI confirms the details and updates the booking.',
      },
      {
        id: aiReceptionistDemos[2].id,
        title: 'A client asks about hours',
        description: 'The AI answers instead of the front desk.',
      },
    ],
  },
  pricing: {
    eyebrow: 'Booking pricing',
    title: 'Only pay when Dash Booking brings bookings in.',
    supportLine: 'If Dash Booking brings no bookings, core booking stays at $0/month.',
    tiers: [
      { range: '0 bookings', selectorLabel: '0', price: '$0/month' },
      { range: 'Under 50 bookings', selectorLabel: '<50', price: '$29/month' },
      { range: 'Under 150 bookings', selectorLabel: '<150', price: '$69/month' },
      { range: 'Under 500 bookings', selectorLabel: '<500', price: '$99/month' },
      { range: 'Under 1000 bookings', selectorLabel: '<1000', price: '$149/month' },
      { range: '1000+ bookings', selectorLabel: '1000+', price: '$199/month' },
    ],
    selectorAriaLabel: 'Pricing tiers by booking count',
    smsNote: 'SMS: $0.05 / message',
    ctaLabel: 'Sign up free',
    chargedCard: {
      title: 'Charged',
      items: ['Google Booking', 'Bookings from Dash Booking website / link', 'Bookings created by AI Receptionist'],
    },
    notChargedCard: {
      title: 'Not charged',
      items: ['Walk-ins', 'Manual staff entries', 'Direct calls entered by staff'],
    },
    aiAddOnNote:
      'AI Receptionist is a separate add-on: $300 one-time setup, $30/month AI Access, $20/month AI Phone Number, and $0.30/minute call time.',
  },
  includes: {
    eyebrow: 'What is included',
    title: 'The tools salons use every day.',
    cardsAriaLabel: 'Main Dash Booking product areas',
    cards: [
      {
        title: 'Google Booking',
        description: 'Bring clients in directly from Google.',
        bullets: ['Book Online', 'Booking link', '24/7'],
      },
      {
        title: 'Clean calendar',
        description: 'Track the day by staff member, date, and source.',
        bullets: ['By day', 'By staff', 'By source'],
      },
      {
        title: 'Keep clients on time',
        description: 'Use SMS, deposits, and gift cards in the same flow.',
        bullets: ['SMS', 'Deposits', 'Gift Cards'],
      },
      {
        title: 'AI Receptionist',
        description: 'Catch calls when the salon is busy.',
        bullets: ['Book', 'Reschedule', 'Cancel'],
      },
    ],
  },
  addOns: {
    eyebrow: 'POS',
    title: 'Payment terminal integrations',
    terminalIntro: 'Connect Clover or Poynt for a cleaner front desk flow.',
    terminalBadge: 'Rental from $30/month per machine',
    terminalRates: ['Debit: $0.04 / transaction', 'Credit: Cost + 0.25%'],
    terminalDisclaimer: 'Rates vary by merchant profile and device.',
    optionalTitle: 'Optional',
    terminalListAriaLabel: 'Supported payment terminals',
    optionalListAriaLabel: 'Optional add-ons',
    optionalItems: [
      {
        name: 'SMS',
        price: '$0.05 / message',
        description: 'Reminders, follow-ups, and review asks.',
      },
      {
        name: 'Deposits & Gift Cards',
        price: '$150 / one-time setup',
        description: 'Reduce no-shows and collect money earlier.',
      },
      {
        name: 'AI Receptionist',
        price: '$300 setup + $50/month + $0.30/minute',
        description: 'Answer calls and create bookings while the salon is busy.',
      },
    ],
  },
  whyChoose: {
    eyebrow: 'Why choose Dash Booking',
    title: 'Built for how salons actually run.',
    reasonsAriaLabel: 'Reasons salons choose Dash Booking',
    reasons: [
      {
        title: 'Quick setup',
        description: 'Start without changing your whole front desk routine.',
      },
      {
        title: 'Clear booking sources',
        description: 'See Google, booking link, and AI flow more clearly.',
      },
      {
        title: 'Works for multi-staff teams',
        description: 'Check schedules by staff member and split the day faster.',
      },
      {
        title: 'Add more tools later',
        description: 'Turn on SMS, deposits, gift cards, or AI Receptionist when needed.',
      },
    ],
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Questions salons ask most.',
    items: [
      {
        question: 'If there are no bookings through Dash Booking, do I still pay?',
        answer: 'No.',
      },
      {
        question: 'Are walk-ins or manual bookings charged?',
        answer: 'No.',
      },
      {
        question: 'Are canceled or no-show clients charged?',
        answer: 'No.',
      },
      {
        question: 'Can I download my client list after I cancel?',
        answer: 'Yes, you can download an Excel file directly from the system.',
      },
      {
        question: 'Can clients be imported back into the system?',
        answer: 'Yes. Send the client list to Dash Booking and the team will process and import it for you.',
      },
      {
        question: 'Do I need a contract?',
        answer: 'No. Cancel anytime.',
      },
    ],
  },
  finalCta: {
    title: 'Ready to try Dash Booking?',
    primaryCta: 'Sign up free',
    secondaryCta: 'Listen to AI Receptionist',
  },
  footer: {
    summary: 'Google Booking, your calendar, and AI Receptionist in one cleaner system.',
    languageLabel: 'Language',
    rights: '© Dash Booking. All rights reserved.',
  },
};
