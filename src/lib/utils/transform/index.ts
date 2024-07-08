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
    137: 'https://icons.llamao.fi/icons/chains/rsz_polygon.jpg',
    80_002: 'https://icons.llamao.fi/icons/chains/rsz_polygon.jpg',
    10: 'https://icons.llamao.fi/icons/chains/rsz_optimism.jpg',
    250: 'https://icons.llamao.fi/icons/chains/rsz_fantom.jpg',
    43114: 'https://icons.llamao.fi/icons/chains/rsz_avalanche.jpg',
    8453: 'https://icons.llamao.fi/icons/chains/rsz_base.jpg',
    59144: 'https://icons.llamao.fi/icons/chains/rsz_linea.jpg',
    100: 'https://icons.llamao.fi/icons/chains/rsz_xdai.jpg',
    42220: 'https://icons.llamao.fi/icons/chains/rsz_celo.jpg',
    11155420: 'https://icons.llamao.fi/icons/chains/rsz_optimism.jpg',
  } as Record<number, string>

  if (available[chainId]) return available[chainId]

  return 'https://chainlist.org/unknown-logo.png'
}
