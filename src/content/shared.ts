import { normalizedPublicAssets } from '@/lib/assets';

export const googlePartnersUrl = 'https://www.google.com/maps/reserve/partners';

export const trustMarketFlags = [
  { country: 'United States', flag: '🇺🇸' },
  { country: 'Canada', flag: '🇨🇦' },
  { country: 'United Kingdom', flag: '🇬🇧' },
  { country: 'Germany', flag: '🇩🇪' },
  { country: 'France', flag: '🇫🇷' },
  { country: 'Spain', flag: '🇪🇸' },
  { country: 'Australia', flag: '🇦🇺' },
  { country: 'Dubai', flag: '🇦🇪' },
] as const;

export const terminalAssets = [
  { name: 'Clover', imageSrc: normalizedPublicAssets.cloverTerminal },
  { name: 'Poynt', imageSrc: normalizedPublicAssets.poyntTerminal },
] as const;

export const googleLogo = normalizedPublicAssets.googleLogo;
export const heroStaffPortraits = {
  amy: normalizedPublicAssets.hero.staffAmy,
  bella: normalizedPublicAssets.hero.staffBella,
  chloe: normalizedPublicAssets.hero.staffChloe,
} as const;
export const heroBusinessProfilePhotos = [
  normalizedPublicAssets.hero.businessProfileLead,
  normalizedPublicAssets.hero.businessProfileInterior,
  normalizedPublicAssets.hero.businessProfileFloral,
] as const;

export const googleReviewsSalonPhoto = normalizedPublicAssets.googleReviews.salonPhoto;

export const websiteDesignAssets = normalizedPublicAssets.websiteDesign;
export const posIntegrationAssets = normalizedPublicAssets.posIntegration;
export const addonFeaturesAssets = normalizedPublicAssets.addonFeatures;
export const leadCaptureAssets = normalizedPublicAssets.leadCapture;

export const websiteDesignSearchDemo = {
  sponsoredLabel: 'Sponsored',
  name: 'Your Way Nail Spa',
  url: 'yourwaynailspa.com',
  headline: 'Your Way Nail Spa | Premium Nail Care in Vancouver',
  snippet: 'Manicure, Pedicure, Gel Nails, Nail Art and More. Book Online Today!',
  bookLabel: 'Book Online',
} as const;

export const websiteDesignGallerySalons = [
  {
    id: 'your-way',
    name: 'Your Way Nail Spa',
    city: 'Vancouver, BC',
    href: 'https://yourwaynailspa.com/',
    imageSrc: websiteDesignAssets.laptopYourWay,
  },
  {
    id: 'hestia',
    name: 'The Hestia Nail Bar',
    city: 'Regina, SK',
    href: 'https://thehestianailbar.com/',
    imageSrc: websiteDesignAssets.laptopHestia,
  },
  {
    id: 'modern-chic',
    name: 'Modern Chic Nail Studio',
    city: 'Toronto, ON',
    href: 'https://moderchicnailstudio.com/',
    imageSrc: websiteDesignAssets.laptopModernChic,
  },
  {
    id: 'leva',
    name: 'LeVa Nails & Spa',
    city: 'Mississauga, ON',
    href: 'https://levanailsspa.com/',
    imageSrc: websiteDesignAssets.laptopLeva,
  },
  {
    id: 'kozy',
    name: 'Kozy Nail Studio',
    city: 'Calgary, AB',
    href: 'https://kozynail.ca/',
    imageSrc: websiteDesignAssets.laptopKozy,
  },
  {
    id: 'joy-of-nails',
    name: 'Joy of Nails',
    city: 'Tillsonburg, ON',
    href: 'https://maps.google.com/?q=Joy+of+Nails+Tillsonburg',
    imageSrc: websiteDesignAssets.laptopJoyOfNails,
  },
  {
    id: 'bm-nails-bar',
    name: 'BM Nails Bar',
    city: 'Edmonton, AB',
    href: 'https://maps.google.com/?q=BM+Nails+Bar+Edmonton',
    imageSrc: websiteDesignAssets.laptopBmNailsBar,
  },
] as const;

export const aiReceptionistPortraits = {
  customer: normalizedPublicAssets.aiReceptionist.customerCaller,
  receptionist: normalizedPublicAssets.aiReceptionist.headsetReceptionist,
  amy: normalizedPublicAssets.aiReceptionist.beautyProfessional,
  lisa: normalizedPublicAssets.aiReceptionist.salonSupport,
  mai: normalizedPublicAssets.hero.staffChloe,
} as const;
