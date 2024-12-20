'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'sonner'
import { InverterProvider } from './inverter-provider'
import { ConnectorProvider } from './connector-provider'
import { ThemeProvider } from 'next-themes'
import { AppProvider } from './app-context'

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ConnectorProvider>
        <ThemeProvider attribute="data-theme" enableSystem>
          <InverterProvider>
            <AppProvider>
              {/* CHILDREN */}
              {children}
            </AppProvider>
          </InverterProvider>
        </ThemeProvider>
        <Toaster
          closeButton
          richColors
          position="bottom-right"
          duration={5_000}
        />
      </ConnectorProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
