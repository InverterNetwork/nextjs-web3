'use client'

import { createContext, useContext, useState } from 'react'

export type TThemeContext = {
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
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
    theme,
    setTheme,
  }

  return (
    <ThemeContext.Provider value={contextData}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
