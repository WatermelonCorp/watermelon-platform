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
import {
  animatedComponentMetadata,
  allAnimatedCategories,
} from '@/data/animated-components-metadata';
// import { dashboards } from '@/data/dashboards';
// import { blocks } from '@/data/blocks';
import { HugeiconsIcon } from '@hugeicons/react';
import { trackEvent } from '@/lib/analytics';
import {
  Home01Icon,
  Book02Icon,
  Download04Icon,
  CodeIcon,
  CommandIcon,
  GridIcon,
  SearchIcon,
  // SidebarLeft01Icon,
  // LayoutIcon,
} from '@/lib/hugeicons';

// Page navigation items
const pages = [
  { name: 'Home', href: '/', icon: Home01Icon, shortcut: 'H' },
  { name: 'Components', href: '/components', icon: GridIcon, shortcut: 'U' },
  {
    name: 'Animated Components',
    href: '/animated-components',
    icon: Home01Icon,
    shortcut: 'C',
  },
  { name: 'Showcases', href: '/showcases', icon: GridIcon, shortcut: 'S' },
  // { name: 'Dashboards', href: '/dashboards', icon: LayoutIcon, shortcut: 'D' },
  // { name: 'Blocks', href: '/blocks', icon: GridIcon, shortcut: 'B' },

  {
    name: 'Installation',
    href: '/installation',
    icon: Download04Icon,
    shortcut: 'I',
  },
  {
    name: 'Framework Support',
    href: '/framework-support',
    icon: CodeIcon,
    shortcut: 'F',
  },
  { name: 'Developers', href: '/developers', icon: CodeIcon, shortcut: 'V' },
  { name: 'About', href: '/about', icon: Book02Icon, shortcut: 'A' },
  { name: 'Contact', href: '/contact', icon: Book02Icon, shortcut: 'N' },

  { name: 'Changelog', href: '/changelog', icon: CommandIcon, shortcut: 'G' },
  { name: 'Terms', href: '/terms', icon: Book02Icon, shortcut: 'T' },
  { name: 'Privacy', href: '/privacy', icon: Book02Icon, shortcut: 'P' },
  { name: 'Copyright', href: '/copyright', icon: Book02Icon, shortcut: 'R' },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Keyboard shortcut handler
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((currentOpen) => {
          const nextOpen = !currentOpen;
          if (nextOpen) {
            trackEvent('command_palette_open', { source: 'keyboard' });
          }
          return nextOpen;
        });
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  // Navigate and close
  const runCommand = useCallback((command: () => void) => {
    trackEvent('command_palette_select');
    setOpen(false);
    command();
  }, []);

  // Group components by category
  const componentsByCategory = useMemo(() => {
    const grouped: Record<string, typeof animatedComponentMetadata> = {};
    for (const category of allAnimatedCategories) {
      grouped[category] = animatedComponentMetadata.filter(
        (item) => item.category === category,
      );
    }
    return grouped;
  }, []);

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => {
          trackEvent('command_palette_open', { source: 'button' });
          setOpen(true);
        }}
        className="group text-muted-foreground hover:text-foreground hidden h-9 items-center justify-between gap-2 rounded-xl bg-gray-100 px-3 text-sm shadow-[inset_0_1px_0_0_rgba(255,255,255,1),0_0_0_1px_rgba(0,0,0,0.08),0_1px_2px_-1px_rgba(0,0,0,0.06),0_2px_4px_0px_rgba(0,0,0,0.04)] transition-all lg:flex lg:w-90 dark:bg-neutral-800 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_0_0_1px_rgba(255,255,255,0.1),0_1px_2px_-1px_rgba(0,0,0,0.06),0_2px_4px_0px_rgba(0,0,0,0.04)]"
      >
        <div className="flex items-center gap-2">
          <HugeiconsIcon icon={SearchIcon} strokeWidth={2} className="size-4" />
          <span className="hidden md:block">Search components...</span>
        </div>
        <kbd className="border-input/50 bg-muted/50 text-muted-foreground pointer-events-none flex h-5 items-center gap-0.5 rounded-md border px-1.5 font-mono text-[10px] leading-none font-medium select-none">
          <HugeiconsIcon icon={CommandIcon} size={13} />K
        </kbd>
      </button>

      {/* Command Dialog */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command
          className="rounded-xl"
          filter={(value, search, keywords = []) => {
            const extendValue =
              keywords.length > 0 ? keywords.join(' ') : value;
            const a = extendValue.toLowerCase();
            const b = search.toLowerCase();
            if (a === b) return 100;
            if (a.startsWith(b)) return 50;
            if (a.includes(b)) return 10;
            return 0;
          }}
        >
          <CommandInput placeholder="Type to search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>

            {/* Pages Group */}
            <CommandGroup heading="Pages">
              {pages.map((page) => (
                <CommandItem
                  key={page.href}
                  value={`page-${page.href}`}
                  keywords={[page.name, page.shortcut]}
                  onSelect={() => runCommand(() => navigate(page.href))}
                >
                  <HugeiconsIcon
                    icon={page.icon}
                    strokeWidth={2}
                    className="size-4"
                  />
                  <span>{page.name}</span>
                  <CommandShortcut>{page.shortcut}</CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandSeparator />

            {/* Components by Category */}
            {allAnimatedCategories.map((category) => (
              <CommandGroup
                key={category}
                heading={category.charAt(0).toUpperCase() + category.slice(1)}
              >
                {componentsByCategory[category].map((component) => (
                  <CommandItem
                    key={component.slug}
                    value={`component-${component.slug}`}
                    keywords={[component.name, category]}
                    onSelect={() =>
                      runCommand(() =>
                        navigate(`/animated-components/${component.slug}`),
                      )
                    }
                  >
                    <HugeiconsIcon
                      icon={GridIcon}
                      strokeWidth={2}
                      className="size-4"
                    />
                    <span>{component.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}

            {/* <CommandSeparator />
            <CommandGroup heading="Dashboards">
              {dashboards.map((dashboard) => (
                <CommandItem
                  key={dashboard.slug}
                  value={`dashboard-${dashboard.slug}`}
                  keywords={[dashboard.name, 'dashboard', dashboard.category]}
                  onSelect={() =>
                    runCommand(() => navigate(`/dashboard/${dashboard.slug}`))
                  }
                >
                  <HugeiconsIcon icon={SidebarLeft01Icon} strokeWidth={2} className="size-4" />
                  <span>{dashboard.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandSeparator />
            <CommandGroup heading="UI Blocks">
              {blocks.map((block) => (
                <CommandItem
                  key={block.slug}
                  value={`block-${block.slug}`}
                  keywords={[block.name, 'block', block.category]}
                  onSelect={() =>
                    runCommand(() => navigate(`/blocks/${block.slug}`))
                  }
                >
                  <HugeiconsIcon icon={LayoutIcon} strokeWidth={2} className="size-4" />
                  <span>{block.name}</span>
                </CommandItem>
              ))}
            </CommandGroup> */}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}

export default CommandPalette;
