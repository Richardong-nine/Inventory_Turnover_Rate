import * as React from 'react'
import { cn } from '../../lib/cn'

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  subtle?: boolean
}

export function Card({ className, subtle, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border bg-[rgb(var(--card))] p-4 shadow-soft',
        subtle && 'bg-[rgba(var(--fg),0.015)]',
        className,
      )}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mb-3 flex items-start justify-between gap-3', className)} {...props} />
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('text-sm font-semibold tracking-tight', className)} {...props} />
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('text-sm text-muted', className)} {...props} />
}

