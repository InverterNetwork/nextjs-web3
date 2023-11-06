'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import ReduxProvider from '../lib/store/ReduxProvider'
import ConnectorProvider from './ConnectorProvider'
import AppProvider from './appContext'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '@/lib'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <ConnectorProvider>
        <AppProvider>
          {/* STYLE PROVIDERS AND CHILDREN */}
          <CacheProvider>
            <ChakraProvider theme={theme}>{children}</ChakraProvider>
          </CacheProvider>
        </AppProvider>
      </ConnectorProvider>
    </ReduxProvider>
  )
}
