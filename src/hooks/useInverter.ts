import { Inverter } from '@inverter-network/sdk'
import { useQuery } from '@tanstack/react-query'
import { usePublicClient, useWalletClient } from 'wagmi'

export const useInverter = () => {
  const publicClient = usePublicClient(),
    walletClient = useWalletClient(),
    chainId = publicClient?.chain.id

  const inverter = useQuery({
    queryKey: ['inverter', chainId, walletClient.data?.account.address],
    queryFn: () => {
      if (!publicClient) return

      const instance = Inverter.getInstance({
        publicClient,
        walletClient: walletClient.data,
      })

      return instance
    },
  })

  return inverter
}
