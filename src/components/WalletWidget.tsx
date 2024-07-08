'use client'

import { useIsHydrated } from '@/hooks'
import utils from '@/lib/utils'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { Button, ButtonProps, Loading } from '@/react-daisyui'
import Image from 'next/image'
import { cn } from '@/styles/cn'
import { GiClick } from 'react-icons/gi'
import { MdErrorOutline } from 'react-icons/md'

export function WalletWidget(
  props: Omit<ButtonProps, 'color' | 'onClick'> & {
    text?: string
  }
) {
  const { size, className, text, ...rest } = props
  const isHydrated = useIsHydrated()
  const dynamicContext = useDynamicContext()
  const isConnected = dynamicContext.primaryWallet?.connected
  const address = dynamicContext.primaryWallet?.address

  const iconSrc = dynamicContext?.networkConfigurations?.evm?.find(
    (i) => i.chainId === dynamicContext?.primaryWallet?.network
  )?.iconUrls?.[0]

  if (!isHydrated || (isConnected && !address))
    if (!isHydrated) return <Loading variant="dots" className="m-auto" />

  const getStartIcon = () => {
    if (!!iconSrc)
      return (
        <Image
          src={iconSrc}
          alt="icon"
          width={20}
          height={20}
          className="max-h-full rounded-full"
        />
      )

    if (!!isConnected && text === undefined)
      return <MdErrorOutline size={20} fill="red" />

    return null
  }

  const getEndIcon = () => {
    if (!!isConnected && !!text) return <GiClick size={20} />

    return null
  }

  const getChildren = () => {
    if (!isConnected) return 'Connect Wallet'

    if (!!text) return text

    return utils.format.compressAddress(address)
  }

  return (
    <Button
      {...rest}
      {...((!isConnected || !!text) && { color: 'primary' })}
      startIcon={getStartIcon()}
      endIcon={getEndIcon()}
      className={cn(className, 'leading-[unset]')}
      type="button"
      size={!size ? 'sm' : size}
      onClick={() =>
        dynamicContext[
          !isConnected ? 'setShowAuthFlow' : 'setShowDynamicUserProfile'
        ](true)
      }
    >
      {getChildren()}
    </Button>
  )
}
