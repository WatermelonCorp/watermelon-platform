import { DropdownDisclosure } from ".";
import type { Model } from ".";
import { useState } from "react";
import { FaMeta } from "react-icons/fa6";
import { HugeiconsIcon } from "@hugeicons/react";
import { GoogleGeminiIcon, QwenFreeIcons } from "@hugeicons/core-free-icons";
import { SiClaude } from "react-icons/si";

const models: Model[] = [
  {
    id: "sonnet",
    name: "Sonnet 3.5",
    description: "Advanced reasoning",
    icon: <SiClaude size={22} />,
    hasUpgrade: true,
  },
  {
    id: "llama",
    name: "Llama 3.2",
    description: "Versatile problem-solving",
    icon: <FaMeta size={22} />,
  },
  {
    id: "qwen",
    name: "Qwen 2.5",
    description: "Rapid text generation",
    icon: (
      <HugeiconsIcon
        icon={QwenFreeIcons}
        size={24}
        color="#7c7b82"
        strokeWidth={1.5}
      />
    ),
  },
  {
    id: "gemma",
    name: "Gemma 2",
    description: "Efficient task completion",
    icon: (
      <HugeiconsIcon
        icon={GoogleGeminiIcon}
        size={24}
        color="#7c7b82"
        strokeWidth={1.5}
      />
    ),
  },
];

export default function DropdownDisclosureDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedModelId, setSelectedModelId] = useState("sonnet");

  return (
    <div className="flex items-center justify-center">
      <DropdownDisclosure
        models={models}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        selectedModelId={selectedModelId}
        onModelChange={(m) => setSelectedModelId(m.id)}
      />
    </div>
  );
}