'use client';

import React from 'react';
import { JournalNavigation } from './base';

const items = [
  {
    id: 'entry-1',
    day: 13,
    month: 'May',
    content: [
      'Revisited old memories through photos 📷. Felt warm and nostalgic 💭.',
      'Sent a few to friends and it sparked smiles 😊.',
    ],
  },
  {
    id: 'entry-2',
    day: 14,
    month: 'May',
    content: [
      'Went to bed early last night 💤 and woke up refreshed.',
      'Energy levels stayed high all day ⚡.',
    ],
  },
  {
    id: 'entry-3',
    day: 15,
    month: 'May',
    content: [
      'Organized my thoughts in my journal 🖊️.',
      'The clarity it brought made me feel peaceful 🕊️.',
    ],
  },
  {
    id: 'entry-4',
    day: 16,
    month: 'May',
    content: [
      'Started a new book today 📖. The opening chapter is incredibly immersive.',
      "I can already tell I'll be hooked on this story 🕸️.",
    ],
  },
  {
    id: 'entry-5',
    day: 17,
    month: 'May',
    content: [
      'Went for a long walk in the park 🌳. The weather was perfect for reflection.',
      'Met a friendly golden retriever 🐕 that made my day.',
    ],
  },
];

const JournalNavigationDemo: React.FC = () => {
  return (
    <JournalNavigation
      entries={items}
      initialIndex={2}
      onEntryChange={(entry) => console.log('Viewing entry:', entry.day)}
    />
  );
};

export default JournalNavigationDemo;
