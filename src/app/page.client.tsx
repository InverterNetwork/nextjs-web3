'use client'

import { useState } from 'react'
import { useDisclosure } from '@/hooks'
import { toast } from 'sonner'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tabs } from '@/components/ui/_tabs'
import { Menubar } from '@/components/ui/menubar'
import { Collapsible } from '@/components/ui/collapsible'

import { Accordion } from '@/components/ui/_accordion'

import { Dialog } from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { NoData } from '@/components/ui/no-data'
import { Pagination } from '@/components/ui/_pagination'
import { Frame } from '@/components/ui/frame'
import {
  FloatingInput,
  FloatingLabel,
} from '@/components/ui/floating-label-input'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import utils from '@/utils'

const imageUrl =
  'https://raw.githubusercontent.com/InverterNetwork/media/main/inverter-light-banner.png'

export default function PageClient() {
  const form = useForm()
  const { onOpen, isOpen, onClose } = useDisclosure()
  const [page, setPage] = useState(1)
  const [textInputValue, setTextInput] = useState<string>('')
  const [tab, setTab] = useState(1)
  const [numberInputValue, setNumberInputValue] = useState('')
  const [_, setFormState] = useState({
    url: '',
    email: '',
    address: '',
    number: '',
  })

  return (
    <div className="flex flex-col gap-3">
      {/* Tabs / Card */}
      <Tabs defaultValue="account">
        <Tabs.List className="grid w-full grid-cols-2">
          <Tabs.Trigger value="account">Account</Tabs.Trigger>
          <Tabs.Trigger value="password">Password</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="account">
          <Card>
            <Card.Header>
              <Card.Title>Account</Card.Title>
              <Card.Description>
                Make changes to your account here. Click save when youre done.
              </Card.Description>
            </Card.Header>
            <Card.Content className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="Pedro Duarte" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input id="username" defaultValue="@peduarte" />
              </div>
            </Card.Content>
            <Card.Footer>
              <Button>Save changes</Button>
            </Card.Footer>
          </Card>
        </Tabs.Content>
        <Tabs.Content value="password">
          <Card>
            <Card.Header>
              <Card.Title>Password</Card.Title>
              <Card.Description>
                Change your password here. After saving, youll be logged out.
              </Card.Description>
            </Card.Header>
            <Card.Content className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" />
              </div>
            </Card.Content>
            <Card.Footer>
              <Button>Save password</Button>
            </Card.Footer>
          </Card>
        </Tabs.Content>
      </Tabs>
      <Separator />
      {/* Badge */}
      <Badge variant="default">Default</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Separator />
      {/* Menu */}
      <Menubar>
        <Menubar.Menu>
          <Menubar.Trigger>File</Menubar.Trigger>
          <Menubar.Content>
            <Menubar.Item>
              New Tab <Menubar.Shortcut>⌘T</Menubar.Shortcut>
            </Menubar.Item>
            <Menubar.Item>New Window</Menubar.Item>
            <Menubar.Separator />
            <Menubar.Item>Share</Menubar.Item>
            <Menubar.Separator />
            <Menubar.Item>Print</Menubar.Item>
          </Menubar.Content>
        </Menubar.Menu>
      </Menubar>
      <Separator />
      {/* Collapse */}
      <Collapsible>
        <Collapsible.Trigger>Can I use this in my project?</Collapsible.Trigger>
        <Collapsible.Content>
          Yes. Free to use for personal and commercial projects. No attribution
          required.
        </Collapsible.Content>
      </Collapsible>

      <Separator />
      {/* Accordion */}
      <Accordion type="single" collapsible>
        <Accordion.Item value="item-1">
          <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
          <Accordion.Content>
            Yes. It adheres to the WAI-ARIA design pattern.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
      <Separator />
      {/* Modal */}
      <Dialog>
        <Dialog.Trigger>Open</Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Are you absolutely sure?</Dialog.Title>
            <Dialog.Description>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </Dialog.Description>
          </Dialog.Header>
        </Dialog.Content>
      </Dialog>
      <Separator />
      {/* Skeleton / Card */}
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <Separator />
      {/* No Data */}
      <div className="flex gap-4 itmes-center">
        <NoData />
        <NoData inline />
      </div>
      <Separator />
      {/* Pagination */}
      <Pagination>
        <Pagination.Content>
          <Pagination.Item>
            <Pagination.Previous href="#" />
          </Pagination.Item>
          <Pagination.Item>
            <Pagination.Link href="#">1</Pagination.Link>
          </Pagination.Item>
          <Pagination.Item>
            <Pagination.Ellipsis />
          </Pagination.Item>
          <Pagination.Item>
            <Pagination.Next href="#" />
          </Pagination.Item>
        </Pagination.Content>
      </Pagination>

      <Separator />
      {/* Frame */}
      <Frame>
        <h3>{'This is a Frame :)'}</h3>
      </Frame>
      <Separator />
      {/* Floating Text Input */}
      <div className="relative">
        <FloatingInput id="floating-customize" />
        <FloatingLabel htmlFor="floating-customize">Text Input</FloatingLabel>
      </div>
      <Separator />
      {/* Number Input */}
      <div className="relative">
        <FloatingInput
          id="floating-customize"
          onChange={(e) => {
            setNumberInputValue(utils.format.amountString(e.target.value))
          }}
          value={numberInputValue}
          type="tel"
        />
        <FloatingLabel htmlFor="floating-customize">Number Input</FloatingLabel>
      </div>
      <Separator />
      {/* Form */}
      <Form {...form}>
        <Form.Field
          control={form.control}
          name="username"
          render={({ field }) => (
            <Form.Item>
              <Form.Label>Username</Form.Label>
              <Form.Control>
                <Input placeholder="shadcn" {...field} />
              </Form.Control>
              <Form.Description>
                This is your public display name.
              </Form.Description>
              <Form.Message />
            </Form.Item>
          )}
        />
      </Form>
      <Separator />

      {/* Toast */}
      <Button
        color={'primary'}
        onClick={() => {
          const minLength = 10
          const maxLength = 400
          const randomLength =
            Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength
          const randomText = Array(randomLength)
            .fill(null)
            .map(() => Math.random().toString(36).charAt(2))
            .join('')
          toast.success(randomText)
        }}
      >
        Test Toast
      </Button>
    </div>
  )
}
