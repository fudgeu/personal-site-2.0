import type { Metadata } from 'next';
import { ReactNode } from 'react';
import BackgroundGL from '@/app/new-components/webgl/component/background_gl';

export const metadata: Metadata = {
  title: 'FUDGEU',
  description: 'PERSONAL PORTFOLIO',
};

export default function RootLayout({ children }: {
  children: ReactNode,
}) {
  return (
    <div>
      {/* Background */}
      <BackgroundGL model="all" />

      {/* Page contents */}
      {children}
    </div>
  );
}
