'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Shield, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrustStripProps {
  className?: string;
}

// Compatible payment systems and platforms (not endorsements)
const COMPATIBLE_SYSTEMS = [
  { name: 'Kaspi Pay' },
];

export function TrustStrip({ className }: TrustStripProps) {
  const t = useTranslations('trustStrip');
  const points = t.raw('points') as string[];

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
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="inline-flex items-center justify-center h-12 px-8 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200"
        >
          <span className="text-gray-600 font-medium text-sm">
            {COMPATIBLE_SYSTEMS[0].name}
          </span>
        </motion.div>
      </div>

      {/* Trust points card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white/80 backdrop-blur-sm border border-primary-100 rounded-2xl p-6 shadow-elevation-2"
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-600" />
          </div>
          <h3 className="font-semibold text-gray-900 text-lg">{t('title')}</h3>
        </div>
        <ul className="grid sm:grid-cols-2 gap-3">
          {points.map((point, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="text-sm text-gray-600 flex items-start gap-2"
            >
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                <Check className="w-3 h-3 text-green-600" />
              </span>
              <span>{point}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
