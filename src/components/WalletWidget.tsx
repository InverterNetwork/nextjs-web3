'use client'

import { useIsHydrated } from '@/hooks'
import utils from '@/lib/utils'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { Button, ButtonProps, Loading } from '@/react-daisyui'

export function WalletWidget(props: Omit<ButtonProps, 'color' | 'onClick'>) {
  const { size, ...rest } = props
  const isHydrated = useIsHydrated()
  const dynamicContext = useDynamicContext()

  const { primaryWallet, isAuthenticated } = dynamicContext

  const address = primaryWallet?.address

  if (!isHydrated || (isAuthenticated && !address))
    if (!isHydrated) return <Loading variant="dots" className="m-auto" />

  return (
    <Button
      {...rest}
      type="button"
      size={!size ? 'sm' : size}
      onClick={() =>
        dynamicContext[
          !isAuthenticated ? 'setShowAuthFlow' : 'setShowDynamicUserProfile'
        ](true)
      }
    >
      {!isAuthenticated
        ? 'Connect Wallet'
        : utils.format.compressAddress(address)}
    </Button>
  )
}
