import { setRequestLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui';
import { JsonLd } from '@/components/shared/JsonLd';
import { Link } from '@/i18n/navigation';
import type { Metadata } from 'next';

const VALID_SLUGS = [
  'beauty-salon-prepayment',
  'medical-center-payments',
  'restaurant-delivery-payments',
  'instagram-shop-kaspi-invoices',
] as const;
type IndustrySlug = typeof VALID_SLUGS[number];

const SLUG_KEYS: Record<string, string> = {
  'beauty-salon-prepayment': 'beauty',
  'medical-center-payments': 'medical',
  'restaurant-delivery-payments': 'restaurant',
  'instagram-shop-kaspi-invoices': 'instagram',
};

const BASE_URL = 'https://aipay.kz';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return VALID_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!VALID_SLUGS.includes(slug as IndustrySlug)) return {};

  const titles: Record<string, Record<string, string>> = {
    'beauty-salon-prepayment': {
      ru: 'Kaspi Pay для салонов красоты — предоплата и бронирование | AiPay',
      kk: 'Сұлулық салондарына арналған Kaspi Pay — алдын ала төлем мен брондау | AiPay',
      en: 'Kaspi Pay for Beauty Salons — Prepayment & Booking | AiPay',
    },
    'medical-center-payments': {
      ru: 'Kaspi Pay для медцентров — оплата приёмов онлайн | AiPay',
      kk: 'Медорталықтарға арналған Kaspi Pay — қабылдау төлемдері | AiPay',
      en: 'Kaspi Pay for Medical Centers — Online Appointment Payments | AiPay',
    },
    'restaurant-delivery-payments': {
      ru: 'Kaspi Pay для ресторанов и доставки — автоматизация оплат | AiPay',
      kk: 'Мейрамханалар мен жеткізуге арналған Kaspi Pay — төлемдерді автоматтандыру | AiPay',
      en: 'Kaspi Pay for Restaurants & Delivery — Payment Automation | AiPay',
    },
    'instagram-shop-kaspi-invoices': {
      ru: 'Kaspi Pay счета для Instagram-магазинов — автоматизация оплат | AiPay',
      kk: 'Instagram-дүкендерге арналған Kaspi Pay шоттары — төлемдерді автоматтандыру | AiPay',
      en: 'Kaspi Pay Invoices for Instagram Shops — Payment Automation | AiPay',
    },
  };
  const descriptions: Record<string, Record<string, string>> = {
    'beauty-salon-prepayment': {
      ru: 'Автоматическая предоплата через Kaspi Pay при бронировании салона красоты. Меньше неявок, больше подтверждённых записей.',
      kk: 'Сұлулық салонын брондау кезінде Kaspi Pay арқылы автоматты алдын ала төлем. Келмейтіндер аз, расталған жазбалар көп.',
      en: 'Automatic prepayment via Kaspi Pay for beauty salon bookings. Fewer no-shows, more confirmed appointments.',
    },
    'medical-center-payments': {
      ru: 'Предоплата и оплата приёмов в медцентре через Kaspi Pay. Автоматическое подтверждение, фискальные чеки.',
      kk: 'Медорталықтағы қабылдаулар үшін Kaspi Pay арқылы алдын ала төлем. Автоматты растау, фискалдық чектер.',
      en: 'Prepayment for medical center appointments via Kaspi Pay. Automatic confirmation, fiscal receipts.',
    },
    'restaurant-delivery-payments': {
      ru: 'Автоматизация Kaspi Pay для ресторанов: оплата доставки, депозиты за столики, пиковые часы без хаоса.',
      kk: 'Мейрамханаларға арналған Kaspi Pay автоматтандыру: жеткізу төлемі, үстел депозиттері, пик сағаттар хаоссыз.',
      en: 'Kaspi Pay automation for restaurants: delivery payments, table deposits, peak hours without chaos.',
    },
    'instagram-shop-kaspi-invoices': {
      ru: 'Автоматические Kaspi Pay счета для Instagram-магазинов. Моментальная верификация оплат, интеграция с ботами.',
      kk: 'Instagram-дүкендерге арналған автоматты Kaspi Pay шоттары. Төлемдерді лезде тексеру, боттармен интеграция.',
      en: 'Automatic Kaspi Pay invoices for Instagram shops. Instant payment verification, bot integration.',
    },
  };

  return {
    title: titles[slug]?.[locale] || titles[slug]?.ru,
    description: descriptions[slug]?.[locale] || descriptions[slug]?.ru,
    alternates: {
      canonical: `${BASE_URL}/${locale}/industries/${slug}`,
    },
  };
}

export default async function IndustryPage({ params }: Props) {
  const { locale, slug } = await params;

  if (!VALID_SLUGS.includes(slug as IndustrySlug)) {
    notFound();
  }

  setRequestLocale(locale);
  const key = SLUG_KEYS[slug];
  const t = await getTranslations(`industries.${key}`);
  const benefits = t.raw('benefits') as string[];
  const painPoints = t.raw('painPoints') as string[];
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
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {t('headline')}
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {t('subheadline')}
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors shadow-elevation-2"
            >
              {t('cta')}
            </Link>
          </div>
        </Container>
      </section>

      {/* Pain Points */}
      <section className="py-16">
        <Container>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">
            {t('painTitle')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {painPoints.map((point, i) => (
              <div key={i} className="p-5 rounded-xl bg-red-50 border border-red-100 text-center">
                <p className="text-gray-800 text-sm">{point}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Solution/Benefits */}
      <section className="py-16 bg-gray-50">
        <Container>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">
            {t('benefitsTitle')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {benefits.map((benefit, i) => (
              <div key={i} className="p-5 rounded-xl bg-green-50 border border-green-100 text-center">
                <p className="text-gray-800 text-sm font-medium">{benefit}</p>
              </div>
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
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white text-primary-700 font-medium hover:bg-gray-50 transition-colors"
            >
              {t('ctaButton')}
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
