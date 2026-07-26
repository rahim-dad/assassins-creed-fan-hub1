import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumb, Typography, Skeleton, Row, Col, Tag, Avatar, Button } from 'antd';
import { UserOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { fetchCharacters } from '../store/slices/charactersSlice';
import ErrorState from '../components/ErrorState';
import NotFound from './NotFound';

export default function CharacterDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items: characters, status, error } = useSelector((s) => s.characters);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchCharacters());
  }, [status, dispatch]);

  if (status === 'loading' || status === 'idle') {
    return <div className="container section"><Skeleton active avatar paragraph={{ rows: 6 }} /></div>;
  }
  if (status === 'failed') return <ErrorState message={error} onRetry={() => dispatch(fetchCharacters())} />;

  const character = characters.find((c) => c.id === id);
  if (!character) return <NotFound />;

  return (
    <div className="container section">
      <Breadcrumb
        items={[{ title: <Link to="/">Home</Link> }, { title: <Link to="/characters">Characters</Link> }, { title: character.name }]}
        style={{ marginBottom: 20 }}
      />
      <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} style={{ marginBottom: 20 }}>Back</Button>

      <Row gutter={[40, 32]}>
        <Col xs={24} md={8} style={{ textAlign: 'center' }}>
          <Avatar
            size={160}
            icon={<UserOutlined />}
            style={{ background: `linear-gradient(155deg, ${character.accent}99, #101013)`, border: `2px solid ${character.accent}` }}
          />
          <Typography.Title level={3} className="display-heading" style={{ marginTop: 20 }}>{character.name}</Typography.Title>
          <div className="tag-era">{character.era}</div>
        </Col>
        <Col xs={24} md={16}>
          <Section title="Biography">{character.bio}</Section>
          <Section title="Game Appearances">
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {character.games.map((g) => <Tag key={g} style={{ background: 'var(--ac-panel-2)', border: 'none', color: 'var(--ac-white)', padding: '4px 10px' }}>{g}</Tag>)}
            </div>
          </Section>
          <Row gutter={24}>
            <Col xs={24} sm={12}>
              <Section title="Weapons">
                <ul style={{ paddingLeft: 18, lineHeight: 2, color: 'var(--ac-muted)' }}>
                  {character.weapons.map((w) => <li key={w}>{w}</li>)}
                </ul>
              </Section>
            </Col>
            <Col xs={24} sm={12}>
              <Section title="Abilities">
                <ul style={{ paddingLeft: 18, lineHeight: 2, color: 'var(--ac-muted)' }}>
                  {character.abilities.map((a) => <li key={a}>{a}</li>)}
                </ul>
              </Section>
            </Col>
          </Row>
          <Section title="Gallery">
            <Row gutter={[12, 12]}>
              {[1, 2, 3].map((n) => (
                <Col xs={8} key={n}>
                  <div style={{ aspectRatio: '3/4', borderRadius: 4, border: '1px solid var(--ac-line)', background: `linear-gradient(${60 * n}deg, ${character.accent}44, #0c0c0e)` }} />
                </Col>
              ))}
            </Row>
          </Section>
        </Col>
      </Row>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <Typography.Title level={5} className="display-heading">{title}</Typography.Title>
      <div style={{ color: 'var(--ac-muted)', lineHeight: 1.7 }}>{children}</div>
    </div>
  );
}
