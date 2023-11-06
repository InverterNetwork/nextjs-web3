import { tabsAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tabsAnatomy.keys)

const variants = {
  base: definePartsStyle({
    tablist: {
      w: 'max-content',
      m: '0 auto',
      bg: 'light.primary.200',
      borderRadius: 'xl',
      _dark: {
        bg: 'dark.primary.900',
      },
    },
    tab: {
      fontWeight: 'semibold',
      borderRadius: 'inherit',
      transition: 'background-color 1s',
      _selected: {
        bg: 'light.accent.400',
        _dark: {
          bg: 'dark.accent.400',
        },
        color: 'white',
      },
      _hover: {
        bg: 'light.accent.300',
        _dark: { bg: 'dark.accent.300' },
      },
    },
  }),
}

export default defineMultiStyleConfig({
  variants,
  defaultProps: {
    variant: 'base',
    size: 'sm',
  },
})
