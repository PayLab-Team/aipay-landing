import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'AiPay - Автоматизация оплат Kaspi для бизнеса',
  description:
    'Автоматизируйте приём оплат Kaspi: выставление счетов, верификация платежей, фискальные чеки. Для Instagram-магазинов, инфобизнеса и услуг.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
