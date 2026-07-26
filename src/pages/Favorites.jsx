import React, { useEffect } from 'react';
import { Row, Col, Typography, Button, Skeleton } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGames } from '../store/slices/gamesSlice';
import GameCard from '../components/GameCard';
import ErrorState from '../components/ErrorState';
import Reveal from '../components/Reveal';
import spawnRipple from '../utils/spawnRipple';

export default function Favorites() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: games, status, error } = useSelector((s) => s.games);
  const favoriteIds = useSelector((s) => s.favorites.ids);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchGames());
  }, [status, dispatch]);

  const favoriteGames = games.filter((g) => favoriteIds.includes(g.id));

  return (
    <div className="container section">
      <div className="eyebrow">Your Personal Codex</div>
      <Typography.Title level={2} className="display-heading" style={{ marginTop: 6, marginBottom: 32 }}>Favorites</Typography.Title>

      {status === 'loading' && <Skeleton active paragraph={{ rows: 4 }} />}
      {status === 'failed' && <ErrorState message={error} onRetry={() => dispatch(fetchGames())} />}
      {status === 'succeeded' && (
        favoriteGames.length === 0 ? (
          <Reveal style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div className="empty-heart-illustration" aria-hidden="true">
              <HeartOutlined />
            </div>
            <Typography.Title level={4} className="display-heading" style={{ marginTop: 24 }}>
              Your Codex Is Empty
            </Typography.Title>
            <p style={{ color: 'var(--ac-muted)', maxWidth: 380, margin: '8px auto 24px' }}>
              You haven't saved any games yet. Tap the heart on any title to keep it here.
            </p>
            <Button className="btn-primary" onMouseDown={spawnRipple} onClick={() => navigate('/games')}>Browse Games</Button>
          </Reveal>
        ) : (
          <Row gutter={[20, 20]}>
            {favoriteGames.map((g, i) => (
              <Col xs={24} sm={12} md={8} lg={6} key={g.id}>
                <Reveal delay={Math.min(i, 6) * 60}>
                  <GameCard game={g} />
                </Reveal>
              </Col>
            ))}
          </Row>
        )
      )}
    </div>
  );
}
