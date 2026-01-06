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
    ru: 'Политика конфиденциальности — AiPay',
    kk: 'Құпиялылық саясаты — AiPay',
    en: 'Privacy Policy — AiPay',
  };

  return {
    title: titles[locale] || titles.ru,
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PrivacyContent />;
}

function PrivacyContent() {
  const t = useTranslations('legal.privacy');

  return (
    <section className="py-24 lg:py-32">
      <Container className="max-w-3xl">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
          {t('title')}
        </h1>

        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 mb-6">{t('lastUpdated')}</p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            {t('sections.collection.title')}
          </h2>
          <p className="text-gray-600 mb-4">{t('sections.collection.content')}</p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            {t('sections.usage.title')}
          </h2>
          <p className="text-gray-600 mb-4">{t('sections.usage.content')}</p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            {t('sections.storage.title')}
          </h2>
          <p className="text-gray-600 mb-4">{t('sections.storage.content')}</p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            {t('sections.sharing.title')}
          </h2>
          <p className="text-gray-600 mb-4">{t('sections.sharing.content')}</p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            {t('sections.rights.title')}
          </h2>
          <p className="text-gray-600 mb-4">{t('sections.rights.content')}</p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            {t('sections.contact.title')}
          </h2>
          <p className="text-gray-600 mb-4">{t('sections.contact.content')}</p>
        </div>
      </Container>
    </section>
  );
}
