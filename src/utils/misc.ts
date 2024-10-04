import { Document, HydratedDocument, Schema } from 'mongoose'

/**
 *
 * @param seconds Time to wait in seconds
 * @returns Promise that resolves after the specified time
 */
const delay = (seconds: number) =>
  new Promise((resolve) => setTimeout(resolve, seconds * 1000))

/**
 * @param date Optional date to convert to unix time
 * @returns Compact Unix time ( devided by 1000 ) in seconds
 * */
const unixTime = (date?: Date) =>
  Math.floor((date ?? new Date()).getTime() / 1000)

const getTimeDiff = (date?: Date) => {
  if (!date) return { days: 0, hours: 0 }

  const now = new Date()
  const itemDate = new Date(date)

  const diffInMilliseconds = Math.abs(now.getTime() - itemDate.getTime())
  const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60))
  const diffInDays = Math.floor(diffInHours / 24)
  const hours = diffInHours - diffInDays * 24

  return {
    days: diffInDays,
    hours,
  }
}

export default {
  getTimeDiff,
  delay,
  unixTime,
}
