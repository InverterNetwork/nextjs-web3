import { EventData } from './api'
import { JobType } from './job'

export enum ECacheStatus {
  FRESH = 'FRESH',
  PENDING = 'PENDING',
  STALE = 'STALE',
}

export type CacheStatus = keyof typeof ECacheStatus

export enum ECacheType {
  EVENT = 'EVENT',
  JOB_SCHEDULE = 'JOB_SCHEDULE',
}

export type CacheType = keyof typeof ECacheType

export interface CacheBase {
  type: CacheType
  status: CacheStatus
  createdAt: Date
  updatedAt: Date
}

export interface EventCache extends CacheBase {
  type: 'EVENT'
  data: EventData
}

export interface JobScheduleCache extends CacheBase {
  type: 'JOB_SCHEDULE'
  data: {
    jobType: JobType
    schedule: string
  }
}
