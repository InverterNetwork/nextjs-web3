import { Schema } from 'mongoose'
import { EEventType, EventMetaCache } from '../types'

export const EventCacheSchema = new Schema<EventMetaCache>({
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
