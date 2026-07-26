import React, { useMemo } from 'react';

/**
 * Fixed, full-viewport ambient layer: a few blurred glowing orbs that drift
 * slowly, plus faint floating dust particles. Pure CSS animation (no canvas),
 * so it stays cheap on performance. pointer-events: none so it never blocks
 * clicks, and it sits behind all page content via z-index.
 */
export default function AmbientBackground() {
  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: Math.round(Math.random() * 100),
        size: 2 + Math.round(Math.random() * 3),
        duration: 18 + Math.round(Math.random() * 22),
        delay: -Math.round(Math.random() * 30),
        drift: Math.round((Math.random() - 0.5) * 60),
      })),
    []
  );

  return (
    <div className="ambient-bg" aria-hidden="true">
      <div className="ambient-orb ambient-orb--gold" />
      <div className="ambient-orb ambient-orb--red" />
      <div className="ambient-fog" />
      {particles.map((p) => (
        <span
          key={p.id}
          className="ambient-particle"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            '--drift': `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
