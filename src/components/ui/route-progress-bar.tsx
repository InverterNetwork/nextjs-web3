'use client'

import { AppProgressBar } from 'next-nprogress-bar'

export function RouteProgressBar() {
  return (
    <AppProgressBar
      height="4px"
      color={'#2E5CE8'}
      options={{ showSpinner: false }}
    />
  )
}
