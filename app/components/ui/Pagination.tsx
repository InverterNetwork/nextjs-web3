import { Button, HStack, StackProps } from '@chakra-ui/react'
import Frame from './Frame'

export default function Pagination({
  totalPages,
  page,
  setPage,
  props,
}: {
  totalPages?: number
  page: number
  setPage: (page: number) => void
  props?: StackProps
}) {
  return (
    <HStack spacing={2} {...props}>
      <Button
        size={'sm'}
        isDisabled={page <= 1}
        onClick={() => setPage(page - 1)}
      >
        -
      </Button>
      <Frame p={1} pl={3} pr={3}>
        {page}
      </Frame>
      <Button
        isDisabled={(totalPages ?? 1) <= page}
        size={'sm'}
        onClick={() => setPage(page + 1)}
      >
        +
      </Button>
    </HStack>
  )
}
