'use client';

import { useState } from 'react';

import { dashbookingCanadaCityLinks } from '@/content/landing/dashbooking-landing-canada-cities';
import type { LandingContent } from '@/content/landing/dashbooking-landing-content-types';

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
      <div className="container surface-card canada-cities__card stack-lg">
        <div className="stack-md canada-cities__intro">
          <span className="eyebrow canada-cities__eyebrow">
            <span className="canada-cities__flag" aria-hidden="true">
              🇨🇦
            </span>
            {content.customerCities.eyebrow}
          </span>
          <h2 className="title-lg">{content.customerCities.title}</h2>
        </div>

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

        {hasOverflow ? (
          <button
            type="button"
            className="button-link button-link--secondary button-link--compact canada-cities__toggle"
            onClick={() => setExpanded((currentExpanded) => !currentExpanded)}
            aria-expanded={expanded}
          >
            {expanded ? content.customerCities.lessLabel : content.customerCities.moreLabel}
          </button>
        ) : null}
      </div>
    </section>
  );
}
