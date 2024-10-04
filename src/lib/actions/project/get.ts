'use server'

import { CalledFrom, ProjectGetReturnType } from '@/types'
import utils, { HTTPError } from '@/utils'
import server from '@/utils/server'
import mongo from '@/lib/mongo'
import { Hex } from 'viem'

/**
 *
 * @param param0
 * @param param0.calledFrom - The origin of the request.
 * @param param0.identifier - The project's UID, owner address, or orchestrator address.
 * @returns The project DTO.
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

    const project = await mongo.model.Project.findOne({
      $or: [
        { uid: identifier },
        { ownerAddress: identifier },
        { orchestratorAddress: identifier },
      ],
    })

    if (!project) throw new HTTPError('Project not found', 404)

    const { _id, ...pruned } = project.toObject()

    return pruned satisfies ProjectGetReturnType
  }, calledFrom)
}
