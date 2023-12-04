'use client'

import cn from 'classnames'
import { Accordion as DaisyAccordion } from 'react-daisyui'

export default function Accordion({
  items,
  ...props
}: {
  items?: { label: string; content: React.ReactNode }[]
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) {
  const { className, ...rest } = props
  return (
    <div className={cn('flex flex-col gap-3', className)} {...rest}>
      {(items ?? []).map((i, index) => (
        <DaisyAccordion className="bg-base-200" defaultChecked key={index}>
          <DaisyAccordion.Title className="text-xl font-medium">
            {i.label}
          </DaisyAccordion.Title>
          <DaisyAccordion.Content>{i.content}</DaisyAccordion.Content>
        </DaisyAccordion>
      ))}
    </div>
  )
}
