import { useEffect, useState } from 'react';

/**
 * Returns the current window scrollY, throttled via rAF, for cheap parallax
 * transforms (e.g. translateY(scrollY * 0.3)). Disabled (always 0) for
 * prefers-reduced-motion users.
 */
export default function useParallax() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return scrollY;
}
