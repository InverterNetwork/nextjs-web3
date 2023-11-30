'use client'

import { dark, light } from '@/lib/styles'
import { useColorModeValue } from '@chakra-ui/react'
import { AppProgressBar } from 'next-nprogress-bar'

export default function RouteProgressBar() {
  const sliderColor = useColorModeValue(light?.accent[400], dark?.accent[400])
  return (
    <AppProgressBar
      height="4px"
      color={sliderColor}
      options={{ showSpinner: false }}
    />
  )
}
