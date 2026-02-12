import { EventReminders } from './index'; 

const PRESET_DATA = [
  { 
    id: '1', 
    type: 'Notification', 
    value: 10, 
    unit: 'minutes' 
  },
  { 
    id: '2', 
    type: 'Email', 
    value: 1, 
    unit: 'hours' 
  },
];

export default function EventRemindersDemo() {
  const handleUpdate = (updatedReminders) => {
    console.log('Reminders Updated:', updatedReminders);
  };

  return (
    <div className="w-full">
      <EventReminders 
        title="Credit Card Payment" 
        date="October 24, 2025" 
        initialReminders={PRESET_DATA} 
        onUpdate={handleUpdate}
      />
    </div>
  );
}