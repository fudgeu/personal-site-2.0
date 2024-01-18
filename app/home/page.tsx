'use client';

import clsx from 'clsx';
import styles from './styles.module.css';
import Marquee from 'react-fast-marquee';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

type SequenceStep = {
  action: () => void,
  iterations?: number,
  wait?: number,
};

enum ElementState {
  HIDDEN,
  ENTER,
  SHOWN,
  EXIT,
};

const maxAmtSubTitles = 7;
const numNavItems = 6;

export default function Home() {
  /* Animation states */
  const [titleTextState, setTitleTextState] = useState(ElementState.HIDDEN);
  const [amtSubTitles, setAmtSubTitles] = useState(0);
  const [scrollingBinaryState, setScrollingBinaryState] = useState(ElementState.HIDDEN);
  const [contentContainerState, setContentContainerState] = useState(ElementState.HIDDEN);
  const [navItemsState, setNavItemsState] = useState(0); // nav items only have an intro anim
  const [topRightDecoState, setTopRightDecoState] = useState(ElementState.HIDDEN);
  const [bottomDecoState, setBottomDecoState] = useState(ElementState.HIDDEN);

  /* Router */
  const router = useRouter();

  /* Animation intro */
  const doSequence = useCallback((sequence: SequenceStep[], defaultWait: number) => {
    if (!sequence[0]) return; // base case
    sequence[0].action();
    if (sequence[0].iterations && sequence[0].iterations > 1) {
      sequence[0].iterations -= 1;
      setTimeout(() => doSequence(sequence, defaultWait), sequence[0].wait || defaultWait);
    } else {
      setTimeout(() => doSequence(sequence.slice(1), defaultWait), sequence[0].wait || defaultWait);
    }
  }, []);

  const introSequence: SequenceStep[] = useMemo(() => [
    { action: () => setTitleTextState(ElementState.ENTER) },
    { action: () => setAmtSubTitles((prev) => prev + 1), iterations: maxAmtSubTitles },
    { action: () => setScrollingBinaryState(ElementState.ENTER) },
    { action: () => setContentContainerState(ElementState.ENTER) },
    { action: () => setNavItemsState((prev) => prev + 1), iterations: numNavItems },
    { action: () => setTopRightDecoState(ElementState.ENTER) },
    { action: () => setBottomDecoState(ElementState.ENTER) },
  ], []);

  useEffect(() => {
    doSequence(introSequence, 50);
  }, []);

  /* Animation outro */
  const outroSequence: SequenceStep[] = useMemo(() => [
    { action: () => setTitleTextState(ElementState.EXIT) },
    { action: () => setScrollingBinaryState(ElementState.EXIT) },
    { action: () => setContentContainerState(ElementState.EXIT) },
  ], []);

  const doExitAnimations = useCallback(() => {
    doSequence(outroSequence, 10);
  }, []);

  /* Prefetch links */
  useEffect(() => {
    router.prefetch('/about');
  }, []);

  /* Misc */
  const goTo = useCallback((link: string) => {
    doExitAnimations();
    setTimeout(() => router.push(link), 40); // TODO switch to a promise based timeout system
  }, []);

  const getSubtexts = useCallback(() => {
    return Array(amtSubTitles).fill(<h1>FUDGEU</h1>);
  }, [amtSubTitles]);

  return (
    <main className={styles.main}>
      {/* Title Text */}
      <div className={clsx({
        [styles.titleTextContainer]: true,
        [styles.titleTextContainter_enter]: titleTextState === ElementState.ENTER,
        [styles.titleTextContainer_exit]: titleTextState === ElementState.EXIT,
        [styles.hide]: titleTextState === ElementState.HIDDEN,
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
        [styles.scrollingBinaryContainer_exit]: scrollingBinaryState === ElementState.EXIT,
        [styles.scrollingBinaryContainer_enter]: scrollingBinaryState === ElementState.ENTER,
        [styles.hide]: scrollingBinaryState === ElementState.HIDDEN,
      })}>
        <Marquee autoFill speed={10} direction="right">011011000110111101101100001000000110011101100101011101000010000001110000011100100110000101101110011010110110010101100100</Marquee>
      </div>

      {/* Content Container */}
      <div className={clsx({
        [styles.contentContainer]: true,
        [styles.contentContainer_enter]: contentContainerState === ElementState.ENTER,
        [styles.contentContainer_exit]: contentContainerState === ElementState.EXIT,
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
            ASPIRING WEB DEVELOPER, GAME DEVELOPER, AND MAYBE MORE?
          </p>

          {/* Navigation */}
          <nav>
            <ul className={styles.navList}>

              <li className={clsx({
                [styles.navItem]: true,
                [styles.navItem_enter]: navItemsState >= 3,
                [styles.hide]: navItemsState < 3,
              })}>
                <a className={styles.navLink} href="rat">
                  <span className={styles.navItemArrow}>&gt;</span><span className={styles.navItemText}>ABOUT ME</span>
                </a>
              </li>

              <li className={clsx({
                [styles.navItem]: true,
                [styles.navItem_enter]: navItemsState >= 4,
                [styles.hide]: navItemsState < 4,
              })}>
                <a className={styles.navLink} href="shadow">
                  <span className={styles.navItemArrow}>&gt;</span><span className={styles.navItemText}>PROJECTS</span>
                </a>
              </li>

              <li className={clsx({
                [styles.navItem]: true,
                [styles.navItem_enter]: navItemsState >= 5,
                [styles.hide]: navItemsState < 5,
              })}>
                <button className={styles.navLink} onClick={() => goTo('/about')}>
                  <span className={styles.navItemArrow}>&gt;</span><span className={styles.navItemText}>EDUCATION</span>
                </button>
              </li>

              <li className={clsx({
                [styles.navItem]: true,
                [styles.navItem_enter]: navItemsState >= 6,
                [styles.hide]: navItemsState < 6,
              })}>
                <button className={styles.navLink} onClick={() => goTo('/about')}>
                  <span className={styles.navItemArrow}>&gt;</span><span className={styles.navItemText}>CONTACT</span>
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

      {/* Bottom Right Decoration */}
      <div className={clsx({
        [styles.brCornerDecoration]: true,
        // [styles.hide]: brCornerDecoState === ElementState.HIDE,
      })}>
        {/* <GLView2 mouseX={mousePos.x} mouseY={mousePos.y} /> */}
      </div>

      {/* Bottom Decoration */}
      <div className={clsx({
        [styles.bottomDecoration]: true,
        [styles.bottomDecoration_enter]: bottomDecoState === ElementState.ENTER,
        [styles.hide]: bottomDecoState === ElementState.HIDDEN,
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

      {/* CRT effect, courtesy of greenlemon */}
      <div className={styles.lines}></div>
    </main>
  );
}
