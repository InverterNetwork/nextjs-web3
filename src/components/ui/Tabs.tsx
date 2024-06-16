'use client'

import { cn } from '@/styles/cn'
import { Tabs as DaisyTabs, type TabsProps } from '@/react-daisyui'

const { Tab } = DaisyTabs

export function Tabs({
  tabs,
  tab,
  setTab,
  textSize,
  responsive,
  ...props
}: {
  tabs?: any[]
  tab: number
  setTab(page: number): void
  textSize?: 'xs' | 'sm' | 'md' | 'lg'
  responsive?: boolean
} & TabsProps) {
  const { className, ...rest } = props

  const textSizeSw = textSize && `text-${textSize}`
  const mobileSw =
    responsive &&
    'flex flex-wrap gap-2 justify-center lg:grid lg:gap-0 lg:flex-nowrap lg:justify-normal'

  return (
    <DaisyTabs {...rest} className={cn(className, mobileSw)}>
      {(tabs ?? []).map((i, index) => {
        if (!i) return null

        return (
          <Tab
            className={cn(textSizeSw)}
            key={index}
            role="tab"
            active={index === tab}
            onClick={() => setTab(index)}
          >
            {i}
          </Tab>
        )
      })}
    </DaisyTabs>
  )
}
