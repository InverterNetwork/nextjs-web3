import { defineStyleConfig } from '@chakra-ui/react'

export default defineStyleConfig({
  baseStyle: {
    p: 3,
    borderRadius: 'xl',
    _light: {
      background: 'light.primary.100',
      boxShadow: `light`,
    },
    _dark: {
      boxShadow: `dark`,
      background: 'dark.primary.900',
    },
  },
})
