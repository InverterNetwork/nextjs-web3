import cn from 'classnames'

export default function Tab({
  tabs,
  tab,
  setTab,
  ...props
}: {
  tabs?: string[]
  tab: number
  setTab(page: number): void
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) {
  const { className, ...rest } = props
  return (
    <div role="tablist" className={cn('tabs tabs-boxed', className)} {...rest}>
      {(tabs ?? []).map((i, index) => (
        <a
          key={index}
          role="tab"
          className={`tab ${index === tab && 'tab-active'}`}
          onClick={() => setTab(index)}
        >
          {i}
        </a>
      ))}
    </div>
  )
}
