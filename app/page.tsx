'use client'

import { useState } from 'react'
import { useDisclosure } from './hooks'
import { Accordion, Menu, Modal, Pagination, Tab } from './components'
import { on } from 'events'

export default function HomePage() {
  const modalDisclosure = useDisclosure()
  const [page, setPage] = useState(1)
  const [number, setNumber] = useState<string>('')
  const [tab, setTab] = useState(1)
  return (
    <div className="flex flex-col gap-3">
      {/* Card */}
      <div className="card shadow-xl">
        <figure>
          <img
            src="https://images.mirror-media.xyz/publication-images/2yXY8M-emmKoKGbh5TA_A.jpeg?height=480&width=960"
            alt="brand"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Modular Smart Contracts!</h2>
          <p>Did someone say Inverter?</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
      <div className="divider" />
      {/* Tab */}
      <Tab setTab={setTab} tab={tab} tabs={['Tab 1', 'Tab 2', 'Tab3']} />
      <div className="divider"></div>
      {/* Menu */}
      <Menu items={['Item 1', 'Item 2']} summary="Title">
        <Menu items={['Sub Item 1', 'Sub Item 2']} summary="Sub Title" />
      </Menu>
      <div className="divider"></div>
      {/* Accordion */}
      <Accordion
        items={[
          { label: 'Accordion 1', content: 'Content 1' },
          { label: 'Accordion 2', content: 'Content 2' },
          { label: 'Accordion 3', content: 'Content 3' },
        ]}
      />
      <div className="divider" />
      {/* Modal */}
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button className="btn" onClick={modalDisclosure.onOpen}>
        open modal
      </button>
      <Modal
        isOpen={modalDisclosure.isOpen}
        onClose={modalDisclosure.onClose}
        title="Modal Title"
      />
      <div className="divider" />
      {/* Skeleton */}
      <div className="flex flex-col gap-4 w-52">
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
      <div className="divider" />
      {/* Pagination */}
      <Pagination setPage={setPage} page={page} totalPages={10} />
    </div>
  )
}
