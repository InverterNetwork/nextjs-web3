import viemChainsToDynamic from './viemChainsToDynamic'
import dynamicChainsToViem from './dynamicChainsToViem'
// import lifiChainsToViem from './lifiChainsToViem'
// import lifiChainsToDynamic from './lifiChainsToDynamic'

export default {
  viemChainsToDynamic,
  dynamicChainsToViem,
  // lifiChainsToViem,
  // lifiChainsToDynamic,
}

export const getLogo = (chainId: number) => {
  const available = {
    1: 'https://icons.llamao.fi/icons/chains/rsz_ethereum.jpg',
  } as Record<number, string>

  if (available[chainId]) return available[chainId]

  return 'https://chainlist.org/unknown-logo.png'
}
