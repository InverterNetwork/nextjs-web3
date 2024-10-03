'use client'

import { AppProgressBar } from 'next-nprogress-bar'

export function RouteProgressBar() {
  return (
    <AppProgressBar
      height="4px"
      color={'#29A352'}
      options={{ showSpinner: false }}
    />
  )
}
