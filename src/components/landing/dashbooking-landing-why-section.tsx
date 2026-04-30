import type { LandingContent } from '@/content/landing/dashbooking-landing-content-types';

interface DashbookingLandingWhySectionProps {
  readonly content: LandingContent;
}

export function DashbookingLandingWhySection({
  content,
}: DashbookingLandingWhySectionProps) {
  return (
    <section className="section-shell">
      <div className="container section-grid section-grid--two">
        <div className="stack-lg">
          <span className="eyebrow">{content.whyChoose.eyebrow}</span>
          <h2 className="title-lg">{content.whyChoose.title}</h2>
        </div>
        <div className="reason-list" role="list" aria-label={content.whyChoose.reasonsAriaLabel}>
          {content.whyChoose.reasons.map((reason) => (
            <article key={reason.title} className="surface-card reason-card stack-sm" role="listitem">
              <h3 className="title-sm">{reason.title}</h3>
              <p className="copy-sm text-muted">{reason.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
