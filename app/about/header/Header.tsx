'use client';

import styles from './styles.module.css';
import { useCallback } from 'react';
import Marquee from 'react-fast-marquee';

export default function Header() {
  const generateHeader = useCallback(() => {
    // TODO remove constant, make dynamic to screen size
    const array = Array(15);
    for (let i = 0; i < 15; i++) {
      const dir = (i % 2 == 0) ? 'left' : 'right';
      array[i] = <Marquee className={styles.marquee} autoFill speed={20} direction={dir}><h1>ABOUT ME&nbsp;</h1></Marquee>;
    }
    return array;
  }, []);

  return (
    <div className={styles.header}>
      {generateHeader()}
      <Marquee className={styles.marqueeFilled} autoFill speed={20} direction='right'><h1>ABOUT ME&nbsp;</h1></Marquee>
      {generateHeader()}
    </div>
  );
}
