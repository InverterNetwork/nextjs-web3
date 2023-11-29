'use client'

import { useClientAuth, useIsHydrated } from '@/hooks'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
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
  const { authToken } = useDynamicContext()
  const handleClientAuth = useClientAuth()

  // CONTEXT
  //==============================================
  const contextData: TAppContext = {
    isHydrated,
  }

  // EFFECTS
  //==============================================
  useEffect(() => {
    if (!!authToken) handleClientAuth(authToken)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken])

  // RETURN
  //==============================================
  return (
    <AppContext.Provider value={contextData}>{children}</AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
