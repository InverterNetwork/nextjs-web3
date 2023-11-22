import React from 'react'
import type { Metadata } from 'next'
import Providers from './providers'
import '@fontsource/open-sans/500.css'
import './lib/styles/global.css'
import { RouteProgressBar, Navbar } from './components'
import InitialOverlay from './components/ui/InitialOverlay'

const { description, title, applicationName, images } = {
  title: 'Web3 Template',
  applicationName: 'Inverter',
  description:
    'Easily edit and deploy your own web3 application with this template.',
  images: [
    {
      url: 'InverterNetwork/media/main/inverter-dark-banner.png',
    },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL('https://raw.githubusercontent.com/'),
  title,
  applicationName,
  description,
  openGraph: {
    type: 'website',
    title,
    siteName: applicationName,
    description,
    images,
  },
  twitter: {
    card: 'summary_large_image',
    title: applicationName,
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
      <link rel="icon" href="/icon-512x512.png" />
      <meta name="theme-color" content="#000000" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      <body>
        <Providers>
          <RouteProgressBar />
          <InitialOverlay />
          {/* CONTENT */}
          <div className="layout-body">
            <Navbar />
            <div className="content">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
