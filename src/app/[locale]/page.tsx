import { setRequestLocale } from 'next-intl/server';
import {
  Hero,
  DemoVideo,
  BusinessSegments,
  Problem,
  Features,
  HowItWorks,
  UseCases,
  Testimonials,
  Pricing,
  FAQ,
  FinalCTA,
  LeadForm,
  IntegratorsSection,
} from '@/components/sections';

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
