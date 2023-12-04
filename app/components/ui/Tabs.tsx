'use client'

import { Tabs as DaisyTabs } from 'react-daisyui'

const { Tab } = DaisyTabs

export default function Tabs({
  tabs,
  tab,
  setTab,
  ...props
}: {
  tabs?: string[]
  tab: number
  setTab(page: number): void
} & Parameters<typeof DaisyTabs>[0]) {
  return (
    <DaisyTabs {...props}>
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
