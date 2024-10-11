'use client';

import styles from './styles.module.css';
import Window from '@/app/components/window/Window';
import clsx from 'clsx';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ElementState } from '@/types/types';
import { Sequence, useSequence } from 'use-sequence';

const maxAmtSubTitles = 25;

export default function NewHome() {
  const [titleTextState, setTitleTextState] = useState<ElementState>('HIDDEN');
  const [amtSubTitles, setAmtSubTitles] = useState(0);

  const introSequence: Sequence = useMemo(() => [
    { action: () => setTitleTextState('ENTER') },
    { action: () => setAmtSubTitles((prev) => prev + 1), iterations: maxAmtSubTitles, proceedAfter: 5 },
  ], []);

  const [runIntroSequence] = useSequence(introSequence, 50);
  useEffect(runIntroSequence, []);

  const getSubtexts = useCallback(() => {
    return Array(amtSubTitles).fill(<h1>FUDGEU</h1>);
  }, [amtSubTitles]);

  return (
    <div className={styles.page}>
      <Window title="TITLE CARD" redirectOnClose="" width={35} height={30} allowClose={false}>
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
        <Window title="INFO" redirectOnClose="" width={25} height={14} allowClose={false}>
          <div className={styles.info}>
            <h2>AKA PATRICK KOSS</h2>
            <p>FULL-STACK DEVELOPER WITH A PASSION TO KEEP LEARNING</p>
          </div>
        </Window>
      </div>

    </div>
  );
}
