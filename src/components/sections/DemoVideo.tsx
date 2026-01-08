'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export function DemoVideo() {
  const t = useTranslations('demoVideo');

  return (
    <section
      id="demo"
      className="relative py-16 lg:py-24 bg-white"
    >
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div variants={fadeInUp}>
            <SectionHeading
              title={t('title')}
              subtitle={t('subtitle')}
              centered
            />
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="max-w-4xl mx-auto"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-elevation-4 bg-gray-900">
              <iframe
                src="https://www.youtube.com/embed/57IdbbYz1rs?controls=0&rel=0"
                title={t('title')}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
