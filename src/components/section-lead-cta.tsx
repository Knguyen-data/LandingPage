import { ArrowRight } from 'lucide-react';
import { SectionReveal } from '@/components/motion-primitives';
import type { LandingContent } from '@/content/types';

const labels = {
  vi: {
    journey: 'Tư vấn đặt lịch',
    ai: 'Tư vấn AI',
    reviews: 'Tư vấn Reviews',
    pricing: 'Tư vấn gói',
    cities: 'Tư vấn',
    website: 'Tư vấn website & Ads',
    pos: 'Tư vấn POS',
    addons: 'Tư vấn tiện ích',
    faq: 'Liên hệ Dash',
  },
  en: {
    journey: 'Get booking advice',
    ai: 'Ask about AI',
    reviews: 'Get review support',
    pricing: 'Find my plan',
    cities: 'Get advice',
    website: 'Explore websites & Ads',
    pos: 'Explore POS',
    addons: 'Explore add-ons',
    faq: 'Talk to Dash',
  },
  fr: {
    journey: 'Conseils réservation',
    ai: 'Découvrir l’IA',
    reviews: 'Conseils avis Google',
    pricing: 'Choisir mon forfait',
    cities: 'Parlons-en',
    website: 'Site web & Ads',
    pos: 'Choisir un terminal',
    addons: 'Découvrir les options',
    faq: 'Contacter Dash',
  },
} as const;

export function SectionLeadCta({ locale, section }: {
  readonly locale: LandingContent['locale'];
  readonly section: keyof typeof labels.en;
}) {
  return (
    <SectionReveal className="container section-lead-cta" distance={12}>
      <a className="website-design__cta lead-cta" href="#lead-capture">
        <span>{labels[locale][section]}</span>
        <ArrowRight size={18} strokeWidth={2.4} aria-hidden="true" />
      </a>
    </SectionReveal>
  );
}
