import { TbLockFilled } from "react-icons/tb";
import { OptionPicker,  } from ".";
import { Globe } from "lucide-react";

const options = [
 { id: "private", label: "Private", icon: TbLockFilled },
  { id: "public", label: "Public", icon: Globe},
];

export default function OptionPickerDemo() {
  return (
    <div className="flex items-center justify-center">
      <OptionPicker options={options} />
    </div>
  );
}