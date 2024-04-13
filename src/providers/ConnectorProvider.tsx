'use client'

import { Global } from '@emotion/react'
import { lifi } from '@/lib'
import { getDynamicTheme } from '../styles/dynamicTheme'
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum'
import { MagicEvmWalletConnectors } from '@dynamic-labs/magic'
import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core'
import { DynamicWagmiConnector } from '@dynamic-labs/wagmi-connector'
import { useEffect, useState } from 'react'
import { useTheme } from '@/hooks'
import { WagmiProvider, createConfig, http } from 'wagmi'
import { transform } from '@/lib/utils'

export default function ConnectorProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { theme } = useTheme()
  const { cssOverrides, shadowDomOverWrites } = getDynamicTheme(
    theme === 'light'
  )

  const [lifiChains, setLifiChains] = useState<
    Awaited<ReturnType<typeof lifi.getChains>> | undefined
  >(undefined)

  useEffect(() => {
    lifi.getChains().then(setLifiChains)
  }, [])

  const evmNetworks = transform.lifiChainsToDynamic(lifiChains)
  const wagmiChains = transform.lifiChainsToViem(lifiChains)

  const config = createConfig({
    chains: wagmiChains,
    multiInjectedProviderDiscovery: false,
    transports: wagmiChains?.reduce(
      (acc, chain) => {
        acc[chain.id] = http()
        return acc
      },
      {} as Record<string, ReturnType<typeof http>>
    ),
    ssr: true,
  })

  // RENDER
  return (
    <>
      <Global styles={shadowDomOverWrites} />
      <DynamicContextProvider
        settings={{
          environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ID || '',
          cssOverrides,
          walletConnectors: [
            EthereumWalletConnectors,
            MagicEvmWalletConnectors,
          ],
          overrides: {
            evmNetworks,
          },
        }}
      >
        <WagmiProvider config={config}>
          <DynamicWagmiConnector>{children}</DynamicWagmiConnector>
        </WagmiProvider>
      </DynamicContextProvider>
    </>
  )
}
