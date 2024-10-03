import { Schema } from 'mongoose'
import { CacheBase, ECacheType } from '../types'

export const Cache = new Schema<CacheBase>(
  {
    type: {
      type: String,
      enum: ECacheType,
      required: true,
    },
    idle: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, discriminatorKey: 'type' }
)
