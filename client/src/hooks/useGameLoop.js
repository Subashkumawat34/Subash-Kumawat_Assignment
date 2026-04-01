import { useEffect, useRef } from 'react';

// A generic hook that sets up an interval and clears it
export const useGameLoop = (callback, delay, isRunning) => {
  const savedCallback = useRef();

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval
  useEffect(() => {
    if (!isRunning || delay === null) {
      return;
    }

    const tick = () => {
      savedCallback.current();
    };

    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay, isRunning]);
};
