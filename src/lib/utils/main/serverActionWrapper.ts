import { CalledFrom, ServerActionWrapperReturn } from '@/lib/types'

// Implementation
export default async function <T, C extends CalledFrom>(
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
