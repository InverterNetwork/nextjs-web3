// import type { ExtendedChain } from '@lifi/sdk'
// import type { Chain } from 'viem'
// import { mainnet } from 'viem/chains'

// export default function lifiChainsToViemChains(
//   chains: ExtendedChain[] | undefined
// ): readonly [Chain, ...Chain[]] {
//   return [
//     mainnet,
//     ...(chains || [])
//       .map((i) => {
//         if (i.id === mainnet.id) return null
//         const chain: Chain = {
//           id: i.id,
//           name: i.name,
//           nativeCurrency: {
//             name: i.nativeToken.name,
//             symbol: i.nativeToken.symbol,
//             decimals: i.nativeToken.decimals,
//           },
//           rpcUrls: {
//             default: { http: i.metamask.rpcUrls },
//             public: { http: i.metamask.rpcUrls },
//           },
//           blockExplorers: {
//             default: {
//               name: i.name + ' Explorer',
//               url: i.metamask.blockExplorerUrls[0],
//             },
//           },
//           contracts: {
//             multicall3: {
//               address: i?.multicallAddress as `0x${string}`,
//             },
//           },
//           testnet: !i.mainnet,
//         }

//         return chain
//       })
//       .filter((i): i is Chain => i !== null),
//   ]
// }
