import type { AppLocale } from '@/lib/i18n';

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
  readonly detail: string;
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

export type GoogleReviewsFilterId = 'all' | 'five' | 'three' | 'one';

export type GoogleReviewsBenefitId = 'auto-reply' | 'maps-seo' | 'google-connect' | 'included';

export interface GoogleReviewsBenefit {
  readonly id: GoogleReviewsBenefitId;
  readonly title: string;
  readonly body: string;
}

export interface GoogleReviewsFilterCopy {
  readonly id: GoogleReviewsFilterId;
  readonly label: string;
}

export interface PosTerminalCardContent {
  readonly id: 'clover' | 'poynt';
  readonly name: string;
  readonly blurb: string;
  readonly benefits: readonly string[];
  readonly ctaLabel: string;
  readonly ctaHref: string;
}

export type AddonGiftCardStepId = 'purchase' | 'generate' | 'email' | 'balance';

export type AddonDepositStepId = 'setup' | 'booking' | 'payment' | 'confirmed';

export interface AddonFeatureStepCopy {
  readonly id: AddonGiftCardStepId | AddonDepositStepId;
  readonly label: string;
  readonly shortLabel: string;
  readonly detail: string;
}

export interface AddonFeatureBenefit {
  readonly title: string;
  readonly body: string;
}

export interface AddonGiftCardPanelContent {
  readonly title: string;
  readonly tagline: string;
  readonly steps: readonly AddonFeatureStepCopy[];
  readonly benefits: readonly AddonFeatureBenefit[];
  readonly purchaseTitle: string;
  readonly amountLabel: string;
  readonly amounts: readonly string[];
  readonly selectedAmount: string;
  readonly recipientNameLabel: string;
  readonly recipientNamePlaceholder: string;
  readonly recipientEmailLabel: string;
  readonly recipientEmailPlaceholder: string;
  readonly messageLabel: string;
  readonly messagePlaceholder: string;
  readonly continueLabel: string;
  readonly giftCardCaption: string;
  readonly giftCardAmount: string;
  readonly giftCardNote: string;
  readonly inboxLabel: string;
  readonly inboxTime: string;
  readonly inboxTitle: string;
  readonly inboxAmountLabel: string;
  readonly viewGiftCardLabel: string;
  readonly deliveredLabel: string;
  readonly balanceTitle: string;
  readonly balanceAmount: string;
  readonly shopServicesLabel: string;
  readonly applyCheckoutLabel: string;
  readonly remainingLabel: string;
  readonly remainingAmount: string;
}

export interface AddonDepositPanelContent {
  readonly title: string;
  readonly tagline: string;
  readonly steps: readonly AddonFeatureStepCopy[];
  readonly benefits: readonly AddonFeatureBenefit[];
  readonly enableLabel: string;
  readonly requiredLabel: string;
  readonly individualLabel: string;
  readonly groupLabel: string;
  readonly depositAmountLabel: string;
  readonly depositAmountValue: string;
  readonly depositRateLabel: string;
  readonly depositRateValue: string;
  readonly applyForLabel: string;
  readonly applyForValue: string;
  readonly bookingTitle: string;
  readonly bookingEditLabel: string;
  readonly serviceName: string;
  readonly serviceMeta: string;
  readonly depositRequiredLabel: string;
  readonly depositRequiredAmount: string;
  readonly proceedLabel: string;
  readonly paymentTitle: string;
  readonly secureLabel: string;
  readonly cardMask: string;
  readonly payDepositAmount: string;
  readonly payDepositLabel: string;
  readonly paymentNote: string;
  readonly confirmedTitle: string;
  readonly confirmedBody: string;
  readonly viewBookingLabel: string;
  readonly addToCalendarLabel: string;
}

export interface AddonFeaturesSectionContent {
  readonly eyebrow: string;
  readonly titleLead: string;
  readonly titleAccent: string;
  readonly handwrittenLeft: string;
  readonly handwrittenRight: string;
  readonly giftCard: AddonGiftCardPanelContent;
  readonly deposit: AddonDepositPanelContent;
  readonly ariaLabel: string;
}

