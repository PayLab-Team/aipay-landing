'use client';

import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui';
import { SOCIAL_LINKS } from '@/lib/constants';
import { MessageCircle, Send } from 'lucide-react';

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo and Copyright */}
          <div className="text-center md:text-left">
            <span className="text-2xl font-bold text-white">AiPay</span>
            <p className="text-sm text-gray-400 mt-2">{t('copyright')}</p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            <a href="/privacy" className="hover:text-white transition-colors">
              {t('links.privacy')}
            </a>
            <a href="/terms" className="hover:text-white transition-colors">
              {t('links.terms')}
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href={SOCIAL_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition-colors"
            >
              <MessageCircle size={18} />
              <span className="text-sm">{t('contact.whatsapp')}</span>
            </a>
            <a
              href={SOCIAL_LINKS.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"
            >
              <Send size={18} />
              <span className="text-sm">{t('contact.telegram')}</span>
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
