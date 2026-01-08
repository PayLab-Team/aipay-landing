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
      <DemoVideo />
      <BusinessSegments />
      <Problem />
      <Features />
      <HowItWorks />
      <Pricing />
      <UseCases />
      <FinalCTA /> 
      <Testimonials />
      <LeadForm />
    </>
  );
}
