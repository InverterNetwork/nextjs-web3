import { defineStyleConfig } from '@chakra-ui/react'

export default defineStyleConfig({
  baseStyle: {
    p: 3,
    borderColor: 'light.border !important',
    borderRadius: 'xl',
    background: 'light.primary.100',
    boxShadow: `light`,
    _dark: {
      borderColor: 'dark.border !important',
      boxShadow: `dark`,
      background: 'dark.primary.800',
    },
  },
})
