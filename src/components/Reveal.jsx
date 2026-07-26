import React from 'react';
import useInView from '../hooks/useInView';

/**
 * Wraps children in a fade/slide-up reveal that triggers once the element
 * scrolls into the viewport. `delay` (ms) lets siblings stagger.
 */
export default function Reveal({
  children,
  delay = 0,
  direction = 'up',
  as: Tag = 'div',
  style,
  className = '',
  ...rest
}) {
  const [ref, inView] = useInView();

  const distance = 28;
  const transforms = {
    up: `translateY(${distance}px)`,
    left: `translateX(${distance}px)`,
    right: `translateX(-${distance}px)`,
    none: 'none',
  };

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : transforms[direction],
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        willChange: 'opacity, transform',
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
