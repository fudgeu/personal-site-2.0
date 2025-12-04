'use client';

import '../globals.css';
import { ReactNode } from 'react';
import BackgroundGL from "@/app/components/webgl/component/background_gl";

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
