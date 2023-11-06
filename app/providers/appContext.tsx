'use client'
import { useIsHydrated } from '@/hooks'
import { createContext, useContext } from 'react'

export type TAppContext = {
  isHydrated: boolean
}

const AppContext = createContext({} as TAppContext)

export default function AppProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const isHydrated = useIsHydrated()

  // CONTEXT
  //==============================================
  const contextData: TAppContext = {
    isHydrated,
  }

  // EFFECTS
  //==============================================

  // RETURN
  //==============================================
  return (
    <AppContext.Provider value={contextData}>{children}</AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
