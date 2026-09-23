'use client';

import Image from 'next/image';
import {
  Bookmark,
  CalendarDays,
  ChevronRight,
  Clock,
  EllipsisVertical,
  Globe,
  MapPin,
  Navigation,
  Phone,
  Share2,
  Star,
} from 'lucide-react';

import type { HeroBusinessProfileCopy } from '@/content/types';
import { heroBusinessProfilePhotos } from '@/content/shared';

interface DashbookingLandingHeroBusinessProfileProps {
  readonly content: HeroBusinessProfileCopy;
  readonly bookOnlineActive: boolean;
  readonly emphasizeBookOnline: boolean;
  readonly showMorePhotos: boolean;
}

export function DashbookingLandingHeroBusinessProfile({
  content,
  bookOnlineActive,
  emphasizeBookOnline,
  showMorePhotos,
}: DashbookingLandingHeroBusinessProfileProps) {
  const bookClassName = [
    'hero-gbp__action',
    'hero-gbp__book',
    'is-active',
    emphasizeBookOnline ? 'is-emphasis' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={bookOnlineActive ? 'hero-gbp' : 'hero-gbp hero-gbp--no-booking'} aria-hidden="true">
      <div className="hero-gbp__header">
        <div>
          <h3 className="hero-gbp__title">{content.name}</h3>
          <p className="hero-gbp__meta">
            <span className="hero-gbp__rating">{content.ratingValue}</span>
            <Star size={12} strokeWidth={0} fill="currentColor" className="hero-gbp__star" />
            <span>({content.reviewCount})</span>
            <span aria-hidden="true"> · </span>
            <span>{content.category}</span>
          </p>
        </div>
        <button type="button" className="hero-gbp__more" aria-hidden="true" tabIndex={-1}>
          <EllipsisVertical size={18} strokeWidth={2.2} />
        </button>
      </div>

      <div className="hero-gbp__tabs" role="tablist" aria-label={content.tabs.overview}>
        <span className="hero-gbp__tab is-active">{content.tabs.overview}</span>
        <span className="hero-gbp__tab">{content.tabs.reviews}</span>
        <span className="hero-gbp__tab">{content.tabs.photos}</span>
        <span className="hero-gbp__tab">{content.tabs.services}</span>
      </div>

      <div className="hero-gbp__gallery">
        {heroBusinessProfilePhotos.map((src, index) => (
          <div key={src} className="hero-gbp__photo">
            <Image
              src={src}
              alt=""
              fill
              sizes="180px"
              className="hero-gbp__photo-image"
              priority={index === 0}
            />
            {index === 2 ? (
              <span className="hero-gbp__photo-overlay">
                {showMorePhotos ? content.morePhotosLabel : <ChevronRight size={22} strokeWidth={2.4} />}
              </span>
            ) : null}
          </div>
        ))}
      </div>

      <div className="hero-gbp__actions">
        {bookOnlineActive ? (
          <span className={bookClassName} data-hero-target="book-online">
            <span className="hero-gbp__book-sparks" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </span>
            <CalendarDays size={15} strokeWidth={2.2} />
            {content.actions.bookOnline}
          </span>
        ) : null}
        <span className="hero-gbp__action">
          <Globe size={15} strokeWidth={2.2} />
          {content.actions.website}
        </span>
        <span className="hero-gbp__action">
          <Navigation size={15} strokeWidth={2.2} />
          {content.actions.directions}
        </span>
        <span className="hero-gbp__action">
          <Bookmark size={15} strokeWidth={2.2} />
          {content.actions.save}
        </span>
        <span className="hero-gbp__action">
          <Share2 size={15} strokeWidth={2.2} />
          {content.actions.share}
        </span>
        <span className="hero-gbp__action hero-gbp__call" data-hero-target="call-button">
          <Phone size={15} strokeWidth={2.2} />
          {content.actions.call}
        </span>
      </div>

      <div className="hero-gbp__details">
        <p className="hero-gbp__detail">
          <Clock size={14} strokeWidth={2.2} />
          <span>{content.hours}</span>
        </p>
        <p className="hero-gbp__detail hero-gbp__detail--address">
          <MapPin size={14} strokeWidth={2.2} />
          <span>{content.address}</span>
        </p>
        <div className="hero-gbp__map" aria-hidden="true">
          <MapPin size={16} strokeWidth={2.4} className="hero-gbp__map-pin" />
        </div>
        <p className="hero-gbp__reviews">
          <Star size={13} strokeWidth={0} fill="currentColor" className="hero-gbp__star" />
          <strong>{content.ratingValue}</strong>
          <span className="hero-gbp__stars" aria-hidden="true">
            <Star size={11} strokeWidth={0} fill="currentColor" />
            <Star size={11} strokeWidth={0} fill="currentColor" />
            <Star size={11} strokeWidth={0} fill="currentColor" />
            <Star size={11} strokeWidth={0} fill="currentColor" />
            <Star size={11} strokeWidth={0} fill="currentColor" />
          </span>
          <span>{content.reviewsRow}</span>
        </p>
      </div>
    </div>
  );
}
