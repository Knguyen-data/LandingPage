import Image from 'next/image';

import { calendarScreenshot } from '@/content/landing/dashbooking-landing-shared-data';
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
          {content.includes.eyebrow ? <span className="eyebrow">{content.includes.eyebrow}</span> : null}
          <h2 className="title-lg">{content.includes.title}</h2>
        </div>
        <div className="dashbooking-platform-visual surface-card">
          <Image
            src={calendarScreenshot}
            alt="Dash Booking Platform Dashboard"
            width={1448}
            height={1086}
            className="dashbooking-platform-visual__image"
            priority
          />
        </div>
        <div className="scope-grid" role="list" aria-label={content.includes.cardsAriaLabel}>
          {content.includes.cards.map((card) => (
            <article key={card.title} className="surface-card scope-card stack-md" role="listitem">
              <h3 className="title-sm">{card.title}</h3>
              <p className="copy-sm text-muted">{card.description}</p>
              {card.bullets?.length ? (
                <ul className="landing-bullets landing-bullets--compact">
                  {card.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
