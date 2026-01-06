'use client';

import { useTranslations } from 'next-intl';
import { Instagram, GraduationCap, Scissors, Store, Flower2, Cake, UtensilsCrossed, Stethoscope } from 'lucide-react';
import { Container, Card } from '@/components/ui';
import { SectionHeading, ScrollReveal } from '@/components/shared';

const ICONS = {
  instagram: Instagram,
  graduationCap: GraduationCap,
  scissors: Scissors,
  store: Store,
  flower2: Flower2,
  cake: Cake,
  utensilsCrossed: UtensilsCrossed,
  stethoscope: Stethoscope,
};

export function UseCases() {
  const t = useTranslations('useCases');
  const cases = t.raw('cases') as Array<{
    icon: keyof typeof ICONS;
    title: string;
    bullets: string[];
  }>;

  return (
    <section id="cases" className="py-16 lg:py-24 bg-gray-50">
      <Container>
        <ScrollReveal>
          <SectionHeading title={t('title')} />
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {cases.map((useCase, index) => {
            const Icon = ICONS[useCase.icon] || Store;
            return (
              <ScrollReveal key={index} delay={index * 0.1}>
                <Card className="p-6 h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {useCase.title}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {useCase.bullets.map((bullet, i) => (
                      <li
                        key={i}
                        className="text-gray-600 text-sm flex items-start gap-2"
                      >
                        <span className="text-primary-500 mt-1">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
