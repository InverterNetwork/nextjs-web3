'use client'

import { getBearerConfig } from '@/lib/utils'
import { Auth } from '../lib/types'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { useQuery } from '@tanstack/react-query'

export default function useAuthHandler() {
  const { authToken, primaryWallet } = useDynamicContext()

  const authQuery = useQuery({
    queryKey: ['auth', authToken],
    queryFn: async () => {
      const config = getBearerConfig(authToken)
      const res = await fetch('/api/auth/verify', config)

      const json = <Auth>await res.json()

      return json
    },
    enabled: !!authToken && primaryWallet?.connected,
  })

  return authQuery
}
