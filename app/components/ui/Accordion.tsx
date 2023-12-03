import cn from 'classnames'

export default function Accordion({
  items,
  ...props
}: {
  items?: Record<'label' | 'content', string>[]
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) {
  const { className, ...rest } = props
  return (
    <div className={cn('flex flex-col gap-3', className)} {...rest}>
      {(items ?? []).map((i, index) => (
        <div className="collapse collapse-arrow bg-base-200" key={index}>
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium">{i.label}</div>
          <div className="collapse-content">
            <p>{i.content}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
