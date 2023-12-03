'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ReduxProvider from '../lib/store/ReduxProvider'
import ConnectorProvider from './ConnectorProvider'
import AppProvider from './appContext'

const queryClient = new QueryClient()

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider>
        <ConnectorProvider>
          <AppProvider>
            {/* STYLE PROVIDERS AND CHILDREN */}
            {children}
          </AppProvider>
        </ConnectorProvider>
      </ReduxProvider>
    </QueryClientProvider>
  )
}

export * from './appContext'
