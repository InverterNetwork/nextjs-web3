export * from './viem-chains-to-dynamic'
export * from './dynamic-chains-to-viem'
// import lifiChainsToViem from './lifiChainsToViem'
// import lifiChainsToDynamic from './lifiChainsToDynamic'

import { ChainLogo } from '@api3/logos'

export const getLogo = (chainId?: number) => {
  const fallback = (ChainLogo('1') as any)?.src || ChainLogo('1')

  if (!chainId) return fallback

  const available =
    (ChainLogo(chainId.toString()) as any)?.src || ChainLogo(chainId.toString())

  if (available) return available

  return fallback
}
