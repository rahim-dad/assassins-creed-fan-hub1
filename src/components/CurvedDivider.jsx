import React from 'react';

/**
 * A soft curved wave divider used between sections instead of a flat line,
 * per the "Section Separators" spec. `flip` mirrors it vertically so it can
 * open or close a section naturally.
 */
export default function CurvedDivider({ flip = false }) {
  return (
    <div
      aria-hidden="true"
      style={{
        lineHeight: 0,
        transform: flip ? 'scaleY(-1)' : 'none',
        marginTop: flip ? 0 : -1,
      }}
    >
      <svg viewBox="0 0 1200 80" preserveAspectRatio="none" style={{ width: '100%', height: 64, display: 'block' }}>
        <path
          d="M0,40 C 200,80 400,0 600,30 C 800,60 1000,10 1200,40 L1200,80 L0,80 Z"
          fill="var(--ac-panel)"
          opacity="0.5"
        />
        <path
          d="M0,50 C 220,10 420,70 620,40 C 820,15 1020,65 1200,30"
          fill="none"
          stroke="var(--ac-gold)"
          strokeOpacity="0.25"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}
