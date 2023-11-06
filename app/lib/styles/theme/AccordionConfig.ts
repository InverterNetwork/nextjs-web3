import { accordionAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(accordionAnatomy.keys)

const baseStyle = definePartsStyle({
  // define the part you're going to style
  container: {
    borderColor: 'light.border',
    _dark: {
      borderColor: 'dark.border',
    },
  },
  panel: {
    _light: {
      borderColor: 'black',
    },
    _dark: {
      borderColor: 'dark.accent.300',
    },
  },
})

export default defineMultiStyleConfig({ baseStyle })
