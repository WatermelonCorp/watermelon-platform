import { useCallback, useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import { registry, allCategories } from '@/data/registry';
import { dashboards } from '@/data/dashboards';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Home01Icon,
  Book02Icon,
  Download04Icon,
  CodeIcon,
  CommandIcon,
  GridIcon,
  SearchIcon,
  SidebarLeft01Icon,
} from '@/lib/hugeicons';

// Page navigation items
const pages = [
  { name: 'Home', href: '/', icon: Home01Icon, shortcut: 'H' },
  { name: 'Basic Usage', href: '/basic-usage', icon: Book02Icon, shortcut: 'B' },
  { name: 'Installation', href: '/installation', icon: Download04Icon, shortcut: 'I' },
  { name: 'Framework Support', href: '/framework-support', icon: CodeIcon, shortcut: 'F' },
  { name: 'CLI', href: '/cli', icon: CommandIcon, shortcut: 'C' },
  { name: 'Changelog', href: '/changelog', icon: CommandIcon, shortcut: 'L' },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Keyboard shortcut handler
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  // Navigate and close
  const runCommand = useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  // Group components by category
  const componentsByCategory = useMemo(() => {
    const grouped: Record<string, typeof registry> = {};
    for (const category of allCategories) {
      grouped[category] = registry.filter((item) => item.category === category);
    }
    return grouped;
  }, []);

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="group flex h-10 items-center lg:w-90 justify-between gap-2 rounded-lg border border-input/50 bg-background px-3 text-sm text-muted-foreground transition-all hover:border-input hover:bg-muted/50 hover:text-foreground"
      >
        <div className="flex items-center gap-2">
          <HugeiconsIcon icon={SearchIcon} strokeWidth={2} className="size-4" />
          <span className='hidden md:block'>Search components...</span>
        </div>
        <kbd className="pointer-events-none flex h-5 select-none items-center gap-0.5 rounded-md border border-input/50 bg-muted/50 px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {/* Command Dialog */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command className="rounded-xl">
          <CommandInput placeholder="Type to search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>

            {/* Pages Group */}
            <CommandGroup heading="Pages">
              {pages.map((page) => (
                <CommandItem
                  key={page.href}
                  onSelect={() => runCommand(() => navigate(page.href))}
                >
                  <HugeiconsIcon icon={page.icon} strokeWidth={2} className="size-4" />
                  <span>{page.name}</span>
                  <CommandShortcut>{page.shortcut}</CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandSeparator />

            {/* Components by Category */}
            {allCategories.map((category) => (
              <CommandGroup
                key={category}
                heading={category.charAt(0).toUpperCase() + category.slice(1)}
              >
                {componentsByCategory[category].map((component) => (
                  <CommandItem
                    key={component.slug}
                    onSelect={() =>
                      runCommand(() => navigate(`/components/${component.slug}`))
                    }
                  >
                    <HugeiconsIcon icon={GridIcon} strokeWidth={2} className="size-4" />
                    <span>{component.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}

            <CommandSeparator />

            {/* Dashboards */}
            <CommandGroup heading="Dashboards">
              {dashboards.map((dashboard) => (
                <CommandItem
                  key={dashboard.slug}
                  onSelect={() =>
                    runCommand(() => navigate(`/dashboard/${dashboard.slug}`))
                  }
                >
                  <HugeiconsIcon icon={SidebarLeft01Icon} strokeWidth={2} className="size-4" />
                  <span>{dashboard.name}</span>
                  {dashboard.comingSoon && (
                    <span className="ml-2 text-xs text-muted-foreground">(Coming Soon)</span>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}

export default CommandPalette;
