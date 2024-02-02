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

// export interface TokenBalancesCache extends Omit<CacheBase, 'type'> {
//   data: TokenAmount[]
// }

// export interface FiatRateCache extends CacheBase {
//   type: CacheType.FIAT_RATE
//   data: FiatRate
// }
