'use client'

import ReduxProvider from '../lib/store/ReduxProvider'
import ConnectorProvider from './ConnectorProvider'
import AppProvider from './appContext'
import { theme } from '@/lib'
import { ChakraProvider, cookieStorageManager } from '@chakra-ui/react'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme} colorModeManager={cookieStorageManager}>
      <ReduxProvider>
        <ConnectorProvider>
          <AppProvider>
            {/* STYLE PROVIDERS AND CHILDREN */}
            {children}
          </AppProvider>
        </ConnectorProvider>
      </ReduxProvider>
    </ChakraProvider>
  )
}

export * from './appContext'
