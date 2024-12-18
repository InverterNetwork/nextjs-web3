'use client'

import { InverterProvider as InverterProviderCore } from '@inverter-network/react/client'
import { useTheme } from 'next-themes'

export function InverterProvider({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme()

  return (
    <InverterProviderCore
      themeConfig={{
        theme: (resolvedTheme ?? 'dark') as 'light' | 'dark' | undefined,
      }}
    >
      {children}
    </InverterProviderCore>
  )
}
