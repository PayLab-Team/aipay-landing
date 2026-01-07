'use client';

import { useTranslations } from 'next-intl';
import { Quote, ArrowRight } from 'lucide-react';
import { Container, Card } from '@/components/ui';
import { SectionHeading, ScrollReveal } from '@/components/shared';

export function Testimonials() {
  const t = useTranslations('testimonials');
  const cases = t.raw('cases') as Array<{
    type: string;
    before: string;
    after: string;
    result: string;
    quote: string;
  }>;

  // Featured highlight layout for single item
  if (cases.length === 1) {
    const caseItem = cases[0];
    return (
      <section className="py-16 lg:py-24">
        <Container>
          <ScrollReveal>
            <SectionHeading title={t('title')} />
          </ScrollReveal>

          <div className="max-w-4xl mx-auto">
            {/* Quote Section */}
            <ScrollReveal delay={0.1}>
              <div className="text-center mb-12">
                <Quote className="w-12 h-12 text-primary-300 mx-auto mb-6" />
                <blockquote className="text-2xl lg:text-3xl font-medium text-gray-900 italic mb-6">
                  &ldquo;{caseItem.quote}&rdquo;
                </blockquote>
                <div className="flex items-center justify-center gap-2">
                  <span className="px-4 py-1.5 bg-primary-100 text-primary-700 text-sm font-medium rounded-full">
                    {caseItem.type}
                  </span>
                </div>
              </div>
            </ScrollReveal>

            {/* Metrics Row */}
            <ScrollReveal delay={0.2}>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                {/* Before */}
                <Card className="p-5 md:col-span-1">
                  <div className="text-red-500 font-semibold text-sm mb-2">
                    {t('labels.before')}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {caseItem.before}
                  </p>
                </Card>

                {/* Arrow */}
                <div className="hidden md:flex justify-center">
                  <ArrowRight className="w-6 h-6 text-gray-300" />
                </div>

                {/* After */}
                <Card className="p-5 md:col-span-1">
                  <div className="text-green-500 font-semibold text-sm mb-2">
                    {t('labels.after')}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {caseItem.after}
                  </p>
                </Card>

                {/* Arrow */}
                <div className="hidden md:flex justify-center">
                  <ArrowRight className="w-6 h-6 text-gray-300" />
                </div>

                {/* Result */}
                <Card className="p-5 md:col-span-1 bg-primary-50 border-primary-100">
                  <div className="text-primary-600 font-semibold text-sm mb-2">
                    {t('labels.result')}
                  </div>
                  <p className="text-gray-900 font-medium text-sm leading-relaxed">
                    {caseItem.result}
                  </p>
                </Card>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>
    );
  }

  // Grid layout for multiple items
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <ScrollReveal>
          <SectionHeading title={t('title')} />
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8">
          {cases.map((caseItem, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <Card className="p-6 h-full">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full">
                    {caseItem.type}
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    <span className="text-red-500 font-medium text-sm min-w-[40px]">
                      {t('labels.before')}
                    </span>
                    <span className="text-gray-600 text-sm">{caseItem.before}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-500 font-medium text-sm min-w-[40px]">
                      {t('labels.after')}
                    </span>
                    <span className="text-gray-600 text-sm">{caseItem.after}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary-500 font-medium text-sm min-w-[40px]">
                      {t('labels.result')}
                    </span>
                    <span className="text-gray-900 font-medium text-sm">
                      {caseItem.result}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-start gap-3">
                    <Quote className="w-5 h-5 text-primary-300 flex-shrink-0 mt-1" />
                    <p className="text-gray-700 italic">{caseItem.quote}</p>
                  </div>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
