import React from 'react';
import { MorphingButton } from '.';

const MorphingButtonDemo: React.FC = () => {
  const handleNotify = (email: string) => {
    console.log('Notification requested for:', email);
    alert(`Success! You'll be notified at ${email}`);
  };

  return <MorphingButton buttonText="Notify Me" onSubmit={handleNotify} />;
};

export default MorphingButtonDemo;
