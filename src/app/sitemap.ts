import type { MetadataRoute } from 'next';

const BASE_URL = 'https://aipay.kz';
const locales = ['ru', 'kk', 'en'] as const;

type SitemapEntry = MetadataRoute.Sitemap[number];

function localizedEntries(
  path: string,
  options: { changeFrequency: SitemapEntry['changeFrequency']; priority: number },
): SitemapEntry[] {
  return locales.map((locale) => ({
    url: `${BASE_URL}/${locale}${path}`,
    lastModified: new Date(),
    changeFrequency: options.changeFrequency,
    priority: options.priority,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l, `${BASE_URL}/${l}${path}`]),
      ),
    },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // Homepage
    ...localizedEntries('', { changeFrequency: 'weekly', priority: 1.0 }),

    // Developers
    ...localizedEntries('/developers', { changeFrequency: 'weekly', priority: 0.9 }),

    // Integration partner pages
    ...localizedEntries('/integrations/altegio', { changeFrequency: 'monthly', priority: 0.8 }),
    ...localizedEntries('/integrations/pulseai', { changeFrequency: 'monthly', priority: 0.8 }),
    ...localizedEntries('/integrations/stiker-ai', { changeFrequency: 'monthly', priority: 0.8 }),
    ...localizedEntries('/integrations/baskaru-pro', { changeFrequency: 'monthly', priority: 0.8 }),

    // Industry pages
    ...localizedEntries('/industries/beauty-salon-prepayment', { changeFrequency: 'monthly', priority: 0.8 }),
    ...localizedEntries('/industries/medical-center-payments', { changeFrequency: 'monthly', priority: 0.8 }),
    ...localizedEntries('/industries/restaurant-delivery-payments', { changeFrequency: 'monthly', priority: 0.8 }),
    ...localizedEntries('/industries/instagram-shop-kaspi-invoices', { changeFrequency: 'monthly', priority: 0.8 }),

    // Legal
    ...localizedEntries('/privacy', { changeFrequency: 'yearly', priority: 0.3 }),
    ...localizedEntries('/terms', { changeFrequency: 'yearly', priority: 0.3 }),
  ];
}
