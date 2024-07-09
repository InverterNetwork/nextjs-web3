import { Button, ButtonProps } from '@/react-daisyui'
import { BsCopy } from 'react-icons/bs'
import { toast } from 'sonner'

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
