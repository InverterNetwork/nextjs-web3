'use client'

import { useToast } from '@/hooks'
import { Button } from 'react-daisyui'
import { BsCopy } from 'react-icons/bs'

export default function Copy({ data }: { data: any }) {
  const { addToast } = useToast()
  return (
    <Button
      variant="outline"
      color={'primary'}
      size={'sm'}
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
