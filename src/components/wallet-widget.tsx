'use client'

import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import {
  WalletWidgetProps,
  WalletWidget as Org,
} from '@inverter-network/react/client'
import { useAccount } from 'wagmi'

export function WalletWidget(
  props: Omit<WalletWidgetProps, 'setShowWalletWidget'>
) {
  const { setShowAuthFlow, setShowDynamicUserProfile, awaitingSignatureState } =
    useDynamicContext()

  const { isConnected } = useAccount()

  return (
    <Org
      {...props}
      setShowWalletWidget={() =>
        !isConnected || awaitingSignatureState
          ? setShowAuthFlow(true)
          : setShowDynamicUserProfile(true)
      }
    />
  )
}
