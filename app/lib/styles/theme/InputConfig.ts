import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

export default createMultiStyleConfigHelpers(
  inputAnatomy.keys
).defineMultiStyleConfig({
  baseStyle: {
    element: {
      borderColor: 'light.border',
    },
    field: {
      border: '1px solid',
      boxShadow: 'none !important',
      bg: 'light.primary.50',
      borderColor: 'light.border !important',
      _dark: {
        // bg: 'dark.primary.900',
        // borderColor: 'dark.border',
      },
      _focus: {
        borderColor: 'light.accent.400 !important',
        _dark: {
          borderColor: 'dark.accent.400',
        },
      },
    },
  },
})
