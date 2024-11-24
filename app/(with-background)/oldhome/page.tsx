'use client';

import clsx from 'clsx';
import styles from './styles.module.css';
import Marquee from 'react-fast-marquee';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ElementState } from '@/types/types';
import { Sequence, useSequence } from 'use-sequence';

const maxAmtSubTitles = 25;
const numNavItems = 5;

export default function Home() {
  /* Is reduced motion on? */
  const useReducedMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  );
  const marqueeSpeed = useMemo(() => useReducedMotion ? 0 : 10, [useReducedMotion]);

  /* Animation states */
  const [titleTextState, setTitleTextState] = useState<ElementState>('HIDDEN');
  const [amtSubTitles, setAmtSubTitles] = useState(0);
  const [scrollingBinaryState, setScrollingBinaryState] = useState<ElementState>('HIDDEN');
  const [contentContainerState, setContentContainerState] = useState<ElementState>('HIDDEN');
  const [navItemsState, setNavItemsState] = useState(0); // nav items only have an intro anim
  const [bottomDecoState, setBottomDecoState] = useState<ElementState>('HIDDEN');

  /* Router */
  const router = useRouter();

  /* Animation intro */
  const introSequence: Sequence = useMemo(() => [
    { action: () => setTitleTextState('ENTER') },
    { action: () => setAmtSubTitles((prev) => prev + 1), iterations: maxAmtSubTitles, proceedAfter: 5 },
    { action: () => setScrollingBinaryState('ENTER') },
    { action: () => setContentContainerState('ENTER') },
    { action: () => console.log('called') },
    { action: () => setNavItemsState((prev) => prev + 1), iterations: numNavItems, wait: 50 },
    { action: () => setBottomDecoState('ENTER') },
  ], []);

  const [runIntroSequence] = useSequence(introSequence, 50);

  useEffect(runIntroSequence, []);

  /* Animation outro */
  const outroSequence: Sequence = useMemo(() => [
    { action: () => setTitleTextState('EXIT') },
    { action: () => setScrollingBinaryState('EXIT') },
    { action: () => setContentContainerState('EXIT') },
  ], []);

  const [runOutroSequence] = useSequence(outroSequence, 10);

  /* Prefetch links */
  useEffect(() => {
    router.prefetch('/about');
  }, [router]);

  /* Misc */
  const goTo = useCallback((link: string) => {
    runOutroSequence();
    setTimeout(() => router.push(link), 40); // TODO switch to a promise based timeout system
  }, [router, runOutroSequence]);

  const getSubtexts = useCallback(() => {
    return Array(amtSubTitles).fill(<h1>FUDGEU</h1>);
  }, [amtSubTitles]);

  return (
    <main className={styles.main}>
      {/* Title Text */}
      <div className={clsx({
        [styles.titleTextContainer]: true,
        [styles.titleTextContainter_enter]: titleTextState === 'ENTER',
        [styles.titleTextContainer_exit]: titleTextState === 'EXIT',
        [styles.hide]: titleTextState === 'HIDDEN',
      })}>
        <span className={styles.subTitleTextTop}>
          {getSubtexts()}
        </span>
        <div className={styles.mainTitleText}>
          <h1>FUDGEU</h1>
        </div>
        <span className={styles.subTitleTextBottom}>
          {getSubtexts()}
        </span>
      </div>

      {/* Scrolling Binary Text */}
      <div className={clsx({
        [styles.scrollingBinaryContainer]: true,
        [styles.scrollingBinaryContainer_exit]: scrollingBinaryState === 'EXIT',
        [styles.scrollingBinaryContainer_enter]: scrollingBinaryState === 'ENTER',
        [styles.hide]: scrollingBinaryState === 'HIDDEN',
      })}>
        <Marquee autoFill speed={marqueeSpeed} direction="right">011011000110111101101100001000000110011101100101011101000010000001110000011100100110000101101110011010110110010101100100</Marquee>
      </div>

      {/* Content Container */}
      <div className={clsx({
        [styles.contentContainer]: true,
        [styles.contentContainer_exit]: contentContainerState === 'EXIT',
        [styles.hide]: scrollingBinaryState === 'HIDDEN',
      })}>

        {/* Subheader */}
        <div className={clsx({
          [styles.subHeader_enter]: navItemsState >= 1,
          [styles.hide]: navItemsState < 1,
        })}>
          <h2>PATRICK KOSS</h2>
          <div className={styles.subHeaderDecoration}>
            <div className={styles.subHeaderDecorationPiece} />
            <div className={styles.subHeaderDecorationPiece} />
            <div className={styles.subHeaderDecorationPiece} />
          </div>
        </div>

        {/* Description & Nav */}
        <div className={styles.descriptionAndNav}>
          <p className={clsx({
            [styles.description]: true,
            [styles.description_enter]: navItemsState >= 2,
            [styles.hide]: navItemsState < 2,
          })}>
            FULL-STACK DEVELOPER WITH A PASSION TO KEEP LEARNING
          </p>

          {/* Navigation */}
          <nav>
            <ul className={styles.navList}>

              <li className={clsx({
                [styles.navItem]: true,
                [styles.navItem_enter]: navItemsState >= 3,
                [styles.hide]: navItemsState < 3,
              })}>
                <button className={styles.navLink} onClick={() => goTo('/about')}>
                  <span className={styles.navItemArrow}>&gt;</span>
                  <span className={styles.navItemText}>ABOUT ME</span>
                </button>
              </li>

              <li className={clsx({
                [styles.navItem]: true,
                [styles.navItem_enter]: navItemsState >= 4,
                [styles.hide]: navItemsState < 4,
              })}>
                <button className={styles.navLink} onClick={() => goTo('/projects')}>
                  <span className={styles.navItemArrow}>&gt;</span>
                  <span className={styles.navItemText}>PROJECTS</span>
                </button>
              </li>

              <li className={clsx({
                [styles.navItem]: true,
                [styles.navItem_enter]: navItemsState >= 5,
                [styles.hide]: navItemsState < 5,
              })}>
                <button className={styles.navLink} onClick={() => goTo('/contact')}>
                  <span className={styles.navItemArrow}>&gt;</span>
                  <span className={styles.navItemText}>CONTACT</span>
                </button>
              </li>

            </ul>
          </nav>

        </div>
      </div>

      {/* Top Right Decoration */}
      <div className={styles.topRightCornerDecoration}>
        <div className={styles.trCornerDecorationLine}>
          <div className={styles.trCornerDecoRect} />
          <div className={styles.trCornerDecoCircle} />
          <div className={styles.trCornerDecoRect} />
          <div className={styles.trCornerDecoCircle} />
          <div className={styles.trCornerDecoRect} />
          <div className={styles.trCornerDecoCircle} />
          <div className={styles.trCornerDecoRect} />
          <div className={styles.trCornerDecoCircle} />
        </div>

        <div className={styles.trCornerDecorationLineRev}>
          <div className={styles.trCornerDecoRect} />
          <div className={styles.trCornerDecoCircle} />
          <div className={styles.trCornerDecoRect} />
          <div className={styles.trCornerDecoCircle} />
          <div className={styles.trCornerDecoRect} />
          <div className={styles.trCornerDecoCircle} />
          <div className={styles.trCornerDecoRect} />
          <div className={styles.trCornerDecoCircle} />
        </div>

        <div className={styles.trCornerDecorationLine}>
          <div className={styles.trCornerDecoRect} />
          <div className={styles.trCornerDecoCircle} />
          <div className={styles.trCornerDecoRect} />
          <div className={styles.trCornerDecoCircle} />
          <div className={styles.trCornerDecoRect} />
          <div className={styles.trCornerDecoCircle} />
          <div className={styles.trCornerDecoRect} />
          <div className={styles.trCornerDecoCircle} />
        </div>
      </div>

      {/* Bottom Decoration */}
      <div className={clsx({
        [styles.bottomDecoration]: true,
        [styles.bottomDecoration_enter]: bottomDecoState === 'ENTER',
        [styles.hide]: bottomDecoState === 'HIDDEN',
      })}>
        <div className={styles.bottomDecoBox} />
        <div className={styles.bottomDecoBox} />
        <div className={styles.bottomDecoBox} />
        <div className={styles.bottomDecoBox} />
        <div className={styles.bottomDecoBox} />
        <div className={styles.bottomDecoBox} />
        <div className={styles.bottomDecoBox} />
        <div className={styles.bottomDecoBox} />
        <div className={styles.bottomDecoBox} />
        <div className={styles.bottomDecoBox} />
      </div>
    </main>
  );
}
