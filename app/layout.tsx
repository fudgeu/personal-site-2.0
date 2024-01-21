import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import BackgroundGL from '@/app/webgl/component/background_gl';

export const metadata: Metadata = {
  title: 'FUDGEU',
  description: 'PERSONAL PORTFOLIO',
};

export default function RootLayout({ children }: {
  children: ReactNode,
}) {
  return (
    <html lang="en">
      <body>
        {/* Background */}
        <BackgroundGL model="all" />

        {/* Page contents */}
        {children}
      </body>
    </html>
  );
}
