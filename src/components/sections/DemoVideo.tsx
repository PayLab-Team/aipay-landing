'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/ui';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const VIDEOS = [
  {
    id: 'general',
    videoId: '57IdbbYz1rs',
  },
  {
    id: 'altegio',
    videoId: '83fj4Yk5nZk',
  },
] as const;

type VideoId = (typeof VIDEOS)[number]['id'];

export function DemoVideo() {
  const t = useTranslations('demoVideo');
  const [activeVideo, setActiveVideo] = useState<VideoId>('general');

  const currentVideo = VIDEOS.find((v) => v.id === activeVideo) || VIDEOS[0];

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

          {/* Video Tabs */}
          <motion.div variants={fadeInUp} className="max-w-4xl mx-auto mb-6">
            <div className="flex justify-center gap-2 flex-wrap">
              {VIDEOS.map((video) => (
                <button
                  key={video.id}
                  onClick={() => setActiveVideo(video.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeVideo === video.id
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {t(`tabs.${video.id}`)}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="max-w-4xl mx-auto"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeVideo}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-elevation-4 bg-gray-900">
                  <iframe
                    src={`https://www.youtube.com/embed/${currentVideo.videoId}?rel=0`}
                    title={t(`tabs.${currentVideo.id}`)}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
                <p className="text-center text-gray-500 text-sm mt-3">
                  {t(`descriptions.${currentVideo.id}`)}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
