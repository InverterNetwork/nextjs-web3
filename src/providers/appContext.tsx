'use client'

import useIsHydratedHandler from '../hooks/useIsHydratedHandler'
import { createContext, useContext } from 'react'
import useAuthHandler from '@/hooks/useAuthHandler'

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
  const isHydrated = useIsHydratedHandler()
  const auth = useAuthHandler()

  // CONTEXT
  //==============================================
  const contextData: TAppContext = {
    auth,
    isHydrated,
  }

  // RETURN
  //==============================================
  return (
    <AppContext.Provider value={contextData}>{children}</AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
