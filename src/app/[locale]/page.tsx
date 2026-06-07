import { setRequestLocale, getTranslations } from 'next-intl/server';
import dynamic from 'next/dynamic';
import { JsonLd } from '@/components/shared/JsonLd';

// Above fold — static imports (critical path)
import { Hero } from '@/components/sections/Hero';
import { DemoVideo } from '@/components/sections/DemoVideo';

// Below fold — dynamic imports (each section gets its own JS chunk)
const BusinessSegments = dynamic(() => import('@/components/sections/BusinessSegments').then(m => m.BusinessSegments));
const Problem = dynamic(() => import('@/components/sections/Problem').then(m => m.Problem));
const Features = dynamic(() => import('@/components/sections/Features').then(m => m.Features));
const IntegratorsSection = dynamic(() => import('@/components/sections/IntegratorsSection').then(m => m.IntegratorsSection));
const HowItWorks = dynamic(() => import('@/components/sections/HowItWorks').then(m => m.HowItWorks));
const Pricing = dynamic(() => import('@/components/sections/Pricing').then(m => m.Pricing));
const UseCases = dynamic(() => import('@/components/sections/UseCases').then(m => m.UseCases));
const FinalCTA = dynamic(() => import('@/components/sections/FinalCTA').then(m => m.FinalCTA));
const Testimonials = dynamic(() => import('@/components/sections/Testimonials').then(m => m.Testimonials));
const FAQ = dynamic(() => import('@/components/sections/FAQ').then(m => m.FAQ));
const LeadForm = dynamic(() => import('@/components/sections/LeadForm').then(m => m.LeadForm));

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('faq');
  const hw = await getTranslations('howItWorks');

  const faqItems = t.raw('items') as Array<{ question: string; answer: string }>;
  const steps = hw.raw('steps') as Array<{ number: string; title: string; description: string }>;

  // FAQPage schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  // HowTo schema
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: locale === 'en' ? 'How to integrate Kaspi Pay with your business' :
           locale === 'kk' ? 'Kaspi Pay-ді бизнесіңізге қалай интеграциялау керек' :
           'Как подключить Kaspi Pay к вашему бизнесу',
    description: locale === 'en' ? 'Step-by-step guide to integrating Kaspi Pay payment automation via AiPay API' :
                 locale === 'kk' ? 'AiPay API арқылы Kaspi Pay төлемдерін автоматтандыру бойынша нұсқаулық' :
                 'Пошаговая инструкция по интеграции автоматизации Kaspi Pay через AiPay API',
    totalTime: 'PT1H',
    estimatedTime: 'PT1H',
    step: steps.map((s) => ({
      '@type': 'HowToStep',
      name: s.title,
      itemListElement: s.description,
    })),
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={howToSchema} />
      <Hero />
      <DemoVideo />
      <BusinessSegments />
      <Problem />
      <Features />
      <IntegratorsSection />
      <HowItWorks />
      <Pricing />
      <UseCases />
      <FinalCTA />
      <Testimonials />
      <FAQ />
      <LeadForm />
    </>
  );
}
