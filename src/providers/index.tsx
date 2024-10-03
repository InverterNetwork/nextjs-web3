'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReduxProvider } from '@/lib/store/redux-provider'
import { ConnectorProvider } from './connector-provider'
import { AppProvider } from './app-context'
import { ThemeProvider } from './theme-provider'

const queryClient = new QueryClient()

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider>
        <ConnectorProvider>
          <AppProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {/* CHILDREN */}
              {children}
            </ThemeProvider>
          </AppProvider>
        </ConnectorProvider>
      </ReduxProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
