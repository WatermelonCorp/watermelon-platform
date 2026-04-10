import React from 'react';
import { VoiceNote } from './base';

const App: React.FC = () => {
  const handleSend = (data: { duration: number; blob: Blob | null }) => {
    console.log('Voice note sent:', data);
  };

  return <VoiceNote onSend={handleSend} />;
};

export default App;
