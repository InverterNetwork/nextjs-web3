import { Inverter } from '@inverter-network/sdk'
import { useMemo } from 'react'
import { usePublicClient, useWalletClient } from 'wagmi'

export const useInverterHandler = () => {
  const publicClient = usePublicClient(),
    walletClient = useWalletClient(),
    chainId = publicClient?.chain.id

  const inverter = useMemo(() => {
    if (!publicClient) return

    const instance = new Inverter({
      publicClient,
      walletClient: walletClient.data,
    })

    // use math.random() as fallback for crypto.randomUUID() between 1 and 10000
    const instanceId =
      crypto?.randomUUID?.() ?? Math.floor(Math.random() * 10000)

    return Object.assign(instance, { instanceId })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, walletClient.isSuccess])

  return inverter
}
