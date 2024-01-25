import { model, models, Schema } from 'mongoose'
import { CacheBase, ECacheType } from '@/lib/types'
import { EventCacheSchema } from '../schemas/EventCache'

// Define the base schema
const CacheBaseSchema = new Schema<CacheBase>(
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

const setModels = () => {
  const Base = model('cache', CacheBaseSchema)

  return {
    [ECacheType.EVENT]: Base.discriminator(ECacheType.EVENT, EventCacheSchema),
  }
}

if (!models.cache) setModels()

const cachedModels = {
  [ECacheType.EVENT]: models.cache.discriminators![ECacheType.EVENT],
} as ReturnType<typeof setModels>

export default cachedModels
