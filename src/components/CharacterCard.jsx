import React from 'react';
import { Avatar, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export default function CharacterCard({ character }) {
  const navigate = useNavigate();
  return (
    <div
      className="panel"
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/characters/${character.id}`)}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/characters/${character.id}`)}
      style={{ padding: 20, textAlign: 'center', cursor: 'pointer', transition: 'border-color .2s, transform .2s' }}
      onMouseOver={(e) => { e.currentTarget.style.borderColor = character.accent; e.currentTarget.style.transform = 'translateY(-4px)'; }}
      onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--ac-line)'; e.currentTarget.style.transform = 'none'; }}
    >
      <Avatar
        size={84}
        src={`https://picsum.photos/seed/${character.name}-warrior/100/100`}
        icon={<UserOutlined />}
        style={{ background: `linear-gradient(155deg, ${character.accent}88, #101013)`, border: `1px solid ${character.accent}` }}
      />
      <Typography.Title level={5} style={{ color: 'var(--ac-white)', marginTop: 14, marginBottom: 4 }}>
        {character.name}
      </Typography.Title>
      <div className="stat-mono">{character.era}</div>
    </div>
  );
}
