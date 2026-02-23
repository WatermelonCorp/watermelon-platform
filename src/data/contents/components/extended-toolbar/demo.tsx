import { ExtendedToolbar } from './index';
import {
  BsChatLeftFill,
  BsFillArchiveFill,
  BsFillInboxFill,
  BsFillPinAngleFill,
  BsTrash3Fill,
} from 'react-icons/bs';
import { IoImage } from 'react-icons/io5';
import { AiFillTag } from 'react-icons/ai';
import { PiShareFatFill } from 'react-icons/pi';

export default function ExtendedToolbarDemo() {
  return (
    <ExtendedToolbar
      primaryItems={[
        { icon: BsFillInboxFill, label: 'Inbox' },
        { icon: BsChatLeftFill, label: 'Chat' },
        { icon: BsFillPinAngleFill, label: 'Pin' },
        { icon: AiFillTag, label: 'Tag' },
      ]}
      secondaryItems={[
        { icon: IoImage, label: 'Image' },
        { icon: BsFillArchiveFill, label: 'Archive' },
        { icon: PiShareFatFill, label: 'Share' },
        { icon: BsTrash3Fill, label: 'Delete' },
        
      ]}
    />
  );
}
