import React, { useEffect, useState } from 'react';
import { Select, Typography, Table, Empty, Skeleton } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGames } from '../store/slices/gamesSlice';
import ErrorState from '../components/ErrorState';

// Deterministic pseudo-scores (1-10) derived from real fields so the
// comparison stays consistent per game without needing extra hidden data.
function scoreFor(game, category) {
  const base = (game.rating + (game.popularity / 10)) / 2;
  const seedMap = {
    Story: game.rating,
    Graphics: 6 + (game.year - 2007) * 0.18,
    Combat: 6.5 + (game.genre.includes('RPG') ? 1.5 : 0.5),
    Parkour: game.era.includes('Renaissance') || game.title.includes('Unity') ? 9.2 : 7.5,
    Stealth: game.title.includes('Mirage') || game.title.includes('Shadows') ? 9 : 7,
    'Map Size': game.genre.includes('RPG') ? 9 : 6.5,
    'Open World': game.genre.includes('RPG') ? 9.3 : 6.8,
  };
  const val = seedMap[category] ?? base;
  return Math.min(10, Math.round(val * 10) / 10);
}

const categories = ['Story', 'Graphics', 'Combat', 'Parkour', 'Stealth', 'Map Size', 'Open World', 'Rating'];

export default function Compare() {
  const dispatch = useDispatch();
  const { items: games, status, error } = useSelector((s) => s.games);
  const [leftId, setLeftId] = useState(null);
  const [rightId, setRightId] = useState(null);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchGames());
  }, [status, dispatch]);

  useEffect(() => {
    if (games.length && !leftId && !rightId) {
      setLeftId(games[0].id);
      setRightId(games[1]?.id || games[0].id);
    }
  }, [games, leftId, rightId]);

  if (status === 'loading' || status === 'idle') return <div className="container section"><Skeleton active paragraph={{ rows: 6 }} /></div>;
  if (status === 'failed') return <ErrorState message={error} onRetry={() => dispatch(fetchGames())} />;

  const left = games.find((g) => g.id === leftId);
  const right = games.find((g) => g.id === rightId);

  const columns = [
    { title: 'Category', dataIndex: 'category', key: 'category', width: '30%' },
    { title: left?.title || 'Game A', dataIndex: 'left', key: 'left', align: 'center' },
    { title: right?.title || 'Game B', dataIndex: 'right', key: 'right', align: 'center' },
  ];

  const dataSource = left && right ? [
    ...categories.map((cat) => ({
      key: cat,
      category: cat,
      left: cat === 'Rating' ? left.rating : scoreFor(left, cat),
      right: cat === 'Rating' ? right.rating : scoreFor(right, cat),
    })),
    { key: 'release', category: 'Release Date', left: left.year, right: right.year },
    { key: 'platforms', category: 'Platforms', left: left.platforms.join(', '), right: right.platforms.join(', ') },
    { key: 'character', category: 'Main Character', left: left.mainCharacter, right: right.mainCharacter },
  ] : [];

  return (
    <div className="container section">
      <div className="eyebrow">Head To Head</div>
      <Typography.Title level={2} className="display-heading" style={{ marginTop: 6 }}>Compare Games</Typography.Title>

      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', margin: '24px 0 36px' }}>
        <Select
          value={leftId}
          onChange={setLeftId}
          style={{ width: 260 }}
          placeholder="Select first game"
          options={games.map((g) => ({ value: g.id, label: g.title }))}
        />
        <Select
          value={rightId}
          onChange={setRightId}
          style={{ width: 260 }}
          placeholder="Select second game"
          options={games.map((g) => ({ value: g.id, label: g.title }))}
        />
      </div>

      {!left || !right ? (
        <Empty description="Select two games to compare." />
      ) : (
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          bordered
          className="panel"
        />
      )}
    </div>
  );
}
