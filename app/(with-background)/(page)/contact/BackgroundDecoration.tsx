'use client';
import { Bounds } from './types';
import { CSSProperties } from 'react';

export default function GetBackgroundDecoration(
  unitRem: number,
  allBounds: Bounds[],
  // eslint-disable-next-line no-unused-vars
  addBounds: (newBounds: Bounds) => void,
  rootDiv: HTMLDivElement,
): CSSProperties {
  const boundingRect = rootDiv.getBoundingClientRect();
  const windowBounds: Bounds = {
    x: boundingRect.x,
    y: boundingRect.y - 50, // Add some extra space above and below the window
    eX: boundingRect.right,
    eY: boundingRect.bottom + 50,
  };
  const windowBoundWidth = windowBounds.eX - windowBounds.x;
  const windowBoundHeight = windowBounds.eY - windowBounds.y;

  // Generate size
  const boxWidth = Math.floor(Math.random() * 4 + 8);
  const boxWidthPx = unitRem * boxWidth;
  const boxHeight = 3.5;
  const boxHeightPx = unitRem * boxHeight;

  // Generate position
  let t = false;
  let decXPos = 0;
  let decYPos = 0;
  let decBounds: Bounds = { x: 0, y: 0, eX: 0, eY: 0 };
  for (let i = 0; i < 1000; i++) { // failsafe in case random location can't be generated
    decXPos = Math.floor(Math.random() * (windowBoundWidth - boxWidthPx));
    decYPos = Math.floor(Math.random() * (windowBoundHeight - boxHeightPx));
    decBounds = {
      x: windowBounds.x + decXPos - 10, // 10 represents extra padding around the boxes
      y: windowBounds.y + decYPos - 10,
      eX: windowBounds.x + decXPos + boxWidthPx + 10,
      eY: windowBounds.y + decYPos + boxHeightPx + 10,
    };

    // Check bounds
    if ((decBounds.eX >= windowBounds.eX) || (decBounds.eY >= windowBounds.eY)) { // Check if not within window
      continue;
    } else { // Check if within another decoration
      const invalidLocation = allBounds.find((bounds) => {
        return !(
          decBounds.x > bounds.eX
          || decBounds.eX < bounds.x
          || decBounds.y > bounds.eY
          || decBounds.eY < bounds.y
        );
      });
      if (invalidLocation) continue;
    }

    // If this point is reached, all checks have passed and the decoration is good.
    t = true;
    break;
  }

  // Add this decoration bounds to the list of all bounds
  addBounds(decBounds);

  // Create CSS properties for the decoration
  const containerStyle: CSSProperties = {
    position: 'absolute',
    top: `${decYPos - 50}px`,
    left: `${decXPos}px`,
    width: `${boxWidth}rem`,
    height: `${boxHeight}rem`,
  };

  return containerStyle;
}
