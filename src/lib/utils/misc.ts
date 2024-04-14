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

export default {
  delay,
  unixTime,
}
