'use client';

import styles from './styles.module.css';
import {
  CSSProperties, ReactNode, useEffect, useMemo, useRef, useState,
} from 'react';
import Marquee from 'react-fast-marquee';
import { Bounds } from './types';
import GetBackgroundDecoration from '@/app/(page)/contact/BackgroundDecoration';

export default function Contact() {
  /* Background decorations */
  const [backgroundDecorationStyles, setBackgroundDecorationStyles] = useState<CSSProperties[]>([]);
  const allBounds = useRef<Bounds[]>([]);

  /* Content decorations */
  const [contentDecorations, setContentDecorations] = useState<ReactNode[]>([]);

  /* Refs */
  const rootRef = useRef<HTMLDivElement>(null);

  /* Pixel size of 1rem */
  const unitRem = useMemo(() => {
    if (typeof getComputedStyle === 'undefined') return 0; // function does not exist while performing server-sided rendering
    return Number(getComputedStyle(document.documentElement).fontSize.slice(0, -2));
  }, []);

  /* Spawn background decorations */
  useEffect(() => {
    setTimeout(() => {
      // Spawn 25 decorations over a short period of time
      for (let i = 0; i < 25; i++) {
        setTimeout(() => {
          const rootDiv = rootRef.current;
          if (rootDiv == null) return;
          const resultingStyle = GetBackgroundDecoration(
            unitRem,
            allBounds.current,
            (newBounds) => allBounds.current.push(newBounds),
            rootDiv,
          );
          setBackgroundDecorationStyles((prev) => [
            ...prev,
            resultingStyle,
          ]);
        }, (i + 1) * 15);
      }
    }, 350);
  }, []);

  /* Generate content decorations */
  useEffect(() => {
    const calculatedStyles: CSSProperties[] = [
      {
        position: 'absolute',
        width: '8rem',
        height: '3.5rem',
        top: '-1.75rem',
        right: '3rem',
      },
      {
        position: 'absolute',
        width: '10rem',
        height: '3.5rem',
        bottom: '3rem',
        right: '-5rem',
      },
      {
        position: 'absolute',
        width: '12rem',
        height: '3.5rem',
        top: '-2rem',
        left: '-2rem',
      },
      {
        position: 'absolute',
        width: '12rem',
        height: '3.5rem',
        bottom: '-2rem',
        left: '5rem',
      },
    ];

    calculatedStyles.map((style, i) => {
      const decoration = (
        <div key={i} className={styles.floatingBox} style={style}>
          <Marquee autoFill direction="right" speed={20}>
            <img className={styles.marqueeImg} src="/contact/email.svg" alt="" />
          </Marquee>
        </div>
      );
      setTimeout(() => setContentDecorations((prev) => [...prev, decoration]), (i + 1) * 50);
    });
  }, []);

  return (
    <div className={styles.container} ref={rootRef}>
      <Marquee direction="right" speed={15} className={styles.backgroundDecorations}>
        {/* CRT effect, courtesy of greenlemon */}
        <div className={styles.lines}></div>
        {backgroundDecorationStyles.map((resultingStyle, i) => (
          <div key={i} className={styles.floatingBoxBkg} style={resultingStyle}>
            <Marquee autoFill direction="left" speed={10}>
              <img className={styles.marqueeImg} src="/contact/email.svg" alt="" />
            </Marquee>
          </div>
        ))}
      </Marquee>

      <div className={styles.contentContainer}>
        <div className={styles.content}>
          {contentDecorations.map((contentDeco) => contentDeco)}
          <h1>CONTACT</h1>
          <p>
          IF YOU'D LIKE TO REACH OUT TO ME, WHETHER IT'S ABOUT A SPECIFIC REQUEST OR JUST TO TALK,
            YOU CAN REACH ME AT:
          </p>
          <div className={styles.contact}>
            <img src="/contact/discord-logo.svg" alt="Discord" />
            FUDGEU
          </div>
          <div className={styles.contact}>
            <img src="/contact/email.svg" alt="Email" />
            PATRICKKOSS@OUTLOOK.COM
          </div>
        </div>
      </div>
    </div>
  );
}
