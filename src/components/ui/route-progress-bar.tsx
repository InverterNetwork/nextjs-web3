'use client'

import { AppProgressBar } from 'next-nprogress-bar'

export function RouteProgressBar() {
  return (
    <AppProgressBar
      height="4px"
      color={'#389fff'}
      options={{ showSpinner: false }}
    />
  )
}
