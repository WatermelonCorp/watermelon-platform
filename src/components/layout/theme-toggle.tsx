"use client";

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { HugeiconsIcon } from '@hugeicons/react';
import { Moon02Icon, Sun01Icon } from '@/lib/hugeicons';

export const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Show placeholder during SSR and initial hydration
  if (!mounted) {
    return (
      <div className="size-10 rounded-lg border border-input/50 bg-background flex items-center justify-center">
        <div className="size-4.5 rounded bg-muted animate-pulse" />
      </div>
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="size-8 md:size-10 rounded-lg border border-input/50 bg-background flex items-center justify-center hover:bg-accent transition-colors"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? (
        <HugeiconsIcon icon={Sun01Icon} size={18} />
      ) : (
        <HugeiconsIcon icon={Moon02Icon} size={18} />
      )}
    </button>
  );
};
