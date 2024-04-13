import { retry } from 'ts-retry-promise'
import { type Hex } from 'viem'
import { type UsePublicClientReturnType } from 'wagmi'

export const waitUntilConfirmation = async (
  publicClient: UsePublicClientReturnType,
  hash?: Hex,
  confirmations = 1
) => {
  if (!hash) throw new Error('No transaction hash provided')
  if (!publicClient) throw new Error('No public client provided')
  await retry(
    () => {
      return publicClient.getTransactionConfirmations({
        hash: hash!,
      })
    },
    {
      retries: 'INFINITELY',
      delay: 5_000,
      timeout: 300_000,
      until: (res) => Number(res) >= confirmations,
      retryIf(error) {
        return ['could not be found', 'connection'].some((str) =>
          error.message.includes(str)
        )
      },
    }
  )
}
