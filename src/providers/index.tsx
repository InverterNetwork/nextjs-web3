'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ConnectorProvider } from './connector-provider'
import { AppProvider } from './app-context'
import { ThemeProvider } from './theme-provider'
import { InverterProvider } from './inverter-provider'

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ConnectorProvider>
        <AppProvider>
          <ThemeProvider attribute="data-theme">
            <InverterProvider>
              {/* CHILDREN */}
              {children}
            </InverterProvider>
          </ThemeProvider>
        </AppProvider>
      </ConnectorProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
