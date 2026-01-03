'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button, Container } from '@/components/ui';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MobileMenu } from './MobileMenu';
import { NAV_ITEMS } from '@/lib/constants';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { cn } from '@/lib/utils';

export function Header() {
  const t = useTranslations('header');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollToSection } = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  const handleCtaClick = () => {
    scrollToSection('contact');
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-elevation-2 border-b border-gray-100/50'
          : 'bg-transparent'
      )}
    >
      <Container>
        <nav className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.a
            href="/"
            className="flex items-center group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent group-hover:from-primary-500 group-hover:to-primary-400 transition-all duration-300">
              AiPay
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="relative px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100/50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t(`nav.${item.key}`)}
              </motion.button>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher />
            <motion.a
              href="/login"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100/50 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {t('login')}
            </motion.a>
            <Button
              size="sm"
              variant="glow"
              onClick={handleCtaClick}
            >
              {t('cta')}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2 -mr-2 rounded-lg hover:bg-gray-100/50 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </nav>

        {/* Micro copy */}
        <AnimatePresence>
          {!isScrolled && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="hidden lg:block text-xs text-gray-500 text-center pb-2 -mt-2"
            >
              {t('microCopy')}
            </motion.p>
          )}
        </AnimatePresence>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            onClose={() => setIsMobileMenuOpen(false)}
            onNavClick={handleNavClick}
          />
        )}
      </AnimatePresence>
    </header>
  );
}
