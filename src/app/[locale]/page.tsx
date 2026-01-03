import { setRequestLocale } from 'next-intl/server';
import {
  Hero,
  BusinessSegments,
  Problem,
  Features,
  HowItWorks,
  UseCases,
  Testimonials,
  Pricing,
  Security,
  FAQ,
  FinalCTA,
  LeadForm,
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
      <BusinessSegments />
      <Problem />
      <Features />
      <HowItWorks />
      <UseCases />
      <Testimonials />
      <Pricing />
      <Security />
      <FAQ />
      <FinalCTA />
      <LeadForm />
    </>
  );
}
