import { cardAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys)

const baseStyle = definePartsStyle({
  // define the part you're going to style
  container: {
    borderRadius: 'xl',
    border: '1px solid',
    borderColor: 'light.border !important',
    boxShadow: `light`,
    _dark: {
      borderColor: 'dark.border !important',
      boxShadow: `dark`,
      background: 'dark.primary.900',
    },
  },
  header: {
    borderTopLeftRadius: 'xl',
    borderTopRightRadius: 'xl',
  },
})

const variants = {
  info: definePartsStyle({
    header: {
      backgroundColor: 'light.primary.100',
      borderBottom: '1px solid',
      _dark: {
        backgroundColor: 'dark.primary.800',
        borderColor: 'dark.border',
      },
      borderColor: 'light.border',
    },
  }),
}

export default defineMultiStyleConfig({
  defaultProps: {},
  baseStyle,
  variants,
})
