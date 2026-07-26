import React, { useEffect, useRef, useState } from 'react';
import useInView from '../hooks/useInView';

/**
 * Counts up from 0 to `value` once visible, using an eased requestAnimationFrame
 * loop (no extra dependency needed).
 */
export default function AnimatedNumber({ value, duration = 1400, suffix = '+', style }) {
  const [ref, inView] = useInView();
  const [display, setDisplay] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;

    const start = performance.now();
    const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    let frame;
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = easeOutExpo(progress);
      setDisplay(Math.round(eased * value));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setDisplay(value);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration]);

  return (
    <span ref={ref} style={style}>
      {display}
      {suffix}
    </span>
  );
}
