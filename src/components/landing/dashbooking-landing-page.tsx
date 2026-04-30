import type { LandingContent } from '@/content/landing/dashbooking-landing-content-types';
import { DashbookingLandingAiDemoSection } from '@/components/landing/dashbooking-landing-ai-demo-section';
import { DashbookingLandingCanadaCitiesSection } from '@/components/landing/dashbooking-landing-canada-cities-section';
import { DashbookingLandingFaqSection } from '@/components/landing/dashbooking-landing-faq-section';
import { DashbookingLandingFinalCtaSection } from '@/components/landing/dashbooking-landing-final-cta-section';
import { DashbookingLandingFooter } from '@/components/landing/dashbooking-landing-footer';
import { DashbookingLandingHeader } from '@/components/landing/dashbooking-landing-header';
import { DashbookingLandingHeroSection } from '@/components/landing/dashbooking-landing-hero-section';
import { DashbookingLandingPricingSection } from '@/components/landing/dashbooking-landing-pricing-section';
import { DashbookingLandingScopeCardsSection } from '@/components/landing/dashbooking-landing-scope-cards-section';
import { DashbookingLandingTerminalsAndAddOnsSection } from '@/components/landing/dashbooking-landing-terminals-and-add-ons-section';
import { DashbookingLandingTrustBandSection } from '@/components/landing/dashbooking-landing-trust-band-section';
import { DashbookingLandingWhySection } from '@/components/landing/dashbooking-landing-why-section';

interface DashbookingLandingPageProps {
  readonly content: LandingContent;
}

export function DashbookingLandingPage({ content }: DashbookingLandingPageProps) {
  return (
    <>
      <DashbookingLandingHeader content={content} />
      <main className="landing-main">
        <DashbookingLandingHeroSection content={content} />
        <DashbookingLandingTrustBandSection content={content} />
        <DashbookingLandingCanadaCitiesSection content={content} />
        <DashbookingLandingAiDemoSection content={content} />
        <DashbookingLandingPricingSection content={content} />
        <DashbookingLandingScopeCardsSection content={content} />
        <DashbookingLandingTerminalsAndAddOnsSection content={content} />
        <DashbookingLandingWhySection content={content} />
        <DashbookingLandingFaqSection content={content} />
        <DashbookingLandingFinalCtaSection content={content} />
      </main>
      <DashbookingLandingFooter content={content} />
    </>
  );
}
