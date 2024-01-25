import { Schema } from 'mongoose'
import { EventMeta, EEventType } from '../types'

export const EventCacheSchema = new Schema<EventMeta>(
  {
    uid: {
      type: String,
      required: true,
    },
    operationType: {
      type: String,
      enum: EEventType,
      required: true,
    },
  },
  { _id: false }
)
