import { useEffect, useState } from 'react'

export type DynamicToastChild = {
  text: string
  status: 'error' | 'info' | 'success' | 'warning' | undefined
}

export default function useToastHandler() {
  const [alerts, setAlerts] = useState<DynamicToastChild[]>([])

  const addToast = (props: DynamicToastChild) => {
    props.text = extractError(props.text)
    setAlerts((alerts) => [...alerts, props])
  }

  const removeToast = (index: number) => {
    setAlerts((alerts) => alerts.filter((_, i) => i !== index))
  }

  // using use effect remove the toast after 5 seconds starting from the most recent toast
  useEffect(() => {
    // make this run until alerts length is gone
    if (alerts.length === 0) return
    const timer = setTimeout(() => {
      // remove until there is no more toast
      removeToast(0)
    }, 10000)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alerts])

  return {
    alerts,
    addToast,
    removeToast,
  }
}

function extractError(errorMessage?: string) {
  if (!errorMessage) return 'Error: Unknown error'
  const regex = /(Error|Details): .*/
  const match = errorMessage.match(regex)
  return match ? match[0] : errorMessage
}

export type UseToastHandlerReturn = ReturnType<typeof useToastHandler>
export type AddToast = UseToastHandlerReturn['addToast']
