import { useAppContext } from '@/providers/appContext'
import { useThemeContext } from '@/providers/themeContext'

export { default as useDisclosure } from './useDisclosure'
export { default as useAuth } from './useAuth'
export { default as useServerAction } from './useServerAction'

export { useDeploy } from './useDeploy'
export { useWorkflow } from './useWorkflow'

export * from './useChainSpecs'
export * from './useQueryParams'

export const useIsHydrated = () => useAppContext().isHydrated
export const useInverter = () => useAppContext().inverter
export const useTheme = () => useThemeContext().themeHandler
