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
import {
  InputGroup,
  InputGroupAddon,
} from "@/components/ui/input-group"
import { HugeiconsIcon } from "@hugeicons/react"
import { SearchIcon, Tick02Icon } from "@/lib/hugeicons"

function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        "bg-popover text-popover-foreground rounded-xl p-1.5 flex size-full flex-col overflow-hidden shadow-lg border border-border/50",
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
          "rounded-2xl top-1/4 translate-y-0 overflow-hidden sm:max-w-2xl md:max-w-3xl p-0 shadow-2xl border-2",
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
    <div data-slot="command-input-wrapper" className="p-2 pb-0">
      <InputGroup className="bg-input/40 hover:bg-input/50 transition-colors border-input/40 focus-within:border-input/60 h-11 rounded-xl shadow-sm *:data-[slot=input-group-addon]:pl-3">
        <CommandPrimitive.Input
          data-slot="command-input"
          placeholder={placeholder}
          className={cn(
            "w-full text-base outline-hidden placeholder:text-muted-foreground/60 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        />
        <InputGroupAddon>
          <HugeiconsIcon
            icon={SearchIcon}
            strokeWidth={2}
            className="size-5 shrink-0 opacity-50 transition-opacity group-focus-within:opacity-70"
          />
        </InputGroupAddon>
      </InputGroup>
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
        "no-scrollbar max-h-[400px] md:max-h-[500px] scroll-py-2 outline-none overflow-x-hidden overflow-y-auto p-2",
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
        "**:[[cmdk-group-heading]]:text-muted-foreground **:[[cmdk-group-heading]]:px-3 **:[[cmdk-group-heading]]:py-2 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-semibold **:[[cmdk-group-heading]]:uppercase **:[[cmdk-group-heading]]:tracking-wider **:[[cmdk-group-heading]]:mb-1",
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
        "data-selected:bg-muted/80 data-selected:text-foreground data-selected:*:[svg]:text-foreground",
        "relative flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm outline-hidden select-none",
        "transition-colors duration-150",
        "in-data-[slot=dialog-content]:rounded-xl",
        "[&_svg:not([class*='size-'])]:size-5 group/command-item",
        "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-40 data-[disabled=true]:cursor-not-allowed",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0",
        "hover:bg-muted/50",
        className
      )}
      {...props}
    >
      {children}
      <HugeiconsIcon
        icon={Tick02Icon}
        strokeWidth={2.5}
        className="ml-auto opacity-0 transition-opacity group-has-data-[slot=command-shortcut]/command-item:hidden group-data-[checked=true]/command-item:opacity-100 text-primary"
      />
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
        "text-muted-foreground group-data-selected/command-item:text-foreground",
        "ml-auto text-xs tracking-widest font-mono px-2 py-0.5 rounded bg-muted/50 border border-border/50",
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