'use client'

import useIsHydratedHandler from '../hooks/useIsHydratedHandler'
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
