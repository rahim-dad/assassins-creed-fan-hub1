import React from 'react';
import { Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { timelineEras } from '../data/timeline';
import Reveal from '../components/Reveal';

export default function Timeline() {
  const navigate = useNavigate();
  const ordered = [...timelineEras].sort((a, b) => {
    const parse = (y) => (y.includes('BCE') ? -parseInt(y) : parseInt(y));
    return parse(a.year) - parse(b.year);
  });

  return (
    <div className="container section">
      <Reveal style={{ textAlign: 'center' }}>
        <div className="eyebrow">Centuries Of The Brotherhood</div>
        <Typography.Title level={2} className="display-heading" style={{ marginTop: 6, marginBottom: 48 }}>
          Historical Timeline
        </Typography.Title>
      </Reveal>

      <div className="timeline-rail">
        {ordered.map((t, i) => (
          <Reveal key={t.id} delay={Math.min(i, 8) * 90} direction={i % 2 === 0 ? 'left' : 'right'}>
            <div className="timeline-node panel" style={{ padding: '18px 22px' }} onClick={() => navigate(`/games/${t.gameId}`)}>
              <div className="stat-mono" style={{ color: 'var(--ac-gold)' }}>{t.year}</div>
              <Typography.Title level={4} className="display-heading" style={{ margin: '4px 0' }}>{t.era}</Typography.Title>
              <div style={{ color: 'var(--ac-muted)', fontSize: 14 }}>{t.game}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
