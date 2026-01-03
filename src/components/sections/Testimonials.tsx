'use client';

import { useTranslations } from 'next-intl';
import { Quote } from 'lucide-react';
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
                      До:
                    </span>
                    <span className="text-gray-600 text-sm">{caseItem.before}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-500 font-medium text-sm min-w-[40px]">
                      После:
                    </span>
                    <span className="text-gray-600 text-sm">{caseItem.after}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary-500 font-medium text-sm min-w-[40px]">
                      Итог:
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
