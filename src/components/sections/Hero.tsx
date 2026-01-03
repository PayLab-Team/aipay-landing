'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { Button, Container } from '@/components/ui';
import { TrustStrip } from './TrustStrip';
import { DashboardMockup } from '@/components/shared';
import { fadeInUp, staggerContainer, blurIn } from '@/lib/animations';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

export function Hero() {
  const t = useTranslations('hero');
  const { scrollToSection } = useSmoothScroll();
  const bullets = t.raw('bullets') as string[];

  return (
    <section
      id="hero"
      className="relative pt-28 lg:pt-36 pb-16 lg:pb-24 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 40%, #c7d2fe 70%, #e0e7ff 100%)'
      }}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(99, 102, 241, 0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-300/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl" />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left content */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              variants={blurIn}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-primary-100 shadow-elevation-1 mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary-500" />
              <span className="text-sm font-medium text-primary-700">
                {t('badge') || '7 дней бесплатно'}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-fluid-4xl lg:text-fluid-5xl font-bold text-gray-900 mb-6 leading-[1.1] tracking-tight"
            >
              {t('headline')}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-fluid-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              {t('subheadline')}
            </motion.p>

            <motion.ul
              variants={fadeInUp}
              className="flex flex-col sm:flex-row lg:flex-col xl:flex-row flex-wrap justify-center lg:justify-start gap-3 sm:gap-5 mb-10"
            >
              {bullets.map((bullet, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-2 text-gray-700 text-sm sm:text-base"
                >
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="w-3 h-3 text-green-600" />
                  </span>
                  <span>{bullet}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
            >
              <Button
                size="lg"
                variant="glow"
                onClick={() => scrollToSection('contact')}
                withArrow
              >
                {t('primaryCta')}
              </Button>
              <Button
                size="lg"
                variant="secondary"
                pill
                onClick={() => scrollToSection('how-it-works')}
              >
                {t('secondaryCta')}
              </Button>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="text-sm text-gray-500 mt-6 max-w-md mx-auto lg:mx-0"
            >
              {t('ctaMicroCopy')}
            </motion.p>
          </motion.div>

          {/* Right content - Dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex justify-center lg:justify-end"
          >
            <DashboardMockup variant="dashboard" animate />
          </motion.div>
        </div>

        <TrustStrip className="mt-16 lg:mt-20" />
      </Container>
    </section>
  );
}
