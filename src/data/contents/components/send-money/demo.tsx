import React from 'react';
import { SendMoney } from './index'; 
import type { Card } from './index';

const SendMoneyDemo: React.FC = () => {


 const initialCards: Card[] = [
    { id: '1', last4: '6756', brand: 'visa' },
    { id: '2', last4: '4632', brand: 'mastercard' },
  ];

  const handleProceed = (data: any) => {
    console.log('Proceeding with:', data);
  };

  return (
      <SendMoney 
        cards={initialCards}
        onProceed={handleProceed}
      />
  );
};

export default SendMoneyDemo;