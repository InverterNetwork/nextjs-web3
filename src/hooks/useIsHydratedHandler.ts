import { useEffect, useState } from 'react'

export default function useIsHydratedHandler() {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  return isHydrated
}
