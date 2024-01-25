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
