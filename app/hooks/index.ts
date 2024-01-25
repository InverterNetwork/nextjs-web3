import { useAppContext } from '@/providers'

export { default as useDisclosure } from './useDisclosure'

export const useIsHydrated = () => useAppContext().isHydrated
export const useAuth = () => useAppContext().auth
