'use client'

import { useIsHydrated } from '@/hooks'
import utils from '@/lib/utils'
import {
  DynamicUserProfile,
  useDynamicContext,
} from '@dynamic-labs/sdk-react-core'
import { Button, Loading } from 'react-daisyui'

export function WalletWidget() {
  const isHydrated = useIsHydrated()
  const {
    setShowDynamicUserProfile,
    setShowAuthFlow,
    primaryWallet,
    isAuthenticated,
  } = useDynamicContext()
  const address = primaryWallet?.address

  if (!isHydrated || (isAuthenticated && !address))
    return <Loading variant="dots" />

  if (isAuthenticated)
    return (
      <div>
        <Button
          size="sm"
          color="accent"
          onClick={() => setShowDynamicUserProfile(true)}
        >
          {utils.format.compressAddress(address)}
        </Button>
        <DynamicUserProfile />
      </div>
    )
  return (
    <Button size="sm" color="primary" onClick={() => setShowAuthFlow(true)}>
      Connect Wallet
    </Button>
  )
}
