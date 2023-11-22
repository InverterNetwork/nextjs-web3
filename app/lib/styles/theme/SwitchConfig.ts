import { switchAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(switchAnatomy.keys)

const baseStyle = definePartsStyle({
  field: {
    _focus: {
      borderColor: 'light.accent.400',
      _dark: {
        borderColor: 'dark.accent.400',
      },
    },
  },
  track: {
    bg: 'light.primary.200',

    _dark: {
      bg: 'dark.primary.900',
    },
    _checked: {
      bg: 'light.accent.400',
      _dark: {
        bg: 'dark.accent.400',
      },
    },
  },
})

export default defineMultiStyleConfig({ baseStyle })
