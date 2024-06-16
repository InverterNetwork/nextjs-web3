'use client'

import { useToast } from '@/hooks'
import { Button, ButtonProps } from '@/react-daisyui'
import { BsCopy } from 'react-icons/bs'

export function Copy({
  data,
  color = 'primary',
  variant = 'outline',
  size = 'sm',
  ...rest
}: { data: any } & Omit<ButtonProps, 'onClick'>) {
  const { addToast } = useToast()

  return (
    <Button
      {...{ ...rest, color, variant, size }}
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(data)
        addToast({
          text: `Copied ${data} to clipboard`,
          status: 'success',
        })
      }}
    >
      <BsCopy />
    </Button>
  )
}
