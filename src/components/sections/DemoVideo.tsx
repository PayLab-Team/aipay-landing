'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { YouTubeLite } from '@/components/shared/YouTubeLite';
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
              <YouTubeLite
                videoId="57IdbbYz1rs"
                title={t('title')}
                className="absolute inset-0 w-full h-full"
              />
            </div>

            <div className="mt-5 flex flex-col items-center gap-3">
              <p className="text-sm text-gray-400">{t('channelNote')}</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['Telegram', 'WhatsApp', 'Instagram', 'CRM', 'Сайт / API', '1C', 'Altegio'].map((ch) => (
                  <span
                    key={ch}
                    className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-sm font-medium border border-gray-200"
                  >
                    {ch}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
