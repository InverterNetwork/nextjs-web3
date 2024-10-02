import type { Chain } from 'viem'
import type { GenericNetwork } from '@dynamic-labs/types'
import { getLogo } from '.'

export default function viemChainsToDynamic(
  chains: readonly Chain[]
): GenericNetwork[] {
  return chains.map((chain) => {
    return {
      chainId: chain.id,
      networkId: chain.id,
      name: chain.name,
      lcdUrl: undefined,
      chainName: undefined,
      nameService: undefined,
      iconUrls: [getLogo(chain.id)],
      nativeCurrency: chain.nativeCurrency,
      rpcUrls: Object.values(chain.rpcUrls).flatMap((rpcUrl) => rpcUrl.http),
      privateCustomerRpcUrls: undefined,
      blockExplorerUrls: chain.blockExplorers
        ? Object.values(chain.blockExplorers).map(
            (blockExplorer) => blockExplorer.url
          )
        : [],
      vanityName: undefined,
    }
  })
}
