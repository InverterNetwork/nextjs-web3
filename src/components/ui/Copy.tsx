import { BsCopy } from 'react-icons/bs'
import { toast } from 'sonner'
import { Button, ButtonProps } from './button'

export function Copy({
  data,
  color = 'primary',
  variant = 'outline',
  size = 'sm',
  ...rest
}: { data: any } & Omit<ButtonProps, 'onClick'>) {
  return (
    <Button
      {...{ ...rest, color, variant, size }}
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(data)
        toast.success(`Copied ${data} to clipboard`)
      }}
    >
      <BsCopy />
    </Button>
  )
}
