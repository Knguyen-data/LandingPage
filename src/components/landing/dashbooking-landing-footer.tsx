import type { LandingContent } from '@/content/landing/dashbooking-landing-content-types';
import { MotionScope, SectionReveal } from '@/components/landing/dashbooking-landing-motion-primitives';

interface DashbookingLandingFooterProps {
  readonly content: LandingContent;
}

export function DashbookingLandingFooter({ content }: DashbookingLandingFooterProps) {
  return (
    <footer className="landing-footer">
      <MotionScope>
        <SectionReveal className="container landing-footer__inner" distance={8}>
          <p className="copy-sm landing-footer__summary">{content.footer.summary}</p>
          <p className="copy-sm text-muted">{content.footer.rights}</p>
        </SectionReveal>
      </MotionScope>
    </footer>
  );
}
