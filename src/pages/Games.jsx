import React, { useEffect, useMemo } from 'react';
import { Row, Col, Select, Input, Pagination, Skeleton, Empty, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGames } from '../store/slices/gamesSlice';
import { setPlatform, setYear, setSortBy, setPage } from '../store/slices/filtersSlice';
import { setQuery } from '../store/slices/searchSlice';
import GameCard from '../components/GameCard';
import ErrorState from '../components/ErrorState';
import Reveal from '../components/Reveal';
import { allPlatforms } from '../data/games';

export default function Games() {
  const dispatch = useDispatch();
  const { items: games, status, error } = useSelector((s) => s.games);
  const { platform, year, sortBy, page, pageSize } = useSelector((s) => s.filters);
  const { query } = useSelector((s) => s.search);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchGames());
  }, [status, dispatch]);

  const years = useMemo(() => ['All', ...new Set(games.map((g) => g.year))].sort((a, b) => (a === 'All' ? -1 : b - a)), [games]);

  const filtered = useMemo(() => {
    let result = [...games];
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      result = result.filter((g) =>
        g.title.toLowerCase().includes(q) ||
        g.mainCharacter.toLowerCase().includes(q) ||
        g.era.toLowerCase().includes(q) ||
        g.location.toLowerCase().includes(q) ||
        String(g.year).includes(q)
      );
    }
    if (platform !== 'All') result = result.filter((g) => g.platforms.includes(platform));
    if (year !== 'All') result = result.filter((g) => g.year === year);

    switch (sortBy) {
      case 'rating-desc': result.sort((a, b) => b.rating - a.rating); break;
      case 'date-desc': result.sort((a, b) => b.year - a.year); break;
      case 'date-asc': result.sort((a, b) => a.year - b.year); break;
      default: result.sort((a, b) => a.title.localeCompare(b.title));
    }
    return result;
  }, [games, query, platform, year, sortBy]);

  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="container section">
      <div className="eyebrow">The Full Catalogue</div>
      <Typography.Title level={2} className="display-heading" style={{ marginTop: 6 }}>All Games</Typography.Title>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', margin: '24px 0 32px' }}>
        <Input.Search
          placeholder="Search by title, character, era, or year"
          allowClear
          defaultValue={query}
          onSearch={(v) => dispatch(setQuery(v))}
          onChange={(e) => !e.target.value && dispatch(setQuery(''))}
          style={{ width: 280 }}
        />
        <Select
          value={platform}
          onChange={(v) => dispatch(setPlatform(v))}
          style={{ width: 160 }}
          options={['All', ...allPlatforms].map((p) => ({ value: p, label: p === 'All' ? 'All Platforms' : p }))}
        />
        <Select
          value={year}
          onChange={(v) => dispatch(setYear(v))}
          style={{ width: 140 }}
          options={years.map((y) => ({ value: y, label: y === 'All' ? 'All Years' : y }))}
        />
        <Select
          value={sortBy}
          onChange={(v) => dispatch(setSortBy(v))}
          style={{ width: 190 }}
          options={[
            { value: 'title-asc', label: 'Sort: A → Z' },
            { value: 'rating-desc', label: 'Sort: Rating (High)' },
            { value: 'date-desc', label: 'Sort: Newest First' },
            { value: 'date-asc', label: 'Sort: Oldest First' },
          ]}
        />
      </div>

      {status === 'loading' && (
        <Row gutter={[20, 20]}>
          {Array.from({ length: 8 }).map((_, i) => (
            <Col xs={24} sm={12} md={8} lg={6} key={i}>
              <Skeleton.Image active style={{ width: '100%', height: 260 }} />
              <Skeleton active title paragraph={{ rows: 1 }} />
            </Col>
          ))}
        </Row>
      )}

      {status === 'failed' && <ErrorState message={error} onRetry={() => dispatch(fetchGames())} />}

      {status === 'succeeded' && (
        <>
          <Typography.Text style={{ color: 'var(--ac-muted)' }}>{filtered.length} game{filtered.length !== 1 ? 's' : ''} found</Typography.Text>
          {filtered.length === 0 ? (
            <Empty description="No games match your search." style={{ margin: '60px 0' }} />
          ) : (
            <Row gutter={[20, 20]} style={{ marginTop: 16 }}>
              {paged.map((g, i) => (
                <Col xs={24} sm={12} md={8} lg={6} key={g.id}>
                  <Reveal delay={Math.min(i, 8) * 60}>
                    <GameCard game={g} />
                  </Reveal>
                </Col>
              ))}
            </Row>
          )}
          {filtered.length > pageSize && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
              <Pagination
                current={page}
                pageSize={pageSize}
                total={filtered.length}
                onChange={(p) => dispatch(setPage(p))}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
