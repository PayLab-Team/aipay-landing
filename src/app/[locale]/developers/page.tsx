import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui';
import { JsonLd } from '@/components/shared/JsonLd';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string }>;
};

const BASE_URL = 'https://aipay.kz';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = {
    ru: 'AiPay для разработчиков — API, Webhooks, интеграция Kaspi Pay',
    kk: 'AiPay әзірлеушілерге — API, Webhooks, Kaspi Pay интеграция',
    en: 'AiPay for Developers — API, Webhooks, Kaspi Pay Integration',
  };
  const descriptions: Record<string, string> = {
    ru: 'Интегрируйте Kaspi Pay в вашу CRM, бота или букинг-систему за 1 день. REST API, webhook-уведомления, Postman-коллекция, примеры кода.',
    kk: 'Kaspi Pay-ді CRM, ботқа немесе брондау жүйесіне 1 күнде интеграциялаңыз. REST API, webhook хабарламалар, Postman жинағы, код мысалдары.',
    en: 'Integrate Kaspi Pay into your CRM, bot, or booking system in 1 day. REST API, webhook notifications, Postman collection, code examples.',
  };
  return {
    title: titles[locale] || titles.ru,
    description: descriptions[locale] || descriptions.ru,
    alternates: {
      canonical: `${BASE_URL}/${locale}/developers`,
    },
  };
}

function DevelopersFlowDiagram() {
  const t = useTranslations('developersPage');
  const steps = t.raw('flow.steps') as string[];

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-8">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center gap-4">
          <div className="flex items-center justify-center w-auto px-6 py-3 rounded-xl bg-primary-50 border border-primary-200 text-primary-700 font-medium text-sm text-center">
            {step}
          </div>
          {i < steps.length - 1 && (
            <span className="text-primary-400 text-2xl hidden md:block">&rarr;</span>
          )}
        </div>
      ))}
    </div>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-6 rounded-xl bg-white border border-gray-200 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

export default async function DevelopersPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = useTranslations('developersPage');
  const features = t.raw('features') as Array<{ title: string; description: string }>;
  const faqItems = t.raw('faq') as Array<{ question: string; answer: string }>;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  return (
    <>
      <JsonLd data={faqSchema} />

      {/* Hero */}
      <section className="pt-28 lg:pt-36 pb-16 lg:pb-24 bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-500/20 text-primary-300 text-sm font-medium mb-6">
              {t('badge')}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {t('headline')}
            </h1>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              {t('subheadline')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors"
              >
                {t('primaryCta')}
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl border border-gray-600 text-gray-300 font-medium hover:bg-gray-800 transition-colors"
              >
                {t('secondaryCta')}
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Flow Diagram */}
      <section className="py-16 bg-gray-50">
        <Container>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">
            {t('flow.title')}
          </h2>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            {t('flow.subtitle')}
          </p>
          <DevelopersFlowDiagram />
        </Container>
      </section>

      {/* Features grid */}
      <section id="features" className="py-16 lg:py-24">
        <Container>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">
            {t('featuresTitle')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <FeatureCard key={i} title={f.title} description={f.description} />
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <Container>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">
            {t('faqTitle')}
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqItems.map((item, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.question}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
