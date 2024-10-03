'use client'

import { useAuth } from '@/hooks'
import { useIsHydratedHandler } from '@/hooks/use-is-hydrated-handler'
import { createContext, useContext } from 'react'

export type TAppContext = {
  isHydrated: boolean
}

const AppContext = createContext({} as TAppContext)

export function AppProvider({ children }: { children: React.ReactNode }) {
  useAuth()
  const isHydrated = useIsHydratedHandler()

  // CONTEXT
  //==============================================
  const contextData: TAppContext = {
    isHydrated,
  }

  // RETURN
  //==============================================
  return (
    <AppContext.Provider value={contextData}>{children}</AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
