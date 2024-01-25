import { model, models, Schema } from 'mongoose'
import { CacheBase, ECacheType, EventMeta, EventMetaCache } from '@/lib/types'
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
    [ECacheType.EVENT_META]: Base.discriminator(
      ECacheType.EVENT_META,
      EventCacheSchema
    ),
  }
}

if (!models.cache) setModels()

const cachedModels = {
  [ECacheType.EVENT_META]: models.cache.discriminators![ECacheType.EVENT_META],
} as ReturnType<typeof setModels>

export default cachedModels
