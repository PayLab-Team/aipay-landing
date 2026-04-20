export const NAV_ITEMS = [
  { id: 'solution', key: 'solution' },
  { id: 'how-it-works', key: 'howItWorks' },
  { id: 'features', key: 'features' },
  { id: 'pricing', key: 'pricing' },
  // { id: 'security', key: 'security' },
  // { id: 'cases', key: 'cases' },
  // { id: 'faq', key: 'faq' },
] as const;

export const NAV_LINKS = [
  { href: '/developers', key: 'developers' },
  { href: '/blog', key: 'blog' },
] as const;

export const PARTNER_LINKS: Record<string, string> = {
  Hani: '/integrations/altegio',
  'stiker.ai': '/integrations/stiker-ai',
  altegio: '/integrations/altegio',
  superme: '/integrations/pulseai',
  flowsell: '/integrations/pulseai',
  darmed: '/industries/medical-center-payments',
};

export const SOCIAL_LINKS = {
  whatsapp: 'https://wa.me/77755227623',
  telegram: 'https://t.me/DrJonah',
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
