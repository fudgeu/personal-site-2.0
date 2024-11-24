'use client';

import styles from './styles.module.css';
import Window from '@/app/components/window/Window';
import clsx from 'clsx';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ElementState } from '@/types/types';
import { Sequence, useSequence } from 'use-sequence';
import Icon from '@/app/components/icon/Icon';
import { useRouter } from 'next/navigation';

const maxAmtSubTitles = 5;
const subTextChoices = [
  ', AVID TYPE SAFETY ADVOCATE',
  ', MAYBE SOME UNITY TOO',
  ', MINECRAFT MODS TOO',
  ' MAKING PRETTY COOL UIS',
  ' MAKING PRETTY COOL THINGS',
];

export default function NewHome() {
  const router = useRouter();

  const [titleTextState, setTitleTextState] = useState<ElementState>('HIDDEN');
  const [amtSubTitles, setAmtSubTitles] = useState(0);

  /* Animation state */
  const [exitStates, setExitStates] = useState({
    titleWindow: false,
    infoWindow: false,
    aboutIcon: false,
    projectsIcon: false,
    contactIcon: false,
  });

  const subText = useMemo(() => subTextChoices[Math.floor(Math.random() * subTextChoices.length)], []);

  const introSequence: Sequence = useMemo(() => [
    { action: () => setTitleTextState('ENTER') },
    { action: () => setAmtSubTitles((prev) => prev + 1), iterations: maxAmtSubTitles, proceedAfter: 5 },
  ], []);

  const [runIntroSequence] = useSequence(introSequence, 50);
  useEffect(runIntroSequence, []);

  const getSubtexts = useCallback(() => {
    return Array(amtSubTitles).fill(<h1>FUDGEU</h1>);
  }, [amtSubTitles]);

  /* Exit animation */
  const goToWithExitAnim = useCallback((goTo: string) => {
    setExitStates((e) => {
      return { ...e, titleWindow: true };
    });
    setTimeout(() => setExitStates((e) => {
      return { ...e, infoWindow: true };
    }), 50);
    setTimeout(() => setExitStates((e) => {
      return { ...e, aboutIcon: true };
    }), 100);
    setTimeout(() => setExitStates((e) => {
      return { ...e, projectsIcon: true };
    }), 125);
    setTimeout(() => setExitStates((e) => {
      return { ...e, contactIcon: true };
    }), 150);

    setTimeout(() => router.push(goTo), 175);
  }, [router]);

  /* Prefetch links */
  useEffect(() => {
    router.prefetch('/about');
    router.prefetch('/projects');
    router.prefetch('/contact');
  }, [router]);

  return (
    <div className={styles.page}>
      <Window
        title="TITLE CARD"
        width={35}
        height={30}
        allowClose={false}
        doExit={exitStates.titleWindow}
      >
        <div className={styles.homeContainer}>

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

        </div>
      </Window>

      <div className={styles.infoContainer}>
        <Window
          title="INFO"
          width={25}
          height={14}
          allowClose={false}
          delayIntro={150}
          doExit={exitStates.infoWindow}
        >
          <div className={styles.info}>
            <h2>AKA PATRICK KOSS</h2>
            <p>{`FULL-STACK DEVELOPER${subText}`}</p>
          </div>
        </Window>
      </div>

      <div className={styles.icons}>
        <div className={styles.icon1}>
          <Icon
            icon="about.svg"
            label="ABOUT ME"
            onClick={() => goToWithExitAnim('/about')}
            delayIntro={300}
            doExit={exitStates.aboutIcon}
          />
        </div>
        <div className={styles.icon2}>
          <Icon
            icon="projects.svg"
            label="PROJECTS"
            onClick={() => goToWithExitAnim('/projects')}
            delayIntro={350}
            doExit={exitStates.projectsIcon}
          />
        </div>
        <div className={styles.icon3}>
          <Icon
            icon="mail.svg"
            label="CONTACT"
            onClick={() => goToWithExitAnim('/contact')}
            delayIntro={400}
            doExit={exitStates.contactIcon}
          />
        </div>

      </div>

    </div>
  );
}
