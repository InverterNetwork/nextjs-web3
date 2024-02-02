'use client'

import useIsHydratedHandler from '@/hooks/useIsHydratedHandler'
import { setThemeCookie } from '@/lib/utils'
import { createContext, useContext, useEffect } from 'react'
import useAuthHandler from '@/hooks/useAuthHandler'
import { useTheme } from '@/hooks'
import { useInputFocusHandler } from '@/hooks/useInputFocus'

export type TAppContext = {
  auth: ReturnType<typeof useAuthHandler>
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
  const auth = useAuthHandler()

  // CONTEXT
  //==============================================
  const contextData: TAppContext = {
    auth,
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
