import { cn } from '@/styles/cn'

export default function Frame({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const classes = cn(
    'container bg-base-100 rounded-box flex gap-3 mx-auto p-4 border input-bordered',
    className,
    !className?.includes('flex-row') && 'flex-col'
  )
  return <div className={classes}>{children}</div>
}
