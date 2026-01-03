'use client';

import { useTranslations } from 'next-intl';
import { Container, Button } from '@/components/ui';
import { SectionHeading, ScrollReveal, StepIndicator } from '@/components/shared';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

export function HowItWorks() {
  const t = useTranslations('howItWorks');
  const { scrollToSection } = useSmoothScroll();
  const steps = t.raw('steps') as Array<{
    number: string;
    title: string;
    description: string;
  }>;

  // Transform steps for StepIndicator
  const formattedSteps = steps.map((step) => ({
    number: parseInt(step.number) || 1,
    title: step.title,
    description: step.description,
  }));

  return (
    <section id="how-it-works" className="py-16 lg:py-24 relative">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(99, 102, 241, 0.05) 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}
      />

      <Container className="relative z-10">
        <ScrollReveal>
          <SectionHeading title={t('title')} />
        </ScrollReveal>

        <div className="max-w-5xl mx-auto mt-12">
          <ScrollReveal delay={0.1}>
            <StepIndicator
              steps={formattedSteps}
              orientation="horizontal"
            />
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="text-center mt-16">
              <Button
                size="lg"
                variant="glow"
                onClick={() => scrollToSection('contact')}
                withArrow
              >
                {t('cta')}
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
