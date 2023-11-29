'use client'

import { resetUser, setAuth, useAppDispatch } from '../lib/store'
import { User } from '../lib/types'

export default function useClientAuth() {
  const dispatch = useAppDispatch()
  async function handleClientAuth(authToken: string) {
    try {
      const res = await fetch('/api/auth/verify', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        credentials: 'include',
      })

      const json = <User>await res.json()

      dispatch(setAuth(json))
    } catch (err) {
      console.error(err)
      dispatch(resetUser())
    }
  }

  return handleClientAuth
}
