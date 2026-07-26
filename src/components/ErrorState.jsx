import React from 'react';
import { Result, Button } from 'antd';

export default function ErrorState({ message, onRetry }) {
  return (
    <Result
      status="error"
      title="Couldn't load this content"
      subTitle={message || 'Something went wrong while fetching the data. Please try again.'}
      extra={
        <Button className="btn-primary" onClick={onRetry}>
          Retry
        </Button>
      }
    />
  );
}
