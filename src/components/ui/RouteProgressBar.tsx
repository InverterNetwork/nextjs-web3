'use client'

import { dark, light } from '@/styles'
import { AppProgressBar } from 'next-nprogress-bar'
import { useTheme } from '@/hooks'

export function RouteProgressBar() {
  const { theme } = useTheme()
  return (
    <AppProgressBar
      height="4px"
      color={theme === 'light' ? light.primary : dark.primary}
      options={{ showSpinner: false }}
    />
  )
}
