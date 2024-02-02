'use client'

import { UseToastHandlerReturn } from '../../hooks/useToastHandler'
import { useEffect } from 'react'
import { Alert, Button, Toast } from 'react-daisyui'

export default function DynamicToast({
  removeToast,
  alerts,
}: UseToastHandlerReturn) {
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

  return (
    <Toast
      vertical="top"
      horizontal="start"
      className={'whitespace-break-spaces break-all'}
    >
      {alerts.map((alert, index) => (
        <Alert
          key={index}
          status={alert.status}
          className="px-2 py-1 flex text-xs items-center"
        >
          <p>{alert.text}</p>
          <Button
            className="ml-auto"
            color="ghost"
            onClick={() => removeToast(index)}
          >
            X
          </Button>
        </Alert>
      ))}
    </Toast>
  )
}
