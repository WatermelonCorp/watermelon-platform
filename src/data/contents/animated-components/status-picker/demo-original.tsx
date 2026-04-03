import { StatusPicker } from './original';

const items = [
  { id: 1, emoji: '🌴', name: 'On Vacation' },
  { id: 2, emoji: '🤒', name: 'Out Sick' },
  { id: 3, emoji: '🗓️', name: 'In a Meeting' },
  { id: 4, emoji: '👟', name: 'Be Right Back' },
  { id: 5, emoji: '🚌', name: 'Commuting' },
  
];

export default function StatusPickerDemo() {
  return (
    <StatusPicker items={items} defaultValue={0} onChange={(id) => console.log(id)} />
  );
}
