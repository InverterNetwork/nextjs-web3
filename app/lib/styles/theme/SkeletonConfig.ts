import { defineStyle, defineStyleConfig, cssVar } from '@chakra-ui/react'

const $startColor = cssVar('skeleton-start-color')
const $endColor = cssVar('skeleton-end-color')

const base = defineStyle({
  borderRadius: 'lg',
  [$startColor.variable]: '#ECFDF5', //primary
  [$endColor.variable]: '#22C55E', // accent.500

  _dark: {
    [$startColor.variable]: '#86EFAC', // primary
    [$endColor.variable]: '#22C55E', // accent.500
  },
})

export default defineStyleConfig({
  variants: { base },
  defaultProps: {
    variant: 'base',
  },
})
