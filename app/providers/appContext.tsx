'use client'

import useIsHydratedHandler from '@/hooks/useIsHydratedHandler'
import { setThemeCookie } from '@/lib/utils'
import { createContext, useContext, useEffect } from 'react'
import { useTheme } from '@/hooks'
import { useInputFocusHandler } from '@/hooks/useInputFocus'

export type TAppContext = {
  isHydrated: boolean
  inputFocus: ReturnType<typeof useInputFocusHandler>
}

const AppContext = createContext({} as TAppContext)

export default function AppProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { theme } = useTheme()
  const isHydrated = useIsHydratedHandler()
  const inputFocus = useInputFocusHandler()

  // CONTEXT
  //==============================================
  const contextData: TAppContext = {
    isHydrated,
    inputFocus,
  }

  // EFFECTS
  //==============================================
  useEffect(() => {
    setThemeCookie(theme)
  }, [theme])
  // RETURN
  //==============================================
  return (
    <AppContext.Provider value={contextData}>{children}</AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
