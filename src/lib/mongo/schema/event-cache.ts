import { Schema } from 'mongoose'
import { EEventType, EventCache as TEventCache } from '../types'

export const EventCache = new Schema<TEventCache>({
  data: {
    uid: {
      type: String,
      required: true,
    },
    operationType: {
      type: String,
      enum: EEventType,
      required: true,
    },
    _id: false,
  },
})
