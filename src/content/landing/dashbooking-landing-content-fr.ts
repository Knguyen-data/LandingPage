import { aiReceptionistDemos } from '@/content/ai-receptionist-demos';
import type { LandingContent } from '@/content/landing/dashbooking-landing-content-types';
import { googlePartnersUrl } from '@/content/landing/dashbooking-landing-shared-data';

export const dashbookingLandingContentFr: LandingContent = {
  locale: 'fr',
  localeLabel: 'Français',
  metadata: {
    title: 'Dash Booking pour salons nail et beauté',
    description:
      'Dash Booking apporte des réservations depuis Google, garde le calendrier au même endroit, et facture seulement quand la plateforme apporte des réservations.',
  },
  header: {
    nav: [
      { label: 'AI Receptionist', href: '#ai-demo' },
      { label: 'Tarifs', href: '#pricing' },
    ],
    cta: 'Inscription gratuite',
    homeAriaLabel: 'Aller à l’accueil Dash Booking',
    navAriaLabel: 'Sections de la page',
    localeSwitcherAriaLabel: 'Changer de langue',
  },
  hero: {
    eyebrow: 'Payer pour les réservations',
    headline: 'Pas de clientes, pas de frais',
    supportLine: 'Pas de résultats, pas de frais',
    subtitle: 'No Contract - Cancel Anytime',
    bullets: ['Google Booking + lien de réservation', 'Calendrier clair par employé', 'AI Receptionist en option'],
    bulletsAriaLabel: 'Points clés de Dash Booking',
    primaryCta: 'Inscription gratuite',
    secondaryCta: 'Écouter AI Receptionist',
    lowRiskNote: 'Les walk-ins et rendez-vous saisis à la main ne sont pas facturés.',
    graphicLabel: 'Maquette de téléphone montrant la page salon Dash Booking et le flux de réservation',
    priceBadge: 'À partir de 0 $/mois',
  },
  trust: {
    eyebrow: 'Google Partner',
    title: 'Dash Booking est un partenaire direct de Google pour la réservation.',
    logoAlt: 'Google logo',
    partnerCtaLabel: 'Voir tous les partenaires de réservation Google',
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
    eyebrow: 'Canada',
    title: 'Voir les salons Dash Booking au Canada.',
    cityCta: 'Voir les salons à {city}',
    moreLabel: 'Voir plus de villes',
    lessLabel: 'Voir moins de villes',
  },
  ai: {
    eyebrow: 'AI Receptionist',
    title: 'Écoutez AI Receptionist répondre à de vrais appels.',
    cards: [
      {
        id: aiReceptionistDemos[0].id,
        title: 'Une cliente veut un nouveau rendez-vous',
        description: 'L’IA vérifie le service et l’heure, puis réserve.',
      },
      {
        id: aiReceptionistDemos[1].id,
        title: 'Une cliente veut déplacer ou annuler',
        description: 'L’IA confirme les détails et met la réservation à jour.',
      },
      {
        id: aiReceptionistDemos[2].id,
        title: 'Une cliente demande les heures',
        description: 'L’IA répond à la place de la réception.',
      },
    ],
  },
  pricing: {
    eyebrow: 'Tarifs booking',
    title: 'Payer seulement quand Dash Booking apporte des réservations.',
    supportLine: 'Si Dash Booking n’apporte aucune réservation, le forfait booking reste à 0 $/mois.',
    tiers: [
      { range: '0 réservation', selectorLabel: '0', price: '0 $/mois' },
      { range: 'Moins de 50 réservations', selectorLabel: '<50', price: '29 $/mois' },
      { range: 'Moins de 150 réservations', selectorLabel: '<150', price: '69 $/mois' },
      { range: 'Moins de 500 réservations', selectorLabel: '<500', price: '99 $/mois' },
      { range: 'Moins de 1000 réservations', selectorLabel: '<1000', price: '149 $/mois' },
      { range: '1000+ réservations', selectorLabel: '1000+', price: '199 $/mois' },
    ],
    selectorAriaLabel: 'Paliers de prix selon le nombre de réservations',
    smsNote: 'SMS : $0.05 / message',
    ctaLabel: 'Inscription gratuite',
    chargedCard: {
      title: 'Facturé',
      items: ['Google Booking', 'Réservations depuis le site / lien Dash Booking', 'Réservations créées par AI Receptionist'],
    },
    notChargedCard: {
      title: 'Non facturé',
      items: ['Walk-ins', 'Saisies manuelles par l’équipe', 'Appels directs saisis par l’équipe'],
    },
    aiAddOnNote:
      'AI Receptionist est un add-on séparé : 300 $ une fois, 30 $/mois pour AI Access, 20 $/mois pour AI Phone Number, et 0,30 $/minute.',
  },
  includes: {
    eyebrow: 'Ce qui est inclus',
    title: 'Les outils utilisés au quotidien par le salon.',
    cardsAriaLabel: 'Principales parties du produit Dash Booking',
    cards: [
      {
        title: 'Google Booking',
        description: 'Faire venir des clientes directement depuis Google.',
        bullets: ['Book Online', 'Lien de réservation', '24/7'],
      },
      {
        title: 'Calendrier clair',
        description: 'Suivre la journée par employé, date et source.',
        bullets: ['Par jour', 'Par employé', 'Par source'],
      },
      {
        title: 'Clientes à l’heure',
        description: 'SMS, dépôts et cartes-cadeaux dans le même flux.',
        bullets: ['SMS', 'Dépôts', 'Cartes-cadeaux'],
      },
      {
        title: 'AI Receptionist',
        description: 'Répondre aux appels quand le salon est occupé.',
        bullets: ['Réserver', 'Déplacer', 'Annuler'],
      },
    ],
  },
  addOns: {
    eyebrow: 'POS',
    title: 'Intégrations terminal de paiement',
    terminalIntro: 'Connecter Clover ou Poynt pour un comptoir plus simple.',
    terminalBadge: 'Location à partir de 30 $/mois par machine',
    terminalRates: ['Débit : $0.04 / transaction', 'Crédit : Cost + 0.25%'],
    terminalDisclaimer: 'Les tarifs varient selon le profil marchand et l’appareil.',
    optionalTitle: 'Optional',
    terminalListAriaLabel: 'Terminaux de paiement pris en charge',
    optionalListAriaLabel: 'Add-ons optionnels',
    optionalItems: [
      {
        name: 'SMS',
        price: '$0.05 / message',
        description: 'Rappels, suivis et demandes d’avis.',
      },
      {
        name: 'Deposits & Gift Cards',
        price: '$150 / one-time setup',
        description: 'Réduire les no-shows et encaisser plus tôt.',
      },
      {
        name: 'AI Receptionist',
        price: '$300 setup + $50/month + $0.30/minute',
        description: 'Répondre aux appels et créer des réservations quand le salon est occupé.',
      },
    ],
  },
  whyChoose: {
    eyebrow: 'Pourquoi choisir Dash Booking',
    title: 'Pensé pour la vraie routine des salons.',
    reasonsAriaLabel: 'Raisons de choisir Dash Booking',
    reasons: [
      {
        title: 'Mise en route rapide',
        description: 'Commencer sans changer toute la routine du comptoir.',
      },
      {
        title: 'Sources de réservation plus claires',
        description: 'Voir plus facilement Google, le lien de réservation et le flux IA.',
      },
      {
        title: 'Adapté aux équipes',
        description: 'Vérifier le planning par employé et répartir la journée plus vite.',
      },
      {
        title: 'Ajouter plus d’outils ensuite',
        description: 'Activer SMS, dépôts, cartes-cadeaux ou AI Receptionist au besoin.',
      },
    ],
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Les questions les plus fréquentes.',
    items: [
      {
        question: 'S’il n’y a aucune réservation via Dash Booking, est-ce que je paie ?',
        answer: 'Non.',
      },
      {
        question: 'Les walk-ins ou les rendez-vous saisis à la main sont-ils facturés ?',
        answer: 'Non.',
      },
      {
        question: 'Les clientes annulées ou no-show sont-elles facturées ?',
        answer: 'Non.',
      },
      {
        question: 'Puis-je télécharger ma liste de clientes après une annulation ?',
        answer: 'Oui, vous pouvez télécharger un fichier Excel directement depuis le système.',
      },
      {
        question: 'Peut-on réimporter les clientes dans le système ?',
        answer: 'Oui. Envoyez la liste à Dash Booking et l’équipe la traite puis l’importe pour vous.',
      },
      {
        question: 'Ai-je besoin d’un contrat ?',
        answer: 'Non. Annulation à tout moment.',
      },
    ],
  },
  finalCta: {
    title: 'Prêt à essayer Dash Booking ?',
    primaryCta: 'Inscription gratuite',
    secondaryCta: 'Écouter AI Receptionist',
  },
  footer: {
    summary: 'Google Booking, votre calendrier et AI Receptionist dans un système plus simple.',
    languageLabel: 'Langue',
    rights: '© Dash Booking. Tous droits réservés.',
  },
};
