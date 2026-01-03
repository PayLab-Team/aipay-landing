export const NAV_ITEMS = [
  { id: 'solution', key: 'solution' },
  { id: 'how-it-works', key: 'howItWorks' },
  { id: 'features', key: 'features' },
  { id: 'pricing', key: 'pricing' },
  { id: 'security', key: 'security' },
  { id: 'cases', key: 'cases' },
  { id: 'faq', key: 'faq' },
] as const;

export const SOCIAL_LINKS = {
  whatsapp: 'https://wa.me/77001234567',
  telegram: 'https://t.me/aipay_kz',
};

export const BUSINESS_SEGMENTS = [
  'instagram',
  'infobusiness',
  'services',
  'retail',
  'other',
] as const;

export type BusinessSegment = (typeof BUSINESS_SEGMENTS)[number];
