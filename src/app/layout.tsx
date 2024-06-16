import React from 'react'
import type { Metadata } from 'next'
import { RouteProgressBar, Navbar } from '@/components'
import { cookies } from 'next/headers'
import { initialTheme } from '@/styles'
import Providers from '@/providers'
import Analytics from '@/providers/Analytics'
import '@/styles/global.css'

const title = 'Inverter Network | The Token Programmability Layer',
  description =
    'Inverter is a modular protocol for Primary Issuance Markets, enabling maximal value capture from token economies.',
  images =
    'https://raw.githubusercontent.com/InverterNetwork/media/main/inverter-light-banner.png'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    type: 'website',
    title,
    description,
    images,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images,
  },
}

function RootLayout({ children }: { children: React.ReactNode }) {
  const theme =
    (cookies().get('theme')?.value as 'light' | 'dark' | undefined) ??
    initialTheme
  return (
    <html lang="en" data-theme={theme}>
      {/* PWA config */}
      <link rel="manifest" href="/manifest.json" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Inverter PWA" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta
        name="viewport"
        content="width=device-width height=device-height initial-scale=1"
      />
      <link rel="icon" href="/icon-512x512.png" />
      <meta name="theme-color" content="#000000" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      <body>
        <Analytics />
        <Providers theme={theme}>
          <RouteProgressBar />
          {/* CONTENT */}
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
