'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { Suspense, useEffect } from 'react'
import Script from 'next/script'

export function Analytics() {
  return (
    <Suspense>
      <Root />
    </Suspense>
  )
}

function Root() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const enabled = process.env.NODE_ENV === 'production' && !!GTM_ID

  useEffect(() => {
    if (enabled && pathname) pageview(pathname)
  }, [pathname, searchParams, enabled])

  if (!enabled) return null

  return (
    <>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer', '${GTM_ID}');
  `,
        }}
      />
    </>
  )
}

type WindowWithDataLayer = Window & {
  dataLayer: Record<string, any>[]
}

declare const window: WindowWithDataLayer

export const GTM_ID = process.env.NEXT_PUBLIC_GA_ID

export const pageview = (url: string) => {
  if (typeof window.dataLayer !== 'undefined' && !!GTM_ID)
    window.dataLayer.push({
      event: 'pageview',
      page: url,
    })
}
