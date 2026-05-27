import type { LandingContent } from '@/content/landing/dashbooking-landing-content-types';
import { googlePartnersUrl } from '@/content/landing/dashbooking-landing-shared-data';

export const dashbookingLandingContentFr: LandingContent = {
  locale: 'fr',
  metadata: {
    title: 'Dash Booking pour les salons de manucure et de beauté',
    description: 'Google Booking, tarification à l’usage, gestion du salon et fonctionnalités optionnelles.',
  },
  header: {
    nav: [
      { label: 'Options', href: '#optional-features' },
      { label: 'Tarifs', href: '#pricing' },
    ],
    cta: 'Inscription gratuite',
    homeAriaLabel: 'Aller à l’accueil de Dash Booking',
    navAriaLabel: 'Sections de la page',
    localeSwitcherAriaLabel: 'Changer de langue',
    partnerPillLabel: 'Liste des partenaires Google autorisés',
  },
  hero: {
    eyebrow: 'Google Booking',
    headline: 'Pas de clients, pas de frais',
    supportLine: '',
    subtitle: 'Sans contrat - Sans frais d’installation',
    bullets: ['Réservations Google 24/7', 'Vrais clients', 'Réservation de groupe', 'Système de gestion de salon gratuit'],
    bulletsAriaLabel: 'Points clés de Dash Booking',
    primaryCta: '',
    secondaryCta: '',
    graphicLabel: 'Maquette de téléphone montrant la page salon Dash Booking et le parcours de réservation',
    priceBadge: '0 $/mois pour commencer',
  },
  trust: {
    eyebrow: 'Partenaire Google autorisé',
    title: 'Dash Booking - Partenaire direct de Google',
    logoAlt: 'Logo Google',
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
    title: 'Salons qui utilisent Dash Booking',
    cityCta: 'Voir les salons à {city}',
    moreLabel: 'Voir plus de villes',
    lessLabel: 'Voir moins de villes',
  },
  ai: {
    eyebrow: '',
    title: 'Réceptionniste IA intégrée',
    description: 'Répond aux appels et prend les rendez-vous 24/7.',
    supportLine: 'Bilingue anglais-français',
    price: '',
    priceLines: [
      '$300 de configuration unique',
      '$30/mois pour l’accès IA',
      '$20/mois pour le numéro IA',
      '$0.30/minute de temps d’appel',
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
  reviewResponseDemo: {
    eyebrow: 'Avis Google',
    title: 'Réponse IA aux avis Google',
    supportLine: 'Gratuit. Choisissez un avis et générez une réponse claire.',
    reviewsAriaLabel: 'Exemples d’avis Google',
    generateLabel: 'Générer la réponse IA',
    responseLabel: 'Réponse IA',
    emptyResponse: 'Choisissez un avis, puis générez une réponse.',
    reviews: [
      {
        customerName: 'Camille T.',
        ratingLabel: '★☆☆☆☆ 1.0',
        review: 'J’avais rendez-vous à 15 h, mais j’ai attendu longtemps. Personne ne m’a vraiment expliqué pourquoi.',
        response: 'Bonjour Camille, merci pour votre retour. Nous sommes désolés pour l’attente et le manque d’explication. Nous allons revoir notre gestion des rendez-vous pour mieux communiquer avec nos clientes. Nous espérons pouvoir vous offrir une meilleure expérience la prochaine fois.',
      },
      {
        customerName: 'Nadia L.',
        ratingLabel: '★★★☆☆ 3.0',
        review: 'Le résultat était beau, mais la fin du rendez-vous m’a semblé un peu pressée.',
        response: 'Bonjour Nadia, merci pour votre avis honnête. Nous sommes heureux que le résultat vous ait plu, et nous sommes désolés que la fin ait semblé pressée. Nous allons en tenir compte pour mieux rythmer chaque rendez-vous.',
      },
      {
        customerName: 'Élise R.',
        ratingLabel: '★★★★★ 5.0',
        review: 'Très beau travail, équipe gentille, et la réservation en ligne était simple.',
        response: 'Bonjour Élise, merci beaucoup. Nous sommes ravis que vous ayez aimé le service et la réservation en ligne. Votre soutien compte beaucoup pour nous. Au plaisir de vous revoir bientôt.',
      },
    ],
  },
  pricing: {
    eyebrow: 'Tarifs',
    title: 'Paiement à l’usage',
    supportLine: '',
    tiers: [
      { range: '0 rendez-vous en ligne complété', selectorLabel: '0', price: '$0 / month' },
      { range: '1 à 49 rendez-vous en ligne complétés', selectorLabel: '<50', price: '$29 / month' },
      { range: '50 à 149 rendez-vous en ligne complétés', selectorLabel: '<150', price: '$69 / month' },
      { range: '150 à 499 rendez-vous en ligne complétés', selectorLabel: '<500', price: '$99 / month' },
      { range: '500 à 999 rendez-vous en ligne complétés', selectorLabel: '<1000', price: '$149 / month' },
      { range: '1000+ rendez-vous en ligne complétés', selectorLabel: '1000+', price: '$199 / month' },
    ],
    selectorAriaLabel: 'Paliers tarifaires selon le nombre de rendez-vous',
    smsNote: 'Option SMS : 0,05 $ par SMS',
    processingFeeNote: 'Des frais de traitement de 3 % s’appliquent aux paiements par carte de crédit.',
    ctaLabel: '',
  },
  includes: {
    eyebrow: '',
    title: 'Plateforme Dash Booking',
    cardsAriaLabel: 'Fonctionnalités principales de la plateforme Dash Booking',
    cards: [
      {
        title: 'Calendrier de rendez-vous',
        description: 'Gérer le calendrier par jour, employé et source de réservation.',
      },
      {
        title: 'Gestion des clients',
        description: 'Conserver les informations clients, l’historique des réservations et les notes.',
      },
      {
        title: 'Configuration du personnel et des services',
        description: 'Gérer les employés, services, tarifs et durées.',
      },
      {
        title: 'Page de réservation / code QR',
        description: 'Les clients réservent via un lien, un site web ou un code QR.',
      },
      {
        title: 'Réservation de groupe',
        description: 'Prendre plusieurs clients dans une seule réservation.',
      },
      {
        title: 'Rapports et analyses',
        description: 'Suivre les réservations, les revenus et la performance du salon.',
      },
    ],
  },
  addOns: {
    eyebrow: '',
    title: 'Fonctionnalités optionnelles',
    supportLine: '',
    terminalTitle: 'Intégration Clover / Poynt',
    terminalIntro: '',
    terminalBadge: '',
    terminalRates: [
      'Débit : $0.04 / transaction',
      'Crédit : Cost + 0.25%',
      'Location du terminal : $30 / mois',
    ],
    terminalDisclaimer: '',
    terminalListAriaLabel: 'Terminaux de paiement pris en charge',
    optionalListAriaLabel: 'Options disponibles',
    optionalItems: [
      {
        slug: 'website',
        name: 'Site web SEO',
        price: '',
        description: '',
        ctaLabel: 'Modèle',
        ctaHref: 'https://websitetemplate.ca/',
      },
      {
        slug: 'google-business-profile',
        name: 'Gestion de Google Business Profile',
        price: '',
        description: 'Gestion du salon / réponses aux avis Google',
      },
      {
        slug: 'online-deposits-gift-cards',
        name: 'Acomptes en ligne et cartes-cadeaux',
        price: '',
        description: '',
      },
      {
        slug: 'sell-products',
        name: 'Vente de produits',
        price: '',
        description: '',
      },
      {
        slug: 'ai-social-media',
        name: 'IA pour les réseaux sociaux',
        price: '',
        description: 'Bientôt disponible',
      },
    ],
  },
  faq: {
    eyebrow: '',
    title: 'Questions fréquentes',
    items: [
      {
        question: 'Les annulations / no-shows sont-ils facturés ?',
        answer: 'Non.',
      },
      {
        question: 'Puis-je exporter ma liste de clients ?',
        answer: 'Oui. Téléchargement direct en Excel depuis le système.',
      },
      {
        question: 'Puis-je importer des données clients ?',
        answer: 'Oui. Dash Booking aide à les nettoyer et à les importer.',
      },
      {
        question: 'Y a-t-il un contrat ?',
        answer: 'Non. Sans contrat - Sans frais d’installation.',
      },
      {
        question: 'Combien d’employés peuvent l’utiliser ?',
        answer: 'De 1 à plus de 50 employés.',
      },
      {
        question: 'Comment fonctionnent les paiements mensuels ?',
        answer: 'Carte de crédit, chèque annulé ou PayPal.',
      },
      {
        question: 'Quels appareils sont compatibles ?',
        answer: 'Dash Booking fonctionne sur tous les appareils.',
      },
    ],
  },
  footer: {
    summary: 'Plateforme tout-en-un pour salons de beauté',
    rights: '© Dash Booking. Tous droits réservés.',
  },
};
