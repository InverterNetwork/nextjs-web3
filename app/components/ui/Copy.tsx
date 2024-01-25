'use client'

import { Button } from 'react-daisyui'
import { BsCopy } from 'react-icons/bs'

export default function Copy({ data }: { data: any }) {
  return (
    <Button
      variant="outline"
      color={'primary'}
      size={'sm'}
      onClick={() => navigator.clipboard.writeText(data)}
    >
      <BsCopy />
    </Button>
  )
}
