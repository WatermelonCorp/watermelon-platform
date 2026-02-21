
import React, { useState } from 'react';
import { AddCashDisclosure } from './index';

const App: React.FC = () => {
  const [balance, setBalance] = useState(34.00);

  const handleAddCash = (amount: number) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setBalance(prev => prev + amount);
        resolve();
      }, 2000);
    });
  };

  return (
        <AddCashDisclosure 
          initialBalance={balance}
          onConfirm={handleAddCash}
          cards={[
            { id: '1', last4: '6756', brand: 'VISA', isDefault: true },
            { id: '2', last4: '4632', brand: 'MASTERCARD', hasToggle: true }
          ]}
          presets={[50, 100, 300]}
/>
  );
};

export default App;
