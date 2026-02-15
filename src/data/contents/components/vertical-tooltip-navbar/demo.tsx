import { Upload, Menu } from "lucide-react";
import { IoChatbubbleOutline } from "react-icons/io5";
import {VerticalTooltipNavbar} from "./index";

const items = [
  { id: "comment", icon: <IoChatbubbleOutline size={26} />, label: "Comment", shortcut: ["C"] },
  { id: "upload", icon: <Upload size={26} />, label: "Upload", shortcut: ["U"] },
  { id: "menu", icon: <Menu size={26} />, label: "Menu", shortcut: ["K"], showDot: true },
];

export default function VerticalTooltipNavbarDemo() {
  return <VerticalTooltipNavbar items={items} />;
}
