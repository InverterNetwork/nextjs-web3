// import { type GenericNetwork } from '@dynamic-labs/types'
// import { type ExtendedChain } from '@lifi/sdk'

// export default function lifiChainsToDynamicChains(
//   chains?: ExtendedChain[]
// ): GenericNetwork[] | undefined {
//   if (!chains) return undefined
//   return chains.map((i) => {
//     const { key, name, logoURI, metamask, id } = i

//     const { chainId, blockExplorerUrls, chainName, nativeCurrency, rpcUrls } =
//       metamask

//     return {
//       blockExplorerUrls,
//       chainId: Number(chainId), // Assuming chainId is a hexadecimal string
//       chainName,
//       iconUrls: logoURI ? [logoURI] : [],
//       nativeCurrency,
//       networkId: id,
//       rpcUrls,
//       shortName: key,
//       vanityName: name,
//       name,
//     }
//   })
// }
