'use client';

import { QuickPaste, type PasteData } from './original';

export default function QuickPasteDemo() {
  const mockUsers: Record<string, PasteData> = {
    'hey@alex.com': {
      name: 'Alex Costa',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    },
    'sarah@smith.com': {
      name: 'Sarah Smith',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    },
  };

  const handlePasteAction = (value: string): PasteData | null => {
    const trimmed = value.trim();

    // Check if we have a direct match in our mocked "database"
    if (trimmed && mockUsers[trimmed.toLowerCase()]) {
      return mockUsers[trimmed.toLowerCase()];
    }

    // If they typed something else, dynamically create an avatar (reusable functionality)
    if (trimmed) {
      const generatedName = trimmed.split('@')[0] || trimmed;
      const capitalized =
        generatedName.charAt(0).toUpperCase() + generatedName.slice(1);
      return {
        name: capitalized,
        image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${capitalized}`,
      };
    }

    // If completely empty but they clicked Paste, fallback to a mocked paste event
    return {
      name: 'Alex Costa',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    };
  };

  const handleContinue = (data: PasteData) => {
    console.log('Payload:', data);
  };

  return (
    <div className="flex min-h-full w-full items-center justify-center bg-transparent">
      <QuickPaste
        onPaste={handlePasteAction}
        onClear={() => console.log('Cleared input')}
        onContinue={handleContinue}
        placeholder="Email Address"
        submitText="Paste"
      />
    </div>
  );
}
