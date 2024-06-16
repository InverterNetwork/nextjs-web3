'use client'

import {
  type AccordionProps,
  Accordion as DaisyAccordion,
} from '@/react-daisyui'

export function Accordion({
  items,
  ...props
}: {
  items?: { label: string; content: React.ReactNode }[]
} & AccordionProps) {
  return (
    <>
      {(items ?? []).map((i, index) => (
        <DaisyAccordion key={index} data-index={index} {...props}>
          <DaisyAccordion.Title className="text-xl font-medium">
            {i.label}
          </DaisyAccordion.Title>
          <DaisyAccordion.Content>{i.content}</DaisyAccordion.Content>
        </DaisyAccordion>
      ))}
    </>
  )
}
