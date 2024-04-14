'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ReduxProvider from '@/lib/store/ReduxProvider'
import ConnectorProvider from './ConnectorProvider'
import AppProvider from './appContext'
import ThemeProvider from './themeContext'

const queryClient = new QueryClient()

export default function Providers({
  children,
  theme,
}: {
  children: React.ReactNode
  theme: 'light' | 'dark'
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider>
        <ThemeProvider initialTheme={theme}>
          <ConnectorProvider>
            <AppProvider>
              {/* CHILDREN */}
              {children}
            </AppProvider>
          </ConnectorProvider>
        </ThemeProvider>
      </ReduxProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
