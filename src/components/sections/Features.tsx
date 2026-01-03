'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
  FileText,
  CheckCircle,
  GitMerge,
  LayoutDashboard,
  Code,
  Receipt,
} from 'lucide-react';
import { Container, Card } from '@/components/ui';
import { SectionHeading, ScrollReveal, AngledDivider } from '@/components/shared';
import { cardHover } from '@/lib/animations';

const ICONS = {
  fileText: FileText,
  checkCircle: CheckCircle,
  gitMerge: GitMerge,
  layoutDashboard: LayoutDashboard,
  code: Code,
  receipt: Receipt,
};

// Gradient colors for each card icon
const GRADIENTS = [
  'from-blue-100 to-blue-200',
  'from-green-100 to-green-200',
  'from-purple-100 to-purple-200',
  'from-orange-100 to-orange-200',
  'from-pink-100 to-pink-200',
  'from-cyan-100 to-cyan-200',
];

export function Features() {
  const t = useTranslations('features');
  const cards = t.raw('cards') as Array<{
    icon: keyof typeof ICONS;
    title: string;
    description: string;
  }>;

  return (
    <section id="features" className="py-16 lg:py-24 bg-gray-50 relative">
      <AngledDivider position="top" fillColor="#ffffff" />

      <Container>
        <ScrollReveal>
          <SectionHeading title={t('title')} subtitle={t('subtitle')} />
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => {
            const Icon = ICONS[card.icon] || FileText;
            const gradient = GRADIENTS[index % GRADIENTS.length];

            return (
              <ScrollReveal key={index} delay={index * 0.05}>
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
                    <p className="text-gray-600 text-sm leading-relaxed">{card.description}</p>
                  </Card>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
