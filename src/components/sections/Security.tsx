'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ShieldOff, Database, Users, FileSearch } from 'lucide-react';
import { Container, Card } from '@/components/ui';
import { SectionHeading, ScrollReveal, AngledDivider } from '@/components/shared';
import { cardHover } from '@/lib/animations';

const ICONS = {
  shieldOff: ShieldOff,
  database: Database,
  users: Users,
  fileSearch: FileSearch,
};

export function Security() {
  const t = useTranslations('security');
  const points = t.raw('points') as Array<{
    icon: keyof typeof ICONS;
    title: string;
    description: string;
  }>;

  return (
    <section id="security" className="py-16 lg:py-24 bg-gray-900 text-white relative overflow-hidden">
      <AngledDivider position="top" fillColor="#f9fafb" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />

      <Container className="relative z-10">
        <ScrollReveal>
          <SectionHeading
            title={t('title')}
            className="[&_h2]:text-white [&_p]:text-gray-300"
          />
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((point, index) => {
            const Icon = ICONS[point.icon] || ShieldOff;
            return (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  variants={cardHover}
                  initial="initial"
                  whileHover="hover"
                  className="h-full"
                >
                  <Card className="p-6 h-full bg-gray-800/50 backdrop-blur-sm border-gray-700/50 hover:bg-gray-800/80 transition-all duration-300">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500/30 to-primary-600/30 flex items-center justify-center mb-5 shadow-glow-primary">
                      <Icon className="w-7 h-7 text-primary-300" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-3">
                      {point.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{point.description}</p>
                  </Card>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal delay={0.4}>
          <div className="text-center mt-10">
            <a
              href="#faq"
              className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors text-sm font-medium group"
            >
              {t('link')}
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
                className="inline-block"
              >
                →
              </motion.span>
            </a>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
