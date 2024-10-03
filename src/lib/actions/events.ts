// This File Can Not Contain use server or use client,
// it is meant to be consumed by next.js instrumentation.ts

import { EventType, model } from '@/lib/mongo'

export async function insertEvent({
  uid,
  type,
}: {
  uid: string
  type: EventType
}) {
  const isNotUnique = await model.Cache.EVENT.exists({
    'data.uid': uid,
    'data.operationType': { $ne: type },
  })

  if (isNotUnique) throw new Error('Event already exists')

  const event = new model.Cache.EVENT({
    data: { uid, type },
  })

  await event.save()
}

export async function clearOldEvents(hour = 1) {
  const now = new Date()
  const hoursAgo = new Date(now.getTime() - 1000 * 60 * 60 * hour)

  await model.Cache.EVENT.deleteMany({
    updatedAt: { $lte: hoursAgo },
  })
}
