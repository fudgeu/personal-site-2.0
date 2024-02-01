/* Base layout that simply loads the global CSS */
import './globals.css';
import { ReactNode } from 'react';
import type { Metadata } from 'next';

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
        {children}
      </body>
    </html>
  );
}
