import { cn } from '@/utils'

export function Frame({
  className,
  children,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) {
  return (
    <div className={cn('frame', className)} {...props}>
      {children}
    </div>
  )
}
