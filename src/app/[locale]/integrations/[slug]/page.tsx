import { setRequestLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui';
import { JsonLd } from '@/components/shared/JsonLd';
import { Link } from '@/i18n/navigation';
import type { Metadata } from 'next';

const VALID_SLUGS = ['altegio', 'pulseai', 'stiker-ai', 'baskaru-pro'] as const;
type IntegrationSlug = typeof VALID_SLUGS[number];

const BASE_URL = 'https://aipay.kz';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return VALID_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!VALID_SLUGS.includes(slug as IntegrationSlug)) return {};

  const titles: Record<string, Record<string, string>> = {
    altegio: {
      ru: 'AiPay + Altegio — Kaspi Pay для бронирования и предоплаты',
      kk: 'AiPay + Altegio — брондау және алдын ала төлем үшін Kaspi Pay',
      en: 'AiPay + Altegio — Kaspi Pay for Booking & Prepayment',
    },
    pulseai: {
      ru: 'AiPay + PulseAI — Kaspi Pay оплата в WhatsApp ботах',
      kk: 'AiPay + PulseAI — WhatsApp боттарында Kaspi Pay төлем',
      en: 'AiPay + PulseAI — Kaspi Pay Payments in WhatsApp Bots',
    },
    'stiker-ai': {
      ru: 'AiPay + STIKER.AI — автоматизация Kaspi Pay для фрилансеров',
      kk: 'AiPay + STIKER.AI — фрилансерлерге Kaspi Pay автоматтандыру',
      en: 'AiPay + STIKER.AI — Kaspi Pay Automation for Freelancers',
    },
    'baskaru-pro': {
      ru: 'AiPay + Baskaru Pro — Kaspi Pay интеграция с ERP',
      kk: 'AiPay + Baskaru Pro — ERP-мен Kaspi Pay интеграция',
      en: 'AiPay + Baskaru Pro — Kaspi Pay ERP Integration',
    },
  };
  const descriptions: Record<string, Record<string, string>> = {
    altegio: {
      ru: 'Автоматическая предоплата при бронировании через Altegio + Kaspi Pay. Меньше неявок, автоматическое подтверждение оплаты.',
      kk: 'Altegio + Kaspi Pay арқылы брондау кезінде автоматты алдын ала төлем. Келмейтіндер аз, автоматты төлем растауы.',
      en: 'Automatic prepayment on booking via Altegio + Kaspi Pay. Fewer no-shows, automatic payment confirmation.',
    },
    pulseai: {
      ru: 'Подтверждение Kaspi Pay оплат в WhatsApp ботах PulseAI. Автоматическое создание заказов после оплаты.',
      kk: 'PulseAI WhatsApp боттарында Kaspi Pay төлемдерін растау. Төлемнен кейін тапсырыстарды автоматты құру.',
      en: 'Confirm Kaspi Pay payments in PulseAI WhatsApp bots. Automatic order creation after payment.',
    },
    'stiker-ai': {
      ru: 'Автоматизация Kaspi Pay платежей для WhatsApp-бизнеса с STIKER.AI. Для фрилансеров и малого бизнеса.',
      kk: 'STIKER.AI арқылы WhatsApp-бизнес үшін Kaspi Pay төлемдерін автоматтандыру. Фрилансерлер мен шағын бизнеске.',
      en: 'Automate Kaspi Pay for WhatsApp business with STIKER.AI. For freelancers and small businesses.',
    },
    'baskaru-pro': {
      ru: 'Синхронизация Kaspi Pay платежей с Baskaru Pro ERP. Автоматические финансовые статусы и боты.',
      kk: 'Kaspi Pay төлемдерін Baskaru Pro ERP-мен синхрондау. Автоматты қаржылық мәртебелер мен боттар.',
      en: 'Sync Kaspi Pay payments with Baskaru Pro ERP. Automatic financial statuses and bots.',
    },
  };

  return {
    title: titles[slug]?.[locale] || titles[slug]?.ru,
    description: descriptions[slug]?.[locale] || descriptions[slug]?.ru,
    alternates: {
      canonical: `${BASE_URL}/${locale}/integrations/${slug}`,
    },
  };
}

function StepCard({ number, text }: { number: number; text: string }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-100 text-primary-700 font-bold flex items-center justify-center text-sm">
        {number}
      </div>
      <p className="text-gray-700 pt-1.5">{text}</p>
    </div>
  );
}

export default async function IntegrationPage({ params }: Props) {
  const { locale, slug } = await params;

  if (!VALID_SLUGS.includes(slug as IntegrationSlug)) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations(`integrations.${slug.replace('-', '')}`);
  const benefits = t.raw('benefits') as string[];
  const steps = t.raw('steps') as string[];
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
      <section className="pt-28 lg:pt-36 pb-16 lg:pb-24 bg-gradient-to-br from-primary-50 via-white to-primary-50">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6">
              {t('badge')}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {t('headline')}
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {t('subheadline')}
            </p>
          </div>
        </Container>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <Container>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">
            {t('benefitsTitle')}
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {benefits.map((benefit, i) => (
              <div key={i} className="p-6 rounded-xl bg-primary-50 border border-primary-100 text-center">
                <p className="text-gray-800 font-medium">{benefit}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Setup Steps */}
      <section className="py-16 bg-gray-50">
        <Container>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">
            {t('stepsTitle')}
          </h2>
          <div className="max-w-2xl mx-auto space-y-6">
            {steps.map((step, i) => (
              <StepCard key={i} number={i + 1} text={step} />
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-16">
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

      {/* CTA */}
      <section className="py-16 bg-primary-600">
        <Container>
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {t('ctaTitle')}
            </h2>
            <p className="text-primary-100 mb-8 max-w-xl mx-auto">
              {t('ctaSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white text-primary-700 font-medium hover:bg-gray-50 transition-colors"
              >
                {t('ctaButton')}
              </Link>
              <Link
                href="/developers"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl border border-primary-300 text-white font-medium hover:bg-primary-700 transition-colors"
              >
                {t('ctaSecondary')}
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
