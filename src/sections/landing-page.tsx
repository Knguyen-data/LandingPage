import type { LandingContent } from '@/content/types';
import { DashbookingLandingCanadaCitiesSection } from '@/sections/canada-cities/canada-cities-section';
import { DashbookingLandingFaqSection } from '@/sections/faq-section';
import { DashbookingLandingFooter } from '@/sections/footer';
import { DashbookingLandingHeader } from '@/sections/header';
import { DashbookingLandingAiReceptionistSection } from '@/sections/ai-receptionist/ai-receptionist-section';
import { DashbookingLandingBookingJourneySection } from '@/sections/booking-journey/booking-journey-section';
import { DashbookingLandingGoogleReviewsSection } from '@/sections/google-reviews/google-reviews-section';
import { DashbookingLandingHeroSection } from '@/sections/hero/hero-section';
import { DashbookingLandingPricingSection } from '@/sections/pricing/pricing-section';
import { DashbookingLandingAddonFeaturesSection } from '@/sections/addon-features/addon-features-section';
import { DashbookingLandingLeadCaptureSection } from '@/sections/lead-capture/lead-capture-section';
import { DashbookingLandingPosIntegrationSection } from '@/sections/pos-integration/pos-integration-section';
import { DashbookingLandingWebsiteDesignSection } from '@/sections/website-design/website-design-section';

interface DashbookingLandingPageProps {
  readonly content: LandingContent;
}

export function DashbookingLandingPage({ content }: DashbookingLandingPageProps) {
  return (
    <>
      <div className="page-atmosphere" aria-hidden="true">
        <span className="page-atmosphere__blob page-atmosphere__blob--a" />
        <span className="page-atmosphere__blob page-atmosphere__blob--b" />
        <span className="page-atmosphere__blob page-atmosphere__blob--c" />
        <span className="page-atmosphere__blob page-atmosphere__blob--d" />
      </div>
      <DashbookingLandingHeader content={content} />
      <main className="landing-main">
        <DashbookingLandingHeroSection content={content} />
        <DashbookingLandingBookingJourneySection content={content} />
        <DashbookingLandingAiReceptionistSection content={content} />
        <DashbookingLandingGoogleReviewsSection content={content} />
        <DashbookingLandingPricingSection content={content} />
        <DashbookingLandingCanadaCitiesSection content={content} />
        <DashbookingLandingWebsiteDesignSection content={content} />
        <DashbookingLandingPosIntegrationSection content={content} />
        <DashbookingLandingAddonFeaturesSection content={content} />
        <DashbookingLandingLeadCaptureSection content={content} />
        <DashbookingLandingFaqSection content={content} />
      </main>
      <DashbookingLandingFooter content={content} />
    </>
  );
}
