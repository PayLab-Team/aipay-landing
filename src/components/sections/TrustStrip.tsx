'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TrustStripProps {
  className?: string;
}

// Compatible payment systems and platforms (not endorsements)
const COMPATIBLE_SYSTEMS = [
  { name: 'Hani' },
  { name: 'stiker.ai' },
  { name: 'altegio' },
  { name: 'superme' },
  { name: 'flowsell' },
  { name: 'darmed' },
];

export function TrustStrip({ className }: TrustStripProps) {
  const t = useTranslations('trustStrip');

  // Duplicate array for seamless infinite scroll
  const duplicatedSystems = [...COMPATIBLE_SYSTEMS, ...COMPATIBLE_SYSTEMS];

  return (
    <div className={cn('space-y-8', className)}>
      {/* Logo Marquee */}
      <div className="text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-sm text-gray-500 mb-6"
        >
          {t('partnersLabel') || 'Нам доверяют компании'}
        </motion.p>

        {/* Marquee container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="relative overflow-hidden"
        >
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#e0e7ff] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#e0e7ff] to-transparent z-10 pointer-events-none" />

          {/* Scrolling track */}
          <div className="flex animate-marquee">
            {duplicatedSystems.map((system, index) => (
              <div
                key={`${system.name}-${index}`}
                className="flex-shrink-0 mx-6"
              >
                <div className="flex items-center justify-center h-12 px-6 rounded-lg bg-white/60 backdrop-blur-sm border border-white/80 shadow-sm">
                  <span className="text-gray-700 font-medium text-sm whitespace-nowrap">
                    {system.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
