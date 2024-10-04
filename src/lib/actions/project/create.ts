'use server'

import { CalledFrom, ProjectCreateParams } from '@/types'
import utils from '@/utils'
import server from '@/utils/server'
import mongo, { ProjectGetReturnType } from '@/lib/mongo'

/**
 *
 * @param param0
 * @param param0.calledFrom - The origin of the request.
 * @param param0.params - The project's parameters.
 * @returns The project DTO.
 */
export async function create<C extends CalledFrom>({
  calledFrom,
  params,
}: {
  calledFrom: C
  params: ProjectCreateParams
}) {
  return await utils.serverActionWrapper(async () => {
    const address = await server.authorization.ownerOnly()

    const project = await mongo.model.Project.create({
      ...params,
      ownerAddress: address,
    })

    const { _id, ...pruned } = project.toObject()

    return pruned satisfies ProjectGetReturnType
  }, calledFrom)
}
