import React from 'react'
import { cn } from '@/utils'
import { VariantProps, cva } from 'class-variance-authority'
import * as lucidReact from 'lucide-react'

export const loaders = {
  Loader: lucidReact.Loader,
  Loader2: lucidReact.Loader2,
  PinWheel: lucidReact.LoaderPinwheel,
  Lucide: lucidReact.LucideLoader,
  Icon: lucidReact.LoaderIcon,
}

const spinnerVariants = cva('flex-col items-center justify-center', {
  variants: {
    show: {
      true: 'flex',
      false: 'hidden',
    },
  },
  defaultVariants: {
    show: true,
  },
})

const loaderVariants = cva('animate-spin text-primary', {
  variants: {
    size: {
      small: 'size-6',
      medium: 'size-8',
      large: 'size-12',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
})

interface SpinnerContentProps
  extends VariantProps<typeof spinnerVariants>,
    VariantProps<typeof loaderVariants> {
  className?: string
  children?: React.ReactNode
  loader?: keyof typeof loaders
}

export function Spinner({
  size,
  show,
  children,
  className,
  loader = 'PinWheel',
}: SpinnerContentProps) {
  const Loader = loaders[loader]
  return (
    <span className={spinnerVariants({ show })}>
      <Loader className={cn(loaderVariants({ size }), className)} />
      {children}
    </span>
  )
}
