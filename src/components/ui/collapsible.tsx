'use client'

import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

const Compined = Object.assign(Collapsible, {
  Trigger: CollapsibleTrigger,
  Content: CollapsibleContent,
})

export { Compined as Collapsible }
