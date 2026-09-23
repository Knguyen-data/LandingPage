export type AddonGiftCardPhase = 'purchase' | 'generate' | 'email' | 'balance' | 'hold';

export type AddonDepositPhase = 'setup' | 'booking' | 'payment' | 'confirmed' | 'hold';

export const addonGiftCardBeats: readonly { readonly phase: AddonGiftCardPhase; readonly ms: number }[] = [
  { phase: 'purchase', ms: 1800 },
  { phase: 'generate', ms: 1800 },
  { phase: 'email', ms: 2200 },
  { phase: 'balance', ms: 1800 },
  { phase: 'hold', ms: 1400 },
];

export const addonDepositBeats: readonly { readonly phase: AddonDepositPhase; readonly ms: number }[] = [
  { phase: 'setup', ms: 1300 },
  { phase: 'booking', ms: 1800 },
  { phase: 'payment', ms: 1800 },
  { phase: 'confirmed', ms: 1700 },
  { phase: 'hold', ms: 1900 },
];

export const addonFeatureInViewThreshold = 0.45;

export const addonSequenceHoldMs = 1200;
