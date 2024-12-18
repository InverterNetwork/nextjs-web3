import { model, models } from 'mongoose'
import {
  CacheSchema,
  EventCacheSchema,
  JobScheduleCacheSchema,
} from '@/lib/mongo/schemas'
import { ECacheType, EventCache, JobScheduleCache } from '@/lib/mongo/types'

const setModels = () => {
  const Base = model('caches', CacheSchema)

  return {
    [ECacheType.EVENT]: Base.discriminator<EventCache>(
      ECacheType.EVENT,
      EventCacheSchema
    ),
    [ECacheType.JOB_SCHEDULE]: Base.discriminator<JobScheduleCache>(
      ECacheType.JOB_SCHEDULE,
      JobScheduleCacheSchema
    ),
  }
}

if (!models.caches) setModels()

export const CacheModel = {
  [ECacheType.EVENT]: models.caches.discriminators![ECacheType.EVENT],
  [ECacheType.JOB_SCHEDULE]:
    models.caches.discriminators![ECacheType.JOB_SCHEDULE],
} as ReturnType<typeof setModels>
