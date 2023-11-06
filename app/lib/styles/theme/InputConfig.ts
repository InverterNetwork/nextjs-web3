import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

export default createMultiStyleConfigHelpers(
  inputAnatomy.keys
).defineMultiStyleConfig({
  baseStyle: {
    field: {
      _light: {
        bg: 'light.primary.50',
        borderColor: 'light.border',
      },
      _dark: {
        bg: 'dark.primary.800',
      },
      _focus: {
        borderColor: 'light.accent.400',
        _dark: {
          borderColor: 'dark.accent.400',
        },
      },
    },
  },
})
