'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Container, Button } from '@/components/ui';
import { ScrollReveal, AngledDivider } from '@/components/shared';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

export function FinalCTA() {
  const t = useTranslations('finalCta');
  const { scrollToSection } = useSmoothScroll();

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 30%, #818cf8 60%, #6366f1 100%)'
        }}
      />

      <AngledDivider position="top" fillColor="#ffffff" />
      <AngledDivider position="bottom" fillColor="#f9fafb" flip />

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-primary-400/20 rounded-full blur-3xl" />

      {/* Floating shapes */}
      <motion.div
        animate={{
          y: [-20, 20, -20],
          rotate: [0, 5, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 right-20 w-20 h-20 border-2 border-white/20 rounded-2xl hidden lg:block"
      />
      <motion.div
        animate={{
          y: [20, -20, 20],
          rotate: [0, -5, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-20 left-20 w-16 h-16 border-2 border-white/20 rounded-full hidden lg:block"
      />

      <Container className="relative z-10">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-fluid-3xl lg:text-fluid-4xl font-bold text-white mb-5 leading-tight"
            >
              {t('title')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-primary-100 mb-10"
            >
              {t('subtitle')}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Button
                size="lg"
                className="bg-white hover:bg-gray-50 text-primary-700 shadow-elevation-4 hover:shadow-glow-primary-lg"
                onClick={() => scrollToSection('contact')}
                withArrow
              >
                {t('cta')}
              </Button>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm text-primary-200 mt-5"
            >
              {t('microCopy')}
            </motion.p>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
