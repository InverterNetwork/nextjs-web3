'use client'

import { UseToastHandlerReturn } from '../../hooks/useToastHandler'
import { Alert, Button, Toast } from 'react-daisyui'

export default function DynamicToast({
  removeToast,
  alerts,
}: UseToastHandlerReturn) {
  return (
    <Toast
      vertical="top"
      horizontal="start"
      className={'whitespace-break-spaces break-all z-50'}
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
