'use client'

import { useAuth } from '@/hooks'
import useIsHydratedHandler from '@/hooks/useIsHydratedHandler'
import { createContext, useContext } from 'react'
import { DynamicToast } from '@/components'
import useToastHandler from '@/hooks/useToastHandler'

export type TAppContext = {
  isHydrated: boolean
  toastHandler: ReturnType<typeof useToastHandler>
}

const AppContext = createContext({} as TAppContext)

export default function AppProvider({
  children,
}: {
  children: React.ReactNode
}) {
  useAuth()
  const toastHandler = useToastHandler()
  const isHydrated = useIsHydratedHandler()

  // CONTEXT
  //==============================================
  const contextData: TAppContext = {
    isHydrated,
    toastHandler,
  }

  // RETURN
  //==============================================
  return (
    <AppContext.Provider value={contextData}>
      {children}
      <DynamicToast {...toastHandler} />
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
