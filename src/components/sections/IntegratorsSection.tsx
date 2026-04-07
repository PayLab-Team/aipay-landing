'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Code, Webhook, Zap, ArrowRight } from 'lucide-react';
import { Container, Card } from '@/components/ui';
import { SectionHeading, ScrollReveal } from '@/components/shared';
import { cardHover } from '@/lib/animations';
import { Link } from '@/i18n/navigation';

const ICONS = [Code, Webhook, Zap] as const;

const GRADIENTS = [
  'from-indigo-100 to-indigo-200',
  'from-violet-100 to-violet-200',
  'from-sky-100 to-sky-200',
];

export function IntegratorsSection() {
  const t = useTranslations('integrators');
  const cards = t.raw('cards') as Array<{
    title: string;
    description: string;
  }>;

  return (
    <section id="integrators" className="py-16 lg:py-24">
      <Container>
        <ScrollReveal>
          <SectionHeading
            title={t('title')}
            subtitle={t('subtitle')}
          />
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {cards.map((card, index) => {
            const Icon = ICONS[index % ICONS.length];
            const gradient = GRADIENTS[index % GRADIENTS.length];

            return (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  variants={cardHover}
                  initial="initial"
                  whileHover="hover"
                  className="h-full"
                >
                  <Card className="p-6 h-full bg-white shadow-elevation-1 hover:shadow-elevation-3 transition-all duration-300 border-0">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-5`}>
                      <Icon className="w-7 h-7 text-gray-700" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {card.description}
                    </p>
                  </Card>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="text-center">
            <a
              href="https://cabinet.aipay.kz/doc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors shadow-elevation-2 hover:shadow-elevation-3"
            >
              {t('cta')}
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
