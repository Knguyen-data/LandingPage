import type { AppLocale } from '@/lib/i18n/locales';

export interface LandingNavItem {
  readonly label: string;
  readonly href: string;
}

export interface TrustStat {
  readonly value: string;
  readonly label: string;
}

export interface PricingTier {
  readonly range: string;
  readonly selectorLabel: string;
  readonly price: string;
}

export interface ScopeCard {
  readonly title: string;
  readonly description: string;
  readonly bullets?: readonly string[];
}

export interface OptionalItem {
  readonly slug?: string;
  readonly name: string;
  readonly price: string;
  readonly description: string;
  readonly priceLines?: readonly string[];
  readonly bullets?: readonly string[];
  readonly ctaLabel?: string;
  readonly ctaHref?: string;
}

export interface FaqItem {
  readonly question: string;
  readonly answer: string;
}

export interface CustomerCitiesContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly cityCta: string;
  readonly moreLabel: string;
  readonly lessLabel: string;
}

export interface MetadataCopy {
  readonly title: string;
  readonly description: string;
}

export interface LandingContent {
  readonly locale: AppLocale;
  readonly metadata: MetadataCopy;
  readonly localeLabel: string;
  readonly header: {
    readonly nav: readonly LandingNavItem[];
    readonly cta: string;
    readonly homeAriaLabel: string;
    readonly navAriaLabel: string;
    readonly localeSwitcherAriaLabel: string;
    readonly partnerPillLabel: string;
  };
  readonly hero: {
    readonly eyebrow: string;
    readonly partnerPills: readonly string[];
    readonly headline: string;
    readonly supportLine: string;
    readonly subtitle: string;
    readonly bullets: readonly string[];
    readonly bulletsAriaLabel: string;
    readonly primaryCta: string;
    readonly secondaryCta: string;
    readonly lowRiskNote: string;
    readonly graphicLabel: string;
    readonly priceBadge: string;
  };
  readonly trust: {
    readonly eyebrow: string;
    readonly title: string;
    readonly logoAlt: string;
    readonly partnerCtaLabel: string;
    readonly partnerCtaHref: string;
    readonly stats: readonly TrustStat[];
    readonly statsAriaLabel: string;
  };
  readonly customerCities: CustomerCitiesContent;
  readonly ai: {
    readonly eyebrow: string;
    readonly title: string;
    readonly description: string;
    readonly supportLine: string;
    readonly price: string;
    readonly priceLines: readonly string[];
    readonly demoTitle: string;
    readonly demoIds: readonly string[];
  };
  readonly pricing: {
    readonly eyebrow: string;
    readonly title: string;
    readonly supportLine: string;
    readonly tiers: readonly PricingTier[];
    readonly selectorAriaLabel: string;
    readonly smsNote: string;
    readonly processingFeeNote: string;
    readonly ctaLabel: string;
  };
  readonly includes: {
    readonly eyebrow: string;
    readonly title: string;
    readonly cards: readonly ScopeCard[];
    readonly cardsAriaLabel: string;
  };
  readonly addOns: {
    readonly eyebrow: string;
    readonly title: string;
    readonly supportLine: string;
    readonly terminalTitle: string;
    readonly terminalIntro: string;
    readonly terminalBadge: string;
    readonly terminalRates: readonly string[];
    readonly terminalDisclaimer: string;
    readonly terminalListAriaLabel: string;
    readonly optionalListAriaLabel: string;
    readonly optionalItems: readonly OptionalItem[];
  };
  readonly faq: {
    readonly eyebrow: string;
    readonly title: string;
    readonly items: readonly FaqItem[];
  };
  readonly finalCta: {
    readonly title: string;
    readonly primaryCta: string;
    readonly secondaryCta: string;
  };
  readonly footer: {
    readonly summary: string;
    readonly languageLabel: string;
    readonly rights: string;
  };
}
