'use client';

import { useTranslations } from 'next-intl';
import { Clock, AlertTriangle, Brain } from 'lucide-react';
import { Container, Card } from '@/components/ui';
import { SectionHeading, ScrollReveal } from '@/components/shared';

const ICONS = {
  clock: Clock,
  alertTriangle: AlertTriangle,
  brain: Brain,
};

export function Problem() {
  const t = useTranslations('problem');
  const cards = t.raw('cards') as Array<{
    icon: keyof typeof ICONS;
    title: string;
    description: string;
  }>;

  return (
    <section id="problem" className="py-16 lg:py-24">
      <Container>
        <ScrollReveal>
          <SectionHeading title={t('title')} subtitle={t('description')} />
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, index) => {
            const Icon = ICONS[card.icon] || Clock;
            return (
              <ScrollReveal key={index} delay={index * 0.1}>
                <Card className="p-6 h-full">
                  <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {card.title}
                  </h3>
                  <p className="text-gray-600">{card.description}</p>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
