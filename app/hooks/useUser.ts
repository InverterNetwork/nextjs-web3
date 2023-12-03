'use client'

import { User, UserRole } from '../lib/types'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { useQuery } from '@tanstack/react-query'

export default function useUser() {
  const { authToken, primaryWallet } = useDynamicContext()

  const userQuery = useQuery({
    queryKey: ['user', authToken],
    queryFn: async () => {
      const res = await fetch('/api/auth/verify', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        credentials: 'include',
      })

      const json = <User>await res.json()

      return json
    },
    enabled: !!authToken && primaryWallet?.connected,
  })

  const isAdmin = [UserRole.Admin, UserRole.Super].includes(
    userQuery.data?.role ?? UserRole.User
  )

  return { userQuery, isAdmin }
}
