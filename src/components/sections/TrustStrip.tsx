'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Shield, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LogoMarquee } from '@/components/shared';

interface TrustStripProps {
  className?: string;
}

// Placeholder partner logos
const PARTNER_LOGOS = [
  { name: 'Kaspi Bank' },
  { name: 'Halyk Bank' },
  { name: 'Jusan Bank' },
  { name: 'Freedom Finance' },
  { name: 'Forte Bank' },
  { name: 'Technodom' },
  { name: 'Sulpak' },
  { name: 'Arbuz.kz' },
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
        <LogoMarquee
          logos={PARTNER_LOGOS}
          speed="normal"
          pauseOnHover
        />
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
