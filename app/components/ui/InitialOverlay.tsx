'use client'

import { Image, useColorMode } from '@chakra-ui/react'
import { useAppContext } from '@/providers'
import { dark, light } from '@/lib/styles/theme'

export default function InitialOverlay() {
  const isHydrated = useAppContext().isHydrated

  const { colorMode } = useColorMode()
  const bgColor = colorMode === 'light' ? light.primary[50] : dark.primary[700]

  return (
    <div
      style={{
        position: 'fixed',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: bgColor,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '10',
        transition: 'top 3000ms cubic-bezier(0.17, 0.04, 0.03, 0.94)',
        top: !isHydrated ? '0' : '-100%',
      }}
    >
      <Image src="/inverter-light-logo.svg" height={90} width={90} alt="" />
    </div>
  )
}
