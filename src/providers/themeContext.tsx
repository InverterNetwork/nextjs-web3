'use client'

import { setThemeCookie } from '@/styles/utils'
import { createContext, useContext, useEffect, useState } from 'react'
import { DynamicToast } from '@/components/ui'
import useToastHandler from '@/hooks/useToastHandler'

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
  const [theme, setTheme] = useState(initialTheme)
  const toastHandler = useToastHandler()

  // CONTEXT
  //==============================================
  const contextData: TThemeContext = {
    themeHandler: {
      theme,
      setTheme,
    },
    toastHandler: toastHandler,
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
      <DynamicToast {...toastHandler} />
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => useContext(ThemeContext)
