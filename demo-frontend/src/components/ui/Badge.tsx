import { cn } from '../../lib/cn'

type Tone = 'red' | 'yellow' | 'green' | 'slate' | 'violet'

export function Badge({
  className,
  tone = 'slate',
  children,
}: {
  className?: string
  tone?: Tone
  children: React.ReactNode
}) {
  const tones: Record<Tone, string> = {
    red: 'border-red-200 bg-red-50 text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200',
    yellow:
      'border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-200',
    green:
      'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-200',
    slate:
      'border-[rgb(var(--border))] bg-[rgba(var(--fg),0.03)] text-[rgb(var(--fg))]',
    violet:
      'border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-900/60 dark:bg-violet-950/35 dark:text-violet-200',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

