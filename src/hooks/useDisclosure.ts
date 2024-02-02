import { useRef, useState } from 'react'

export interface UseDisclosureProps {
  isOpen?: boolean
  defaultIsOpen?: boolean
  onClose?(): void
  onOpen?(): void
  id?: string
}

export default function useDisclosure(props?: UseDisclosureProps) {
  const { isOpen: defaultIsOpen = false, onClose, onOpen, id } = props || {}

  const [isOpen, setIsOpen] = useState(defaultIsOpen)
  const isOpenRef = useRef(isOpen)

  const onCloseRef = useRef(onClose)
  const onOpenRef = useRef(onOpen)

  const handleClose = () => {
    setIsOpen(false)
    onCloseRef.current?.()
  }

  const handleOpen = () => {
    setIsOpen(true)
    onOpenRef.current?.()
  }

  isOpenRef.current = isOpen
  onCloseRef.current = onClose
  onOpenRef.current = onOpen

  const toggle = () => {
    if (isOpenRef.current) {
      handleClose()
    } else {
      handleOpen()
    }
  }

  const getButtonProps = (props?: any) => ({
    onClick: toggle,
    ...props,
  })

  const getDisclosureProps = (props?: any) => ({
    id,
    ...props,
  })

  return {
    isOpen,
    onClose: handleClose,
    onOpen: handleOpen,
    isControlled: !!props?.isOpen,
    getButtonProps,
    getDisclosureProps,
    toggle,
  }
}

export type UseDisclosureReturn = ReturnType<typeof useDisclosure>
