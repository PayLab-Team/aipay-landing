'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import * as Tabs from '@radix-ui/react-tabs';
import { Container, Card } from '@/components/ui';
import { SectionHeading, ScrollReveal } from '@/components/shared';
import { BUSINESS_SEGMENTS, type BusinessSegment } from '@/lib/constants';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export function BusinessSegments() {
  const t = useTranslations('businessSegments');
  const [activeSegment, setActiveSegment] =
    useState<BusinessSegment>('instagram');

  return (
    <section id="solution" className="py-16 lg:py-24 bg-gray-50">
      <Container>
        <ScrollReveal>
          <SectionHeading title={t('title')} />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <Tabs.Root
            value={activeSegment}
            onValueChange={(v) => setActiveSegment(v as BusinessSegment)}
          >
            <Tabs.List className="flex flex-wrap justify-center gap-2 mb-12">
              {BUSINESS_SEGMENTS.map((segment) => (
                <Tabs.Trigger
                  key={segment}
                  value={segment}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium transition-all',
                    'data-[state=active]:bg-primary-600 data-[state=active]:text-white',
                    'data-[state=inactive]:bg-white data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:bg-gray-100',
                    'border border-gray-200 data-[state=active]:border-primary-600'
                  )}
                >
                  {t(`tabs.${segment}`)}
                </Tabs.Trigger>
              ))}
            </Tabs.List>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeSegment}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-8 max-w-2xl mx-auto">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {t(`content.${activeSegment}.headline`)}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {t(`content.${activeSegment}.description`)}
                  </p>
                  <ul className="space-y-3">
                    {(
                      t.raw(`content.${activeSegment}.bullets`) as string[]
                    ).map((bullet, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-gray-700"
                      >
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            </AnimatePresence>
          </Tabs.Root>
        </ScrollReveal>
      </Container>
    </section>
  );
}
