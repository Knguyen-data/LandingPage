import type { LandingContent } from '@/content/landing/dashbooking-landing-content-types';
import { googlePartnersUrl } from '@/content/landing/dashbooking-landing-shared-data';

export const dashbookingLandingContentEn: LandingContent = {
  locale: 'en',
  metadata: {
    title: 'Dash Booking for nail and beauty salons',
    description: 'Google Booking, pay-as-you-go pricing, salon management, and optional add-ons.',
  },
  header: {
    nav: [
      { label: 'Add-ons', href: '#optional-features' },
      { label: 'Pricing', href: '#pricing' },
    ],
    cta: 'Sign up free',
    homeAriaLabel: 'Go to Dash Booking home',
    navAriaLabel: 'Page sections',
    localeSwitcherAriaLabel: 'Switch language',
    partnerPillLabel: 'Google Authorized Partners List',
  },
  hero: {
    eyebrow: 'Google Booking',
    headline: 'No customers, no fee',
    supportLine: '',
    subtitle: 'No Contract - No Setup Fee',
    bullets: ['Google bookings 24/7', 'Real customers', 'Group Booking', 'Free salon management system'],
    bulletsAriaLabel: 'Main Dash Booking highlights',
    primaryCta: '',
    secondaryCta: '',
    graphicLabel: 'Phone mockup showing the Dash Booking salon page and booking flow',
    priceBadge: '$0/month to start',
  },
  trust: {
    eyebrow: 'Google Authorized Partner',
    title: 'Dash Booking - Direct Google Partner',
    logoAlt: 'Google logo',
    partnerCtaLabel: 'Google booking partners list',
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
    eyebrow: '',
    title: 'Salons using Dash Booking',
    cityCta: 'View salons in {city}',
    moreLabel: 'View more cities',
    lessLabel: 'Show fewer cities',
  },
  ai: {
    eyebrow: '',
    title: 'Integrated AI Receptionist',
    description: 'Answers calls and books appointments 24/7.',
    supportLine: 'English / French bilingual',
    price: '',
    priceLines: [
      '$300 setup one-time',
      '$30/month AI Access',
      '$20/month AI Phone Number',
      '$0.30/minute Call Time',
    ],
    demoTitle: 'Listen',
    demoIds: [
      'check-current-appoinment',
      'confirm-address',
      'late-appointment',
      'new-appoinment',
      'rescheduling-appoinment',
    ],
  },
  pricing: {
    eyebrow: 'Pricing',
    title: 'Pay As You Go',
    supportLine: '',
    tiers: [
      { range: '0 completed online appointments', selectorLabel: '0', price: '$0 / month' },
      { range: '1 to 49 completed online appointments', selectorLabel: '<50', price: '$29 / month' },
      { range: '50 to 149 completed online appointments', selectorLabel: '<150', price: '$69 / month' },
      { range: '150 to 499 completed online appointments', selectorLabel: '<500', price: '$99 / month' },
      { range: '500 to 999 completed online appointments', selectorLabel: '<1000', price: '$149 / month' },
      { range: '1000+ completed online appointments', selectorLabel: '1000+', price: '$199 / month' },
    ],
    selectorAriaLabel: 'Pricing tiers by appointment count',
    smsNote: 'Optional ¢5 per SMS',
    processingFeeNote: '(3%) Processing fee will apply on credit card',
    ctaLabel: '',
  },
  includes: {
    eyebrow: '',
    title: 'Dash Booking Platform',
    cardsAriaLabel: 'Core Dash Booking platform features',
    cards: [
      {
        title: 'Appointment Calendar',
        description: 'Manage the calendar by day, staff, and booking source.',
      },
      {
        title: 'Client Management',
        description: 'Store client info, booking history, and notes.',
      },
      {
        title: 'Staff & Service Setup',
        description: 'Manage staff, services, pricing, and duration.',
      },
      {
        title: 'Booking Page / QR Code',
        description: 'Clients book by booking link, website, or QR code.',
      },
      {
        title: 'Group Booking',
        description: 'Take multiple clients in one booking.',
      },
      {
        title: 'Reporting & Analytics',
        description: 'Track bookings, revenue, and salon performance.',
      },
    ],
  },
  addOns: {
    eyebrow: '',
    title: 'Optional Add-on Features',
    supportLine: '',
    terminalTitle: 'Clover / Poynt Integration',
    terminalIntro: '',
    terminalBadge: '',
    terminalRates: ['Debit: $0.04 / transaction', 'Credit: Cost + 0.25%', 'Terminal rental: $30 / month'],
    terminalDisclaimer: '',
    terminalListAriaLabel: 'Supported payment terminals',
    optionalListAriaLabel: 'Optional add-ons',
    optionalItems: [
      {
        slug: 'website',
        name: 'SEO Website',
        price: '',
        description: '',
        ctaLabel: 'Template',
        ctaHref: 'https://websitetemplate.ca/',
      },
      {
        slug: 'google-business-profile',
        name: 'Manage Google Business Profile',
        price: '',
        description: 'Manage salon profile / reply to Google reviews',
      },
      {
        slug: 'online-deposits-gift-cards',
        name: 'Online Deposits & Gift Cards',
        price: '',
        description: '',
      },
      {
        slug: 'sell-products',
        name: 'Sell Products',
        price: '',
        description: '',
      },
      {
        slug: 'ai-social-media',
        name: 'AI Social Media',
        price: '',
        description: 'Coming soon',
      },
    ],
  },
  faq: {
    eyebrow: '',
    title: 'Q&A',
    items: [
      {
        question: 'Are cancel / no-shows charged?',
        answer: 'No.',
      },
      {
        question: 'Can I export my client list?',
        answer: 'Yes. Download Excel directly from the system.',
      },
      {
        question: 'Can I import client data?',
        answer: 'Yes. Dash Booking helps clean and import it.',
      },
      {
        question: 'Is there a contract?',
        answer: 'No. No Contract - No Setup Fee.',
      },
      {
        question: 'How many staff can use it?',
        answer: 'From 1 to 50+ staff.',
      },
      {
        question: 'How do monthly payments work?',
        answer: 'Credit Card, Void Cheque, or PayPal.',
      },
      {
        question: 'Which devices work?',
        answer: 'Dash Booking works with every device.',
      },
    ],
  },
  footer: {
    summary: 'All-in-one platform for beauty salon',
    rights: '© Dash Booking. All rights reserved.',
  },
};
