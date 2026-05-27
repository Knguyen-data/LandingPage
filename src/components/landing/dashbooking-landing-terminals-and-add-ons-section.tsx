import Image from 'next/image';

import { DashbookingLandingAiDemoList } from '@/components/landing/dashbooking-landing-ai-demo-section';
import {
  InteractiveCard,
  MotionScope,
  RevealGroup,
  RevealItem,
} from '@/components/landing/dashbooking-landing-motion-primitives';
import { DashbookingLandingReviewResponseDemo } from '@/components/landing/dashbooking-landing-review-response-demo';
import { terminalAssets } from '@/content/landing/dashbooking-landing-shared-data';
import type { LandingContent, OptionalItem } from '@/content/landing/dashbooking-landing-content-types';

interface DashbookingLandingTerminalsAndAddOnsSectionProps {
  readonly content: LandingContent;
}

function OptionalAddOnCard({ item }: { readonly item: OptionalItem }) {
  const cardClassName = item.slug === 'ai-social-media' ? 'add-on-card add-on-card--animated surface-card stack-md' : 'add-on-card surface-card stack-md';

  return (
    <RevealItem key={item.slug ?? item.name} role="listitem" distance={8}>
      <article className={cardClassName}>
        <div className="stack-sm">
          <div className="add-on-card__header">
            <h3 className="title-sm">{item.name}</h3>
            {item.price ? <strong>{item.price}</strong> : null}
          </div>
          {item.description ? <p className="copy-sm text-muted">{item.description}</p> : null}
        </div>
        {item.priceLines?.length ? (
          <ul className="landing-bullets landing-bullets--compact">
            {item.priceLines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        ) : null}
        {item.bullets?.length ? (
          <ul className="landing-bullets landing-bullets--compact">
            {item.bullets.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        ) : null}
        {item.ctaLabel && item.ctaHref ? (
          <a href={item.ctaHref} className="button-link button-link--secondary" target="_blank" rel="noreferrer">
            {item.ctaLabel}
          </a>
        ) : null}
      </article>
    </RevealItem>
  );
}

export function DashbookingLandingTerminalsAndAddOnsSection({
  content,
}: DashbookingLandingTerminalsAndAddOnsSectionProps) {
  return (
    <section id="optional-features" className="section-shell">
      <MotionScope>
        <RevealGroup className="container stack-lg" stagger={0.06}>
          <RevealItem>
            <DashbookingLandingReviewResponseDemo content={content.reviewResponseDemo} />
          </RevealItem>
          <RevealItem>
            <div className="stack-md section-heading">
              {content.addOns.eyebrow ? <span className="eyebrow">{content.addOns.eyebrow}</span> : null}
              <h2 className="title-lg">{content.addOns.title}</h2>
              {content.addOns.supportLine ? <p className="copy-md text-muted">{content.addOns.supportLine}</p> : null}
            </div>
          </RevealItem>
          <RevealItem>
            <InteractiveCard>
              <article className="add-on-card add-on-card--featured optional-features__ai-block surface-card stack-lg">
                <h3 className="title-sm optional-features__ai-title">{content.ai.title}</h3>
                <div className="optional-features__ai-layout">
                  <div className="optional-features__ai-summary">
                    <div className="optional-features__ai-summary-card stack-md">
                      {content.ai.description || content.ai.supportLine ? (
                        <div className="stack-sm optional-features__ai-summary-copy">
                          {content.ai.description ? <p className="copy-sm text-muted">{content.ai.description}</p> : null}
                          {content.ai.supportLine ? <p className="copy-sm text-muted">{content.ai.supportLine}</p> : null}
                        </div>
                      ) : null}
                      <div className="optional-features__ai-visual" aria-hidden="true">
                        <div className="optional-features__ai-visual-halo" />
                        <Image
                          src="/assets/ai-receptionist.png"
                          alt=""
                          width={600}
                          height={707}
                          className="optional-features__ai-visual-image"
                        />
                      </div>
                      {content.ai.priceLines.length ? (
                        <ul className="landing-bullets landing-bullets--compact">
                          {content.ai.priceLines.map((line) => (
                            <li key={line}>{line}</li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </div>
                  <div className="stack-md optional-features__ai-demos">
                    {content.ai.demoTitle ? <p className="kicker">{content.ai.demoTitle}</p> : null}
                    <DashbookingLandingAiDemoList demoIds={content.ai.demoIds} />
                  </div>
                </div>
              </article>
            </InteractiveCard>
          </RevealItem>
          <RevealGroup className="section-grid section-grid--two add-ons-layout" stagger={0.08}>
            <RevealItem>
              <article className="surface-card add-on-panel stack-lg">
                <div className="stack-sm">
                  <span className="kicker">{content.addOns.terminalTitle}</span>
                  {content.addOns.terminalIntro ? <p className="copy-md text-muted">{content.addOns.terminalIntro}</p> : null}
                </div>
                <RevealGroup className="terminal-grid" role="list" aria-label={content.addOns.terminalListAriaLabel} stagger={0.05}>
                  {terminalAssets.map((asset) => (
                    <RevealItem key={asset.name} role="listitem" distance={8}>
                      <article className="surface-card terminal-card stack-sm">
                        <Image src={asset.imageSrc} alt={asset.name} width={640} height={520} />
                        <strong className="title-sm">{asset.name}</strong>
                        {content.addOns.terminalBadge ? <p className="copy-sm text-muted">{content.addOns.terminalBadge}</p> : null}
                      </article>
                    </RevealItem>
                  ))}
                </RevealGroup>
                <ul className="landing-bullets landing-bullets--compact">
                  {content.addOns.terminalRates.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                {content.addOns.terminalDisclaimer ? <p className="copy-sm text-muted">{content.addOns.terminalDisclaimer}</p> : null}
              </article>
            </RevealItem>
            <RevealItem>
              <RevealGroup className="add-on-list" role="list" aria-label={content.addOns.optionalListAriaLabel} stagger={0.05}>
                {content.addOns.optionalItems.map((item) => (
                  <OptionalAddOnCard key={item.slug ?? item.name} item={item} />
                ))}
              </RevealGroup>
            </RevealItem>
          </RevealGroup>
        </RevealGroup>
      </MotionScope>
    </section>
  );
}
