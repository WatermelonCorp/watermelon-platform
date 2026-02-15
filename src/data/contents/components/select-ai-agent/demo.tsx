import { SelectAIAgent } from './index';
import { HugeiconsIcon } from '@hugeicons/react';
import { ChatGptIcon, ClaudeIcon, GoogleGeminiIcon } from '@hugeicons/core-free-icons';



const AGENTS = [
  { id: 'chatgpt', name: 'Chatgpt', icon: <HugeiconsIcon
      icon={ChatGptIcon}
      size={24}
      color="#2b2b2b "
      strokeWidth={1.5}
    /> },
  { id: 'gemini', name: 'Gemini', icon: <HugeiconsIcon
      icon={GoogleGeminiIcon}
      size={24}
      color="#003355"
      strokeWidth={1.5}
    /> },
  { id: 'claude', name: 'Claude', icon: <HugeiconsIcon
      icon={ClaudeIcon}
      size={24}
      color="#D97757"
      strokeWidth={1.5}
    /> },
];

export default function SelectAIAgentDemo() {
  return (
      <SelectAIAgent agents={AGENTS} />
  );
}