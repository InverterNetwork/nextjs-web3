'use client'

// React and Form Hooks
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

// UI Components - Layout & Structure
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@inverter-network/react/client'

// UI Components - Forms & Inputs
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Label,
} from '@inverter-network/react/client'

// UI Components - Interactive Elements
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '@inverter-network/react/client'

// UI Components - Display Elements
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  FloatingInput,
  FloatingLabel,
  Frame,
  Input,
  NoData,
  Skeleton,
} from '@inverter-network/react'

// UI Components - Navigation
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@inverter-network/react'

// Utilities
import { toAmountString } from '@inverter-network/sdk'

export function Preview() {
  // Hooks
  const form = useForm()
  const [numberInputValue, setNumberInputValue] = useState('')
  const [_, setFormState] = useState({
    url: '',
    email: '',
    address: '',
    number: '',
  })

  return (
    <div className="flex flex-col gap-3">
      {/* ===== Account Management Section ===== */}
      <Tabs defaultValue="account">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>

        {/* Account Tab */}
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when youre done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="Pedro Duarte" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input id="username" defaultValue="@peduarte" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Password Tab */}
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, youll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      <Separator />

      {/* ===== Status Indicators ===== */}
      <div className="flex gap-2">
        <Badge variant="default">Default</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="secondary">Secondary</Badge>
      </div>
      <Separator />

      {/* ===== Navigation Elements ===== */}
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              New Tab <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>New Window</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Share</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Print</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <Separator />

      {/* ===== Collapsible Content ===== */}
      <Collapsible>
        <CollapsibleTrigger>Can I use this in my project?</CollapsibleTrigger>
        <CollapsibleContent>
          Yes. Free to use for personal and commercial projects. No attribution
          required.
        </CollapsibleContent>
      </Collapsible>
      <Separator />

      {/* ===== FAQ Accordion ===== */}
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Separator />

      {/* ===== Modal Dialog ===== */}
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Separator />

      {/* ===== Loading States ===== */}
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <Separator />

      {/* ===== Empty States ===== */}
      <div className="flex gap-4 items-center">
        <NoData />
        <NoData inline />
      </div>
      <Separator />

      {/* ===== Pagination Controls ===== */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <Separator />

      {/* ===== Content Frame ===== */}
      <Frame>
        <h3>{'This is a Frame :)'}</h3>
      </Frame>
      <Separator />

      {/* ===== Form Inputs ===== */}
      {/* Text Input */}
      <div className="relative">
        <FloatingInput id="floating-customize" />
        <FloatingLabel htmlFor="floating-customize">Text Input</FloatingLabel>
      </div>

      {/* Number Input */}
      <div className="relative">
        <FloatingInput
          id="floating-customize"
          onChange={(e) => {
            setNumberInputValue(toAmountString(e.target.value))
          }}
          value={numberInputValue}
          type="tel"
        />
        <FloatingLabel htmlFor="floating-customize">Number Input</FloatingLabel>
      </div>
      <Separator />

      {/* ===== Form with Validation ===== */}
      <Form {...form}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
      <Separator />

      {/* ===== Toast Demo ===== */}
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
