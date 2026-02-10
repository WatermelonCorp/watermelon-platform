import { Dock } from '.';
import {
  Search01Icon,
  NoteIcon,
  Settings01Icon,
  AddSquareIcon,
  MessageNotification01Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

const items = [
  { id: 1, Icon: ()=> <HugeiconsIcon icon={Search01Icon} size={26} /> },
  { id: 2, Icon: ()=> <HugeiconsIcon icon={NoteIcon} size={26} /> },
  { id: 3, Icon: ()=> <HugeiconsIcon icon={AddSquareIcon} size={26} /> },
  { id: 4, Icon: ()=> <HugeiconsIcon icon={MessageNotification01Icon} size={26} /> },
  { id: 5, Icon: ()=> <HugeiconsIcon icon={Settings01Icon} size={26} /> },
]

export default function DockDemo() {
  return (
    <div>
      <Dock items={items} />
    </div>
  );
}
