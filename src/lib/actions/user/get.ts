'use server'

import { CalledFrom, UserGerReturnType } from '@/types'
import utils, { HTTPError } from '@/utils'
import server from '@/utils/server'
import mongo from '@/lib/mongo'
import { Hex } from 'viem'

/**
 * @param param0
 * @param param0.calledFrom - The origin of the request.
 * @param param0.identifier - The user's UID, address, or username.
 * @returns The user DTO.
 */
export async function get<C extends CalledFrom>({
  calledFrom,
  identifier,
}: {
  calledFrom: C
  identifier: string | Hex
}) {
  return await utils.serverActionWrapper(async () => {
    await server.connectDb()

    const user = await mongo.model.User.findOne({
      $or: [
        { uid: identifier },
        { ownerAddress: identifier },
        { orchestratorAddress: identifier },
      ],
    })

    if (!user) throw new HTTPError('User not found', 404)

    const { _id, ...pruned } = user.toObject()

    return pruned satisfies UserGerReturnType
  }, calledFrom)
}
