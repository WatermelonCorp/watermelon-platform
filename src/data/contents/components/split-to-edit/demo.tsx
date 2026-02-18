import { SplitToEdit } from ".";

export default function SplitToEditDemo() {
  return (
    <SplitToEdit
      initialHours={1}
      initialMinutes={45}
      onSave={(h, m) => console.log('Saved Time:', h, m)}
    />
  );
}
