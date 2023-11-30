import { extendTheme } from '@chakra-ui/react'
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
import Text from './TextConfig'
import { bg, config, dark, light, shadows } from '..'

const fonts = {
  heading: `'Open Sans', sans-serif`,
  body: `'Open Sans', sans-serif`,
}

const styles = {
  global: {
    body: {
      bg: bg.light,
      _dark: {
        bg: bg.dark,
      },
    },
  },
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
    Text,
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
