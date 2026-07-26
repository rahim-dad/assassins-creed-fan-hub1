import React, { useEffect, useState, useMemo } from 'react';
import { Row, Col, Typography, Skeleton, Input, Empty } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters } from '../store/slices/charactersSlice';
import CharacterCard from '../components/CharacterCard';
import ErrorState from '../components/ErrorState';
import Reveal from '../components/Reveal';

export default function Characters() {
  const dispatch = useDispatch();
  const { items: characters, status, error } = useSelector((s) => s.characters);
  const [query, setQueryLocal] = useState('');

  useEffect(() => {
    if (status === 'idle') dispatch(fetchCharacters());
  }, [status, dispatch]);

  const filtered = useMemo(() => {
    if (!query.trim()) return characters;
    const q = query.trim().toLowerCase();
    return characters.filter((c) => c.name.toLowerCase().includes(q) || c.era.toLowerCase().includes(q));
  }, [characters, query]);

  return (
    <div className="container section">
      <div className="eyebrow">Legends Of The Brotherhood</div>
      <Typography.Title level={2} className="display-heading" style={{ marginTop: 6 }}>Characters</Typography.Title>
      <Input.Search
        placeholder="Search characters by name or era"
        allowClear
        onSearch={setQueryLocal}
        onChange={(e) => !e.target.value && setQueryLocal('')}
        style={{ width: 300, margin: '20px 0 32px' }}
      />

      {status === 'loading' && (
        <Row gutter={[20, 20]}>
          {Array.from({ length: 8 }).map((_, i) => (
            <Col xs={12} sm={8} md={6} key={i}><Skeleton.Avatar active size={84} shape="circle" /><Skeleton active title paragraph={false} /></Col>
          ))}
        </Row>
      )}
      {status === 'failed' && <ErrorState message={error} onRetry={() => dispatch(fetchCharacters())} />}
      {status === 'succeeded' && (
        filtered.length === 0 ? <Empty description="No characters match your search." /> : (
          <Row gutter={[20, 20]}>
            {filtered.map((c, i) => (
              <Col xs={12} sm={8} md={6} key={c.id}>
                <Reveal delay={Math.min(i, 8) * 60}><CharacterCard character={c} /></Reveal>
              </Col>
            ))}
          </Row>
        )
      )}
    </div>
  );
}
