'use client';
import { MacOSSidebar } from '.';

const DEMO_ITEMS = ['Canvas 1', 'Canvas 2', 'Canvas 3', 'Canvas 4', 'Canvas 5'];

export default function MacOSSidebarDemo() {
  return (
    <div className="bg-background flex items-center justify-center p-10 transition-colors duration-300 dark:bg-neutral-950">
      <MacOSSidebar
        items={DEMO_ITEMS}
        className="h-[600px] w-[800px] max-w-full shadow-xl"
      />
    </div>
  );
}
