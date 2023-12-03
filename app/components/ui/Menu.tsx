import cn from 'classnames'

export default function Menu({
  summary,
  items,
  isSub = false,
  children,
  ...props
}: {
  isSub?: boolean
  summary: string
  items: string[]
  children?: React.ReactNode
} & React.DetailedHTMLProps<
  React.DetailsHTMLAttributes<HTMLDetailsElement>,
  HTMLDetailsElement
>) {
  const { className, ...rest } = props
  return (
    <details
      {...(!isSub
        ? { className: cn('menu bg-base-200 rounded-box', className) }
        : { className })}
      {...rest}
    >
      <summary>{summary}</summary>
      <ul>
        {items.map((i, index) => (
          <li key={index}>
            <a>{i}</a>
          </li>
        ))}
        {children && <li>{children}</li>}
      </ul>
    </details>
  )
}
