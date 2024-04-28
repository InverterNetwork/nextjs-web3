import { useAppContext } from '@/providers/appContext'
import { useThemeContext } from '@/providers/themeContext'

export { default as useDisclosure } from './useDisclosure'
export { default as useAuth } from './useAuth'
export { default as useServerAction } from './useServerAction'

export const useIsHydrated = () => useAppContext().isHydrated
export const useToast = () => useAppContext().toastHandler
export const useTheme = () => useThemeContext().themeHandler
