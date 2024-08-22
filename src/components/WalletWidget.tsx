'use client'

import { useChainSpecs, useIsHydrated } from '@/hooks'
import utils from '@/lib/utils'
import { Button, ButtonProps, Loading } from '@/react-daisyui'
import Image from 'next/image'
import { cn } from '@/styles/cn'
import { GiClick } from 'react-icons/gi'
import { MdErrorOutline } from 'react-icons/md'
import { MdOutlineWallet } from 'react-icons/md'

export function WalletWidget(
  props: Omit<ButtonProps, 'color' | 'onClick'> & {
    text?: string
    applyClassToLoading?: boolean
  }
) {
  const { size, className, text, applyClassToLoading = true, ...rest } = props
  const isHydrated = useIsHydrated()
  const { dynamicContext, isConnected, address, iconSrc, isUnsupportedChain } =
    useChainSpecs()

  if (!isHydrated || (isConnected && !address))
    return (
      <Loading
        variant="spinner"
        className={cn('m-auto', applyClassToLoading && className)}
      />
    )

  const getStartIcon = () => {
    if (!isConnected) return <MdOutlineWallet size={20} />

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

    if (text === undefined && isUnsupportedChain)
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
      {...((!isConnected || !!text || isUnsupportedChain) && {
        color: 'primary',
      })}
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
