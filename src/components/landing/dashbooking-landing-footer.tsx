import type { LandingContent } from '@/content/landing/dashbooking-landing-content-types';

interface DashbookingLandingFooterProps {
  readonly content: LandingContent;
}

export function DashbookingLandingFooter({ content }: DashbookingLandingFooterProps) {
  return (
    <footer className="landing-footer">
      <div className="container landing-footer__inner">
        <p className="copy-sm landing-footer__summary">{content.footer.summary}</p>
        <p className="copy-sm text-muted">{content.footer.rights}</p>
      </div>
    </footer>
  );
}
