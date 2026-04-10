import { EditableChip } from './base';

function EditableChipDemo() {
  return (
    <EditableChip
      defaultLabel="Favorites"
      onChange={(value) => console.log('Saved:', value)}
    />
  );
}

export default EditableChipDemo;
