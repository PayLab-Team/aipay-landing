'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';

const LOCALE_NAMES: Record<string, string> = {
  ru: 'RU',
  kk: 'KK',
  en: 'EN',
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-1 text-sm">
      {routing.locales.map((loc, index) => (
        <span key={loc} className="flex items-center">
          <button
            onClick={() => handleChange(loc)}
            className={cn(
              'px-1 py-0.5 rounded transition-colors',
              locale === loc
                ? 'text-primary-600 font-semibold'
                : 'text-gray-500 hover:text-gray-700'
            )}
          >
            {LOCALE_NAMES[loc]}
          </button>
          {index < routing.locales.length - 1 && (
            <span className="text-gray-300 mx-0.5">/</span>
          )}
        </span>
      ))}
    </div>
  );
}
