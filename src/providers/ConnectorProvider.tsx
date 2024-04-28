'use client'

import { Global } from '@emotion/react'
import { lifi } from '@/lib'
import { getDynamicTheme } from '@/styles/dynamicTheme'
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum'
import { MagicEvmWalletConnectors } from '@dynamic-labs/magic'
import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core'
import { DynamicWagmiConnector } from '@dynamic-labs/wagmi-connector'
import { useEffect, useMemo, useState } from 'react'
import { useTheme } from '@/hooks'
import { WagmiProvider, createConfig, http } from 'wagmi'
import utils from '@/lib/utils'

export default function ConnectorProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { theme } = useTheme(),
    { cssOverrides, shadowDomOverWrites } = useMemo(
      () => getDynamicTheme(theme === 'light'),
      [theme]
    )

  const [lifiChains, setLifiChains] = useState<
    Awaited<ReturnType<typeof lifi.getChains>> | undefined
  >(undefined)

  useEffect(() => {
    lifi.getChains().then(setLifiChains)
  }, [])

  const { evmNetworks, config } = useMemo(() => {
    const evmNetworks = utils.transform.lifiChainsToDynamic(lifiChains),
      chains = utils.transform.lifiChainsToViem(lifiChains),
      config = createConfig({
        chains,
        multiInjectedProviderDiscovery: false,
        transports: chains?.reduce(
          (acc, chain) => {
            acc[chain.id] = http()
            return acc
          },
          {} as Record<string, ReturnType<typeof http>>
        ),
        ssr: true,
      })

    return { evmNetworks, config }
  }, [lifiChains])

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
          <DynamicWagmiConnector suppressChainMismatchError>
            {children}
          </DynamicWagmiConnector>
        </WagmiProvider>
      </DynamicContextProvider>
    </>
  )
}
