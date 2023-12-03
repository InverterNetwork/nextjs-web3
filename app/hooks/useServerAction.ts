import { useTransition } from 'react'

export default function useServerAction() {
  const startTransition = useTransition()[1]

  function serverAction<T>(action: () => T) {
    let promise = <T>undefined

    startTransition(() => {
      promise = action()
    })

    return promise
  }

  return serverAction
}
