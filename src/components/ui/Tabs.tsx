'use client'

import { cn } from '@/styles/cn'
import { Tabs as DaisyTabs, type TabsProps } from '@/react-daisyui'

const { Tab } = DaisyTabs

export function Tabs({
  tabs,
  tab,
  setTab,
  ...props
}: {
  tabs?: string[]
  tab: number
  setTab(page: number): void
} & TabsProps) {
  const { className, ...rest } = props
  return (
    <DaisyTabs {...rest} className={cn(className, 'border border-faint')}>
      {(tabs ?? []).map((i, index) => (
        <Tab
          key={index}
          role="tab"
          active={index === tab}
          onClick={() => setTab(index)}
        >
          {i}
        </Tab>
      ))}
    </DaisyTabs>
  )
}
