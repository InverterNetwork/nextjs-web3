// Defines a custom type for serialized errors.
type SerializedError = ReturnType<typeof serializeError>

// Success response type, ensuring that when success is true, the result type is T.
type SuccessResponse<T> = { success: true; res: T }

// Error response type, ensuring that when success is false, the result is a serialized error.
type ErrorResponse = { success: false; res: SerializedError }

// ServerActionWrapperReturn type which conditionally returns either a Promise<T> when called from server,
// or a union of SuccessResponse and ErrorResponse when called from client.
export type ServerActionWrapperReturn<
  T,
  CalledFromClient extends boolean = false,
> = CalledFromClient extends false
  ? Promise<T>
  : Promise<SuccessResponse<T> | ErrorResponse>

// Overloaded function signatures for serverActionWrapper.
// When calledFromClient is false, it returns a Promise<T>.
// Otherwise, it returns a union of SuccessResponse<T> and ErrorResponse.
export function serverActionWrapper<T>(
  action: () => Promise<T>,
  calledFromClient?: false
): Promise<T>
export function serverActionWrapper<T>(
  action: () => Promise<T>,
  calledFromClient: true
): Promise<SuccessResponse<T> | ErrorResponse>

// Implementation of serverActionWrapper.
export async function serverActionWrapper<T>(
  action: () => Promise<T>,
  calledFromClient = false
) {
  if (!calledFromClient) {
    // Directly return the action's result if called from the server.
    return action()
  }

  try {
    // Try to execute the action and return a success response.
    const res = await action()
    return { success: true, res } as const
  } catch (e) {
    // Catch any errors, serialize them, and return an error response.
    if (e instanceof Error) {
      return {
        success: false,
        res: serializeError(e),
      } as const
    } else {
      const error = new Error()
      error.name = 'No Instance of Error'
      error.message = 'Unexpected: Cought response is not an instance of Error'
      // Handle cases where the caught object is not an Error instance.
      return {
        success: false,
        res: serializeError(error),
      } as const
    }
  }
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
