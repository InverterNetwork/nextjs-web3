'use client'

import { dark, light } from 'styles'
import { AppProgressBar } from 'next-nprogress-bar'
import { useTheme } from '@/providers'

export default function RouteProgressBar() {
  const { theme } = useTheme()
  return (
    <AppProgressBar
      height="4px"
      color={theme === 'light' ? light.accent : dark.accent}
      options={{ showSpinner: false }}
    />
  )
}
