import { defineStyleConfig } from '@chakra-ui/react'

export default defineStyleConfig({
  baseStyle: {
    borderColor: 'light.border',
    _dark: {
      borderColor: 'dark.border',
    },
  },
})
