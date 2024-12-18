'use server'

import { UserModel } from '@/lib/mongo'
import { CalledFrom } from '@/types'
import { serverActionWrapper } from '@/utils'
import { ownerOnly } from '@/utils/server/authorization'

export async function deleteApiSecret<C extends CalledFrom>(
  calledFrom: C,
  uid: string
) {
  return await serverActionWrapper(async () => {
    const { address } = await ownerOnly()

    // Find the user by address and remove the specific API secret
    await UserModel.findOneAndUpdate(
      { address, 'apiSecrets.uid': uid },
      {
        $pull: {
          apiSecrets: { uid },
        },
      },
      { new: false }
    )

    return { message: 'API Secret deleted successfully' }
  }, calledFrom)
}
