// This File Can Not Contain use server or use client,
// it is meant to be consumed by next.js instrumentation.ts

import { CacheModel } from '../models'
import { EventType } from '../types'

export async function insertEvent({
  uid,
  type,
}: {
  uid: string
  type: EventType
}) {
  const isNotUnique = await CacheModel.Event.exists({
    'data.uid': uid,
    'data.operationType': { $ne: type },
  })

  if (isNotUnique) throw new Error('Event already exists')

  const event = new CacheModel.Event({
    data: { uid, type },
  })

  await event.save()
}

export async function clearOldEvents(hour = 1) {
  const now = new Date()
  const hoursAgo = new Date(now.getTime() - 1000 * 60 * 60 * hour)

  await CacheModel.Event.deleteMany({
    updatedAt: { $lte: hoursAgo },
  })
}
