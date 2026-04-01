import { useState } from 'react';

export const useSwipe = ({ onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown }) => {
  const [touchStart, setTouchStart] = useState({ x: null, y: null });
  const [touchEnd, setTouchEnd] = useState({ x: null, y: null });

  const minSwipeDistance = 50; 

  const onTouchStart = (e) => {
    setTouchEnd({ x: null, y: null });
    setTouchStart({ 
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  };

  const onTouchMove = (e) => {
    setTouchEnd({ 
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY 
    });
  };

  const onTouchEnd = () => {
    if (!touchStart.x || !touchEnd.x) return;
    
    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    
    // Check if horizontal swipe or vertical swipe is more prominent
    if (Math.abs(distanceX) > Math.abs(distanceY)) {
      // Horizontal
      if (distanceX > minSwipeDistance && onSwipeLeft) {
        onSwipeLeft();
      } else if (distanceX < -minSwipeDistance && onSwipeRight) {
        onSwipeRight();
      }
    } else {
      // Vertical
      if (distanceY > minSwipeDistance && onSwipeUp) {
        onSwipeUp();
      } else if (distanceY < -minSwipeDistance && onSwipeDown) {
        onSwipeDown();
      }
    }
  };

  return { onTouchStart, onTouchMove, onTouchEnd };
};
