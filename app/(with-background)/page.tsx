'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles.module.css';
import clsx from 'clsx';
import { Sequence, useSequence } from 'use-sequence';
import { ElementState } from '@/types/types';

export default function TestPage() {
  const [textList, setTextList] = useState<string[]>([]);
  const [useGreen, setUseGreen] = useState(false);
  const [terminalState, setTerminalState] = useState<ElementState>('SHOWN');

  const router = useRouter();

  // Redirect to warning page if first time visiting
  useEffect(() => {
    if (localStorage.getItem('firstVisit') == null) {
      router.push('/warning');
    }
  }, [router]);

  // loading animations
  const addTerminalText = useCallback((text: string) => {
    setTextList((prev) => [...prev, text]);
  }, []);

  const appendTerminalText = useCallback((text: string) => {
    setTextList((prev) => {
      return [...prev.slice(0, -1), prev.slice(-1)[0] + text];
    });
  }, []);

  const introSequence: Sequence = useMemo(() => [
    { action: () => addTerminalText('RUNNING MEMORY TEST...'), wait: 100 },
    { action: () => addTerminalText('MEMORY TEST OK') },
    { action: () => addTerminalText('KEYBOARD OK') },
    { action: () => addTerminalText('INITIALIZING HYPER-RAM DRIVE...') },
    { action: () => addTerminalText('INITIALIZING QUANTUM TUNNELING DEVICE...') },
    { action: () => addTerminalText('INITIALIZING 4D GRAPHICS DEVICE...'), wait: 150 },
    { action: () => setUseGreen(true), wait: 0 },
    { action: () => addTerminalText('GRAPHICS DEVICE LOADED. ADJUSTING COLOR PALETTE.') },
    { action: () => addTerminalText('BEGINNING OPERATING SYSTEM LOAD'), wait: 150 },
    { action: () => addTerminalText('LOADED ULTRA PROCESS MANAGER'), wait: 20 },
    { action: () => addTerminalText('LOADED USER META-SYSTEM'), wait: 20 },
    { action: () => addTerminalText('LOADED HYPER-RESOURCE ALLOCATOR'), wait: 20 },
    { action: () => addTerminalText('LOADED GENETIC LIFEFORM AND DISK OPERATING SYSTEM'), wait: 20 },
    { action: () => addTerminalText('OPERATING SYSTEM LOAD COMPLETE'), wait: 250 },
    { action: () => addTerminalText(' '), wait: 250 },
    { action: () => addTerminalText(' ________ ___  ___  ________  ________  _______   ___  ___          ________  ________'), wait: 10 },
    { action: () => addTerminalText('|\\  _____\\\\  \\|\\  \\|\\   ___ \\|\\   ____\\|\\  ___ \\ |\\  \\|\\  \\        |\\   __  \\|\\   ____\\'), wait: 10 },
    { action: () => addTerminalText('\\ \\  \\__/\\ \\  \\\\\\  \\ \\  \\_|\\ \\ \\  \\___|\\ \\   __/|\\ \\  \\\\\\  \\       \\ \\  \\|\\  \\ \\  \\___|_'), wait: 10 },
    { action: () => addTerminalText(' \\ \\   __\\\\ \\  \\\\\\  \\ \\  \\ \\\\ \\ \\  \\  __\\ \\  \\_|/_\\ \\  \\\\\\  \\       \\ \\  \\\\\\  \\ \\_____  \\'), wait: 10 },
    { action: () => addTerminalText('  \\ \\  \\_| \\ \\  \\\\\\  \\ \\  \\_\\\\ \\ \\  \\|\\  \\ \\  \\_|\\ \\ \\  \\\\\\  \\       \\ \\  \\\\\\  \\|____|\\  \\'), wait: 50 },
    { action: () => addTerminalText('   \\ \\__\\   \\ \\_______\\ \\_______\\ \\_______\\ \\_______\\ \\_______\\       \\ \\_______\\____\\_\\  \\'), wait: 10 },
    { action: () => addTerminalText('    \\|__|    \\|_______|\\|_______|\\|_______|\\|_______|\\|_______|        \\|_______|\\_________\\'), wait: 10 },
    { action: () => addTerminalText('                                                                                \\|_________|'), wait: 10 },
    { action: () => addTerminalText('                                                                                 VERSION 1.2'), wait: 10 },
    { action: () => addTerminalText(' '), wait: 100 },
    { action: () => addTerminalText('[!] LOGGING IN USER'), wait: 20 },
    { action: () => addTerminalText('[!] LOGGED IN AS: GUEST'), wait: 70 },
    { action: () => addTerminalText('[!] LOADING USER PREFERENCES'), wait: 20 },
    { action: () => addTerminalText('[!] PREPARING ENVIRONMENT'), wait: 20 },
    { action: () => addTerminalText('[!] CREATING SYMBIOTIC LINK'), wait: 20 },
    { action: () => addTerminalText('[!] LOADING HYPER-REALITY DESKTOP'), wait: 750 },
    { action: () => appendTerminalText('.'), wait: 750, iterations: 3 },
    { action: () => setTerminalState('EXIT'), wait: 1250 },
    { action: () => router.push('home') },
  ], []);

  const [runSequence, cancelSequence] = useSequence(introSequence, 50);

  useEffect(() => {
    runSequence();
    return cancelSequence;
  }, []);

  return (
    <main className={clsx({
      [styles.main]: true,
      [styles.greenText]: useGreen,
    })}
    >

      {/* Intro Code Text */}
      <div className={clsx({
        [styles.terminalContainer]: true,
        [styles.hidden]: terminalState == 'HIDDEN',
        [styles.terminalContainer_exit]: terminalState == 'EXIT',
      })}
      >
        {textList.map((val, index) => {
          return (<pre key={index}>{val}</pre>);
        })}
      </div>

      {/* CRT effect, courtesy of greenlemon */}
      <div className={styles.lines} />

    </main>
  );
}
