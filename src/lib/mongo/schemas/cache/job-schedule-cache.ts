import { JobScheduleCache } from '@/types'

import { EJobType } from '@/types'
import { Schema } from 'mongoose'

export const JobScheduleCacheSchema = new Schema<JobScheduleCache>({
  data: {
    jobType: { type: String, enum: EJobType, required: true },
    schedule: { type: String, required: true },
  },
})
