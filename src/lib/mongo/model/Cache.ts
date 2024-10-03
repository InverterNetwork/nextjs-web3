import { model, models } from 'mongoose'
import schema from '../schema'
import { ECacheType } from '../types'

const setModels = () => {
  const Base = model('cache', schema.Cache)

  return {
    [ECacheType.EVENT]: Base.discriminator(ECacheType.EVENT, schema.EventCache),
  }
}

if (!models.cache) setModels()

export const Cache = {
  [ECacheType.EVENT]: models.cache.discriminators![ECacheType.EVENT],
} as ReturnType<typeof setModels>
