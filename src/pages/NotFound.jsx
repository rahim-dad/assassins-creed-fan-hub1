import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="container" style={{ padding: '100px 24px', textAlign: 'center' }}>
      <Result
        status="404"
        title="This page has been lost to history"
        subTitle="The page you're looking for doesn't exist, or has been erased from the Animus."
        extra={<Button className="btn-primary" onClick={() => navigate('/')}>Return Home</Button>}
      />
    </div>
  );
}