export interface LeadCaptureInterestOption {
  readonly value: string;
  readonly label: string;
}

export interface LeadCaptureSuccessChip {
  readonly title: string;
  readonly body: string;
}

export interface LeadCaptureSectionContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly subtitle: string;
  readonly visualHeadlineLead: string;
  readonly visualHeadlineAccent: string;
  readonly visualHeadlineTail: string;
  readonly visualBullets: readonly string[];
  readonly visualNote: string;
  readonly visualBadgeLead: string;
  readonly visualBadgeTail: string;
  readonly tabletAlt: string;
  readonly phoneAlt: string;
  readonly nameLabel: string;
  readonly namePlaceholder: string;
  readonly businessLabel: string;
  readonly businessPlaceholder: string;
  readonly addressLabel: string;
  readonly addressPlaceholder: string;
  readonly regionLabel: string;
  readonly regionPlaceholder: string;
  readonly countryLabel: string;
  readonly countryPlaceholder: string;
  readonly phoneLabel: string;
  readonly phonePlaceholder: string;
  readonly emailLabel: string;
  readonly emailPlaceholder: string;
  readonly cityLabel: string;
  readonly cityPlaceholder: string;
  readonly interestLabel: string;
  readonly interestPlaceholder: string;
  readonly interestOptions: readonly LeadCaptureInterestOption[];
  readonly messageLabel: string;
  readonly messageHint: string;
  readonly messagePlaceholder: string;
  readonly submitLabel: string;
  readonly submittingLabel: string;
  readonly submittedLabel: string;
  readonly successKicker: string;
  readonly successTitle: string;
  readonly successBody: string;
  readonly successChips: readonly LeadCaptureSuccessChip[];
  readonly errorRetry: string;
  readonly requiredError: string;
  readonly emailError: string;
  readonly phoneError: string;
  readonly privacyNote: string;
  readonly ariaLabel: string;
}

export interface PosIntegrationSectionContent {
  readonly eyebrow: string;
  readonly titleLead: string;
  readonly titleAccent: string;
  readonly subtitle: string;
  readonly benefits: readonly string[];
  readonly amount: string;
  readonly addPaymentLabel: string;
  readonly cashLabel: string;
  readonly cardLabel: string;
  readonly giftCardLabel: string;
  readonly otherLabel: string;
  readonly loyaltyLabel: string;
  readonly promotionsLabel: string;
  readonly sendingLabel: string;
  readonly processingLabel: string;
  readonly successTitle: string;
  readonly completeTitle: string;
  readonly completeMeta: string;
  readonly viewReceiptLabel: string;
  readonly syncedTitle: string;
  readonly syncedNote: string;
  readonly chooseTitle: string;
  readonly chooseSubtitle: string;
  readonly handwrittenNote: string;
  readonly clover: PosTerminalCardContent;
  readonly poynt: PosTerminalCardContent;
  readonly cloverRentalLabel: string;
  readonly cloverRentalPrice: string;
  readonly cloverRates: readonly string[];
  readonly noContractLabel: string;
  readonly cancelAnytimeLabel: string;
  readonly ariaLabel: string;
}

export interface WebsiteDesignOutcome {
  readonly title: string;
  readonly body: string;
}

export interface WebsiteDesignSectionContent {
  readonly eyebrow: string;
  readonly titleLead: string;
  readonly titleGoogle: string;
  readonly titleTail: string;
  readonly subtitle: string;
  readonly websiteEyebrow: string;
  readonly websiteTitle: string;
  readonly websiteBody: string;
  readonly freeSeoLabel: string;
  readonly freeSeoExtra: string;
  readonly websiteBullets: readonly string[];
  readonly viewMoreLabel: string;
  readonly adsEyebrow: string;
  readonly adsTitle: string;
  readonly adsBody: string;
  readonly freeSetupLabel: string;
  readonly freeSetupPrice: string;
  readonly freeSetupNote: string;
  readonly creditLabel: string;
  readonly creditNote: string;
  readonly searchQuery: string;
  readonly bookedLabel: string;
  readonly outcomes: readonly WebsiteDesignOutcome[];
  readonly galleryTitle: string;
  readonly gallerySubtitle: string;
  readonly viewWebsiteLabel: string;
  readonly prevLabel: string;
  readonly nextLabel: string;
  readonly ariaLabel: string;
}

