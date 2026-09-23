interface AddonFeatureIconProps {
  readonly size?: number;
  readonly className?: string;
}

export function AddonGiftCardIcon({ size = 64, className }: AddonFeatureIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="addon-gift-icon-bg" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#DDF7F6" />
          <stop offset="1" stopColor="#EEFDFC" />
        </linearGradient>
        <linearGradient id="addon-gift-icon-fill" x1="16" y1="18" x2="48" y2="50" gradientUnits="userSpaceOnUse">
          <stop stopColor="#08A8A9" />
          <stop offset="1" stopColor="#0796A7" />
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="58" height="58" rx="18" fill="url(#addon-gift-icon-bg)" />
      <rect x="15" y="27" width="34" height="23" rx="4" fill="url(#addon-gift-icon-fill)" />
      <rect x="13" y="23" width="38" height="9" rx="3" fill="url(#addon-gift-icon-fill)" />
      <path d="M32 23V50" stroke="white" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M15 31H49" stroke="white" strokeWidth="3.2" strokeLinecap="round" opacity="0.95" />
      <path
        d="M31.8 22.5C27.6 21.6 23.3 19.5 22.4 16.2C21.9 14.3 23.1 12.5 25.1 12.3C28.5 12 31.1 16.1 31.8 22.5Z"
        stroke="#08A8A9"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M32.2 22.5C36.4 21.6 40.7 19.5 41.6 16.2C42.1 14.3 40.9 12.5 38.9 12.3C35.5 12 32.9 16.1 32.2 22.5Z"
        stroke="#08A8A9"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AddonOnlineDepositIcon({ size = 64, className }: AddonFeatureIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="addon-deposit-icon-bg" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#DDF7F6" />
          <stop offset="1" stopColor="#EEFDFC" />
        </linearGradient>
        <linearGradient id="addon-deposit-icon-fill" x1="16" y1="17" x2="48" y2="49" gradientUnits="userSpaceOnUse">
          <stop stopColor="#08A8A9" />
          <stop offset="1" stopColor="#0796A7" />
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="58" height="58" rx="18" fill="url(#addon-deposit-icon-bg)" />
      <ellipse cx="27" cy="20" rx="13" ry="5.5" fill="url(#addon-deposit-icon-fill)" />
      <path d="M14 20V29C14 32 20 34.5 27 34.5C34 34.5 40 32 40 29V20" stroke="#08A8A9" strokeWidth="3" />
      <path d="M14 29V38C14 41 20 43.5 27 43.5C29.2 43.5 31.2 43.3 33 42.8" stroke="#08A8A9" strokeWidth="3" />
      <circle cx="43" cy="41" r="10" fill="url(#addon-deposit-icon-fill)" />
      <path
        d="M43 35V47M46.5 37.5C45.7 36.7 44.5 36.2 43.1 36.2C41 36.2 39.5 37.3 39.5 38.8C39.5 40.5 41.1 41.1 43.2 41.6C45.3 42.1 46.5 42.8 46.5 44.3C46.5 45.9 45 47 42.9 47C41.3 47 39.9 46.4 39 45.3"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function AddonGiftMark({ size = 28, className }: AddonFeatureIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <rect x="6" y="14" width="20" height="13" rx="2.4" fill="white" opacity="0.96" />
      <rect x="5" y="11.5" width="22" height="5" rx="1.8" fill="white" />
      <path d="M16 11.5V27" stroke="#0796A7" strokeWidth="2" strokeLinecap="round" />
      <path d="M6.5 16.2H25.5" stroke="#0796A7" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M15.8 11.2C13.4 10.7 10.9 9.4 10.4 7.5C10.1 6.4 10.8 5.4 12 5.3C13.9 5.1 15.4 7.5 15.8 11.2Z"
        fill="white"
      />
      <path
        d="M16.2 11.2C18.6 10.7 21.1 9.4 21.6 7.5C21.9 6.4 21.2 5.4 20 5.3C18.1 5.1 16.6 7.5 16.2 11.2Z"
        fill="white"
      />
    </svg>
  );
}

export function AddonMailBenefitIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <rect width="22" height="22" rx="11" fill="#DDF7F6" />
      <path d="M5.5 8.2 11 11.6 16.5 8.2" stroke="#0796A7" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="5.2" y="7.2" width="11.6" height="7.8" rx="1.6" stroke="#0796A7" strokeWidth="1.7" />
    </svg>
  );
}

export function AddonNoCardBenefitIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <rect width="22" height="22" rx="11" fill="#DDF7F6" />
      <circle cx="11" cy="11" r="5.2" stroke="#0796A7" strokeWidth="1.7" />
      <path d="M7.4 14.6 14.6 7.4" stroke="#0796A7" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function AddonCoinsBenefitIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <rect width="22" height="22" rx="11" fill="#DDF7F6" />
      <ellipse cx="11" cy="8.2" rx="4.4" ry="1.7" stroke="#0796A7" strokeWidth="1.6" />
      <path d="M6.6 8.2v2.6c0 1 2 1.7 4.4 1.7s4.4-.7 4.4-1.7V8.2" stroke="#0796A7" strokeWidth="1.6" />
      <path d="M6.6 10.8v2.5c0 1 2 1.7 4.4 1.7s4.4-.7 4.4-1.7v-2.5" stroke="#0796A7" strokeWidth="1.6" />
    </svg>
  );
}

export function AddonPeopleBenefitIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <rect width="22" height="22" rx="11" fill="#DDF7F6" />
      <circle cx="8.6" cy="9" r="2" stroke="#0796A7" strokeWidth="1.6" />
      <path d="M5.6 14.4c.3-1.8 1.5-2.7 3-2.7s2.7.9 3 2.7" stroke="#0796A7" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="13.8" cy="9.2" r="1.6" stroke="#0796A7" strokeWidth="1.5" />
      <path d="M13 12.1c1.1-.3 2.3.2 2.8 1.8" stroke="#0796A7" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function AddonGearBenefitIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <rect width="22" height="22" rx="11" fill="#DDF7F6" />
      <circle cx="11" cy="11" r="2.1" stroke="#0796A7" strokeWidth="1.6" />
      <path
        d="M11 6.2v1.3M11 14.5v1.3M6.2 11h1.3M14.5 11h1.3M7.6 7.6l.9.9M13.5 13.5l.9.9M14.4 7.6l-.9.9M8.5 13.5l-.9.9"
        stroke="#0796A7"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function AddonShieldBenefitIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <rect width="22" height="22" rx="11" fill="#DDF7F6" />
      <path
        d="M11 5.8 16 7.6v4.1c0 3-2 4.8-5 5.5-3-.7-5-2.5-5-5.5V7.6L11 5.8Z"
        stroke="#0796A7"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M8.8 11.1 10.4 12.7 13.4 9.6" stroke="#0796A7" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
