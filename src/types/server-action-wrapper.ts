// Defines a custom type for serialized errors.
type SerializedError = {
  name: string
  message: string
  stack: string | undefined
  cause: unknown
}

// Success response type, ensuring that when success is true, the result type is T.
type SuccessResponse<T> = { success: true; res: T }

// Error response type, ensuring that when success is false, the result is a serialized error.
type ErrorResponse = { success: false; res: SerializedError }

export type CalledFrom = 'client' | 'server'

// ServerActionWrapperReturnType type which conditionally returns either a Promise<T> when called from server,
// or a union of SuccessResponse and ErrorResponse when called from client.
export type ServerActionWrapperReturnType<
  T,
  C extends CalledFrom,
> = C extends 'server'
  ? Promise<T>
  : Promise<SuccessResponse<T> | ErrorResponse>
