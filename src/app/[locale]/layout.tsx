import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import localFont from 'next/font/local';
import { Analytics } from '@vercel/analytics/react';
import { routing } from '@/i18n/routing';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { JsonLd } from '@/components/shared/JsonLd';
import type { Metadata } from 'next';

const BASE_URL = 'https://www.aipay.kz';

const inter = localFont({
  src: '../../../public/fonts/Inter-Variable-Latin.woff2',
  variable: '--font-inter',
  display: 'swap',
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const HREFLANG_MAP: Record<string, string> = {
  ru: 'ru-KZ',
  kk: 'kk-KZ',
  en: 'en',
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    ru: 'AiPay — Автоматизация оплат Kaspi Pay для бизнеса | Верификация, API, Webhooks',
    kk: 'AiPay — Kaspi Pay төлемдерін автоматтандыру | Тексеру, API, Webhooks',
    en: 'AiPay — Kaspi Pay Payment Automation for Business | Verification, API, Webhooks',
  };

  const descriptions: Record<string, string> = {
    ru: 'Автоматизируйте приём оплат Kaspi Pay: выставление счетов по номеру телефона, мгновенная верификация, webhook-уведомления, фискальные чеки. API для CRM, ботов и букинг-систем. 7 дней бесплатно.',
    kk: 'Kaspi Pay төлемдерін автоматтандырыңыз: телефон нөмірі бойынша шот жазу, жедел тексеру, webhook хабарламалар, фискалдық чектер. CRM, боттар мен брондау жүйелеріне арналған API. 7 күн тегін.',
    en: 'Automate Kaspi Pay payments: phone-number invoicing, instant verification, webhook notifications, fiscal receipts. API for CRMs, bots, and booking systems. 7 days free.',
  };

  const keywords: Record<string, string[]> = {
    ru: [
      'Kaspi Pay', 'оплата Kaspi', 'верификация оплат', 'автоматизация Kaspi',
      'автоматизация оплаты каспи', 'автоматизация оплат Kaspi Pay',
      'Kaspi Pay API', 'Kaspi webhook', 'Kaspi Pay интеграция', 'проверка оплат Kaspi',
      'Kaspi Pay для бизнеса', 'AiPay', 'ai pay', 'фискальные чеки Kaspi',
    ],
    kk: [
      'Kaspi Pay', 'Kaspi төлем', 'төлемді тексеру', 'Kaspi автоматтандыру',
      'Kaspi Pay API', 'Kaspi webhook', 'Kaspi Pay интеграция', 'AiPay',
    ],
    en: [
      'Kaspi Pay', 'Kaspi payment', 'payment verification', 'Kaspi automation',
      'Kaspi Pay API', 'Kaspi webhook', 'Kaspi Pay integration', 'AiPay',
    ],
  };

  const localeUrl = (l: string) => l === 'ru' ? BASE_URL : `${BASE_URL}/${l}`;

  const alternates: Record<string, string> = {};
  for (const l of routing.locales) {
    alternates[HREFLANG_MAP[l]] = localeUrl(l);
  }

  return {
    title: titles[locale] || titles.ru,
    description: descriptions[locale] || descriptions.ru,
    keywords: keywords[locale] || keywords.ru,
    icons: {
      icon: [
        { url: '/favicon_io/favicon.ico' },
        { url: '/favicon_io/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon_io/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: '/favicon_io/apple-touch-icon.png',
    },
    manifest: '/favicon_io/site.webmanifest',
    alternates: {
      canonical: localeUrl(locale),
      languages: alternates,
    },
    openGraph: {
      title: titles[locale] || titles.ru,
      description: descriptions[locale] || descriptions.ru,
      url: localeUrl(locale),
      siteName: 'AiPay',
      locale: locale === 'ru' ? 'ru_KZ' : locale === 'kk' ? 'kk_KZ' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[locale] || titles.ru,
      description: descriptions[locale] || descriptions.ru,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'AiPay',
  url: BASE_URL,
  description: 'Kaspi Pay payment automation — invoicing, verification, webhooks, fiscal receipts.',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    availableLanguage: ['Russian', 'Kazakh', 'English'],
  },
};

const SOFTWARE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'AiPay',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description: 'Kaspi Pay payment automation: invoice creation, instant verification, webhooks, fiscal receipts.',
  offers: {
    '@type': 'Offer',
    price: '25000',
    priceCurrency: 'KZT',
    description: 'Per terminal per month (3-month minimum). 7-day free trial.',
  },
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <NextIntlClientProvider messages={messages}>
          <JsonLd data={ORGANIZATION_SCHEMA} />
          <JsonLd data={SOFTWARE_SCHEMA} />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
