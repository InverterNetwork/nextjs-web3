import type { UseToastHandlerReturn } from '@/hooks/useToastHandler'
import { Alert, Button, Toast } from '@/react-daisyui'
import { IoMdCloseCircleOutline } from 'react-icons/io'

export function DynamicToast({ removeToast, alerts }: UseToastHandlerReturn) {
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
          className="px-2 py-1 flex text-xs items-center border border-faint"
        >
          <p>{alert.text}</p>
          <Button
            className="ml-auto"
            color="ghost"
            size="sm"
            onClick={() => removeToast(index)}
          >
            <IoMdCloseCircleOutline size={20} />
          </Button>
        </Alert>
      ))}
    </Toast>
  )
}
