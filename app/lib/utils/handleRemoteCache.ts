import { CacheModel } from '@/lib/models'
import { CacheType } from '@/lib/types'

/**
 * Updates a specific cache model with new data if the existing data is outdated.
 *
 * @param {CacheType} modelName - The name of the cache model to update.
 * @param {() => T} fetchLatestData - A function that fetches the latest data.
 * @param {Record<string, string>} filter - An optional filter object to find a specific document in the collection.
 * @param {number} thresholdHours - The number of hours after which the data is considered outdated (default is 12).
 * @param {boolean} insert - Whether to insert a new document rather than update (default is false).
 * @returns {Promise<{ message: string; data: T | undefined }>} A promise that resolves to a string message indicating the result of the update.
 *
 * @template T Type of the latest data fetched.
 *
 * @example
 * handleRemoteCache('Chains', LifiService.getChains, {})
 * handleRemoteCache('FiatRate', () => ExternalCallService.fetchExchangeRate('USD'), { 'data.base': 'USD' })
 */
export default async function handleRemoteCache<T>(
  modelName: CacheType,
  fetchLatestData: () => T,
  filter: Record<string, string> = {},
  thresholdHours: number = 12,
  insert: boolean = false
): Promise<T> {
  // Choose the correct cache model
  const DynamicCacheModel = CacheModel[modelName]

  // The case for inserting a new document
  const handleInsert = async (data: Awaited<T>) => {
    if (!data) throw new Error('No data to insert')
    await DynamicCacheModel.create({
      data,
    })
  }

  // The case for updating the idle flag
  const handleIdle = async (idle: boolean) => {
    await DynamicCacheModel.updateOne(filter, { idle })
  }

  // The case for updating an existing document
  const handleUpdate = async (data: Awaited<T>) => {
    await DynamicCacheModel.updateOne(filter, {
      data,
    })
  }

  // Try Fetching the latest cache
  const latestCache = await DynamicCacheModel.findOne(filter)
    .sort({ updatedAt: -1 })
    .limit(1)
    .lean()

  // If no cache exists, insert a new one and return the latest data
  if (!latestCache) {
    const latestData = await fetchLatestData()
    await handleInsert(latestData)
    return latestData
  }

  // If the cache is not idle, return the latest cache data
  if (!latestCache.idle) return latestCache.data as T

  // Check if the cache is up to date
  const isUpToDate =
    new Date(latestCache.updatedAt).getTime() + thresholdHours * 3_600_000 >
    new Date().getTime()

  // If the cache is up to date, return the latest cache data
  if (isUpToDate) return latestCache.data as T

  // Otherwise, start an optimsitic update
  const result = Promise.resolve(latestCache.data as T)

  result
    .then(async () => {
      // Fetch the latest data
      const latestData = await fetchLatestData()

      // If insert is true, insert a new document
      if (insert) await handleInsert(latestData)
      // Otherwise, update the existing document
      else {
        // Set the idle flag to false
        await handleIdle(false)
        await handleUpdate(latestData)
      }
    })
    .catch((err) => {
      console.error(err)
    })
    .finally(() => {
      handleIdle(true)
    })

  // Return the latest cache data
  return result
}
