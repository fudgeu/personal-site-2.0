'use client';

import styles from './styles.module.css';
import {
  CSSProperties, ReactNode, useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import Marquee from 'react-fast-marquee';

const backgroundIcons = [
  '/contact/email.svg',
  '/contact/discord-logo.svg',
];

type Bounds = {
  x: number, y: number, eX: number, eY: number,
};

export default function Contact() {
  const [backgroundDecorations, setBackgroundDecorations] = useState<ReactNode[]>([]);

  const rootRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const allBounds = useRef<Bounds[]>([]);

  const iconSize = useMemo(() => {
    return Number(getComputedStyle(document.documentElement).fontSize.slice(0, -2)) * 3;
  }, []);

  const generateDecoration = useCallback(() => {
    if (!rootRef.current || !allBounds.current) return;

    // Generate size
    const decW = 100 + Math.floor(Math.random() * 50);
    const decH = iconSize * 1.25;

    // Generate position
    let generationSuccess = false;
    let decXPos;
    let decYPos;
    let decBounds: Bounds = { x: 0, y: 0, eX: 0, eY: 0 };
    for (let i = 0; i < 250; i++) { // failsafe in case random location can't be generated
      const boundingRect = rootRef.current.getBoundingClientRect();
      decXPos = Math.floor(Math.random() * (boundingRect.width - iconSize));
      decYPos = Math.floor(Math.random() * (boundingRect.height - iconSize));
      decBounds = {
        x: boundingRect.x + decXPos,
        y: boundingRect.y + decYPos,
        eX: boundingRect.x + decXPos + decW,
        eY: boundingRect.y + decYPos + decH,
      };
      const invalidLocation = allBounds.current.find((bounds) => {
        return !(
          decBounds.x > bounds.eX
          || decBounds.eX < bounds.x
          || decBounds.y > bounds.eY
          || decBounds.eY < bounds.y
        );
      });
      if (invalidLocation) continue;
      else {
        generationSuccess = true;
        break;
      }
    }

    if (!generationSuccess) console.warn('Generation failed, failsafe activated');

    allBounds.current.push(decBounds);

    const resultingStyle: CSSProperties = {
      width: `${decW}px`,
      height: `${decH}px`,
      position: 'absolute',
      top: `${decYPos}px`,
      left: `${decXPos}px`,
    };

    // Randomly pick an icon
    const icon = backgroundIcons[Math.floor(Math.random() * backgroundIcons.length)];
    setBackgroundDecorations((prev) => {
      return [...prev, (
        <div className={styles.floatingBox} style={resultingStyle}>
          <Marquee className={styles.marquee} speed={20} autoFill direction="right"><img src={icon} alt="" /></Marquee>
        </div>
      )];
    });
  }, [iconSize]);

  // Get content bounds
  useEffect(() => {
    setTimeout(() => {
      if (!contentRef.current) return;
      const boundingBox = contentRef.current.getBoundingClientRect();
      const contentBounds = {
        x: boundingBox.x,
        y: boundingBox.y,
        eX: boundingBox.x + boundingBox.width,
        eY: boundingBox.y + boundingBox.height,
      };
      allBounds.current.push(contentBounds);

      for (let i = 0; i < 100; i++) {
        setTimeout(() => generateDecoration(), (i + 1) * 20);
      }
    }, 100);
  }, []);

  return (
    <div className={styles.container} ref={rootRef}>
      {backgroundDecorations.map((backgroundDecoration) => backgroundDecoration)}

      <div className={styles.contentContainer}>
        <div className={styles.content} ref={contentRef}>
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
