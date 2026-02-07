
import { useTheme } from 'next-themes';
import { HugeiconsIcon } from '@hugeicons/react';
import { Moon02Icon, Sun01Icon } from '@hugeicons/core-free-icons';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    < button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="size-10 rounded-lg border border-input/50 bg-background flex items-center justify-center hover:bg-accent transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <HugeiconsIcon icon={Sun01Icon} size={18} />
      ) : (
        <HugeiconsIcon icon={Moon02Icon} size={18} />
      )
      }
    </button >
  )
}
