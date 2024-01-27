import { useState } from 'react'

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
