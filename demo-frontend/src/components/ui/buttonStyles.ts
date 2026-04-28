import { cn } from '../../lib/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md'

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(var(--ring),0.22)] disabled:opacity-50 disabled:pointer-events-none'

const variants: Record<ButtonVariant, string> = {
  primary:
    'border-transparent bg-gradient-to-b from-[rgba(var(--accent),1)] to-[rgba(var(--accent-2),1)] text-white shadow-soft hover:brightness-[0.98] active:brightness-[0.96]',
  secondary:
    'border-[rgb(var(--border))] bg-[rgba(var(--fg),0.02)] text-[rgb(var(--fg))] hover:bg-[rgba(var(--fg),0.04)] active:bg-[rgba(var(--fg),0.06)]',
  ghost:
    'border-transparent bg-transparent text-[rgb(var(--fg))] hover:bg-[rgba(var(--fg),0.04)] active:bg-[rgba(var(--fg),0.06)]',
  danger:
    'border-transparent bg-[#ef4444] text-white hover:bg-[#dc2626] focus-visible:ring-[rgba(239,68,68,0.22)]',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'h-8 px-2.5 py-1.5',
  md: 'h-9 px-3 py-2',
}

export function buttonClassName({
  variant = 'secondary',
  size = 'md',
  className,
}: {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}) {
  return cn(base, variants[variant], sizes[size], className)
}

