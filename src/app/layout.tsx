import './globals.css';

// Root layout returns children only — locale layout provides <html lang={locale}>
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children as React.ReactElement;
}
