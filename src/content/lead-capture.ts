export const dashbookingLeadInterestValues = [
  'Booking System',
  'AI Receptionist',
  'Website + Google Ads',
  'POS',
  'Not sure yet',
] as const;

export type DashbookingLeadInterestValue = (typeof dashbookingLeadInterestValues)[number];

export const dashbookingLeadCaptureLimits = {
  name: 120,
  business: 160,
  phone: 40,
  email: 254,
  address: 180,
  city: 120,
  region: 80,
  country: 80,
  interest: 120,
  message: 1000,
  platform: 60,
  campaign: 160,
} as const;

export const dashbookingLeadAttributionDefaults = {
  platform: 'direct',
  campaign: 'direct',
} as const;

export const dashbookingLeadStorageKeys = {
  platform: 'dash_platform',
  campaign: 'dash_campaign',
} as const;