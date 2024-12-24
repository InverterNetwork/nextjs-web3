import { http } from 'viem'

// DRPC API configuration
const drpcApiKey = process.env.NEXT_PUBLIC_DRPC_API_KEY

// Mapping of chain IDs to DRPC network identifiers
export const drpcChainIdMap = {
  1: 'ethereum',
  11155111: 'sepolia',
  10: 'optimism',
  11155420: 'optimism-sepolia',
  84532: 'base-sepolia',
  1101: 'polygon-zkevm',
  2442: 'polygon-zkevm-cardona',
} as Record<number, string | undefined>

/**
 * Creates an HTTP transport for a specific chain
 * Falls back to default HTTP transport if DRPC is not configured
 */
export const getDrpcTransport = (chainId: number) => {
  const chainIdMap = drpcChainIdMap?.[chainId]
  if (!drpcApiKey || !chainIdMap) return http()
  return http(
    `https://lb.drpc.org/ogrpc?network=${chainIdMap}&dkey=${drpcApiKey}`
  )
}
