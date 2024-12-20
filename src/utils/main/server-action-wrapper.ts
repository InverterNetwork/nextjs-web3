import { CalledFrom, ServerActionWrapperReturnType } from '@/types'

// Implementation
export async function serverActionWrapper<T, C extends CalledFrom>(
  action: () => Promise<T>,
  calledFrom: C,
  connectDatabase: boolean = false
): Promise<ServerActionWrapperReturnType<T, C>> {
  // import connectDB from '@/lib/utils/server/connectDB'
  if (connectDatabase) {
    const { connectDb } = await import('@/utils/server/connect-db')
    await connectDb()
  }

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
    console.error('SERVER_ACTION_WRAPPER_ERROR', e)
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
