/**
 *
 * @param call Promise function
 * @param successStatus Optional success status code ( default 200 )
 * @param errorStatus Optional error status code ( default 500 )
 * @returns Response with the result of the promise and the status code
 */
export default async function <T>(
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
