'use client';

import styles from './styles.module.css';
import Marquee from 'react-fast-marquee';
import { useMemo } from 'react';

export default function Header() {
  /* Is reduced motion on? */
  const useReducedMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  );
  const marqueeSpeed = useMemo(() => useReducedMotion ? 0 : 20, [useReducedMotion]);

  return (
    <div className={styles.header}>
      <Marquee className={styles.bkgMarquee} autoFill speed={marqueeSpeed}>+</Marquee>
      <Marquee className={styles.bkgMarquee} autoFill speed={marqueeSpeed}>+</Marquee>
      <Marquee className={styles.bkgMarquee} autoFill speed={marqueeSpeed}>+</Marquee>
      <Marquee className={styles.bkgMarquee} autoFill speed={marqueeSpeed}>+</Marquee>
      <Marquee className={styles.bkgMarquee} autoFill speed={marqueeSpeed}>+</Marquee>
      <h1 className={styles.headerText}>PROJECTS</h1>
    </div>
  );
}
