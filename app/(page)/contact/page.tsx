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
  const backgroundDecCount = useRef(0); // For a slightly more stable component key

  const [contentDecorations, setContentDecorations] = useState<ReactNode[]>([]);

  const rootRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const allBounds = useRef<Bounds[]>([]);

  const iconWidth = useMemo(() => {
    return Number(getComputedStyle(document.documentElement).fontSize.slice(0, -2)) * 12;
  }, []);

  const iconHeight = useMemo(() => {
    return Number(getComputedStyle(document.documentElement).fontSize.slice(0, -2)) * 3.5;
  }, []);

  const generateDecoration = useCallback(() => {
    if (!rootRef.current || !allBounds.current || backgroundDecCount.current == null) return;
    const boundingRect = rootRef.current.getBoundingClientRect();
    const windowBounds: Bounds = {
      x: boundingRect.x - 50,
      y: boundingRect.y - 50,
      eX: boundingRect.right + 50,
      eY: boundingRect.bottom + 50,
    };
    const windowBoundWidth = windowBounds.eX - windowBounds.x;
    const windowBoundHeight = windowBounds.eY - windowBounds.y;

    // Generate random scale and rotation
    const decScale = Math.random() + 0.5;
    const decRotation = Math.random() * 90 - 45;

    // Generate position
    let generationSuccess = false;
    let decXPos = 0;
    let decYPos = 0;
    let decBounds: Bounds = { x: 0, y: 0, eX: 0, eY: 0 };
    for (let i = 0; i < 250; i++) { // failsafe in case random location can't be generated
      decXPos = Math.floor(Math.random() * (windowBoundWidth - iconWidth));
      decYPos = Math.floor(Math.random() * (windowBoundHeight - iconHeight));
      decBounds = {
        x: windowBounds.x + decXPos - 10,
        y: windowBounds.y + decYPos - 10,
        eX: windowBounds.x + decXPos + iconWidth + 10,
        eY: windowBounds.y + decYPos + iconHeight + 10,
      };

      // Check bounds
      if ((decBounds.eX >= windowBounds.eX) || (decBounds.eY >= windowBounds.eY)) {
        continue;
      } else {
        const invalidLocation = allBounds.current.find((bounds) => {
          return !(
            decBounds.x > bounds.eX
            || decBounds.eX < bounds.x
            || decBounds.y > bounds.eY
            || decBounds.eY < bounds.y
          );
        });
        if (invalidLocation) continue;
      }

      // Good position, proceed
      generationSuccess = true;
      break;
    }

    // If generation failed, simply find a place that is within the window
    while (!generationSuccess) {
      return;
      /* decXPos = Math.floor(Math.random() * (boundingRect.width - iconSize));
      decYPos = Math.floor(Math.random() * (boundingRect.height - iconSize));
      decBounds = {
        x: windowBounds.x + decXPos,
        y: windowBounds.y + decYPos,
        eX: windowBounds.x + decXPos + iconSize,
        eY: windowBounds.y + decYPos + iconSize,
      };
      if ((decBounds.eX >= windowBounds.eX) || (decBounds.eY >= windowBounds.eY)) {
        continue;
      } else {
        /* const invalidLocation = !(
          decBounds.x > allBounds.current[0].eX
          || decBounds.eX < allBounds.current[0].x
          || decBounds.y > allBounds.current[0].eY
          || decBounds.eY < allBounds.current[0].y
        );
        const invalidLocation = false;
        if (invalidLocation) continue;
        break;
      } */
    }

    allBounds.current.push(decBounds);

    const containerStyle: CSSProperties = {
      position: 'absolute',
      top: `${decYPos - 50}px`,
      left: `${decXPos - 50}px`,
      width: '12rem',
      height: '3.5rem',
    };

    const iconStyle: CSSProperties = {
      transform: `scale(${decScale}) rotate(${decRotation}deg)`,
    };

    // Randomly pick an icon
    const icon = backgroundIcons[Math.floor(Math.random() * backgroundIcons.length)];
    setBackgroundDecorations((prev) => {
      return [...prev, (
        <div className={styles.floatingBoxBkg} style={containerStyle}>
          <Marquee autoFill direction="left" speed={10}>
            <img className={styles.marqueeImg} src={backgroundIcons[0]} alt="" />
          </Marquee>
        </div>
      )];
    });
    backgroundDecCount.current++;

    /* setTimeout(() => {
      setBackgroundDecorations((prev) => prev.slice(1)); // Destroy a decoration
    }, 5000); */
  }, [iconHeight, iconWidth]);

  // Continuous background decoration generation
  const decorationCreateDestroyLoop = useCallback(() => {
    if (backgroundDecCount.current == null) return;
    if (backgroundDecCount.current >= 150 && backgroundDecCount.current % 2 == 0) {
      setBackgroundDecorations((prev) => prev.slice(1)); // Destroy a decoration
      backgroundDecCount.current++;
    } else {
      generateDecoration();
    }
    console.log(backgroundDecCount.current);
    setTimeout(decorationCreateDestroyLoop, 250);
  }, []);

  const decorationSpawnLoop = useCallback(() => {
    generateDecoration();
    setTimeout(decorationSpawnLoop, 300);
  }, []);

  // Get content bounds
  useEffect(() => {
    setTimeout(() => {
      // allBounds.current.push(contentBounds);
      // decorationCreateDestroyLoop();

      for (let i = 0; i < 25; i++) {
        setTimeout(generateDecoration, (i + 1) * 15);
      }
      // decorationCreateDestroyLoop();
    }, 100);
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
        <div className={styles.floatingBox} style={style}>
          <Marquee autoFill direction="right" speed={20}>
            <img className={styles.marqueeImg} src={backgroundIcons[0]} alt="" />
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
        {backgroundDecorations.map((backgroundDecoration) => backgroundDecoration)}
      </Marquee>

      <div className={styles.contentContainer}>
        <div className={styles.content} ref={contentRef}>
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
