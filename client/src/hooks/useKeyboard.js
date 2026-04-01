import { useEffect } from 'react';

export const useKeyboard = (keyHandlers) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Execute the handler if the key matches
      if (keyHandlers[event.key]) {
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(event.key)) {
          event.preventDefault();
        }
        keyHandlers[event.key]();
      }
    };

    window.addEventListener('keydown', handleKeyDown, { passive: false });
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [keyHandlers]);
};
