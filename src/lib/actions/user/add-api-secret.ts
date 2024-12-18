'use server'

import { CalledFrom } from '@/types'
import { UserModel } from '@/lib/mongo'
import { serverActionWrapper } from '@/utils'
import { hashApiSecret, ownerOnly } from '@/utils/server/authorization'
import crypto from 'crypto'

export async function addApiSecret<C extends CalledFrom>(
  calledFrom: C,
  title: string
) {
  return await serverActionWrapper(async () => {
    const { address } = await ownerOnly()

    const newSecret = crypto.randomUUID()
    const hashedSecret = await hashApiSecret(newSecret)
    const uid = crypto.randomUUID()

    await UserModel.findOneAndUpdate(
      { address: address },
      {
        $push: {
          apiSecrets: {
            title,
            hashedSecret,
            uid,
          },
        },
      },
      { new: false }
    )

    return `${uid}:${newSecret}`
  }, calledFrom)
}
