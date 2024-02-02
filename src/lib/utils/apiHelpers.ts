export async function handleApiResponse<T>(
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
