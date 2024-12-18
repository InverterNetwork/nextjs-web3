'use client'

import { Global } from '@emotion/react'
import { dynamicTheme } from '@/styles/dynamic-theme'
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum'
import {
  DynamicContextProvider,
  DynamicUserProfile,
  mergeNetworks,
} from '@dynamic-labs/sdk-react-core'
import { DynamicWagmiConnector } from '@dynamic-labs/wagmi-connector'
import { WagmiProvider, createConfig, http } from 'wagmi'
import { Chain, HttpTransport } from 'viem'
import { optimismSepolia, polygonAmoy } from 'viem/chains'
import { useMemo, useState } from 'react'
import { isEqual } from 'lodash'
import { dynamicChainsToViem, viemChainsToDynamic } from '@/utils'

const chains = [polygonAmoy, optimismSepolia] as const

const getConfig = (chains: readonly [Chain, ...Chain[]]) =>
  createConfig({
    chains: chains,
    multiInjectedProviderDiscovery: false,
    transports: chains.reduce(
      (acc, chain) => {
        acc[chain.id] = http()
        return acc
      },
      {} as Record<number, HttpTransport>
    ),
    ssr: true,
  })

export function ConnectorProvider({ children }: { children: React.ReactNode }) {
  const [evmNetworks, setEvmNetworks] = useState(viemChainsToDynamic(chains))
  const { shadowDomOverWrites, cssOverrides } = dynamicTheme

  const config = useMemo(
    () => getConfig(dynamicChainsToViem(evmNetworks)),
    [evmNetworks]
  )

  // RENDER
  return (
    <>
      <Global styles={shadowDomOverWrites} />
      <DynamicContextProvider
        settings={{
          environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ID || '',
          cssOverrides,
          walletConnectors: [EthereumWalletConnectors],
          initialAuthenticationMode: 'connect-only',
          overrides: {
            evmNetworks: (dashboardNetworks) => {
              const newEvmNetworks = mergeNetworks(
                dashboardNetworks,
                evmNetworks
              )

              if (!isEqual(newEvmNetworks, evmNetworks))
                setEvmNetworks(newEvmNetworks)

              return evmNetworks
            },
          },
        }}
      >
        <WagmiProvider config={config} reconnectOnMount>
          <DynamicWagmiConnector>
            {children}
            <DynamicUserProfile variant="modal" />
          </DynamicWagmiConnector>
        </WagmiProvider>
      </DynamicContextProvider>
    </>
  )
}
