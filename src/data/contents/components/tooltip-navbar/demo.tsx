import { Eye, Share2, Upload, Menu } from "lucide-react";
import { IoChatbubbleOutline } from "react-icons/io5";
import { FiInbox } from "react-icons/fi";
import {TooltipNavbar} from "./index";

const items = [
  { id: "comment", icon: <IoChatbubbleOutline size={26} />, label: "Comment", shortcut: ["C"] },
  { id: "inbox", icon: <FiInbox size={26} />, label: "Feature", shortcut: ["F"], showDot: true },
  { id: "view", icon: <Eye size={26} />, label: "View", shortcut: ["V"] },
  { id: "share", icon: <Share2 size={26} />, label: "Mode", shortcut: ["S", "H"] },
  { id: "upload", icon: <Upload size={26} />, label: "Upload", shortcut: ["U"] },
  { id: "menu", icon: <Menu size={26} />, label: "Menu", shortcut: ["K"], showDot: true },
];

export default function TooltipNavbarDemo() {
  return <TooltipNavbar items={items} />;
}
