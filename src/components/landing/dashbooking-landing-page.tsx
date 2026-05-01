import type { LandingContent } from '@/content/landing/dashbooking-landing-content-types';
import { DashbookingLandingCanadaCitiesSection } from '@/components/landing/dashbooking-landing-canada-cities-section';
import { DashbookingLandingFaqSection } from '@/components/landing/dashbooking-landing-faq-section';
import { DashbookingLandingFooter } from '@/components/landing/dashbooking-landing-footer';
import { DashbookingLandingHeader } from '@/components/landing/dashbooking-landing-header';
import { DashbookingLandingHeroSection } from '@/components/landing/dashbooking-landing-hero-section';
import { DashbookingLandingPricingSection } from '@/components/landing/dashbooking-landing-pricing-section';
import { DashbookingLandingTerminalsAndAddOnsSection } from '@/components/landing/dashbooking-landing-terminals-and-add-ons-section';

interface DashbookingLandingPageProps {
  readonly content: LandingContent;
}

export function DashbookingLandingPage({ content }: DashbookingLandingPageProps) {
  return (
    <>
      <DashbookingLandingHeader content={content} />
      <main className="landing-main">
        <DashbookingLandingHeroSection content={content} />
        <DashbookingLandingPricingSection content={content} />
        <DashbookingLandingCanadaCitiesSection content={content} />
        <DashbookingLandingTerminalsAndAddOnsSection content={content} />
        <DashbookingLandingFaqSection content={content} />
      </main>
      <DashbookingLandingFooter content={content} />
    </>
  );
}
