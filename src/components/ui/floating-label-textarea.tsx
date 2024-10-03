import * as React from 'react'

import { cn } from '@/utils'
import { Textarea } from '@/components/ui/textarea'
import { FloatingLabel } from './floating-label-input'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const FloatingTextarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <Textarea
        placeholder=" "
        className={cn('peer', className)}
        ref={ref}
        {...props}
      />
    )
  }
)
FloatingTextarea.displayName = 'FloatingTextarea'

type FloatingLabelTextareaProps = TextareaProps & { label?: string }

const FloatingLabelTextarea = React.forwardRef<
  React.ElementRef<typeof FloatingTextarea>,
  React.PropsWithoutRef<FloatingLabelTextareaProps>
>(({ id, label, ...props }, ref) => {
  return (
    <div className="relative">
      <FloatingTextarea ref={ref} id={id} {...props} />
      <FloatingLabel htmlFor={id}>{label}</FloatingLabel>
    </div>
  )
})
FloatingLabelTextarea.displayName = 'FloatingLabelTextarea'

export { FloatingTextarea, FloatingLabelTextarea }
