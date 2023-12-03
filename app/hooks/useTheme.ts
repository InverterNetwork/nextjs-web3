import { setComp, useAppDispatch, useAppSelector } from '@/lib/store'
import { useEffect } from 'react'

export default function useTheme(updateCookie = false) {
  const dispatch = useAppDispatch()
  const theme = useAppSelector((state) => state.comp.theme)

  const setTheme = (theme?: string) => dispatch(setComp({ theme }))

  const list = ['light', 'dark']

  const isLight = theme === 'light'

  useEffect(() => {
    if (!theme)
      setTheme(document.documentElement.getAttribute('data-theme') ?? 'light')
    // Set the cookie "theme" with an expiry date of 400 days (Maximum expiry date for Chromium browsers).
    else if (updateCookie) {
      document.cookie =
        `theme=${theme};expires=` +
        new Date(new Date().getTime() + 400 * 24 * 60 * 60 * 1000).toUTCString()
      // Set the data-theme attribute for <html>
      document.documentElement.setAttribute('data-theme', theme)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme])

  function toggleTheme() {
    if (!!theme) {
      const currentIndex = list.indexOf(theme)
      if (currentIndex === list.length - 1) return setTheme(list[0])
      else if (currentIndex >= 0 && currentIndex < list.length)
        return setTheme(list[currentIndex + 1])
      else return setTheme(list[0])
    }
  }

  return { theme, isLight, toggleTheme }
}
