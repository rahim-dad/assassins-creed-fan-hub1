import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Tag, Breadcrumb, Typography, Skeleton, Row, Col, Divider } from 'antd';
import { ArrowLeftOutlined, StarFilled, HeartOutlined, HeartFilled, PlayCircleOutlined } from '@ant-design/icons';
import { fetchGames } from '../store/slices/gamesSlice';
import { toggleFavorite } from '../store/slices/favoritesSlice';
import ErrorState from '../components/ErrorState';
import NotFound from './NotFound';
import Reveal from '../components/Reveal';
import GameCard from '../components/GameCard';
import CharacterCard from '../components/CharacterCard';
import spawnRipple from '../utils/spawnRipple';
import { characters } from '../data/characters';
import { historicalSettings } from '../data/settings';

export default function GameDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items: games, status, error } = useSelector((s) => s.games);
  const favoriteIds = useSelector((s) => s.favorites.ids);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchGames());
  }, [status, dispatch]);

  if (status === 'loading' || status === 'idle') {
    return <div className="container section"><Skeleton active paragraph={{ rows: 8 }} /></div>;
  }
  if (status === 'failed') {
    return <ErrorState message={error} onRetry={() => dispatch(fetchGames())} />;
  }

  const game = games.find((g) => g.id === id);
  if (!game) return <NotFound />;

  const isFavorite = favoriteIds.includes(game.id);

  const relatedGames = games
    .filter((g) => g.id !== game.id && (g.era === game.era || g.genre === game.genre))
    .slice(0, 6);

  const mainCharacter = characters.find(
    (c) => c.name === game.mainCharacter || game.mainCharacter?.includes(c.name.split(' ')[0])
  );

  const setting = historicalSettings.find((s) => s.game === game.title);

  return (
    <div className="container section">
      <Breadcrumb
        items={[{ title: <Link to="/">Home</Link> }, { title: <Link to="/games">Games</Link> }, { title: game.title }]}
        style={{ marginBottom: 20 }}
      />

      <div
      className="panel"
      style={{
        padding: '48px 32px',
        backgroundImage: `linear-gradient(155deg, ${game.accent}CC 0%, #0f0f12 70%), url('https://source.unsplash.com/random/1200x600?sig=${game.title}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        marginBottom: 32,
        position: 'relative',
      }}
      >
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} style={{ marginBottom: 20 }}>
          Back
        </Button>
        <Row gutter={[32, 24]} align="middle">
          <Col xs={24} md={8}>
            <div style={{
              aspectRatio: '3/4', borderRadius: 6, border: `1px solid ${game.accent}`,
              background: `linear-gradient(160deg, ${game.accent}77, #0c0c0e)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 20,
              fontFamily: 'var(--font-display)', fontSize: 22, color: '#fff',
            }}>
              {game.title}
            </div>
          </Col>
          <Col xs={24} md={16}>
            <span className="tag-era">{game.era}</span>
            <Typography.Title level={1} className="display-heading" style={{ margin: '10px 0' }}>{game.title}</Typography.Title>
            <p style={{ color: 'var(--ac-muted)', fontSize: 16, maxWidth: 620 }}>{game.description}</p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', margin: '16px 0' }}>
              <Button className="btn-primary" icon={isFavorite ? <HeartFilled /> : <HeartOutlined />} onMouseDown={spawnRipple} onClick={() => dispatch(toggleFavorite(game.id))}>
                {isFavorite ? 'Saved to Favorites' : 'Add to Favorites'}
              </Button>
              <Button className="btn-ghost" onMouseDown={spawnRipple} onClick={() => navigate('/compare')}>Compare This Game</Button>
            </div>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginTop: 10 }}>
              <Stat label="Rating" value={<span><StarFilled style={{ color: 'var(--ac-gold)' }} /> {game.rating}</span>} />
              <Stat label="Release" value={game.year} />
              <Stat label="Genre" value={game.genre} />
              <Stat label="Main Character" value={game.mainCharacter} />
            </div>
          </Col>
        </Row>
      </div>

      <Row gutter={[32, 32]}>
        <Col xs={24} md={16}>
          <Section title="Story Summary">{game.story}</Section>

          <Section title="Key Features">
            <ul style={{ color: 'var(--ac-muted)', lineHeight: 2, paddingLeft: 20 }}>
              {game.features.map((f) => <li key={f}>{f}</li>)}
            </ul>
          </Section>

          <Section title="Screenshots Gallery">
            <Row gutter={[12, 12]}>
              {[1, 2, 3, 4].map((n) => (
                <Col xs={12} sm={6} key={n}>
                  <div style={{
                    aspectRatio: '16/9', borderRadius: 4, border: '1px solid var(--ac-line)',
                    background: `url('https://source.unsplash.com/random/600x400?sig=${game.title}${n}') center/cover`,
                  }} />
                </Col>
              ))}
            </Row>
          </Section>

          <Section title="Official Trailer">
            <div className="panel" style={{ padding: 40, textAlign: 'center', color: 'var(--ac-muted)' }}>
              <PlayCircleOutlined style={{ fontSize: 40, color: 'var(--ac-gold)', marginBottom: 12, display: 'block', margin: '0 auto 12px' }} />
              Trailer preview unavailable in this demo build.
            </div>
          </Section>

          {setting && (
            <Section title="Historical Setting">
              <Reveal className="panel" style={{ padding: '20px 24px' }}>
                <div className="eyebrow" style={{ marginBottom: 6 }}>{setting.name} · {setting.period}</div>
                <p style={{ margin: 0 }}>{setting.description}</p>
              </Reveal>
            </Section>
          )}

          {mainCharacter && (
            <Section title="Protagonist">
              <Reveal style={{ maxWidth: 220 }}>
                <CharacterCard character={mainCharacter} />
              </Reveal>
            </Section>
          )}
        </Col>

        <Col xs={24} md={8}>
          <div className="panel" style={{ padding: 24 }}>
            <Typography.Title level={5} style={{ color: 'var(--ac-gold)', marginTop: 0 }}>Details</Typography.Title>
            <DetailRow label="Developer" value={game.developer} />
            <DetailRow label="Publisher" value={game.publisher} />
            <DetailRow label="Release Date" value={game.year} />
            <DetailRow label="Historical Period" value={game.era} />
            <DetailRow label="Location" value={game.location} />
            <Divider style={{ borderColor: 'var(--ac-line)', margin: '14px 0' }} />
            <Typography.Text style={{ color: 'var(--ac-muted)', fontSize: 12 }}>Platforms</Typography.Text>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 8 }}>
              {game.platforms.map((p) => <Tag key={p} style={{ background: 'var(--ac-panel-2)', border: 'none', color: 'var(--ac-white)' }}>{p}</Tag>)}
            </div>
          </div>
        </Col>
      </Row>

      {relatedGames.length > 0 && (
        <div style={{ marginTop: 48 }}>
          <Reveal>
            <Typography.Title level={4} className="display-heading" style={{ marginBottom: 16 }}>
              Related Games
            </Typography.Title>
          </Reveal>
          <div className="scroller">
            {relatedGames.map((g, i) => (
              <Reveal key={g.id} delay={Math.min(i, 5) * 70} style={{ width: 220 }}>
                <GameCard game={g} />
              </Reveal>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <div className="stat-mono" style={{ textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
      <div style={{ fontSize: 16, color: 'var(--ac-white)', marginTop: 2 }}>{value}</div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <Reveal style={{ marginBottom: 36 }}>
      <Typography.Title level={4} className="display-heading" style={{ marginBottom: 12 }}>{title}</Typography.Title>
      <div style={{ color: 'var(--ac-muted)', fontSize: 15, lineHeight: 1.7 }}>{children}</div>
    </Reveal>
  );
}

function DetailRow({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--ac-line)' }}>
      <span style={{ color: 'var(--ac-muted)', fontSize: 13 }}>{label}</span>
      <span style={{ fontSize: 13, textAlign: 'right' }}>{value}</span>
    </div>
  );
}
