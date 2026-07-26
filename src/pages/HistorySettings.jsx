import React from 'react';
import { Row, Col, Typography } from 'antd';
import { historicalSettings } from '../data/settings';

export default function HistorySettings() {
  return (
    <div className="container section">
      <div className="eyebrow">Worlds Recreated In The Animus</div>
      <Typography.Title level={2} className="display-heading" style={{ marginTop: 6, marginBottom: 32 }}>
        Historical Settings
      </Typography.Title>

      <Row gutter={[20, 20]}>
        {historicalSettings.map((s) => (
          <Col xs={24} sm={12} lg={8} key={s.id}>
            <div className="panel" style={{ overflow: 'hidden', height: '100%' }}>
              <div style={{
                height: 140, background: `linear-gradient(155deg, ${s.accent}66, #0c0c0e)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-display)', fontSize: 18, textAlign: 'center', padding: 16,
              }}>
                {s.name}
              </div>
              <div style={{ padding: 18 }}>
                <div className="stat-mono" style={{ color: 'var(--ac-gold)', marginBottom: 6 }}>{s.period}</div>
                <p style={{ color: 'var(--ac-muted)', fontSize: 14, lineHeight: 1.6, minHeight: 66 }}>{s.description}</p>
                <div style={{ borderTop: '1px solid var(--ac-line)', paddingTop: 10, fontSize: 13 }}>
                  Featured in <strong style={{ color: 'var(--ac-white)' }}>{s.game}</strong>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}
