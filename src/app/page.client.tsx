'use client'

import { useState } from 'react'
import {
  Accordion,
  Frame,
  NoData,
  NumberInput,
  Pagination,
  SubmitableForm,
  Tabs,
  TextInput,
  ThreeDCard,
} from '@/components'
import { Button, Card, Divider, Menu, Modal, Skeleton } from '@/react-daisyui'
import { useDisclosure, useToast } from '@/hooks'
import { IoClose } from 'react-icons/io5'
import Image from 'next/image'

const imageUrl =
  'https://images.mirror-media.xyz/publication-images/2yXY8M-emmKoKGbh5TA_A.jpeg?height=480&width=960'

export default function PageClient() {
  const { onOpen, isOpen, onClose } = useDisclosure()
  const { addToast } = useToast()
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
      {/* Card */}
      <Card>
        <Card.Image src={imageUrl} alt="Brand" />
        <Card.Body>
          <Card.Title tag="h2">Modular Smart Contracts!</Card.Title>
          <p>Did someone say Inverter?</p>
          <Card.Actions className="justify-end">
            <Button size={'sm'} color="primary">
              Integrate Now
            </Button>
          </Card.Actions>
        </Card.Body>
      </Card>
      <Divider />
      {/* 3D Card */}
      <ThreeDCard.Container className="max-w-96 mx-auto">
        <ThreeDCard.Body>
          <ThreeDCard.Item
            as="p"
            translateZ="60"
            className="text-subtitle-1 text-primary"
          >
            DATE
          </ThreeDCard.Item>

          <ThreeDCard.Item translateZ="50">TITLE</ThreeDCard.Item>

          <ThreeDCard.Item translateZ="100" className="w-full mt-4">
            <Image
              src={imageUrl}
              width={400}
              height={200}
              className="w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt="thumbnail"
            />
          </ThreeDCard.Item>
        </ThreeDCard.Body>
      </ThreeDCard.Container>

      <Divider />
      {/* Tab */}
      <Tabs
        variant="boxed"
        setTab={setTab}
        tab={tab}
        tabs={['Tab 1', 'Tab 2', 'Tab3']}
      />
      <Divider />
      {/* Menu */}
      <Menu className="bg-base-200 rounded-box">
        <Menu.Item>
          <a className={'active'}>Item 1 {'(active)'}</a>
        </Menu.Item>
        <Menu.Item>
          <a>Item 2</a>
        </Menu.Item>
        <Menu.Item>
          <Menu.Details label={'Sub Menu'}>
            <Menu.Item>
              <a>level 2 item 1</a>
            </Menu.Item>
            <Menu.Item>
              <a>level 2 item 2</a>
            </Menu.Item>
          </Menu.Details>
        </Menu.Item>
      </Menu>
      <Divider />
      {/* Accordion */}
      <Accordion
        className={'bg-base-200'}
        icon="arrow"
        items={[
          { label: 'Accordion 1', content: 'Content 1' },
          { label: 'Accordion 2', content: 'Content 2' },
          { label: 'Accordion 3', content: 'Content 3' },
        ]}
      />
      <Divider />
      {/* Modal */}
      <Button onClick={onOpen}>Open Modal</Button>
      <Modal.Legacy open={isOpen}>
        <Modal.Header className="flex justify-between items-center">
          <h2>Header</h2>
          <Button color="ghost" className="p-0">
            <IoClose size={30} onClick={onClose} />
          </Button>
        </Modal.Header>
        <Modal.Body>This modal works with useDisclosure hook!</Modal.Body>
      </Modal.Legacy>
      <Divider />
      {/* Skeleton */}
      <div className="flex flex-col gap-4 w-52">
        <Skeleton className="h-32 w-full"></Skeleton>
        <Skeleton className="h-4 w-28"></Skeleton>
        <Skeleton className="h-4 w-full"></Skeleton>
        <Skeleton className="h-4 w-full"></Skeleton>
      </div>
      <Divider />
      {/* No Data */}
      <div className="flex gap-4 itmes-center">
        <NoData />
        <NoData inline />
      </div>
      <Divider />
      {/* Pagination */}
      <Pagination setPage={setPage} page={page} totalPages={10} />
      <Divider />
      {/* Frame */}
      <Frame>
        <h3>{'This is a Frame :)'}</h3>
      </Frame>
      <Divider />
      {/* Text Input */}
      <TextInput
        label="Text Input"
        onChange={setTextInput}
        value={textInputValue}
      />
      <Divider />
      {/* Number Input */}
      <NumberInput
        label="Number Input"
        onChange={setNumberInputValue}
        value={numberInputValue}
      />
      <Divider />
      {/* Submitable Form */}
      <SubmitableForm
        rows={[
          {
            label: 'URL',
            onChange: (t) => setFormState((p) => ({ ...p, url: t })),
            type: 'url',
            required: true,
          },
          {
            label: 'EVM Address',
            onChange: (t) => setFormState((p) => ({ ...p, address: t })),
            type: 'address',
            required: true,
          },
          {
            label: 'Email',
            onChange: (t) => setFormState((p) => ({ ...p, email: t })),
            type: 'email',
            required: true,
          },
          {
            label: 'Number',
            type: 'number',
            onChange: (t) => setFormState((p) => ({ ...p, number: t })),
            min: 2,
            max: 5,
            required: true,
          },
        ]}
        header="Submitable Form"
        onSubmit={() => {
          alert('Submitted!')
        }}
        data="DATA!"
      />
      <Divider />
      <SubmitableForm
        rows={[
          {
            label: 'URL',
            onChange: (t) => setFormState((p) => ({ ...p, url: t })),
            type: 'url',
            required: true,
          },
          {
            label: 'Number',
            type: 'number',
            onChange: (t) => setFormState((p) => ({ ...p, number: t })),
            min: 2,
            max: 5,
            required: true,
          },
        ]}
        onSubmit={() => {
          alert('Submitted!')
        }}
        defaultIsEditing={true}
        data="DATA!"
      />
      <Divider />
      {/* Toast */}
      <Button
        color={'primary'}
        onClick={() => {
          addToast({ text: 'Test Toast', status: 'success' })
        }}
      >
        Test Toast
      </Button>
    </div>
  )
}
