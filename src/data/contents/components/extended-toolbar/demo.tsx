import { ExtendedToolbar } from "./index";
import {
  BsChatLeftFill,
  BsFillArchiveFill,
  BsFillInboxFill,
  BsFillPinAngleFill,
  BsTrash3Fill,
} from "react-icons/bs";
import { IoImage } from "react-icons/io5";
import { AiFillTag } from "react-icons/ai";
import { PiShareFatFill } from "react-icons/pi";

export default function ExtendedToolbarDemo() {
  return (
    <ExtendedToolbar
      primaryItems={[
        { icon: BsFillInboxFill, size: 28, label: "Inbox" },
        { icon: BsChatLeftFill, size: 22, label: "Chat" },
        { icon: BsFillPinAngleFill, size: 28, label: "Pin" },
        { icon: AiFillTag, size: 28, label: "Tag" },
      ]}
      secondaryItems={[
        { icon: IoImage, size: 28, label: "Image" },
        { icon: BsFillArchiveFill, size: 26, label: "Archive" },
        { icon: PiShareFatFill, size: 28, label: "Share" },
        { icon: BsTrash3Fill, size: 28, label: "Delete" },
      ]}
    />
  );
}
