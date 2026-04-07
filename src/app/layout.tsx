import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

const inter = localFont({
  src: [
    {
      path: '../../public/fonts/Inter-Variable-Latin.woff2',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Inter-Variable-Italic.woff2',
      style: 'italic',
    },
  ],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AiPay - Автоматизация оплат Kaspi для бизнеса',
  description:
    'Автоматизируйте приём оплат Kaspi: выставление счетов, верификация платежей, фискальные чеки. Для Instagram-магазинов, инфобизнеса и услуг.',
  icons: {
    icon: [
      { url: '/favicon_io/favicon.ico' },
      { url: '/favicon_io/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon_io/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/favicon_io/apple-touch-icon.png',
  },
  manifest: '/favicon_io/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
