'use client'

import { dark, light } from 'styles'
import { AppProgressBar } from 'next-nprogress-bar'
import { useTheme } from '@/hooks'

export default function RouteProgressBar() {
  const { isLight } = useTheme()
  return (
    <AppProgressBar
      height="4px"
      color={isLight ? light.accent : dark.accent}
      options={{ showSpinner: false }}
    />
  )
}
