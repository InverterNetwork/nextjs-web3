import { extendTheme, ThemeConfig } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import Card from './CardConfig'
import Tabs from './TabsConfig'
import Button from './ButtonConfig'
import Divider from './DividerConfig'
import Frame from './FrameConfig'
import Modal from './ModalConfig'
import Accordion from './AccordionConfig'
import Tag from './TagConfig'
import Menu from './MenuConfig'
import Skeleton from './SkeletonConfig'
import Input from './InputConfig'
import Switch from './SwitchConfig'

export const { light, dark } = {
  light: {
    primary: { 50: 'white', 100: '#ECFDF5', 200: '#D1FAE5', 300: '#6EE7B7' },
    accent: { 300: '#86EFAC', 400: '#4ADE80', 500: '#ECFDF5' },
    border: '#A7C3B8',
  },

  dark: {
    primary: { 700: '#1F1F1F', 800: '#1D1C1D', 900: '#101110' },
    accent: { 300: '#4ADE80', 400: '#74D674', 900: '#5EEAD4' },
    border: '#74D674',
  },
}

const bg = {
  dark: dark.primary[700],
  light: light.primary[50],
}

const config: ThemeConfig = {
  initialColorMode: 'dark',
  // useSystemColorMode: false,
}

const fonts = {
  heading: `'Open Sans', sans-serif`,
  body: `'Open Sans', sans-serif`,
}

const shadows = {
  accent: '0 0 10px 0 rgb(116, 214, 116, 0.7)',
  accentSide: '-4px 4px 6px -3px rgb(116, 214, 116, 0.7)',
  light: `-4px 4px 6px -3px rgba(0, 0, 0, 0.1)`,
  dark: `-4px 4px 6px -3px rgba(0, 0, 0, 0.5)`,
}

const styles = {
  global: (props: any) => ({
    body: {
      bg: mode(bg.light, bg.dark)(props),
    },
  }),
}

export default extendTheme({
  config,
  styles,
  fonts,
  colors: {
    light,
    dark,
  },
  shadows,
  components: {
    Accordion,
    Modal,
    Frame,
    Card,
    Tabs,
    Button,
    Divider,
    Tag,
    Menu,
    Skeleton,
    Input,
    Switch,
  },
})
