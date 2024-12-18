'use server'

import { UserModel } from '@/lib/mongo'
import { CalledFrom } from '@/types'
import { serverActionWrapper } from '@/utils'
import { ownerOnly } from '@/utils/server/authorization'

export async function updateWebHookUrl<C extends CalledFrom>(
  calledFrom: C,
  url: string
) {
  return await serverActionWrapper(async () => {
    const { address } = await ownerOnly()

    await UserModel.findOneAndUpdate(
      { address },
      {
        webHookUrl: url,
      },
      { new: false }
    )
  }, calledFrom)
}
