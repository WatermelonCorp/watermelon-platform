import React from 'react';
import { PredictiveText } from './index';

const PredictiveTextDemo: React.FC = () => {
  const handleSend = (val: string) => {
    console.log("Sent message:", val);
  };

  return (
    <PredictiveText 
      onSend={handleSend}
      placeholder="Try typing 'Sunny' or 'What'"
    />
  );
};

export default PredictiveTextDemo;