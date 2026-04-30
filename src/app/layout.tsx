import type { Metadata } from 'next';
import { Nunito_Sans, Inter } from 'next/font/google';
import './globals.css';

const headingFont = Nunito_Sans({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-heading',
  weight: ['700', '800'],
  display: 'swap',
});

const bodyFont = Inter({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Dash Booking',
  description: 'Multilingual Dash Booking landing page for nail and beauty salons.',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${headingFont.variable} ${bodyFont.variable}`}>
        {children}
      </body>
    </html>
  );
}
