import cn from 'classnames'

export default function Frame({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const classes = cn(
    'container bg-base-200 rounded-box flex gap-3 mx-auto p-4',
    className,
    !className?.includes('flex-row') && 'flex-col'
  )
  return <div className={classes}>{children}</div>
}
