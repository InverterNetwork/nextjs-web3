import { EvmNetwork } from '@dynamic-labs/sdk-react'
import { ExtendedChain } from '@lifi/sdk'

export const transformLifiChainsToDynamicEvmNetworks = (
  chains: ExtendedChain[]
): EvmNetwork[] | undefined => {
  if (!chains) return undefined
  return chains.map((i) => {
    const { key, name, logoURI, metamask, id } = i

    const { chainId, blockExplorerUrls, chainName, nativeCurrency, rpcUrls } =
      metamask

    return {
      blockExplorerUrls,
      chainId: Number(chainId), // Assuming chainId is a hexadecimal string
      chainName,
      iconUrls: logoURI ? [logoURI] : [],
      nativeCurrency,
      networkId: id,
      rpcUrls,
      shortName: key,
      vanityName: name,
      name,
    }
  })
}
