'use client'

// import { CacheProvider } from '@chakra-ui/next-js'
import ReduxProvider from '../lib/store/ReduxProvider'
import ConnectorProvider from './ConnectorProvider'
import AppProvider from './appContext'
import { theme } from '@/lib'
import { ChakraProvider } from '@chakra-ui/react'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      {/* <CacheProvider> */}
      <ChakraProvider theme={theme}>
        <ConnectorProvider>
          <AppProvider>
            {/* STYLE PROVIDERS AND CHILDREN */}
            {children}
          </AppProvider>
        </ConnectorProvider>
      </ChakraProvider>
      {/* </CacheProvider> */}
    </ReduxProvider>
  )
}

export * from './appContext'
