'use client'

import { setThemeCookie } from '@/styles/utils'
import { DynamicToast } from '@/components'
import useToastHandler from '@/hooks/useToastHandler'
import { createContext, useContext, useEffect, useState } from 'react'

export type TThemeContext = {
  themeHandler: {
    theme: 'light' | 'dark'
    setTheme: (theme: 'light' | 'dark') => void
  }
  toastHandler: ReturnType<typeof useToastHandler>
}

const ThemeContext = createContext({} as TThemeContext)

export default function ThemeProvider({
  children,
  initialTheme,
}: {
  children: React.ReactNode
  initialTheme: 'light' | 'dark'
}) {
  const toastHandler = useToastHandler()
  const [theme, setTheme] = useState(initialTheme)

  // EFFECTS
  //==============================================
  useEffect(() => {
    setThemeCookie(theme)
  }, [theme])

  // CONTEXT
  //==============================================
  const contextData: TThemeContext = {
    themeHandler: {
      theme,
      setTheme,
    },
    toastHandler: toastHandler,
  }

  return (
    <ThemeContext.Provider value={contextData}>
      {children}
      <DynamicToast {...toastHandler} />
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => useContext(ThemeContext)
