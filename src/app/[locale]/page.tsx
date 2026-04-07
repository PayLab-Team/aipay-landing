import { setRequestLocale } from 'next-intl/server';
import dynamic from 'next/dynamic';

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

  return (
    <>
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
