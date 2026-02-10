import {ShufflePinnedList} from ".";

const items = [
  { id: "1", text: "Daily Fitness Tracker", isPinned: false },
  { id: "2", text: "Voice Command Tips", isPinned: false },
  { id: "3", text: "iOS Shortcuts Guide", isPinned: false },
  { id: "4", text: "Focus Mode Ideas", isPinned: false },
  { id: "5", text: "50 Productivity Hacks", isPinned: false },
  { id: "6", text: "Lunch Recipe Ideas", isPinned: false },
  { id: "7", text: "Snack Ideas For Kids", isPinned: false },
];

export default function ShufflePinnedListDemo() {
  return (
    <div className="flex justify-center items-center">
    <ShufflePinnedList
      items={items}
      onPinChange={(updated) => console.log("Updated Items:", updated)}
      onShuffle={(current) => console.log("Shuffled Hero Item:", current)}
    />
    </div>
  );
}