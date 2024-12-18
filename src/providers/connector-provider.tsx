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
import {
  optimismSepolia,
  polygonAmoy,
  baseSepolia,
  gnosisChiado,
  polygonZkEvm,
  polygonZkEvmCardona,
} from 'viem/chains'
import { dynamicChainsToViem, viemChainsToDynamic } from '@/utils'
import { useMemo, useState } from 'react'
import { isEqual } from 'lodash'

const chains = [
  polygonAmoy,
  optimismSepolia,
  baseSepolia,
  gnosisChiado,
  polygonZkEvm,
  polygonZkEvmCardona,
] as const

const drpcApiKey = process.env.NEXT_PUBLIC_DRPC_API_KEY

const drpcChainIdMap = {
  1: 'ethereum',
  11155111: 'sepolia',
  10: 'optimism',
  11155420: 'optimism-sepolia',
  84532: 'base-sepolia',
  1101: 'polygon-zkevm',
  2442: 'polygon-zkevm-cardona',
} as Record<number, string | undefined>

const getTransport = (chainId: number) => {
  const chainIdMap = drpcChainIdMap?.[chainId]

  if (!drpcApiKey || !chainIdMap) return http()

  return http(
    `https://lb.drpc.org/ogrpc?network=${chainIdMap}&dkey=${drpcApiKey}`
  )
}

const getConfig = (chains: readonly [Chain, ...Chain[]]) =>
  createConfig({
    chains: chains,
    multiInjectedProviderDiscovery: false,
    transports: chains.reduce(
      (acc, chain) => {
        acc[chain.id] = getTransport(chain.id)
        return acc
      },
      {} as Record<number, HttpTransport>
    ),
    ssr: true,
    cacheTime: 5000, // 3 seconds
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
