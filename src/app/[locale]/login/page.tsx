import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Container, Button } from '@/components/ui';
import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    ru: 'Вход — AiPay',
    kk: 'Кіру — AiPay',
    en: 'Login — AiPay',
  };

  return {
    title: titles[locale] || titles.ru,
  };
}

export default async function LoginPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <LoginContent />;
}

function LoginContent() {
  const t = useTranslations('login');

  return (
    <section className="py-24 lg:py-32 min-h-[60vh] flex items-center">
      <Container className="max-w-md text-center">
        <div className="bg-gradient-to-br from-primary-50 to-white p-8 rounded-2xl border border-gray-100 shadow-elevation-2">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl font-bold text-primary-600">Ai</span>
          </div>

          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h1>

          <p className="text-gray-600 mb-8">
            {t('description')}
          </p>

          <a
            href="https://dashboard.aipay.kz"
            className="inline-flex items-center justify-center gap-2 w-full h-12 px-6 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition-colors"
          >
            {t('dashboardButton')}
            <ArrowRight className="w-4 h-4" />
          </a>

          <p className="text-sm text-gray-500 mt-6">
            {t('noAccount')}{' '}
            <a href="/#contact" className="text-primary-600 hover:underline">
              {t('startTrial')}
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
}
