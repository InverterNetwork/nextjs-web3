import { menuAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys)

const baseStyle = definePartsStyle({
  // define the part you're going to style
  list: {
    maxW: 'max-content',
    minW: 'max-content',
    borderRadius: 'xl',
    bg: 'light.primary.50',
    _dark: {
      bg: 'dark.primary.800',
    },
  },
  item: {
    bg: 'light.primary.100',
    _dark: {
      bg: 'dark.primary.700',
    },
    _hover: {
      bg: 'light.accent.300 !important',
      _dark: {
        bg: 'dark.accent.300 !important',
      },
    },
  },
})

export default defineMultiStyleConfig({
  baseStyle,
})
