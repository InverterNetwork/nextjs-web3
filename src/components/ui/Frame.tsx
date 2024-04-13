import { cn } from '@/styles/cn'

export default function Frame({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        `container bg-base-100 rounded-box flex gap-3 
    mx-auto p-4 border border-faint flex-col`,
        className
      )}
    >
      {children}
    </div>
  )
}
