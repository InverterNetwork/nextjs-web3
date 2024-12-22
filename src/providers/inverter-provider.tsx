'use client'

import { InverterProvider as InverterProviderCore } from '@inverter-network/react/client'
import { useTheme } from 'next-themes'

export function InverterProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()

  return (
    <InverterProviderCore
      themeConfig={{
        theme: theme as 'light' | 'dark' | 'system' | undefined,
      }}
    >
      {children}
    </InverterProviderCore>
  )
}
