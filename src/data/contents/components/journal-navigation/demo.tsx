"use client";

import React from 'react';
import { JournalNavigation } from './index';

const items = [
  {
    id: 'entry-1',
    day: 13,
    month: 'May',
    content: (
      <div className="space-y-4">
        <p>Revisited old memories through photos 📷. Felt warm and nostalgic 💭.</p>
        <p>Sent a few to friends and it sparked smiles 😊.</p>
      </div>
    ),
  },
  {
    id: 'entry-2',
    day: 14,
    month: 'May',
    content: (
      <div className="space-y-4">
        <p>Went to bed early last night 💤 and woke up refreshed.</p>
        <p>Energy levels stayed high all day ⚡.</p>
      </div>
    ),
  },
  {
    id: 'entry-3',
    day: 15,
    month: 'May',
    content: (
      <div className="space-y-4">
        <p>Organized my thoughts in my journal 🖊️.</p>
        <p>The clarity it brought made me feel peaceful 🕊️.</p>
      </div>
    ),
  },
  {
    id: 'entry-4',
    day: 16,
    month: 'May',
    content: (
      <div className="space-y-4">
        <p>Started a new book today 📖. The opening chapter is incredibly immersive.</p>
        <p>I can already tell I'll be hooked on this story 🕸️.</p>
      </div>
    ),
  },
  {
    id: 'entry-5',
    day: 17,
    month: 'May',
    content: (
      <div className="space-y-4">
        <p>Went for a long walk in the park 🌳. The weather was perfect for reflection.</p>
        <p>Met a friendly golden retriever 🐕 that made my day.</p>
      </div>
    ),
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