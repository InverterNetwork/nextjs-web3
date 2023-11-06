'use client'

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Heading,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Switch,
  Tab,
  TabList,
  Tabs,
  Tag,
  useDisclosure,
} from '@chakra-ui/react'
import { Frame } from './components'

export default function HomePage() {
  const modalDisclosure = useDisclosure()
  return (
    <Stack gap={6}>
      <Heading>Frame</Heading>
      <Frame>Base Frame</Frame>
      <Heading>Buttons</Heading>
      <Flex gap={3}>
        <Button>Base Button</Button>
        <Button variant={'frame'}>Frame Button</Button>
        <Button variant={'accent'}>Accent Button</Button>
      </Flex>
      <Heading>Divider</Heading>
      <Divider />
      <Heading>Cards</Heading>
      <Flex gap={3}>
        <Card>
          <CardHeader>Base Card</CardHeader>
          <CardBody>Body</CardBody>
          <CardFooter>Footer</CardFooter>
        </Card>
        <Card variant={'info'}>
          <CardHeader>Info Card</CardHeader>
          <CardBody>Body</CardBody>
          <CardFooter>Footer</CardFooter>
        </Card>
      </Flex>
      <Heading>Tabs</Heading>
      <Tabs>
        <TabList>
          <Tab>First Base Tab</Tab>
          <Tab>Second Base Tab</Tab>
        </TabList>
      </Tabs>
      <Heading>Tag</Heading>
      <Tag>Base Tag</Tag>
      <Heading>Switch</Heading>
      <Switch />
      <Heading>Input</Heading>
      <Input placeholder="Base Input" />
      <Heading>Menu</Heading>
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton as={Button}>{isOpen ? 'Close' : 'Open'}</MenuButton>
            <MenuList>
              <MenuItem>Item One</MenuItem>
              <MenuDivider />
              <MenuItem>Item Two</MenuItem>
            </MenuList>
          </>
        )}
      </Menu>
      <Heading>Modals</Heading>
      <Button onClick={modalDisclosure.onOpen}>Open Modal</Button>
      <Modal isOpen={modalDisclosure.isOpen} onClose={modalDisclosure.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Base Modal
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>Body</ModalBody>
          <ModalFooter>Footer</ModalFooter>
        </ModalContent>
      </Modal>
      <Heading>Accordion</Heading>
      <Accordion allowToggle>
        {['One', 'Two'].map((i, index) => {
          return (
            <AccordionItem key={index}>
              <AccordionButton gap={3}>
                <Heading size="sm">Title {i}</Heading>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel borderTop="1px solid">Item {i}</AccordionPanel>
            </AccordionItem>
          )
        })}
      </Accordion>
      <Heading>Skeleton</Heading>
      <Skeleton w={12} h={6} />
      <SkeletonCircle />
      <SkeletonText w={12} />
    </Stack>
  )
}
