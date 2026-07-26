import React, { useEffect, useState } from 'react';
import { FloatButton } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <FloatButton
      icon={<ArrowUpOutlined />}
      className="back-to-top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      style={{ background: 'var(--ac-red)' }}
    />
  );
}
