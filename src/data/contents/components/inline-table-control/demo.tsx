import  {InlineTableControl}  from './index';

const data = [
  { id: '1', expense: 'Rent', method: 'Bank Transfer', amount: '1200' },
  { id: '2', expense: 'Insurance', method: 'Credit Card', amount: '149' },
  { id: '3', expense: 'Groceries', method: 'Wallet', amount: '205' },
  { id: '4', expense: 'Utilities', method: 'Credit Card', amount: '180' },
  { id: '5', expense: 'Bill', method: 'Cash', amount: '79' },
];

export default function InlineTableControlDemo() {

  return (
      <InlineTableControl data={data}  />
  );
}