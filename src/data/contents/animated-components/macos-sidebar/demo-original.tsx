'use client';
import { MacOSSidebar } from './original';

const DEMO_ITEMS = ['Canvas 1', 'Canvas 2', 'Canvas 3', 'Canvas 4', 'Canvas 5'];

export default function MacOSSidebarDemo() {
  return (
    <MacOSSidebar
      items={DEMO_ITEMS}
      className="h-[600px] w-[800px] max-w-full shadow-xl"
    />
  );
}
