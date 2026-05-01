'use client';

import { useState } from 'react';

import { dashbookingCanadaCityLinks } from '@/content/landing/dashbooking-landing-canada-cities';
import type { LandingContent } from '@/content/landing/dashbooking-landing-content-types';
import { MotionScope, SectionReveal } from '@/components/landing/dashbooking-landing-motion-primitives';

const MOBILE_VISIBLE_CITY_COUNT = 10;

interface DashbookingLandingCanadaCitiesSectionProps {
  readonly content: LandingContent;
}

export function DashbookingLandingCanadaCitiesSection({
  content,
}: DashbookingLandingCanadaCitiesSectionProps) {
  const [expanded, setExpanded] = useState(false);
  const hasOverflow = dashbookingCanadaCityLinks.length > MOBILE_VISIBLE_CITY_COUNT;

  return (
    <section className="section-shell canada-cities">
      <MotionScope>
        <div className="container surface-card canada-cities__card stack-lg">
          <SectionReveal>
            <div className="stack-md canada-cities__intro">
              {content.customerCities.eyebrow ? <span className="eyebrow canada-cities__eyebrow">{content.customerCities.eyebrow}</span> : null}
              <h2 className="title-lg canada-cities__title">{content.customerCities.title}</h2>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.06} distance={10}>
            <ul
              className={`canada-cities__grid ${expanded ? 'is-expanded' : 'is-collapsed'}`}
              aria-label={content.customerCities.title}
            >
              {dashbookingCanadaCityLinks.map((city) => {
                const cityCta = content.customerCities.cityCta.replace('{city}', city.name);

                return (
                  <li key={city.slug} className="canada-cities__item">
                    <a
                      href={`https://www.dashbooking.com/best/nail/${city.slug}`}
                      className="canada-city-chip"
                      aria-label={cityCta}
                      title={cityCta}
                    >
                      <span>{city.name}</span>
                      <span aria-hidden="true">→</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </SectionReveal>

          {hasOverflow ? (
            <SectionReveal delay={0.1} distance={8}>
              <button
                type="button"
                className="button-link button-link--secondary button-link--compact canada-cities__toggle"
                onClick={() => setExpanded((currentExpanded) => !currentExpanded)}
                aria-expanded={expanded}
              >
                {expanded ? content.customerCities.lessLabel : content.customerCities.moreLabel}
              </button>
            </SectionReveal>
          ) : null}
        </div>
      </MotionScope>
    </section>
  );
}
