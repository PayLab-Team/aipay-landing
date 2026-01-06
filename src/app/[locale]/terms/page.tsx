import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    ru: 'Условия использования — AiPay',
    kk: 'Пайдалану шарттары — AiPay',
    en: 'Terms of Service — AiPay',
  };

  return {
    title: titles[locale] || titles.ru,
  };
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <TermsContent />;
}

function TermsContent() {
  const t = useTranslations('legal.terms');

  return (
    <section className="py-24 lg:py-32">
      <Container className="max-w-3xl">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
          {t('title')}
        </h1>

        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 mb-6">{t('lastUpdated')}</p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            {t('sections.acceptance.title')}
          </h2>
          <p className="text-gray-600 mb-4">{t('sections.acceptance.content')}</p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            {t('sections.services.title')}
          </h2>
          <p className="text-gray-600 mb-4">{t('sections.services.content')}</p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            {t('sections.accounts.title')}
          </h2>
          <p className="text-gray-600 mb-4">{t('sections.accounts.content')}</p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            {t('sections.payment.title')}
          </h2>
          <p className="text-gray-600 mb-4">{t('sections.payment.content')}</p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            {t('sections.liability.title')}
          </h2>
          <p className="text-gray-600 mb-4">{t('sections.liability.content')}</p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            {t('sections.termination.title')}
          </h2>
          <p className="text-gray-600 mb-4">{t('sections.termination.content')}</p>
        </div>
      </Container>
    </section>
  );
}
