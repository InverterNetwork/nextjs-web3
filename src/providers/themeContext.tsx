'use client'

import { setThemeCookie } from '@/styles/utils'
import { createContext, useContext, useEffect, useState } from 'react'
import { Toaster } from 'sonner'

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

  // CONTEXT
  //==============================================
  const contextData: TThemeContext = {
    themeHandler: {
      theme,
      setTheme,
    },
  }

  // EFFECTS
  //==============================================
  useEffect(() => {
    setThemeCookie(theme)
  }, [theme])

  // RETURN
  //==============================================
  return (
    <ThemeContext.Provider value={contextData}>
      {children}
      <Toaster richColors position="top-right" closeButton />
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => useContext(ThemeContext)
