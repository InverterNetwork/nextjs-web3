import { useAppContext, useThemeContext } from '../providers'

export { default as useDisclosure } from './useDisclosure'

export const useIsHydrated = () => useAppContext().isHydrated
export const useToast = () => useThemeContext().toastHandler
export const useTheme = () => useThemeContext().themeHandler
