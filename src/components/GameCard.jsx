import React from 'react';
import { Tag, Button, Typography } from 'antd';
import { HeartOutlined, HeartFilled, StarFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../store/slices/favoritesSlice';
import spawnRipple from '../utils/spawnRipple';

export default function GameCard({ game }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favoriteIds = useSelector((s) => s.favorites.ids);
  const isFavorite = favoriteIds.includes(game.id);

  return (
    <div className="game-card" onClick={() => navigate(`/games/${game.id}`)}>
      <div
        className="game-card-cover"
        style={{ 
          background: `linear-gradient(155deg, ${game.accent}55 0%, #0c0c0e 75%), url('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=300&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-display)', fontSize: 15, color: 'rgba(255,255,255,0.85)',
          textAlign: 'center', padding: 16, zIndex: 1,
        }}>
          {game.title}
        </div>
        <Button
          shape="circle"
          size="small"
          icon={
            <span key={isFavorite ? 'on' : 'off'} className="heart-pop" style={{ display: 'flex' }}>
              {isFavorite ? <HeartFilled style={{ color: 'var(--ac-red-bright)' }} /> : <HeartOutlined style={{ color: '#fff' }} />}
            </span>
          }
          onMouseDown={spawnRipple}
          onClick={(e) => { e.stopPropagation(); dispatch(toggleFavorite(game.id)); }}
          style={{ position: 'absolute', top: 10, right: 10, zIndex: 2, background: 'rgba(0,0,0,0.5)', border: 'none' }}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        />
      </div>
      <div className="game-card-body">
        <span className="tag-era">{game.era}</span>
        <Typography.Title level={5} style={{ margin: 0, color: 'var(--ac-white)' }}>
          {game.title}
        </Typography.Title>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
          <span className="stat-mono">{game.year} · {game.genre}</span>
          <span style={{ color: 'var(--ac-gold)', fontFamily: 'var(--font-mono)', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
            <StarFilled /> {game.rating}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 4 }}>
          {game.platforms.slice(0, 3).map((p) => (
            <Tag key={p} style={{ fontSize: 10, margin: 0, background: 'var(--ac-panel-2)', border: 'none', color: 'var(--ac-muted)' }}>{p}</Tag>
          ))}
        </div>
        <Button
          type="link"
          size="small"
          style={{ padding: 0, alignSelf: 'flex-start', color: 'var(--ac-gold)', marginTop: 6 }}
          onClick={(e) => { e.stopPropagation(); navigate(`/games/${game.id}`); }}
        >
          View Details →
        </Button>
      </div>
    </div>
  );
}
