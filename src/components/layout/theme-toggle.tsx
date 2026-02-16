"use client";

import { useState, useSyncExternalStore } from 'react';
import { useTheme } from 'next-themes';
import { HugeiconsIcon } from '@hugeicons/react';
import { Moon02Icon, Sun01Icon } from '@/lib/hugeicons';

export const ThemeToggle = () => {
  const [optimisticTheme, setOptimisticTheme] = useState<'light' | 'dark' | null>(null);
  const { resolvedTheme, setTheme } = useTheme();

  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );

  // Show placeholder during SSR and initial hydration
  if (!mounted) {
    return (
      <div className="size-10 rounded-lg border border-input/50 bg-background flex items-center justify-center">
        <div className="size-4.5 rounded bg-muted animate-pulse" />
      </div>
    );
  }

  const resolved = resolvedTheme === 'dark' ? 'dark' : 'light';
  const effectiveTheme =
    optimisticTheme && optimisticTheme !== resolved ? optimisticTheme : resolved;
  const isDark = effectiveTheme === 'dark';

  const handleToggle = () => {
    const nextTheme = isDark ? 'light' : 'dark';
    setOptimisticTheme(nextTheme);
    setTheme(nextTheme);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
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
