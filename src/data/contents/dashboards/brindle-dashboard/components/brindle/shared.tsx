import { cn } from '@/lib/utils'

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (!parts.length) return ''
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? ''
  return `${parts[0][0] ?? ''}${parts.at(-1)?.[0] ?? ''}`.toUpperCase()
}

export function NameAvatar({ name, className }: { name: string; className?: string }) {
  return (
    <div className={cn('flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-medium text-primary', className)}>
      {getInitials(name)}
    </div>
  )
}
