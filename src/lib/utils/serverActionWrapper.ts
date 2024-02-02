// Defines a custom type for serialized errors.
type SerializedError = ReturnType<typeof serializeError>

// Success response type, ensuring that when success is true, the result type is T.
type SuccessResponse<T> = { success: true; res: T }

// Error response type, ensuring that when success is false, the result is a serialized error.
type ErrorResponse = { success: false; res: SerializedError }

export type CalledFrom = 'client' | 'server'

// ServerActionWrapperReturn type which conditionally returns either a Promise<T> when called from server,
// or a union of SuccessResponse and ErrorResponse when called from client.
export type ServerActionWrapperReturn<
  T,
  C extends CalledFrom,
> = C extends 'server'
  ? Promise<T>
  : Promise<SuccessResponse<T> | ErrorResponse>

// Implementation
export async function serverActionWrapper<T, C extends CalledFrom>(
  action: () => Promise<T>,
  calledFrom: C
): Promise<ServerActionWrapperReturn<T, C>> {
  if (calledFrom === 'server')
    // Server call
    return (await action()) as any

  let success: unknown
  let res: unknown

  try {
    // Client call
    success = true
    res = await action()
  } catch (e) {
    success = false
    res =
      e instanceof Error
        ? serializeError(e)
        : serializeError(new Error('An unknown error occurred'))
  }

  return {
    success,
    res,
  } as any
}

// Function to serialize error objects.
function serializeError(error: Error) {
  return {
    name: error.name,
    message: error.message,
    stack: error.stack,
    cause: error.cause,
  }
}
