import { model, Schema } from 'mongoose'
import { CacheBase, ECacheType, EventMetaCache } from '@/lib/types'
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

class CacheModel {
  private Base = model('cache', CacheBaseSchema)

  Event = this.Base.discriminator<EventMetaCache>(
    ECacheType.EVENT_META,
    EventCacheSchema
  )

  static getInstance() {
    const { cacheModel } = global.mongoose
    if (!cacheModel) global.mongoose.cacheModel = new CacheModel()
    return global.mongoose.cacheModel as CacheModel
  }
}

export default CacheModel.getInstance()
