'use client'

import { setThemeCookie } from '@/styles/utils'
import { createContext, useContext, useEffect, useState } from 'react'

export type TThemeContext = {
  themeHandler: {
    theme: 'light' | 'dark'
    setTheme: (theme: 'light' | 'dark') => void
  }
}

const ThemeContext = createContext({} as TThemeContext)

export default function ThemeProvider({
  children,
  initialTheme,
}: {
  children: React.ReactNode
  initialTheme: 'light' | 'dark'
}) {
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
  }

  return (
    <ThemeContext.Provider value={contextData}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => useContext(ThemeContext)
