import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

export default createMultiStyleConfigHelpers(
  inputAnatomy.keys
).defineMultiStyleConfig({
  baseStyle: {
    field: {
      boxShadow: 'none !important',
      _light: {
        bg: 'light.primary.50',
        borderColor: 'light.border',
      },
      _dark: {
        bg: 'dark.primary.800',
      },
      _focus: {
        outlineColor: 'light.accent.400',
        borderColor: 'transparent',
        _dark: {
          borderColor: 'transparent',
          outlineColor: 'dark.accent.400',
        },
      },
    },
  },
})
