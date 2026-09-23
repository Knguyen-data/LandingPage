import { SectionLeadCta } from '@/components/section-lead-cta';
import type { LandingContent } from '@/content/types';
import { MotionScope, RevealGroup, RevealItem } from '@/components/motion-primitives';

interface DashbookingLandingFaqSectionProps {
  readonly content: LandingContent;
}

export function DashbookingLandingFaqSection({ content }: DashbookingLandingFaqSectionProps) {
  return (
    <section className="faq section-shell">
      <MotionScope>
        <RevealGroup className="container stack-lg" stagger={0.04}>
          <RevealItem>
            <div className="section-heading stack-md">
              {content.faq.eyebrow ? <span className="eyebrow">{content.faq.eyebrow}</span> : null}
              <h2 className="title-lg">{content.faq.title}</h2>
            </div>
          </RevealItem>
          <div>
            <div className="faq-list" role="list">
              {content.faq.items.map((item) => (
                <details key={item.question} className="surface-card faq-item" role="listitem">
                  <summary>{item.question}</summary>
                  <p className="copy-sm text-muted faq-item__answer">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </RevealGroup>
        <SectionLeadCta locale={content.locale} section="faq" />
      </MotionScope>
    </section>
  );
}
