import { ServerActionWrapperReturn } from '@/lib/utils/serverActionWrapper'
import { useTransition } from 'react'

export default function useServerAction() {
  const startTransition = useTransition()[1]

  async function serverAction<T>(
    action: () => Promise<ServerActionWrapperReturn<T, true>>
  ) {
    let promise: Promise<ServerActionWrapperReturn<T, true>> | undefined

    startTransition(() => {
      promise = action()
    })

    const awaited = await promise!

    if (!awaited.success) {
      const error = new Error()
      error.stack = awaited.res.stack
      error.name = awaited.res.name
      error.message = awaited.res.message
      error.cause = awaited.res.cause
      throw error
    }

    return awaited.res
  }

  return serverAction
}
