import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import type { Metadata } from 'next';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    ru: 'AiPay - Автоматизация оплат Kaspi для бизнеса',
    kk: 'AiPay - Kaspi төлемдерін автоматтандыру',
    en: 'AiPay - Kaspi Payment Automation for Business',
  };

  const descriptions: Record<string, string> = {
    ru: 'Автоматизируйте приём оплат Kaspi: выставление счетов, верификация платежей, фискальные чеки.',
    kk: 'Kaspi төлемдерін автоматтандырыңыз: шот жазу, төлемді тексеру, фискалдық чектер.',
    en: 'Automate Kaspi payments: invoicing, payment verification, fiscal receipts.',
  };

  return {
    title: titles[locale] || titles.ru,
    description: descriptions[locale] || descriptions.ru,
    openGraph: {
      title: titles[locale] || titles.ru,
      description: descriptions[locale] || descriptions.ru,
      locale: locale === 'ru' ? 'ru_RU' : locale === 'kk' ? 'kk_KZ' : 'en_US',
      type: 'website',
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}
