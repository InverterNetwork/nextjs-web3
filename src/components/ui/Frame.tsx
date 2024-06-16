import { cn } from '@/styles/cn'

export function Frame({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={cn('frame', className)}>{children}</div>
}
