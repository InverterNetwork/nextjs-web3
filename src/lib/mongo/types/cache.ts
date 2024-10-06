import { EventData } from './api'

export enum ECacheType {
  EVENT = 'EVENT',
}

export type CacheType = keyof typeof ECacheType

export interface CacheBase {
  type: CacheType
  idle?: boolean
  createdAt: Date
  updatedAt: Date
}

export interface EventCache extends CacheBase {
  type: 'EVENT'
  data: EventData
}
