export const NAV_ITEMS = [
  { id: 'solution', key: 'solution' },
  { id: 'how-it-works', key: 'howItWorks' },
  { id: 'features', key: 'features' },
  { id: 'pricing', key: 'pricing' },
  { id: 'security', key: 'security' },
  { id: 'cases', key: 'cases' },
  { id: 'faq', key: 'faq' },
] as const;

// TODO: Replace with real contact numbers before production launch
export const SOCIAL_LINKS = {
  whatsapp: 'https://wa.me/77775717557', // PLACEHOLDER - update with real WhatsApp number
  telegram: 'https://t.me/adntgv', // PLACEHOLDER - update with real Telegram handle
};

export const BUSINESS_SEGMENTS = [
  'instagram',
  'infobusiness',
  'services',
  'retail',
  'florist',
  'bakery',
  'restaurant',
  'medical',
  'other',
] as const;

export type BusinessSegment = (typeof BUSINESS_SEGMENTS)[number];
