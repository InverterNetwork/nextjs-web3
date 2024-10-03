import React from 'react'
import type { Metadata } from 'next'
import { Navbar } from '@/components'
import Providers from '@/providers'
import { Analytics } from '@/providers/analytics'
import '@/styles/global.css'
import { RouteProgressBar } from '@/components/ui/route-progress-bar'

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
  return (
    <html lang="en">
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
      <link rel="icon" href="/logo.png" />
      <meta name="theme-color" content="#000000" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      <body>
        <RouteProgressBar />
        <Analytics />
        <Providers>
          {/* CONTENT */}
          <div className="body">
            <Navbar />
            <div className="children">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
