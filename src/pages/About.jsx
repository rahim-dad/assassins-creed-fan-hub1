import React from 'react';
import { Typography, Row, Col } from 'antd';

const stack = [
  'React (Vite)', 'Redux Toolkit', 'React Router DOM', 'Ant Design', 'Axios-style data layer', 'LocalStorage persistence',
];

export default function About() {
  return (
    <div className="container section" style={{ maxWidth: 900 }}>
      <div className="eyebrow">About This Project</div>
      <Typography.Title level={2} className="display-heading" style={{ marginTop: 6 }}>The Assassin's Creed Hub</Typography.Title>
      <p style={{ color: 'var(--ac-muted)', fontSize: 16, lineHeight: 1.8 }}>
        Assassin's Creed Hub is a fan-made, frontend-only reference site built to showcase every
        officially released title in the Assassin's Creed franchise, its protagonists, the historical
        eras it recreates, and the real-world settings that ground each story. It is not a game — it's
        a catalogue, timeline, and comparison tool for fans of the series.
      </p>
      <p style={{ color: 'var(--ac-muted)', fontSize: 16, lineHeight: 1.8 }}>
        This is a portfolio project demonstrating a modern, responsive single-page application built
        entirely on the frontend, with no backend server involved. All game and character data is
        sourced from a local dataset rather than a live API.
      </p>

      <Typography.Title level={4} className="display-heading" style={{ marginTop: 40 }}>Built With</Typography.Title>
      <Row gutter={[12, 12]} style={{ marginTop: 12 }}>
        {stack.map((s) => (
          <Col key={s}>
            <div className="panel" style={{ padding: '10px 16px', fontFamily: 'var(--font-mono)', fontSize: 13 }}>{s}</div>
          </Col>
        ))}
      </Row>

      <div className="blade-divider" style={{ margin: '48px 0' }}><span className="blade-notch" /></div>

      <p style={{ color: 'var(--ac-muted)', fontSize: 13 }}>
        Assassin's Creed and all related characters, titles, and imagery are trademarks of Ubisoft
        Entertainment. This site is an unofficial, non-commercial fan project and is not affiliated
        with or endorsed by Ubisoft.
      </p>
    </div>
  );
}
