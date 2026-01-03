'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui';
import { LanguageSwitcher } from './LanguageSwitcher';
import { NAV_ITEMS } from '@/lib/constants';

interface MobileMenuProps {
  onClose: () => void;
  onNavClick: (sectionId: string) => void;
}

export function MobileMenu({ onClose, onNavClick }: MobileMenuProps) {
  const t = useTranslations('header');

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="lg:hidden bg-white border-t border-gray-100"
    >
      <div className="container mx-auto px-4 py-6 space-y-4">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavClick(item.id)}
            className="block w-full text-left py-2 text-gray-600 hover:text-gray-900 font-medium"
          >
            {t(`nav.${item.key}`)}
          </button>
        ))}
        <hr className="border-gray-100" />
        <div className="flex items-center justify-between">
          <LanguageSwitcher />
          <a
            href="/login"
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            {t('login')}
          </a>
        </div>
        <Button className="w-full" onClick={() => onNavClick('contact')}>
          {t('cta')}
        </Button>
        <p className="text-xs text-gray-500 text-center">{t('microCopy')}</p>
      </div>
    </motion.div>
  );
}
