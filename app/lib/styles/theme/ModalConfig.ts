import { modalAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(modalAnatomy.keys)

const baseStyle = definePartsStyle({
  // define the part you're going to style
  dialog: {
    _dark: {
      background: 'dark.primary.900',
    },
    borderRadius: 'xl',
  },
})

export default defineMultiStyleConfig({ baseStyle })
