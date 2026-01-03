'use client';

import { useTranslations } from 'next-intl';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { Container } from '@/components/ui';
import { SectionHeading, ScrollReveal } from '@/components/shared';
import { cn } from '@/lib/utils';

export function FAQ() {
  const t = useTranslations('faq');
  const items = t.raw('items') as Array<{
    question: string;
    answer: string;
  }>;

  return (
    <section id="faq" className="py-16 lg:py-24">
      <Container>
        <ScrollReveal>
          <SectionHeading title={t('title')} />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="max-w-3xl mx-auto">
            <Accordion.Root type="single" collapsible className="space-y-4">
              {items.map((item, index) => (
                <Accordion.Item
                  key={index}
                  value={`item-${index}`}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden"
                >
                  <Accordion.Header>
                    <Accordion.Trigger className="flex items-center justify-between w-full px-6 py-4 text-left font-medium text-gray-900 hover:bg-gray-50 transition-colors group">
                      <span>{item.question}</span>
                      <ChevronDown
                        className={cn(
                          'w-5 h-5 text-gray-400 transition-transform duration-200',
                          'group-data-[state=open]:rotate-180'
                        )}
                      />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                    <div className="px-6 pb-4 text-gray-600">{item.answer}</div>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
