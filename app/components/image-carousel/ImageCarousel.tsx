'use client';

import styles from './styles.module.css';
import { useCallback, useState } from 'react';
import clsx from 'clsx';

type ImageCarouselProps = {
  images: string[],
  alts: string[],
};

export default function ImageCarousel({ images, alts }: ImageCarouselProps) {
  const [curImage, setCurImage] = useState(0);
  const [lastMove, setLastMove] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const advanceImageBy = useCallback((amt: number) => {
    const newImage = Math.max(0, Math.min(images.length - 1, curImage + amt));
    if (newImage === curImage) return;
    setCurImage(newImage);
    setLastMove(0);
    setTimeout(() => setLastMove(amt), 10);
  }, [curImage, images.length]);

  if (images.length === 0) return []; // Don't render anything if no images

  return (
    <div className={styles.container}>

      <div className={styles.imageAndButtons}>
        <div className={styles.leftButtonContainer}>
          <button className={styles.button} role="button" onClick={() => advanceImageBy(-1)}>&lt;</button>
        </div>
        <img
          className={clsx({
            [styles.image]: lastMove === 0,
            [styles.imageMovedRight]: lastMove > 0,
            [styles.imageMovedLeft]: lastMove < 0,
          })}
          src={images[curImage]}
          alt={alts[curImage]}
          onClick={() => setIsFullscreen(true)}
        />
        <div className={styles.rightButtonContainer}>
          <button className={styles.button} role="button" onClick={() => advanceImageBy(1)}>&gt;</button>
        </div>
      </div>

      <div className={styles.counterContainer}>
        {images.map((_img, i) => <div className={i === curImage ? styles.counterActive : styles.counter} />)}
      </div>

      {/* Fullscreen */}
      {isFullscreen && (
        <div
          className={styles.fullscreen}
          onClick={() => setIsFullscreen(false)}
          role="dialog"
          aria-label="Fullscreen Image Popup"
          aria-modal={true}
        >
          <img className={styles.fullscreenImage} src={images[curImage]} alt={alts[curImage]} />
          <button
            className={styles.fullscreenExitButton}
            role="button"
            onClick={() => setIsFullscreen(false)}
          >
            x
          </button>
        </div>
      )}
    </div>
  );
}
