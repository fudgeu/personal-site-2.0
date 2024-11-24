'use client';

import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

interface IconProps {
  icon: string,
  label: string,
  onClick: () => void,
  delayIntro?: number,
  doExit?: boolean,
}

export default function Icon({ icon, label, onClick, delayIntro = 0, doExit = false }: IconProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), delayIntro);
  }, []);

  return (
    <button
      className={styles.iconContainer}
      onClick={onClick}
    >
      <div
        className={clsx({
          [styles.icon]: true,
          [styles.iconShow]: show,
          [styles.iconExit]: doExit,
        })}
      >
        <img draggable={false} className={styles.iconImg} src={icon} alt="" />
        <img draggable={false} className={styles.linkIcon} src="link.png" alt="" />
        <span className={styles.text}>
          {label}
        </span>
      </div>
    </button>
  );
}
