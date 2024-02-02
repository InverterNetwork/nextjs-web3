'use client'

import useIsHydratedHandler from '../hooks/useIsHydratedHandler'
import { setThemeCookie } from '../lib/utils'
import { createContext, useContext, useEffect } from 'react'
import useAuthHandler from '@/hooks/useAuthHandler'
import { useTheme } from '../hooks'

export type TAppContext = {
  auth: ReturnType<typeof useAuthHandler>
  isHydrated: boolean
}

const AppContext = createContext({} as TAppContext)

export default function AppProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { theme } = useTheme()
  const isHydrated = useIsHydratedHandler()
  const auth = useAuthHandler()

  // CONTEXT
  //==============================================
  const contextData: TAppContext = {
    auth,
    isHydrated,
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
