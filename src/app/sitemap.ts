import type { MetadataRoute } from 'next';
import { getBlogSlugs } from '@/lib/blog';

const BASE_URL = 'https://www.aipay.kz';
const locales = ['ru', 'kk', 'en'] as const;

type SitemapEntry = MetadataRoute.Sitemap[number];

function localeUrl(l: string, path: string) {
  return l === 'ru' ? `${BASE_URL}${path}` : `${BASE_URL}/${l}${path}`;
}

function localizedEntries(
  path: string,
  options: { changeFrequency: SitemapEntry['changeFrequency']; priority: number },
): SitemapEntry[] {
  return locales.map((locale) => ({
    url: localeUrl(locale, path),
    lastModified: new Date(),
    changeFrequency: options.changeFrequency,
    priority: options.priority,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l, localeUrl(l, path)]),
      ),
    },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const blogEntries = locales.flatMap((locale) =>
    getBlogSlugs(locale).map((slug) => ({
      url: localeUrl(locale, `/blog/${slug}`),
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  );

  return [
    // Homepage
    ...localizedEntries('', { changeFrequency: 'weekly', priority: 1.0 }),
    // Blog listing
    ...localizedEntries('/blog', { changeFrequency: 'weekly', priority: 0.8 }),

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

    // Blog posts
    ...blogEntries,
  ];
}
