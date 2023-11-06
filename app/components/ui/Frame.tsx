'use client'

import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  ThemingProps,
  useStyleConfig,
} from '@chakra-ui/react'

export interface FrameProps extends HTMLChakraProps<'div'>, ThemingProps {}

// Use it in your components
const Frame = forwardRef<FrameProps, 'div'>((props, ref) => {
  const { size, variant, ...rest } = props
  const styles = useStyleConfig('Frame', { size, variant })

  return <chakra.div ref={ref} __css={styles} {...rest} />
})

export default Frame
