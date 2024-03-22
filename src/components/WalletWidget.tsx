'use client'

import { compressAddress } from '@/lib/utils'
import { useAppContext } from '@/providers'
import {
  DynamicUserProfile,
  useDynamicContext,
} from '@dynamic-labs/sdk-react-core'
import { Button, Loading } from 'react-daisyui'

export default function WalletWidget() {
  const { isHydrated } = useAppContext()
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
          {compressAddress(address)}
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
