import { EventMeta } from './api'

export enum ECacheType {
  EVENT_META = 'EVENT_META',
}

export type CacheType = keyof typeof ECacheType

export interface CacheBase {
  type: CacheType
  idle?: boolean
  createdAt: Date
  updatedAt: Date
}

export interface EventMetaCache extends CacheBase {
  type: 'EVENT_META'
  data: EventMeta
}

// export interface TokenBalancesCache extends Omit<CacheBase, 'type'> {
//   data: TokenAmount[]
// }

// export interface FiatRateCache extends CacheBase {
//   type: CacheType.FIAT_RATE
//   data: FiatRate
// }
