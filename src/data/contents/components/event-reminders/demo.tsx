import { EventReminders } from './index';
import type { Reminder, ReminderType } from './index';

const PRESET_DATA: Reminder[] = [
  {
    id: '1',
    type: 'Notification' as ReminderType,
    value: 10,
    unit: 'minutes',
  },
  {
    id: '2',
    type: 'Email' as ReminderType,
    value: 1,
    unit: 'hours',
  },
];

export default function EventRemindersDemo() {
  const handleUpdate = (updatedReminders: Reminder[]) => {
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