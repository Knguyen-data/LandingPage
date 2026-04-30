import Image from 'next/image';
import { terminalAssets } from '@/content/landing/dashbooking-landing-shared-data';
import type { LandingContent } from '@/content/landing/dashbooking-landing-content-types';

interface DashbookingLandingTerminalsAndAddOnsSectionProps {
  readonly content: LandingContent;
}

export function DashbookingLandingTerminalsAndAddOnsSection({
  content,
}: DashbookingLandingTerminalsAndAddOnsSectionProps) {
  return (
    <section className="section-shell">
      <div className="container section-grid section-grid--two">
        <div className="stack-lg">
          <span className="eyebrow">{content.addOns.eyebrow}</span>
          <h2 className="title-lg">{content.addOns.title}</h2>
          <p className="copy-md text-muted">{content.addOns.terminalIntro}</p>
          <div className="terminal-grid" role="list" aria-label={content.addOns.terminalListAriaLabel}>
            {terminalAssets.map((asset) => (
              <article key={asset.name} className="surface-card terminal-card stack-sm" role="listitem">
                <Image src={asset.imageSrc} alt={asset.name} width={640} height={520} />
                <strong className="title-sm">{asset.name}</strong>
                <p className="copy-sm text-muted">{content.addOns.terminalBadge}</p>
              </article>
            ))}
          </div>
          <ul className="landing-bullets landing-bullets--compact">
            {content.addOns.terminalRates.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="copy-sm text-muted">{content.addOns.terminalDisclaimer}</p>
        </div>
        <div className="surface-card add-on-panel stack-lg">
          <div className="stack-sm">
            <span className="kicker">{content.addOns.optionalTitle}</span>
          </div>
          <div className="add-on-list" role="list" aria-label={content.addOns.optionalListAriaLabel}>
            {content.addOns.optionalItems.map((item) => (
              <article key={item.name} className="add-on-card stack-sm" role="listitem">
                <div className="stack-sm">
                  <h3 className="title-sm">{item.name}</h3>
                  <p className="copy-sm text-muted">{item.description}</p>
                </div>
                <strong>{item.price}</strong>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
