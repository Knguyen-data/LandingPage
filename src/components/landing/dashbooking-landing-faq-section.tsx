import type { LandingContent } from '@/content/landing/dashbooking-landing-content-types';

interface DashbookingLandingFaqSectionProps {
  readonly content: LandingContent;
}

export function DashbookingLandingFaqSection({ content }: DashbookingLandingFaqSectionProps) {
  return (
    <section className="section-shell">
      <div className="container stack-lg">
        <div className="section-heading stack-md">
          {content.faq.eyebrow ? <span className="eyebrow">{content.faq.eyebrow}</span> : null}
          <h2 className="title-lg">{content.faq.title}</h2>
        </div>
        <div className="faq-list" role="list">
          {content.faq.items.map((item) => (
            <details key={item.question} className="surface-card faq-item" role="listitem">
              <summary>{item.question}</summary>
              <p className="copy-sm text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
