import React, { useEffect, useMemo } from 'react';
import { Button, Skeleton } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGames } from '../store/slices/gamesSlice';
import GameCard from '../components/GameCard';
import ErrorState from '../components/ErrorState';
import Reveal from '../components/Reveal';
import AnimatedNumber from '../components/AnimatedNumber';
import spawnRipple from '../utils/spawnRipple';
import useParallax from '../hooks/useParallax';
import CurvedDivider from '../components/CurvedDivider';
import { historicalSettings } from '../data/settings';
import { characters } from '../data/characters';
import { timelineEras } from '../data/timeline';

function Row({ title, subtitle, items }) {
  if (!items.length) return null;
  return (
    <section className="section">
      <div className="container">
        <Reveal style={{ marginBottom: 20 }}>
          <div className="eyebrow">{subtitle}</div>
          <h2 className="display-heading" style={{ fontSize: 28, margin: '6px 0 0' }}>{title}</h2>
        </Reveal>
        <div className="scroller">
          {items.map((g, i) => (
            <Reveal key={g.id} delay={Math.min(i, 5) * 70} direction="up" style={{ width: 240 }}>
              <GameCard game={g} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: games, status, error } = useSelector((s) => s.games);
  const scrollY = useParallax();

  useEffect(() => {
    if (status === 'idle') dispatch(fetchGames());
  }, [status, dispatch]);

  const featured = useMemo(() => games.filter((g) => g.rating >= 8.8).slice(0, 6), [games]);
  const newest = useMemo(() => [...games].sort((a, b) => b.year - a.year).slice(0, 6), [games]);
  const popular = useMemo(() => [...games].sort((a, b) => b.popularity - a.popularity).slice(0, 6), [games]);
  const topRated = useMemo(() => [...games].sort((a, b) => b.rating - a.rating).slice(0, 6), [games]);
  const upcoming = useMemo(() => games.filter((g) => g.upcoming), [games]);
  const categories = useMemo(() => [...new Set(games.map((g) => g.genre))], [games]);

  const stats = [
    { label: 'Games', value: games.length || 14 },
    { label: 'Historical Locations', value: historicalSettings.length },
    { label: 'Characters', value: characters.length },
    { label: 'Eras Explored', value: timelineEras.length },
  ];

  return (
    <div>
      <div className="hero" style={{ 
        backgroundPositionY: `${scrollY * 0.25}px`,
        backgroundImage: `linear-gradient(rgba(10, 10, 12, 0.8), rgba(10, 10, 12, 0.9)), url('https://picsum.photos/seed/assassins-creed/1920/1080')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="hero-eagle-mark" style={{ transform: `translateY(${scrollY * 0.15}px)` }}>⟁</div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="eyebrow hero-eyebrow" style={{ marginBottom: 18 }}>Nothing is true. Everything is permitted.</div>
          <h1 className="display-heading hero-title" style={{ fontSize: 'clamp(38px, 6vw, 76px)', lineHeight: 1.05, margin: 0, maxWidth: 820 }}>
            Assassin's Creed <span style={{ color: 'var(--ac-red-bright)' }}>Hub</span>
          </h1>
          <p className="hero-subtitle" style={{ color: 'var(--ac-muted)', fontSize: 'clamp(15px, 1.6vw, 19px)', maxWidth: 560, marginTop: 20, lineHeight: 1.6 }}>
            Explore every Assassin's Creed adventure ever released — every game, every protagonist,
            every era of history reshaped by the war between Assassins and Templars.
          </p>
          <div className="hero-actions" style={{ display: 'flex', gap: 16, marginTop: 36, flexWrap: 'wrap' }}>
            <Button className="btn-primary" size="large" onMouseDown={spawnRipple} onClick={() => navigate('/games')}>Browse Games</Button>
            <Button className="btn-ghost" size="large" onMouseDown={spawnRipple} onClick={() => navigate('/timeline')}>Explore Timeline</Button>
            <Button className="btn-ghost" size="large" onMouseDown={spawnRipple} onClick={() => navigate('/history')}>Learn History</Button>
          </div>
        </div>
      </div>
      <CurvedDivider />

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16 }}>
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 100} className="panel stat-card">
                <span className="stat-number">
                  <AnimatedNumber value={s.value} />
                </span>
                <span className="stat-label">{s.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="blade-divider"><span className="blade-notch" /></div>


      {status === 'loading' && (
        <div className="container section">
          <Skeleton active paragraph={{ rows: 4 }} />
        </div>
      )}
      {status === 'failed' && <ErrorState message={error} onRetry={() => dispatch(fetchGames())} />}

      {status === 'succeeded' && (
        <>
          <Row title="Featured Games" subtitle="Editor's Picks" items={featured} />
          <Row title="Newest Releases" subtitle="Fresh From The Animus" items={newest} />
          <Row title="Most Popular" subtitle="Fan Favorites" items={popular} />
          <Row title="Highest Rated" subtitle="Critically Acclaimed" items={topRated} />
          {upcoming.length > 0 && <Row title="Upcoming Releases" subtitle="On The Horizon" items={upcoming} />}

          <section className="section">
            <div className="container">
              <Reveal>
                <div className="eyebrow">Browse By</div>
                <h2 className="display-heading" style={{ fontSize: 28, margin: '6px 0 24px' }}>Game Categories</h2>
              </Reveal>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                {categories.map((c, i) => (
                  <Reveal key={c} delay={i * 50} direction="up" style={{ display: 'inline-flex' }}>
                    <div
                      className="panel"
                      role="button"
                      tabIndex={0}
                      onClick={() => navigate('/games')}
                      style={{ padding: '14px 22px', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 13, letterSpacing: '0.04em' }}
                    >
                      {c}
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
