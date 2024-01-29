'use client'

import { useState } from 'react'
import {
  Accordion,
  EditableText,
  Frame,
  NoData,
  NumberInput,
  Pagination,
  SubmitableTextForm,
  Tabs,
} from './components'
import { Button, Card, Divider, Menu, Modal, Skeleton } from 'react-daisyui'
import { useToast } from '@/hooks'

export default function HomePage() {
  const { Dialog, handleShow } = Modal.useDialog()
  const { addToast } = useToast()
  const [page, setPage] = useState(1)
  const [editableText, setEditableText] = useState<string>('')
  const [tab, setTab] = useState(1)
  const [numberInputValue, setNumberInputValue] = useState('')
  const [formState, setFormState] = useState({
    title: '',
    description: '',
  })
  return (
    <div className="flex flex-col gap-3">
      {/* Card */}
      <Card>
        <Card.Image
          src="https://images.mirror-media.xyz/publication-images/2yXY8M-emmKoKGbh5TA_A.jpeg?height=480&width=960"
          alt="Brand"
        />
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
      <Button onClick={handleShow}>Open Modal</Button>
      <Dialog>
        <Modal.Header className="font-bold">Hello!</Modal.Header>
        <Modal.Body>This modal works with useDialog hook!</Modal.Body>
        <Modal.Actions>
          <form method="dialog">
            <Button>Close</Button>
          </form>
        </Modal.Actions>
      </Dialog>
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
      {/* Number Input */}
      <NumberInput
        label="Number Input"
        onChange={setNumberInputValue}
        value={numberInputValue}
      />
      <Divider />
      {/* Frame */}
      <Frame>
        <h3>{'This is a Frame :)'}</h3>
      </Frame>
      <Divider />
      {/* Editable Text */}
      <EditableText
        invalid={editableText.length < 3}
        label="Editable Text"
        value={editableText}
        onChange={setEditableText}
      />
      <Divider />
      {/* Submitable Text */}
      <SubmitableTextForm
        rows={[
          {
            label: 'Title',
            onChange: (t) => setFormState((p) => ({ ...p, title: t })),
            invalid: formState.title.length < 3,
            type: 'text',
          },
          {
            label: 'Description',
            onChange: (t) => setFormState((p) => ({ ...p, description: t })),
            invalid: formState.description.length < 3,
            type: 'text',
          },
        ]}
        header="Submitable Text Form"
        onSubmit={() => {
          alert('Submitted!')
        }}
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
