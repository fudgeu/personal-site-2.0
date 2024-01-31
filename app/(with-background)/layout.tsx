'use client';

import { ReactNode, useEffect } from 'react';
import BackgroundGL from '@/app/new-components/webgl/component/background_gl';

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
