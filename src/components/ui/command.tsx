import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"

import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { HugeiconsIcon } from "@hugeicons/react"
import { SearchIcon } from "@/lib/hugeicons"

function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        "bg-gray-100 dark:bg-neutral-800 text-foreground flex size-full flex-col overflow-hidden",
        className
      )}
      {...props}
    />
  )
}

function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  showCloseButton = false,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  title?: string
  description?: string
  className?: string
  showCloseButton?: boolean
}) {
  return (
    <Dialog {...props}>
      <DialogContent
        className={cn(
          "rounded-2xl top-1/4 translate-y-0 overflow-hidden sm:max-w-2xl md:max-w-3xl p-0 border border-black/10 dark:border-white/10 shadow-2xl",
          className
        )}
        showCloseButton={showCloseButton}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}

function CommandInput({
  className,
  placeholder = "Type a command or search...",
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div data-slot="command-input-wrapper" className="p-3">
      <div className="flex items-center bg-white dark:bg-neutral-900 px-3 h-12 rounded-xl border border-black/10 dark:border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,1)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-ring/50 transition-all">
        <HugeiconsIcon
          icon={SearchIcon}
          strokeWidth={2}
          className="size-5 shrink-0 opacity-50 mr-3"
        />
        <CommandPrimitive.Input
          data-slot="command-input"
          placeholder={placeholder}
          className={cn(
            "w-full flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        />
      </div>
    </div>
  )
}

function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        "no-scrollbar max-h-[400px] md:max-h-[500px] scroll-py-2 outline-none overflow-x-hidden overflow-y-auto p-2 pt-0",
        className
      )}
      {...props}
    />
  )
}

function CommandEmpty({
  className,
  children = "No results found.",
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className={cn("py-10 text-center text-sm text-muted-foreground", className)}
      {...props}
    >
      {children}
    </CommandPrimitive.Empty>
  )
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        "text-foreground overflow-hidden p-1.5 mb-2 last:mb-0",
        "**:[[cmdk-group-heading]]:text-muted-foreground **:[[cmdk-group-heading]]:px-3 **:[[cmdk-group-heading]]:py-2 **:[[cmdk-group-heading]]:text-[11px] **:[[cmdk-group-heading]]:font-semibold **:[[cmdk-group-heading]]:uppercase **:[[cmdk-group-heading]]:tracking-widest **:[[cmdk-group-heading]]:mb-1",
        className
      )}
      {...props}
    />
  )
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn("bg-border/60 -mx-1 h-px my-2", className)}
      {...props}
    />
  )
}

function CommandItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "data-selected:bg-white data-[selected='true']:bg-white dark:data-selected:bg-neutral-900 dark:data-[selected='true']:bg-neutral-900 data-selected:text-foreground data-selected:*:[svg]:text-foreground data-selected:shadow-sm dark:data-selected:shadow-none border border-transparent data-[selected='true']:border-black/5 dark:data-[selected='true']:border-white/5",
        "relative flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-sm outline-hidden select-none",
        "transition-all duration-150",
        "[&_svg:not([class*='size-'])]:size-5 group/command-item",
        "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-40 data-[disabled=true]:cursor-not-allowed",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      {...props}
    >
      {children}
      {/* <HugeiconsIcon
        icon={Tick02Icon}
        strokeWidth={2.5}
        className="ml-auto opacity-0 transition-opacity group-has-data-[slot=command-shortcut]/command-item:hidden group-data-[checked=true]/command-item:opacity-100 text-primary"
      /> */}
    </CommandPrimitive.Item>
  )
}

function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        "text-muted-foreground group-data-selected/command-item:text-foreground group-data-[selected='true']/command-item:text-foreground",
        "ml-auto text-[10px] font-mono font-medium min-w-[20px] h-5 px-1 flex items-center justify-center rounded bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10",
        className
      )}
      {...props}
    />
  )
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}