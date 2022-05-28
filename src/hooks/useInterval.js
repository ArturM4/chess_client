import { useEffect, useRef } from 'react';

export function useInterval(callback, delay) {
  const savedCallback = useRef();
  const interval = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    return () => clearInterval(interval.current);
  }, []);

  function tick() {
    savedCallback.current();
  }

  function start() {
    if (interval.current)
      clearInterval(interval.current);
    interval.current = setInterval(tick, delay);
  }

  function stop() {
    clearInterval(interval.current);
  }

  return {
    start,
    stop
  }

}
