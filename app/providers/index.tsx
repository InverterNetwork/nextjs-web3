'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ReduxProvider from '../lib/store/ReduxProvider'
import ConnectorProvider from './ConnectorProvider'
import { ChakraProvider, cookieStorageManager } from '@chakra-ui/react'
import AppProvider from './appContext'
import theme from '@/lib/styles/theme'

const queryClient = new QueryClient()

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme} colorModeManager={cookieStorageManager}>
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
    </ChakraProvider>
  )
}

export * from './appContext'
