'use client'

import { useIsHydrated } from '@/hooks'
import { createContext, useContext, useEffect } from 'react'

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
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // RETURN
  //==============================================
  return (
    <AppContext.Provider value={contextData}>{children}</AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
