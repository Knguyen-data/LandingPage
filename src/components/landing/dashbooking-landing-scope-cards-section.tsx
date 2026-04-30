import type { LandingContent } from '@/content/landing/dashbooking-landing-content-types';

interface DashbookingLandingScopeCardsSectionProps {
  readonly content: LandingContent;
}

export function DashbookingLandingScopeCardsSection({
  content,
}: DashbookingLandingScopeCardsSectionProps) {
  return (
    <section className="section-shell">
      <div className="container stack-lg">
        <div className="stack-md section-heading">
          <span className="eyebrow">{content.includes.eyebrow}</span>
          <h2 className="title-lg">{content.includes.title}</h2>
        </div>
        <div className="scope-grid" role="list" aria-label={content.includes.cardsAriaLabel}>
          {content.includes.cards.map((card) => (
            <article key={card.title} className="surface-card scope-card stack-md" role="listitem">
              <h3 className="title-sm">{card.title}</h3>
              <p className="copy-sm text-muted">{card.description}</p>
              <ul className="landing-bullets landing-bullets--compact">
                {card.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
