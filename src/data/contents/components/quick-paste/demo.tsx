"use client";

import { QuickPaste } from './index';



export default function QuickPasteDemo() {
  const mockUser = {
    name: "Alex Costa",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" 
  };

  const handlePasteAction = () => {
    console.log("Mocking paste from clipboard...");
    return mockUser;
  };

  const handleContinue = (data:any) => {
    console.log("Payload:", data);
  };

  return (
    <div className="min-h-full w-full flex items-center justify-center bg-transparent">
      <QuickPaste 
        onPaste={handlePasteAction}
        onClear={() => console.log("Cleared input")}
        onContinue={handleContinue}
        placeholder="Enter email or paste..."
      />
    </div>
  );
}