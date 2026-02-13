import { SlotPicker } from '.';

const MOCK_DAYS = [
  { id: 'mon', label: 'Monday', enabled: false, slots: [] },
  { id: 'tue', label: 'Tuesday', enabled: false, slots: [] },
  { id: 'wed', label: 'Wednesday', enabled: false, slots: [] },
  { id: 'thu', label: 'Thursday', enabled: false, slots: [] },
  { id: 'fri', label: 'Friday', enabled: false, slots: [] },
];

export default function SlotPickerDemo() {
  return (
    <div className="flex items-center justify-center">
      <SlotPicker
        days={MOCK_DAYS}
        onUpdate={(data) => console.log('Updated Schedule:', data)}
      />
    </div>
  );
}