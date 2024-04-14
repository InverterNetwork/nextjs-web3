import { ServerActionWrapperReturn } from '@/lib/types'
import { useTransition } from 'react'

type Expect<T> = Promise<ServerActionWrapperReturn<T, 'client'>>

export default function useServerAction() {
  const startTransition = useTransition()[1]

  async function serverAction<T>(action: () => Expect<T>) {
    let promise: Expect<T> | undefined

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
