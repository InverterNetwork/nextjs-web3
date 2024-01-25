'use client'

import { DynamicToast } from '@/components'
import { useToastHandler } from '@/hooks'
import { createContext, useContext, useState } from 'react'

export type TThemeContext = {
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
  addToast: ReturnType<typeof useToastHandler>['addToast']
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

  // CONTEXT
  //==============================================
  const contextData: TThemeContext = {
    theme,
    setTheme,
    addToast: toastHandler.addToast,
  }

  return (
    <ThemeContext.Provider value={contextData}>
      {children}
      <DynamicToast {...toastHandler} />
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const { addToast, ...rest } = useContext(ThemeContext)

  return rest
}

export const useToast = () => useContext(ThemeContext).addToast
