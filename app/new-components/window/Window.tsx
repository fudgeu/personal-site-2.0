'use client';

import styles from './styles.module.css';
import { ReactNode, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

type WindowProps = {
  children: ReactNode,
  title: string,
  redirectOnClose: string,
};

export default function Window({ children, title, redirectOnClose }: WindowProps) {
  const [isExiting, setExiting] = useState(false);
  const router = useRouter();

  const handleClose = useCallback(() => {
    setExiting(true);
    const timeoutId = setTimeout(() => router.push(redirectOnClose), 100);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className={clsx({
      [styles.container]: true,
      [styles.containerAnimOut]: isExiting,
    })}>

      {/* Titlebar */}
      <div className={styles.titleBar}>

        {/* Title */}
        <div className={styles.titleBarLeft}>
          {title}
        </div>

        {/* Controls */}
        <div className={styles.titleBarRight}>
          <button type="button" className={styles.button} onClick={handleClose}>
            <img alt="Close window" src="x.svg" />
          </button>
        </div>

      </div>

      {/* Content */}
      <div className={styles.content}>
        {children}
      </div>

    </div>
  );
}
