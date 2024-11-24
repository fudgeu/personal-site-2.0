'use client';

import styles from './styles.module.css';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

type WindowProps = {
  children: ReactNode,
  title: string,
  redirectOnClose?: string,
  width?: number,
  height?: number,
  allowClose?: boolean,
  delayIntro?: number,
  doExit?: boolean,
};

export default function Window(
  { children, title, redirectOnClose = '', width = 70, height = 50, allowClose = true, delayIntro = 0, doExit = false }: WindowProps,
) {
  const [show, setShow] = useState(false);
  const [isExiting, setExiting] = useState(false);
  const router = useRouter();

  const handleClose = useCallback(() => {
    setExiting(true);
    const timeoutId = setTimeout(() => router.push(redirectOnClose), 100);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    setTimeout(() => setShow(true), delayIntro);
  }, []);

  // Force exit animation via prop
  useEffect(() => {
    if (doExit && !isExiting) {
      setExiting(true);
    }
  }, [doExit, isExiting]);

  return (
    <div
      className={clsx({
        [styles.container]: true,
        [styles.containerShow]: show,
        [styles.containerAnimOut]: isExiting,
      })}
      style={{ width: `${width}rem`, height: `${height}rem` }}
    >

      {/* Titlebar */}
      <div className={styles.titleBar}>
        {/* Title */}
        <div className={styles.titleBarLeft}>
          {title}
        </div>

        {/* Controls */}
        <div className={styles.titleBarRight}>
          {allowClose && (
            <button type="button" className={styles.button} onClick={handleClose}>
              <img alt="Close window" src="x.svg" />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {children}
      </div>

    </div>
  );
}
