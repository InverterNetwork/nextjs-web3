import type { GetPublicClientReturnType } from '@wagmi/core'
import { retry } from 'ts-retry-promise'
import { type Hex } from 'viem'

export const waitUntilConfirmation = async (
  publicClient: NonNullable<GetPublicClientReturnType>,
  hash?: Hex,
  confirmations = 1
) => {
  if (!hash) throw new Error('No transaction hash provided')
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
        console.log(error)
        return ['could not be found', 'connection'].some((str) =>
          error.message.includes(str)
        )
      },
    }
  )
}
