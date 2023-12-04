'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ReduxProvider from '../lib/store/ReduxProvider'
import ConnectorProvider from './ConnectorProvider'
import { Theme } from 'react-daisyui'
import AppProvider from './appContext'

const queryClient = new QueryClient()

export default function Providers({
  children,
  theme,
}: {
  children: React.ReactNode
  theme: string
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider>
        <Theme dataTheme={theme}>
          <ConnectorProvider>
            <AppProvider>
              {/* STYLE PROVIDERS AND CHILDREN */}
              {children}
            </AppProvider>
          </ConnectorProvider>
        </Theme>
      </ReduxProvider>
    </QueryClientProvider>
  )
}

export * from './appContext'
