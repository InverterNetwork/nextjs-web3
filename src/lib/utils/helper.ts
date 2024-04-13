/**
 *
 * @param call Promise function
 * @param successStatus Optional success status code ( default 200 )
 * @param errorStatus Optional error status code ( default 500 )
 * @returns Response with the result of the promise and the status code
 */
async function apiResponse<T>(
  call: () => Promise<T>,
  successStatus = 200,
  errorStatus = 500
) {
  try {
    const result = await call()
    return Response.json(result, { status: successStatus })
  } catch (err: any) {
    return new Response(
      err?.message || 'Unexpected: Could not retrieve any error messages',
      {
        status: err?.statusCode ?? errorStatus,
      }
    )
  }
}

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

const main = {
  apiResponse,
  delay,
  unixTime,
}

export default main
