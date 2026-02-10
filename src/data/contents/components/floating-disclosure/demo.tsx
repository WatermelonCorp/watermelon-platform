import { FloatingDisclosure } from "./index";
import { BsFileTextFill } from "react-icons/bs";
import { FaBell } from "react-icons/fa6";
import { TbFileFilled } from "react-icons/tb";
import { IoIosFolder } from "react-icons/io";

const items = [
  { title: "Task", description: "Create a new task", icon: <BsFileTextFill size={20} /> },
  { title: "Reminder", description: "Set reminders", icon: <FaBell size={20} /> },
  { title: "Note", description: "Quick notes", icon: <TbFileFilled size={20} /> },
  { title: "Project", description: "Organise projects", icon: <IoIosFolder size={20} /> },
];

export default function FloatingDisclosureDemo() {
  return <FloatingDisclosure items={items} />;
}
