import type { Chain } from 'viem'
import type { GenericNetwork } from '@dynamic-labs/types'

export default function dynamicChainsToViem(chains: GenericNetwork[]) {
  return chains.map((chain) => {
    return {
      id: Number(chain.chainId),
      name: chain.name,
      nativeCurrency: chain.nativeCurrency,
      rpcUrls: {
        default: {
          http: chain.rpcUrls,
        },
      },
      blockExplorers:
        chain.blockExplorerUrls.length > 0
          ? {
              default: {
                url: chain.blockExplorerUrls[0],
                name: `${chain.name} Explorer`,
              },
            }
          : undefined,
    } satisfies Chain
  }) as unknown as readonly [Chain, ...Chain[]]
}