export interface GoogleReviewsSectionContent {
  readonly eyebrow: string;
  readonly headlineLead: string;
  readonly headlineGoogle: string;
  readonly headlineTail: string;
  readonly subtitle: string;
  readonly benefits: readonly GoogleReviewsBenefit[];
  readonly salonName: string;
  readonly ratingValue: string;
  readonly reviewCount: string;
  readonly categoryLocation: string;
  readonly connectedLabel: string;
  readonly syncLabel: string;
  readonly reviewsHeading: string;
  readonly filters: readonly GoogleReviewsFilterCopy[];
  readonly selectedReviewHeading: string;
  readonly suggestedReplyHeading: string;
  readonly thinkingLabel: string;
  readonly replyLabel: string;
  readonly repliedLabel: string;
  readonly copyLabel: string;
  readonly copiedLabel: string;
  readonly emptyFilterLabel: string;
  readonly previousReviewLabel: string;
  readonly nextReviewLabel: string;
  readonly reviewsAriaLabel: string;
  readonly ariaLabel: string;
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

export type HeroStaffId = 'amy' | 'bella' | 'chloe';

export type HeroAnnotationAnchor =
  | 'book-online'
  | 'calendar-empty'
  | 'call-button'
  | 'calendar-fill';

export interface HeroChip {
  readonly label: string;
}

export interface HeroAnnotation {
  readonly id: string;
  readonly title: string;
  readonly body?: string;
  readonly anchor: HeroAnnotationAnchor;
}

export interface HeroStateCopy {
  readonly annotations: readonly HeroAnnotation[];
}

export interface HeroStaffCopy {
  readonly id: HeroStaffId;
  readonly name: string;
  readonly role: string;
}

export interface HeroBusinessProfileCopy {
  readonly name: string;
  readonly ratingValue: string;
  readonly reviewCount: string;
  readonly category: string;
  readonly hours: string;
  readonly address: string;
  readonly morePhotosLabel: string;
  readonly tabs: {
    readonly overview: string;
    readonly reviews: string;
    readonly photos: string;
    readonly services: string;
  };
  readonly actions: {
    readonly bookOnline: string;
    readonly website: string;
    readonly directions: string;
    readonly save: string;
    readonly share: string;
    readonly call: string;
  };
  readonly reviewsRow: string;
}

export type BookingJourneyNodeId =
  | 'discover'
  | 'book-online'
  | 'calendar'
  | 'reminder'
  | 'completed'
  | 'review'
  | 'growth';

export interface BookingJourneyNodeCopy {
  readonly id: BookingJourneyNodeId;
  readonly title: string;
  readonly benefit: string;
}

export type AiReceptionistStaffId = 'amy' | 'lisa' | 'mai';

export type AiReceptionistScenarioId =
  | 'check-current-appoinment'
  | 'confirm-address'
  | 'late-appointment'
  | 'rescheduling-appoinment';

export interface AiReceptionistBenefit {
  readonly title: string;
  readonly body: string;
}

export interface AiReceptionistStaffCopy {
  readonly id: AiReceptionistStaffId;
  readonly name: string;
}

export interface AiReceptionistScenarioCopy {
  readonly id: AiReceptionistScenarioId;
  readonly title: string;
  readonly description: string;
}

export interface AiReceptionistSectionContent {
  readonly eyebrow: string;
  readonly headlineLead: string;
  readonly headlineAccent: string;
  readonly subtitle: string;
  readonly benefits: readonly AiReceptionistBenefit[];
  readonly mobileChips: readonly string[];
  readonly costTeaser: string;
  readonly costNote: string;
  readonly askLinkLabel: string;
  readonly liveCallLabel: string;
  readonly playRealCallLabel: string;
  readonly playInvitation?: string;
  readonly pauseLabel: string;
  readonly soundOnLabel: string;
  readonly soundOffLabel: string;
  readonly customerLabel: string;
  readonly customerCaption: string;
  readonly aiLabel: string;
  readonly aiCaption: string;
  readonly calendarDayLabel: string;
  readonly calendarWeekLabel: string;
  readonly serviceValue: string;
  readonly anyStaffLabel: string;
  readonly firstVisitLabel: string;
  readonly asapLabel: string;
  readonly transferLabel: string;
  readonly checkingLabel: string;
  readonly availableLabel: string;
  readonly selectedLabel: string;
  readonly namePendingLabel: string;
  readonly notesNoneLabel: string;
  readonly bookedLabel: string;
  readonly callCompleteLabel: string;
  readonly handwrittenNote: string;
  readonly scenariosHeading: string;
  readonly scenariosSupport: string;
  readonly scenariosToggleLabel: string;
  readonly scenariosCollapseLabel: string;
  readonly staff: readonly AiReceptionistStaffCopy[];
  readonly scenarios: readonly AiReceptionistScenarioCopy[];
  readonly ariaLabel: string;
}

export interface BookingJourneyContent {
  readonly titleLead: string;
  readonly titleAccent: string;
  readonly handwrittenLeft: string;
  readonly handwrittenRight: string;
  readonly ariaLabel: string;
  readonly muteLabel: string;
  readonly unmuteLabel: string;
  readonly nodes: readonly BookingJourneyNodeCopy[];
  readonly discover: {
    readonly searchQuery: string;
    readonly salonName: string;
    readonly ratingValue: string;
    readonly reviewCount: string;
    readonly category: string;
    readonly hours: string;
  };
  readonly booking: {
    readonly heading: string;
    readonly service: string;
    readonly staff: string;
    readonly date: string;
    readonly time: string;
    readonly cta: string;
  };
  readonly calendar: {
    readonly dateLabel: string;
  };
  readonly reminder: {
    readonly timeLabel: string;
    readonly greeting: string;
    readonly body: string;
    readonly closing: string;
    readonly sentLabel: string;
  };
  readonly completed: {
    readonly heading: string;
    readonly thanks: string;
    readonly statusLabel: string;
  };
  readonly review: {
    readonly timeLabel: string;
    readonly message: string;
    readonly cta: string;
  };
  readonly growth: {
    readonly line1: string;
    readonly line2: string;
    readonly line3: string;
  };
}

export interface LandingContent {
  readonly locale: AppLocale;
  readonly metadata: MetadataCopy;
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
    readonly headlineLead: string;
    readonly headlineAccent: string;
    readonly handwrittenNote: string;
    readonly subtitle: string;
    readonly chips: readonly HeroChip[];
    readonly partnerProofLead: string;
    readonly partnerProofHighlight: string;
    readonly partnerProofNoun: string;
    readonly partnerProofTail: string;
    readonly partnerProofPlace: string;
    readonly primaryCta: string;
    readonly primaryCtaHref: string;
    readonly toggleWithoutLabel: string;
    readonly toggleWithLabel: string;
    readonly toggleAriaLabel: string;
    readonly previewAriaLabel: string;
    readonly googleIllustrationLabel: string;
    readonly withoutDashExampleLabel: string;
    readonly calendarDateLabel: string;
    readonly calendarTodayLabel: string;
    readonly calendarHeading: string;
    readonly emptySlotLabel: string;
    readonly staff: readonly HeroStaffCopy[];
    readonly withoutDash: HeroStateCopy;
    readonly withDash: HeroStateCopy;
    readonly businessProfile: HeroBusinessProfileCopy;
  };
  readonly bookingJourney: BookingJourneyContent;
  readonly aiReceptionist: AiReceptionistSectionContent;
  readonly googleReviews: GoogleReviewsSectionContent;
  readonly websiteDesign: WebsiteDesignSectionContent;
  readonly posIntegration: PosIntegrationSectionContent;
  readonly addonFeatures: AddonFeaturesSectionContent;
  readonly leadCapture: LeadCaptureSectionContent;
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
    readonly volumeLabel: string;
    readonly tiers: readonly PricingTier[];
    readonly selectorAriaLabel: string;
    readonly trustChips: readonly string[];
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
  readonly footer: {
    readonly summary: string;
    readonly rights: string;
  };
}
