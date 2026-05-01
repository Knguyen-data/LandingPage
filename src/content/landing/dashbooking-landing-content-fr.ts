import type { LandingContent } from '@/content/landing/dashbooking-landing-content-types';
import { googlePartnersUrl } from '@/content/landing/dashbooking-landing-shared-data';

export const dashbookingLandingContentFr: LandingContent = {
  locale: 'fr',
  localeLabel: 'Français',
  metadata: {
    title: 'Dash Booking pour salons nail et beauté',
    description: 'Google Booking, tarification à l’usage, gestion du salon et add-ons optionnels.',
  },
  header: {
    nav: [
      { label: 'Add-ons', href: '#optional-features' },
      { label: 'Tarifs', href: '#pricing' },
    ],
    cta: 'Inscription gratuite',
    homeAriaLabel: 'Aller à l’accueil Dash Booking',
    navAriaLabel: 'Sections de la page',
    localeSwitcherAriaLabel: 'Changer de langue',
    partnerPillLabel: 'Liste des partenaires directs de Google',
  },
  hero: {
    eyebrow: 'Google Booking',
    partnerPills: ['Google Authorized Partner', 'Partenaire direct Google'],
    headline: 'Pas de client, pas de frais',
    supportLine: '',
    subtitle: 'No Contract - No Setup Fee',
    bullets: ['Google bookings 24/7', 'Vrais clients', 'Group Booking', 'Gestion salon gratuite'],
    bulletsAriaLabel: 'Points clés de Dash Booking',
    primaryCta: '',
    secondaryCta: '',
    lowRiskNote: '',
    graphicLabel: 'Maquette de téléphone montrant la page salon Dash Booking et le flux de réservation',
    priceBadge: '0 $/mois pour commencer',
  },
  trust: {
    eyebrow: 'Partenaire autorisé Google',
    title: 'Dash Booking - Partenaire direct de Google',
    logoAlt: 'Google logo',
    partnerCtaLabel: 'Liste des partenaires de réservation Google',
    partnerCtaHref: googlePartnersUrl,
    stats: [
      { value: '160M+', label: 'rendez-vous' },
      { value: '150+', label: 'villes' },
      { value: '16', label: 'pays' },
      { value: '7+', label: 'langues' },
    ],
    statsAriaLabel: 'Statistiques de Dash Booking',
  },
  customerCities: {
    eyebrow: '',
    title: 'Salons avec Dash Booking',
    cityCta: 'Voir les salons à {city}',
    moreLabel: 'Voir plus de villes',
    lessLabel: 'Voir moins de villes',
  },
  ai: {
    eyebrow: '',
    title: 'AI Receptionist intégrée',
    description: 'Répond aux appels et prend les rendez-vous 24/7.',
    supportLine: 'Bilingue anglais-français',
    price: '',
    priceLines: [
      '$300 setup one-time',
      '$30/month AI Access',
      '$20/month AI Phone Number',
      '$0.30/minute Call Time',
    ],
    demoTitle: 'Écouter',
    demoIds: [
      'check-current-appoinment',
      'confirm-address',
      'late-appointment',
      'new-appoinment',
      'rescheduling-appoinment',
    ],
  },
  pricing: {
    eyebrow: 'Tarifs',
    title: 'Pay As You Go',
    supportLine: '',
    tiers: [
      { range: '0 rendez-vous en ligne complétés', selectorLabel: '0', price: '$0 / month' },
      { range: '1 à 49 rendez-vous en ligne complétés', selectorLabel: '<50', price: '$29 / month' },
      { range: '50 à 149 rendez-vous en ligne complétés', selectorLabel: '<150', price: '$69 / month' },
      { range: '150 à 499 rendez-vous en ligne complétés', selectorLabel: '<500', price: '$99 / month' },
      { range: '500 à 999 rendez-vous en ligne complétés', selectorLabel: '<1000', price: '$149 / month' },
      { range: '1000+ rendez-vous en ligne complétés', selectorLabel: '1000+', price: '$199 / month' },
    ],
    selectorAriaLabel: 'Paliers tarifaires par nombre de rendez-vous',
    smsNote: 'Optional ¢5 per SMS',
    processingFeeNote: 'Des frais de traitement de 3 % s’appliquent aux cartes de crédit.',
    ctaLabel: '',
  },
  includes: {
    eyebrow: '',
    title: 'Plateforme Dash Booking',
    cardsAriaLabel: 'Fonctions principales de la plateforme Dash Booking',
    cards: [
      {
        title: 'Appointment Calendar',
        description: 'Gérer le calendrier par jour, employé et source de réservation.',
      },
      {
        title: 'Client Management',
        description: 'Garder les infos client, l’historique et les notes.',
      },
      {
        title: 'Staff & Service Setup',
        description: 'Gérer les employés, services, prix et durées.',
      },
      {
        title: 'Booking Page / QR Code',
        description: 'Les clients réservent par lien, site web ou QR code.',
      },
      {
        title: 'Group Booking',
        description: 'Prendre plusieurs clients dans une seule réservation.',
      },
      {
        title: 'Reporting & Analytics',
        description: 'Suivre les réservations, revenus et performance du salon.',
      },
    ],
  },
  addOns: {
    eyebrow: '',
    title: 'Optional Add-on Features',
    supportLine: '',
    terminalTitle: 'Intégration Clover / Poynt',
    terminalIntro: '',
    terminalBadge: '',
    terminalRates: ['Débit : $0.04 / transaction', 'Crédit : Cost + 0.25%', 'Location du terminal : $30 / mois'],
    terminalDisclaimer: '',
    terminalListAriaLabel: 'Terminaux de paiement pris en charge',
    optionalListAriaLabel: 'Add-ons optionnels',
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
        description: 'Gérer le salon / répondre aux avis Google',
      },
      {
        slug: 'online-deposits-gift-cards',
        name: 'Online Deposits & Gift Cards',
        price: '',
        description: '',
      },
      {
        slug: 'sell-products',
        name: 'Vendre des produits',
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
        question: 'Les cancel / no-show sont facturés ?',
        answer: 'Non.',
      },
      {
        question: 'Peut-on exporter les clients ?',
        answer: 'Oui. Téléchargement Excel direct.',
      },
      {
        question: 'Peut-on importer les clients ?',
        answer: 'Oui. Dash Booking aide à nettoyer et importer.',
      },
      {
        question: 'Y a-t-il un contrat ?',
        answer: 'Non. No Contract - No Setup Fee.',
      },
      {
        question: 'Combien d’employés peuvent l’utiliser ?',
        answer: 'De 1 à 50+ employés.',
      },
      {
        question: 'Comment payer chaque mois ?',
        answer: 'Credit Card, Void Cheque ou PayPal.',
      },
      {
        question: 'Quels appareils fonctionnent ?',
        answer: 'Dash Booking fonctionne avec tous les appareils.',
      },
    ],
  },
  finalCta: {
    title: 'Vous voulez essayer Dash Booking pour votre salon ?',
    primaryCta: 'Inscription gratuite',
    secondaryCta: 'Écouter AI Receptionist',
  },
  footer: {
    summary: 'All-in-one platform for beauty salon',
    languageLabel: 'Langue',
    rights: '© Dash Booking. All rights reserved.',
  },
};
