'use client'

import utils from '@/utils'
import { Auth } from '@/types'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { useQuery } from '@tanstack/react-query'

export default function useAuth() {
  const { authToken, primaryWallet } = useDynamicContext()

  const authQuery = useQuery({
    queryKey: ['auth', authToken],
    queryFn: async () => {
      const config = utils.bearer.getConfig(authToken)
      const res = await fetch('/api/auth/verify', config)

      const json = <Auth>await res.json()

      return json
    },
    enabled: !!authToken && primaryWallet?.connected,
    retry: 3,
  })

  return authQuery
}
