'use client'

import { InverterProvider as InverterProviderCore } from '@inverter-network/react/client'
import { useTheme } from 'next-themes'

export function InverterProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()

  return (
    <InverterProviderCore
      themeConfig={{
        theme: theme as 'light' | 'dark' | 'system' | undefined,
        baseTheme: {
          primary: 'var(--primary)',
          'primary-foreground': 'var(--primary-foreground)',
          accent: 'var(--accent)',
          'accent-foreground': 'var(--accent-foreground)',
          destructive: 'var(--destructive)',
          'destructive-foreground': 'var(--destructive-foreground)',
          'chart-1': 'var(--chart-1)',
          'chart-2': 'var(--chart-2)',
          'chart-3': 'var(--chart-3)',
          'chart-4': 'var(--chart-4)',
          'chart-5': 'var(--chart-5)',
          radius: 'var(--radius)',
        },
        darkTheme: {
          background: 'var(--background)',
          foreground: 'var(--foreground)',
          card: 'var(--card)',
          'card-foreground': 'var(--card-foreground)',
          popover: 'var(--popover)',
          'popover-foreground': 'var(--popover-foreground)',
          secondary: 'var(--secondary)',
          'secondary-foreground': 'var(--secondary-foreground)',
          muted: 'var(--muted)',
          'muted-foreground': 'var(--muted-foreground)',
          border: 'var(--border)',
          input: 'var(--input)',
          ring: 'var(--ring)',
        },
        lightTheme: {
          background: 'var(--background)',
          foreground: 'var(--foreground)',
          card: 'var(--card)',
          'card-foreground': 'var(--card-foreground)',
          popover: 'var(--popover)',
          'popover-foreground': 'var(--popover-foreground)',
          secondary: 'var(--secondary)',
          'secondary-foreground': 'var(--secondary-foreground)',
          muted: 'var(--muted)',
          'muted-foreground': 'var(--muted-foreground)',
          border: 'var(--border)',
          input: 'var(--input)',
          ring: 'var(--ring)',
        },
      }}
    >
      {children}
    </InverterProviderCore>
  )
}
