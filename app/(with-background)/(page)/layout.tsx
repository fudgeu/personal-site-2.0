'use client';

import { ReactNode, useMemo } from 'react';
import Window from '@/app/components/window/Window';
import styles from './layout-styles.module.css';
import { usePathname } from 'next/navigation';

export default function WindowLayout({ children }: {
  children: ReactNode,
}) {
  const pathName = usePathname();
  const pageTitle = useMemo(() => {
    return pathName.split('/').slice(-1)[0];
  }, [pathName]);

  return (
    <div className={styles.container}>
      <Window title={pageTitle} redirectOnClose="/home">
        {children}
      </Window>
    </div>
  );
}
