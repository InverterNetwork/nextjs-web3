'use server'

import { CalledFrom } from '@/types'
import { UserModel } from '@/lib/mongo'
import { serverActionWrapper } from '@/utils'
import type { Hex } from 'viem'

export async function getUser<C extends CalledFrom>(
  calledFrom: C,
  address?: Hex | string
) {
  return await serverActionWrapper(async () => {
    const user = await UserModel.findOne({ address })

    if (!user) throw new Error('User not found')

    const { _id, ...rest } = user.toObject()

    const apiSecrets = rest.apiSecrets.map(
      ({ updatedAt, hashedSecret, ...apiSecret }) => apiSecret
    )

    return { ...rest, apiSecrets }
  }, calledFrom)
}
