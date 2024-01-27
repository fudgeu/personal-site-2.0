'use client';
import styles from './styles.module.css';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import clsx from 'clsx';

export default function Warning() {
  const [show, setShow] = useState(true);
  const router = useRouter();

  const onContinue = useCallback(() => {
    setShow(false);
    setTimeout(() => router.push('/'), 500);
  }, [router]);

  return (
    <div className={clsx({
      [styles.container]: true,
      [styles.fadeOut]: !show,
    })}>
      <div className={styles.warningBox}>
        <h1>WARNING</h1>
        <p>
          THIS WEBSITE CONTAINS FAST MOVING ANIMATIONS AND FLASHING VISUALS.
          IF YOU ARE SENSITIVE TO THESE TYPES OF VISUALS, PLEASE ENSURE YOU HAVE
          REDUCED MOTION ENABLED ON YOUR DEVICE.
        </p>
        <button onClick={onContinue}>[ CONTINUE ]</button>
      </div>
    </div>
  );
}
