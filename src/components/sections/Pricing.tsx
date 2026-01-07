'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { Container, Card, Button } from '@/components/ui';
import { SectionHeading, ScrollReveal, AnimatedCounter } from '@/components/shared';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { cn } from '@/lib/utils';
import { cardHover } from '@/lib/animations';

export function Pricing() {
  const t = useTranslations('pricing');
  const { scrollToSection } = useSmoothScroll();
  const plans = t.raw('plans') as Array<{
    name: string;
    price: string;
    currency: string;
    period: string;
    description: string;
    features: string[];
    cta: string;
    popular?: boolean;
  }>;

  return (
    <section id="pricing" className="py-16 lg:py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-primary-50/30 to-white" />

      <Container className="relative z-10">
        <ScrollReveal>
          <SectionHeading title={t('title')} />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center gap-3 mb-12"
          >
            <div className="flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              <span className="text-lg font-semibold text-gray-900">
                {t('trial.text')}
              </span>
              <span className="text-gray-500">{t('trial.subtext')}</span>
            </div>
          </motion.div>
        </ScrollReveal>

        <div className="flex justify-center gap-8 max-w-xl mx-auto">
          {plans.map((plan, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <motion.div
                variants={cardHover}
                initial="initial"
                whileHover="hover"
                className="h-full"
              >
                <Card
                  className={cn(
                    'p-8 relative h-full flex flex-col bg-white',
                    plan.popular
                      ? 'border-2 border-primary-500 shadow-elevation-4 animate-glow-pulse'
                      : 'shadow-elevation-2 hover:shadow-elevation-3'
                  )}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-gradient-to-r from-primary-600 to-primary-500 text-white text-sm font-semibold px-4 py-1.5 rounded-full shadow-lg">
                        {t('popularBadge')}
                      </span>
                    </div>
                  )}

                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>

                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-3xl sm:text-4xl font-bold text-gray-900 whitespace-nowrap">
                      {plan.price}
                    </span>
                    <span className="text-xl text-gray-700">{plan.currency}</span>
                    <span className="text-gray-500 ml-1">{plan.period}</span>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-green-600" />
                        </span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={plan.popular ? 'glow' : 'secondary'}
                    className="w-full"
                    onClick={() => scrollToSection('contact')}
                  >
                    {plan.cta}
                  </Button>
                </Card>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <p className="text-center text-sm text-gray-500 mt-8">
            {t('microCopy')}
          </p>
        </ScrollReveal>
      </Container>
    </section>
  );
}
